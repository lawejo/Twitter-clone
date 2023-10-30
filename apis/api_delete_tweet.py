from bottle import delete, request, response
import x
import os
import traceback
import apis.api_delete_retweet


@delete("/api-delete-tweet")
def _():
    try:

        db = x.db()
        logged_user = request.get_cookie("user", secret=x.COOKIE_SECRET)
        if not logged_user:
            raise Exception("Please login before attempting to delete")

        tweet_id = request.forms.get('tweet_id')

        if not tweet_id:
            raise Exception('Missing tweet_id')

        confirm_tweet_id = db.execute(
            'SELECT * FROM tweets WHERE tweet_id = ?', (tweet_id,)).fetchone()
        if not confirm_tweet_id:
            raise Exception('This tweet does not exist in the database')
        # Only delete photo if it is from the original tweet #

        if confirm_tweet_id["tweet_image"] and confirm_tweet_id['tweet_role'] == 1:
            tweet_img_path = 'images/'+confirm_tweet_id['tweet_image']
            os.remove(tweet_img_path)

        retweet_messages = db.execute(
            'SELECT t2.tweet_id, t2.tweet_message FROM tweets t JOIN tweets_retweets trt ON trt.tweet_retweet_tweet_fk=t.tweet_id LEFT JOIN tweets t2 ON t2.tweet_id=trt.tweet_retweet_retweet_fk WHERE trt.tweet_retweet_tweet_fk=?', (confirm_tweet_id["tweet_id"],)).fetchall()
        # Checks for if a tweet has been retweeted w/o quote - if YES they are deleted as well
        for messages in retweet_messages:
            if messages["tweet_message"] == '':
                db.execute(
                    "DELETE FROM tweets WHERE tweet_id = ?", (messages["tweet_id"], )).fetchone()

        confirm_tweet_user_conn = db.execute('SELECT * FROM tweets WHERE tweet_id = ? AND tweet_user_fk = ?',
                                             (confirm_tweet_id["tweet_id"], logged_user['user_id'])).fetchone()
        if not confirm_tweet_user_conn:
            raise Exception('You are not allowed to delete this tweet')
        db.execute(
            "DELETE FROM tweets WHERE tweet_id = ? AND tweet_user_fk = ?", (confirm_tweet_id["tweet_id"], logged_user['user_id'])).fetchone()
        apis.api_delete_retweet.delete_retweet(
            db, confirm_tweet_id["tweet_id"])

        db.commit()
        return {"info": "ok", "message": "tweet deleted"}
    except Exception as e:
        print(e)
        traceback.print_exc()
        if "db" in locals():
            db.rollback()
        response.status = 400
        return {"info": "error", "errortype": str(e)}
    finally:
        if "db" in locals():
            db.close()
