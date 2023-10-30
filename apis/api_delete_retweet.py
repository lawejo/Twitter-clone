from bottle import post, request, response
import x
import uuid


def delete_retweet(db, tweet_retweet_retweet_fk):
    db.execute("DELETE FROM tweets_retweets WHERE tweet_retweet_retweet_fk =?",
               (tweet_retweet_retweet_fk,)).fetchone()
    return
