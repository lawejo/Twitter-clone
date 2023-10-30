from bottle import post, response, request
import x
import traceback
# TODO: DB Rollback, when, where and in what documents?


@post("/api-verification")
def _():
    try:
        user_email = request.forms.get("user_email")
        # user_verification_key = x.validate_user_verification_key()
        user_verification_key = request.forms.user_verification_key

        db = x.db()
        user = db.execute(
            "SELECT * FROM users WHERE user_email = ? LIMIT 1", (user_email, )).fetchone()
        if not user:
            raise Exception(
                "We have no user with that email in our system, please try again.")
        if not user_verification_key == user["user_verification_key"]:
            raise Exception(
                "The user verification key is wrong, please dobbelcheck")

        db.execute(
            "UPDATE users SET user_verified_at = '1' WHERE user_id = ?", (user["user_id"], )).fetchone()
        db.commit()
        return {"info": "ok", "message": "You have successfully verified you accout. You will be redirected to the frontpage shortly."}
    except Exception as e:
        response.status = 400
        if "db" in locals():
            db.rollback()
        traceback.print_exc()
        return {"info": "error", "errortype": str(e)}
    finally:
        if "db" in locals():
            db.close()
