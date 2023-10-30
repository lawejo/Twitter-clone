import traceback
from bottle import put,  response
import x
from datetime import datetime
import time


@put("/update-since-tweeted")
def _():
    try:
        current_time = int(time.time())
        db = x.db()
        all_tweets = db.execute(
            "SELECT tweet_id,tweet_created_at, tweet_since_created FROM tweets").fetchall()

        for tweet in all_tweets:
            time_since_tweet_created = ""
            time_since_tweet_seconds = current_time - \
                int(tweet['tweet_created_at'])
            if time_since_tweet_seconds < 60:
                time_since_tweet_created = f"{int(time_since_tweet_seconds)}s"

            elif time_since_tweet_seconds > 60 and time_since_tweet_seconds < 3600:
                time_in_minutes = time_since_tweet_seconds / 60
                time_since_tweet_created = f"{int(time_in_minutes)}m"

            elif time_since_tweet_seconds > 3600 and time_since_tweet_seconds < 86400:
                time_in_hours = time_since_tweet_seconds/60/60
                time_since_tweet_created = f"{int(time_in_hours)}h"

            elif time_since_tweet_seconds > 86400:
                datetime_obj = datetime.fromtimestamp(
                    int(tweet['tweet_created_at']))
                time_since_tweet_created = datetime_str = datetime_obj.strftime(
                    "%b %d")
            db.execute('UPDATE tweets SET tweet_since_created = ? WHERE tweet_id = ?',
                       (time_since_tweet_created, tweet['tweet_id'])).fetchone()

            db.commit()
        return {"info": "ok", "message": "Tweet time 'since created' has been updated"}

    except Exception as e:  # SOMETHING IS WRnONG
        response.status = 400
        if "db" in locals():
            db.rollback()
        traceback.print_exc()
        return {"info": "error", "errortype": str(e)}
    finally:  # This will as always take place
        if "db" in locals():
            db.close()
