from bottle import post, request, response
from datetime import datetime
import x
import uuid
import time
import os
import traceback


@post("/api-like-tweet")
def _():
    try:
        db = x.db()
        logged_user = request.get_cookie("user", secret=x.COOKIE_SECRET)
        if not logged_user:
            raise Exception(
                "login before continuing")
        tweet_fk = request.forms.get("tweet_fk", "")
        if not tweet_fk:
            raise Exception("tweet_fk not found")
        tweet = db.execute(
            "SELECT * FROM tweets WHERE tweet_id =?", (tweet_fk,)).fetchone()
        if not tweet:
            raise Exception(
                "Tweet not found in database")

        db.execute("INSERT INTO tweets_likes VALUES(?,?)",
                   (tweet_fk, logged_user['user_id']))
        db.commit()
        return {"info": "ok", "message": "tweet successfully liked"}

    except Exception as e:  # SOMETHING IS WRONG
        response.status = 400
        if "db" in locals():
            db.rollback()
        traceback.print_exc()
        return {"info": "error", "errortype": str(e)}
    finally:  # This will as always take place
        if "db" in locals():
            db.close()
