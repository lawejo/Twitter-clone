from bottle import post, request, response
import x
import traceback


@post("/api-follow")
def _():
    try:

        # Get the ids
        logged_user = request.get_cookie("user", secret=x.COOKIE_SECRET)
        if not logged_user:
            raise Exception("Please login before continuing")

        user_followee = request.forms.get("username", "")

        # Validate the followee id
        db = x.db()
        user_followee_confirm = db.execute(
            "SELECT * FROM users WHERE user_username = ?", (user_followee,)).fetchone()

        if not user_followee_confirm:
            raise Exception(
                "user does not exist in database, please try again")
        db.execute("INSERT INTO followers VALUES(?,?)",
                   (logged_user['user_id'], user_followee_confirm['user_id']))
        db.commit()
        return {"info": "ok", "message": "Follow succes",  "logged_user_username": logged_user['user_username']}
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
