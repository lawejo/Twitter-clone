from bottle import delete, request, response
import x
import traceback


@delete("/api-remove-follow")
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
        # Check if they are already following
        confirm_follow = db.execute(
            "SELECT * FROM followers WHERE follower_id = ? AND followee_id =?", (logged_user['user_id'], user_followee)).fetchone()

        db.execute("DELETE FROM followers WHERE follower_id = ? AND followee_id =?",
                   (logged_user['user_id'], user_followee_confirm['user_id'])).fetchone()

        db.commit()
        return {"info": "ok", "message": "follow removed", "logged_user": logged_user['user_username']}
    except Exception as e:
        print(e)
        if "db" in locals():
            db.rollback()
        traceback.print_exc()
        response.status = 400
        return {"info": "error", "errortype": str(e)}
    finally:
        if "db" in locals():
            db.close()
