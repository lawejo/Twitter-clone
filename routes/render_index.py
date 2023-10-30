from bottle import get, template, response, request
import os
import sqlite3
import random
import x
import json
import bridges.login
import routes.render_login
import shared.queries as queries
import traceback
##############################


##############################

@get("/")
def render_index():

    try:

        db = x.db()
        logged_user = request.get_cookie("user", secret=x.COOKIE_SECRET)

        user_id = ""
        if logged_user:
            user_id = logged_user['user_id']

        ##############################
        trends = queries.trends()

        trends_not_logged_in = queries.trends_not_logged_in()

        tweets = queries.tweets(user_id)

        sports_game = queries.sports_game()

        is_followed_suggestion_after = queries.is_followed_suggestion_after(
            logged_user)
        response.add_header(
            "Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        response.add_header("Pragma", "no-cache")
        response.add_header("Expires", 0)

        return template("index", title="Twitter", tweets=tweets, trends=trends,  tweet_min_length=x.TWEET_MIN_LEN, tweet_max_length=x.TWEET_MAX_LEN, logged_user=logged_user, trends_not_logged_in=trends_not_logged_in, sports_game=sports_game, is_followed_suggestion_after=is_followed_suggestion_after)
    except Exception as ex:
        traceback.print_exc()
        response.status = 500
        return {"info": str(ex)}
    finally:
        if "db" in locals():
            db.close()
