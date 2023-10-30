from bottle import get, template, response, request
import os
import sqlite3
import pathlib
import x
import random
import shared.queries as queries
import traceback
import shared.queries as queries
##############################
# TODO: Fix that you cant go to profile pages without being logged in
##############################


##############################


# @view ("profile")
@get("/<username>")
def _(username):

    try:

        db = x.db()

        logged_user = request.get_cookie("user", secret=x.COOKIE_SECRET)

        trends = db.execute("SELECT * FROM trends").fetchall()

        user = db.execute(
            "SELECT * FROM users WHERE user_username = ? COLLATE NOCASE", (username, )).fetchone()
        user_gallery = db.execute(
            "SELECT tweet_image FROM tweets WHERE tweet_user_fk = ? AND tweet_image > 0", (user["user_id"], )).fetchall()
        tweet_img_amount = db.execute(
            'SELECT COUNT(tweet_image) AS img_amount FROM tweets WHERE tweet_user_fk = ?', (user['user_id'],)).fetchone()
        tweets = db.execute(
            'SELECT * FROM tweets t JOIN users u on t.tweet_user_fk = u.user_id WHERE u.user_id = ?', (user['user_id'],)).fetchall()
        is_followed = None
        is_followed_suggestion_after = None
        user_profile_page = None
        # # Fetch the user via URL
        if logged_user:
            tweets = db.execute(
                "SELECT t.*,u.user_username,u.user_first_name,u.user_last_name,u.user_avatar,u.user_total_followers,f.*,tl.*,t2.tweet_id AS retweet_id,t2.tweet_user_fk AS retweet_user_fk,t2.tweet_created_at AS retweet_created_at,t2.tweet_message AS retweet_message,t2.tweet_image AS retweet_image,t2.tweet_total_retweets AS retweet_total_retweets,t2.tweet_total_likes AS retweet_total_likes,t2.tweet_total_replies AS retweet_total_replies,t2.tweet_role AS retweet_role,t2.tweet_since_created AS retweet_since_created,u2.user_username AS retweet_user_username,u2.user_first_name AS retweet_user_first_name,u2.user_last_name AS retweet_user_last_name,u2.user_avatar AS retweet_user_avatar,u2.user_total_followers AS retweet_user_total_followers,t3.tweet_id AS second_retweet_id,t3.tweet_user_fk AS second_retweet_user_fk,t3.tweet_created_at AS second_retweet_created_at,t3.tweet_message AS second_retweet_message,t3.tweet_image AS second_retweet_image,t3.tweet_total_retweets AS second_retweet_total_retweets,t3.tweet_total_likes AS second_retweet_total_likes,t3.tweet_total_replies AS second_retweet_total_replies,t3.tweet_role AS second_retweet_role,t3.tweet_since_created AS second_retweet_since_created,u3.user_username AS second_retweet_user_username,u3.user_first_name AS second_retweet_user_first_name,u3.user_last_name AS second_retweet_user_last_name,u3.user_avatar AS second_retweet_user_avatar,u3.user_total_followers AS second_retweet_user_total_followers,t4.tweet_id AS third_retweet_id,t4.tweet_user_fk AS third_retweet_user_fk,t4.tweet_created_at AS third_retweet_created_at,t4.tweet_message AS third_retweet_message,t4.tweet_image AS third_retweet_image,t4.tweet_total_retweets AS third_retweet_total_retweets,t4.tweet_total_likes AS third_retweet_total_likes,t4.tweet_total_replies AS third_retweet_total_replies,t4.tweet_role AS third_retweet_role,t4.tweet_since_created AS third_retweet_since_created,u4.user_username AS third_retweet_user_username,u4.user_first_name AS third_retweet_user_first_name,u4.user_last_name AS third_retweet_user_last_name,u4.user_avatar AS third_retweet_user_avatar,u4.user_total_followers AS third_retweet_user_total_followers,t5.tweet_id AS reply_id,t5.tweet_user_fk AS reply_user_fk,t5.tweet_created_at AS reply_created_at,t5.tweet_message AS reply_message,t5.tweet_image AS reply_image,t5.tweet_total_retweets AS reply_total_retweets,t5.tweet_total_likes AS reply_total_likes,t5.tweet_total_replies AS reply_total_replies,t5.tweet_role AS reply_role,t5.tweet_since_created AS reply_since_created,u5.user_username AS reply_user_username,u5.user_first_name AS reply_user_first_name,u5.user_last_name AS reply_user_last_name,u5.user_avatar AS reply_user_avatar,u5.user_total_followers AS reply_user_total_followers FROM tweets t JOIN users u ON t.tweet_user_fk=u.user_id LEFT JOIN followers f ON f.followee_id=t.tweet_user_fk AND f.follower_id=? LEFT JOIN tweets_likes tl ON tweet_like_tweet_fk=t.tweet_id AND tl.tweet_like_user_fk=? LEFT JOIN tweets_retweets trt ON trt.tweet_retweet_retweet_fk=t.tweet_id LEFT JOIN tweets t2 ON t2.tweet_id=trt.tweet_retweet_tweet_fk LEFT JOIN users u2 ON t2.tweet_user_fk=u2.user_id LEFT JOIN tweets_retweets trt2 ON trt2.tweet_retweet_retweet_fk=t2.tweet_id LEFT JOIN tweets t3 ON t3.tweet_id=trt2.tweet_retweet_tweet_fk LEFT JOIN users u3 ON u3.user_id=t3.tweet_user_fk LEFT JOIN tweets_retweets trt3 ON trt3.tweet_retweet_retweet_fk=t3.tweet_id LEFT JOIN tweets t4 ON t4.tweet_id=trt3.tweet_retweet_tweet_fk LEFT JOIN users u4 ON u4.user_id=t4.tweet_user_fk LEFT JOIN tweets_replies tr On tr.tweet_reply_reply=t.tweet_id LEFT JOIN tweets t5 ON t5.tweet_id=tr.tweet_reply_tweet_fk LEFT JOIN users u5 ON t5.tweet_user_fk=u5.user_id WHERE u.user_id = ? AND u.user_inactive='0'  ORDER BY tweet_created_at DESC", (logged_user["user_id"], logged_user["user_id"], user["user_id"])).fetchall()
            replies = db.execute(
                "SELECT t2.*,tr.* FROM tweets t join tweets_retweets tr ON t.tweet_id = tr.tweet_retweet_tweet_fk JOIN tweets t2 ON t2.tweet_id = tr.tweet_retweet_retweet_fk WHERE t.tweet_user_fk=?", (user["user_id"], )).fetchall()
            user_profile_page = db.execute(
                "SELECT * FROM users u WHERE u.user_id = ? AND u.user_username = ?", (logged_user['user_id'], username)).fetchone()
            is_followed = db.execute(
                "SELECT * FROM followers WHERE follower_id = ? AND followee_id = ?", (logged_user['user_id'], user["user_id"])).fetchone()
            user_profile_page = db.execute(
                "SELECT * FROM users u WHERE u.user_id = ? AND u.user_username = ?", (logged_user['user_id'], username)).fetchone()
            is_followed_suggestion_after = queries.is_followed_suggestion_after_profile(
                user, logged_user)

        return template("profile", user=user, logged_user=logged_user, trends=trends, tweets=tweets,  user_gallery=user_gallery, is_followed=is_followed, is_followed_suggestion_after=is_followed_suggestion_after, tweet_img_amount=tweet_img_amount["img_amount"], user_profile_page=user_profile_page, tweet_min_length=x.TWEET_MIN_LEN, tweet_max_length=x.TWEET_MAX_LEN)
    except Exception as ex:
        print(ex)
        traceback.print_exc()
        return str(ex)
    finally:
        if "db" in locals():
            db.close()

        ##############################
