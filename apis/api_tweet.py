
from bottle import post, request, response
from datetime import datetime
import x
import uuid
import time
import os
import apis.api_retweet
import apis.api_reply
import traceback


@post("/tweet")
def _():
    try:
        db = x.db()
        logged_user = request.get_cookie("user", secret=x.COOKIE_SECRET)
        ######################################
        upload = request.files.get("file", "")
        message_form = request.forms.get("message", "")
        retweet_fk = request.forms.get('retweet_fk', '')
        reply_fk = request.forms.get('reply_fk', '')
        image_filename = upload
        message = message_form
        tweet_role = ''
        retweet_status = []
        new_tweet_id = str(uuid.uuid4().hex)
        second_retweet = None
        third_retweet = None
        ######################################
        if not retweet_fk and not reply_fk:

            tweet_role = 1
            if not message_form and not upload:
                raise Exception(
                    'A message or image is needed before you can tweet')
            elif message_form and 'empty' in upload.filename:
                message = x.validate_tweet()
                image_filename = ""
            elif not message_form and upload.filename:
                message = ''
                image_filename = x.validate_image(upload)

            elif message_form and upload.filename:
                message = x.validate_tweet()
                image_filename = x.validate_image(upload)
        if retweet_fk:
            tweet_role = 2
            retweet_status = apis.api_retweet.retweet(
                db, retweet_fk,  new_tweet_id)
        if reply_fk:

            tweet_role = 3
            reply_status = apis.api_reply.reply(db, reply_fk, new_tweet_id)

        tweet_id = new_tweet_id
        tweet_user_fk = logged_user['user_id']
        tweet_create_at = int(time.time())
        tweet_since_created = 0
        tweet_message = message
        tweet_image = image_filename
        tweet_updated_at = 0
        tweet_total_retweets = 0
        tweet_total_likes = 0
        tweet_total_views = 0
        tweet_total_replies = 0
        tweet_verified = ""
        tweet_role = tweet_role
        db.execute("INSERT INTO tweets VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", (tweet_id, tweet_user_fk, tweet_create_at, tweet_since_created, tweet_message, tweet_image,
                   tweet_updated_at, tweet_total_retweets, tweet_total_likes, tweet_total_views, tweet_total_replies, tweet_verified, tweet_role))

        response.set_header("Location", "/")
        # datetime_obj = datetime.fromtimestamp(tweet_create_at)
        user = db.execute(
            "SELECT * FROM users WHERE user_id = ? LIMIT 1", (tweet_user_fk,)).fetchone()
        tweet = db.execute(
            "SELECT * FROM tweets WHERE tweet_user_fk = ? ORDER BY tweet_created_at DESC LIMIT 1;", (tweet_user_fk,)).fetchone()
        retweet = db.execute(
            "SELECT t.*, u.user_username, u.user_first_name, u.user_last_name, u.user_avatar FROM tweets t JOIN tweets_retweets tr ON t.tweet_id=tr.tweet_retweet_tweet_fk JOIN users u ON u.user_id=t.tweet_user_fk WHERE tweet_retweet_tweet_fk = ?", (retweet_fk,)).fetchone()

        if retweet:
            retweet_role = retweet['tweet_role']
            if retweet_role == '2':
                second_retweet = db.execute(
                    "SELECT u.user_username, u.user_first_name, u.user_last_name, u.user_avatar,u.user_total_followers, t.tweet_id, t.tweet_message, t.tweet_since_created, t.tweet_image, t2.tweet_id AS retweet_tweet_id, t2.tweet_message AS retweet_tweet_message FROM tweets_retweets trt JOIN tweets t ON t.tweet_id=trt.tweet_retweet_retweet_fk LEFT JOIN tweets t2 ON t2.tweet_id=trt.tweet_retweet_tweet_fk LEFT JOIN users u ON u.user_id=t2.tweet_user_fk WHERE trt.tweet_retweet_retweet_fk=?", (retweet['tweet_id'],)).fetchone()

                third_retweet = db.execute(
                    "SELECT u.user_username FROM tweets_retweets trt JOIN tweets t ON t.tweet_id=trt.tweet_retweet_retweet_fk LEFT JOIN tweets t2 ON t2.tweet_id=trt.tweet_retweet_tweet_fk LEFT JOIN users u ON u.user_id=t2.tweet_user_fk WHERE trt.tweet_retweet_retweet_fk=?", (second_retweet['retweet_tweet_id'],)).fetchone()

        db.commit()
        return {"info": "ok", "message": "Tweeting succes", "user": user, "tweet": tweet, "retweet": retweet, "second_retweet": second_retweet, "third_retweet": third_retweet}

    except Exception as e:  # SOMETHING IS WRONG
        response.status = 400
        if "db" in locals():
            db.rollback()
        traceback.print_exc()
        return {"info": "error", "errortype": str(e)}
    finally:  # This will as always take place
        if "db" in locals():
            db.close()
