import uuid


def reply(db, tweet_reply_tweet_fk, tweet_reply_reply):
    tweet_reply_id = str(uuid.uuid4()).replace("-", "")
    db.execute("INSERT INTO tweets_replies VALUES(?,?,?)",
               (tweet_reply_id, tweet_reply_tweet_fk, tweet_reply_reply))
    return
