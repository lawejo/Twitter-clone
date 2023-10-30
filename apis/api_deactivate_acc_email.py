from bottle import post, request, response
import x
import uuid
import bcrypt
import traceback
########################################
import emails.email_deactive_acc as email
########################################
# TODO: IS IT A DELETE METHOD WHEN WE ACTUALLY DONT DELETE ANNYTHING


@post("/deactivate-account")
def _():
    try:
        logged_user = request.get_cookie("user", secret=x.COOKIE_SECRET)
        user_name = logged_user['user_username']
        user_email = logged_user['user_email']
        user_password = x.validate_user_password()
        db = x.db()
        user = db.execute("SELECT * FROM users WHERE user_username = ? AND user_email = ?",
                          (user_name, user_email)).fetchone()
        if not user:
            raise Exception(
                "we cannot find a user with this username and/or email, please make sure you have written it correctly")

        user_id = user["user_id"]
        user_inactivation_key = user['user_inactivation_key']
########################################
        email.email_deactive_acc(user_email, user_name, user_inactivation_key)
        return {"info": "ok", "message": "An email have been sent to you. Follow the link in order to deactivate your account"}
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
