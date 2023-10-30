from bottle import post, request, response, delete
from datetime import datetime
import x
import uuid
import time
import os
import traceback
import psycopg2


@delete("/api-like-remove-tweet")
def _():
    try:
        db = x.db()
        cookie = request.get_cookie("user", secret=x.COOKIE_SECRET)
        if not cookie:
            raise Exception(
                "Something went wrong, please login before continuing")
        tweet_fk = request.forms.get("tweet_fk", "")
        if not tweet_fk:
            raise Exception("Something went wrong, tweet fk not found")
        tweet = db.execute(
            "SELECT * FROM tweets WHERE tweet_id =?", (tweet_fk,)).fetchone()
        if not tweet:
            raise Exception(
                "Something went wrong, we couldnt find a tweet matching that tweet_fk")
        db.execute("DELETE FROM tweets_likes WHERE tweet_like_tweet_fk = ? AND tweet_like_user_fk = ?",
                   (tweet_fk, cookie['user_id']))
        db.commit()
        return {"info": "ok", "message": "tweet successfully removed"}
    except Exception as ex:  # SOMETHING IS WRONG
        response.status = 400
        if "db" in locals():
            db.rollback()
        traceback.print_exc()
        return {"info": "error", "errortype": str(e)}
    finally:  # This will as always take place
        if "db" in locals():
            db.close()
