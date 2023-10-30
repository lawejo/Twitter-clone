from math import log
import x
from bottle import request
import random


def trends():
    try:
        db = x.db()
        trends = db.execute("SELECT * FROM trends").fetchall()
        return trends
    except Exception as e:
        print(e)
    finally:
        if "db" in locals():
            db.close()


def trends_not_logged_in():
    try:
        db = x.db()
        trends_not_logged_in = db.execute(
            "SELECT * FROM trends LIMIT 0,5").fetchall()
        return trends_not_logged_in
    except Exception as e:
        print(e)
    finally:
        if "db" in locals():
            db.close()


def tweets(logged_user_id):
    try:
        db = x.db()
        tweets = db.execute("SELECT t.*,u.user_username,u.user_first_name,u.user_last_name,u.user_avatar,u.user_total_followers,f.*,tl.*,t2.tweet_id AS retweet_id,t2.tweet_user_fk AS retweet_user_fk,t2.tweet_created_at AS retweet_created_at,t2.tweet_message AS retweet_message,t2.tweet_image AS retweet_image,t2.tweet_total_retweets AS retweet_total_retweets,t2.tweet_total_likes AS retweet_total_likes,t2.tweet_total_replies AS retweet_total_replies,t2.tweet_role AS retweet_role,t2.tweet_since_created AS retweet_since_created,u2.user_username AS retweet_user_username,u2.user_first_name AS retweet_user_first_name,u2.user_last_name AS retweet_user_last_name,u2.user_avatar AS retweet_user_avatar,u2.user_total_followers AS retweet_user_total_followers,t3.tweet_id AS second_retweet_id,t3.tweet_user_fk AS second_retweet_user_fk,t3.tweet_created_at AS second_retweet_created_at,t3.tweet_message AS second_retweet_message,t3.tweet_image AS second_retweet_image,t3.tweet_total_retweets AS second_retweet_total_retweets,t3.tweet_total_likes AS second_retweet_total_likes,t3.tweet_total_replies AS second_retweet_total_replies,t3.tweet_role AS second_retweet_role,t3.tweet_since_created AS second_retweet_since_created,u3.user_username AS second_retweet_user_username,u3.user_first_name AS second_retweet_user_first_name,u3.user_last_name AS second_retweet_user_last_name,u3.user_avatar AS second_retweet_user_avatar,u3.user_total_followers AS second_retweet_user_total_followers,t4.tweet_id AS third_retweet_id,t4.tweet_user_fk AS third_retweet_user_fk,t4.tweet_created_at AS third_retweet_created_at,t4.tweet_message AS third_retweet_message,t4.tweet_image AS third_retweet_image,t4.tweet_total_retweets AS third_retweet_total_retweets,t4.tweet_total_likes AS third_retweet_total_likes,t4.tweet_total_replies AS third_retweet_total_replies,t4.tweet_role AS third_retweet_role,t4.tweet_since_created AS third_retweet_since_created,u4.user_username AS third_retweet_user_username,u4.user_first_name AS third_retweet_user_first_name,u4.user_last_name AS third_retweet_user_last_name,u4.user_avatar AS third_retweet_user_avatar,u4.user_total_followers AS third_retweet_user_total_followers,t5.tweet_id AS reply_id,t5.tweet_user_fk AS reply_user_fk,t5.tweet_created_at AS reply_created_at,t5.tweet_message AS reply_message,t5.tweet_image AS reply_image,t5.tweet_total_retweets AS reply_total_retweets,t5.tweet_total_likes AS reply_total_likes,t5.tweet_total_replies AS reply_total_replies,t5.tweet_role AS reply_role,t5.tweet_since_created AS reply_since_created,u5.user_username AS reply_user_username,u5.user_first_name AS reply_user_first_name,u5.user_last_name AS reply_user_last_name,u5.user_avatar AS reply_user_avatar,u5.user_total_followers AS reply_user_total_followers FROM tweets t JOIN users u ON t.tweet_user_fk=u.user_id LEFT JOIN followers f ON f.followee_id=t.tweet_user_fk AND f.follower_id=? LEFT JOIN tweets_likes tl ON tweet_like_tweet_fk=t.tweet_id AND tl.tweet_like_user_fk=? LEFT JOIN tweets_retweets trt ON trt.tweet_retweet_retweet_fk=t.tweet_id LEFT JOIN tweets t2 ON t2.tweet_id=trt.tweet_retweet_tweet_fk LEFT JOIN users u2 ON t2.tweet_user_fk=u2.user_id LEFT JOIN tweets_retweets trt2 ON trt2.tweet_retweet_retweet_fk=t2.tweet_id LEFT JOIN tweets t3 ON t3.tweet_id=trt2.tweet_retweet_tweet_fk LEFT JOIN users u3 ON u3.user_id=t3.tweet_user_fk LEFT JOIN tweets_retweets trt3 ON trt3.tweet_retweet_retweet_fk=t3.tweet_id LEFT JOIN tweets t4 ON t4.tweet_id=trt3.tweet_retweet_tweet_fk LEFT JOIN users u4 ON u4.user_id=t4.tweet_user_fk LEFT JOIN tweets_replies tr On tr.tweet_reply_reply=t.tweet_id LEFT JOIN tweets t5 ON t5.tweet_id=tr.tweet_reply_tweet_fk LEFT JOIN users u5 ON t5.tweet_user_fk=u5.user_id WHERE u.user_inactive='0' ORDER BY tweet_created_at DESC", (logged_user_id, logged_user_id)).fetchall()

        return tweets
    except Exception as e:
        print(e)
    finally:
        if "db" in locals():
            db.close()


def users(user_id):
    try:
        db = x.db()
        users = db.execute(
            "SELECT * FROM users WHERE NOT user_id=? AND user_inactive='0' LIMIT 0,3", (user_id, )).fetchall()
        return users
    except Exception as e:
        print(e)
    finally:
        if "db" in locals():
            db.close()


def sports_game():
    try:
        db = x.db()
        sports_game = db.execute(
            "SELECT * FROM sports_games_winners_losers ORDER BY winner_team_name ASC").fetchall()
        return sports_game
    except Exception as e:
        print(e)
    finally:
        if "db" in locals():
            db.close()


def is_followed_suggestion_after(logged_user):
    try:

        db = x.db()
        is_followed_suggestion_before = db.execute(
            "SELECT * FROM users u LEFT JOIN followers f  ON u.user_id = followee_id  AND f.follower_id = ? WHERE u.user_inactive='0' AND u.user_verified_at ='1' LIMIT 4", (logged_user['user_id'],)).fetchall()

        dict_list = [logged_user['user_id']]
        is_followed_suggestion_after = [
            i for i in is_followed_suggestion_before if not i['user_id'] in dict_list]
        return is_followed_suggestion_after
    except Exception as e:
        print(e)
    finally:
        if "db" in locals():
            db.close()


def is_followed_suggestion_after_profile(user, logged_user):
    try:
        db = x.db()
        is_followed_suggestion_before = db.execute(
            "SELECT * FROM users u LEFT JOIN followers f  ON u.user_id = followee_id  AND f.follower_id = ? WHERE u.user_inactive='0' AND u.user_verified_at ='1' LIMIT 4", (logged_user['user_id'],)).fetchall()
        dict_list = [logged_user['user_id'], user['user_id']]
        is_followed_suggestion_after = [
            i for i in is_followed_suggestion_before if not i['user_id'] in dict_list]
        random.shuffle(is_followed_suggestion_after)
        return is_followed_suggestion_after
    except Exception as e:
        print(e)
    finally:
        if "db" in locals():
            db.close()
