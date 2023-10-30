from bottle import post, request, response
import x
import uuid
import traceback
########################################

import emails.email_forgot_password as email


@post("/api-reset-password-email")
def _():
    try:
        db = x.db()
        user_username = request.forms.get('user_username')
        user_email = request.forms.get('user_email')

        user_username_confirm = db.execute(
            "SELECT * FROM users WHERE user_username = ?", (user_username, )).fetchone()
        if not user_username_confirm:
            raise Exception(
                "We have no user in our system with that username.")
        user_email_confirm = db.execute(
            "SELECT * FROM users WHERE user_email = ?", (user_email,)).fetchone()
        if not user_email_confirm:
            raise Exception("We have no account with that email in our system")
        current_user = db.execute(
            "SELECT * FROM users WHERE user_username = ? AND user_email = ?", (user_username, user_email)).fetchone()
        if not current_user:
            raise Exception(
                "User was not found in our system, please check username and email to make sure that they are correct")
        user_password_reset_key = str(uuid.uuid4()).replace("-", "")
        db.execute("UPDATE users SET user_reset_key = ? WHERE user_id = ?",
                   (user_password_reset_key, current_user["user_id"], )).fetchone()

# ########################################
        email.email_forgot_password(user_email, user_password_reset_key)
        db.commit()
        return {"info": "ok", "message": "User found, please check you email"}
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
