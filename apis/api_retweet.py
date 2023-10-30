from bottle import post, request, response
import x
import uuid


def retweet(db, tweet_retweet_tweet_fk, tweet_retweet_retweet_fk):
    tweet_retweet_id = str(uuid.uuid4()).replace("-", "")
    db.execute("INSERT INTO tweets_retweets VALUES(?,?,?)",
               (tweet_retweet_id, tweet_retweet_tweet_fk, tweet_retweet_retweet_fk))
    return
