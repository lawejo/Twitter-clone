from bottle import put, request, response
import x
import uuid
import bcrypt
import traceback


@put("/api-reset-password-new-password")
def _():
    try:

        db = x.db()
        user_password_reset_key = request.forms.get(
            "user_password_reset_key", "")  # Why the comma and empty quotation marks

        if not user_password_reset_key:
            raise Exception(
                "Incorrect reset key, please make sure you copy the correct key from the email")
        # TODO: Include safety incase user puts in spaces on copy
        current_user = db.execute(
            "SELECT * FROM users WHERE user_reset_key = ?", (user_password_reset_key,)).fetchone()
        if not current_user:
            raise Exception("This is an invalid reset key")
        user_new_password = x.validate_new_user_password()
        user_confirm_new_password = x.validate_new_user_confirm_password()
        new_user_password_reset_key = str(uuid.uuid4()).replace("-", "")
        salt = bcrypt.gensalt()
        user_new_password_hashed = bcrypt.hashpw(
            user_confirm_new_password.encode(), salt).decode()
        db.execute("UPDATE users SET user_password = ? WHERE user_id = ?",
                   (user_new_password_hashed, current_user["user_id"])).fetchone()
        db.execute("UPDATE users SET user_reset_key = ? WHERE user_id = ?",
                   (new_user_password_reset_key, current_user["user_id"])).fetchone()

        db.commit()
        return {"info": "ok", "message": "Password change was a success."}
    except Exception as e:
        print(e)
        if "db" in locals():
            db.rollback()
        response.status = 400
        traceback.print_exc()
        return {"info": "error", "errortype": str(e)}
    finally:
        if "db" in locals():
            db.close()
