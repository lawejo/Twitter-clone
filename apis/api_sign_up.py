from bottle import post, request, response
import x
import uuid
import bcrypt
from datetime import date
import time
import traceback
########################################
import emails.email_sign_up as email


@post("/api-sign-up")
def _():
    try:
        user_id = str(uuid.uuid4()).replace("-", "")
        user_username = x.validate_user_username()
        user_first_name = x.validate_user_first_name()
        user_last_name = x.validate_user_last_name()
        user_email = x.validate_user_email()
        user_password = x.validate_user_password()
        x.validate_user_confirm_password()
        # user_age = x.validate_user_age()
        salt = bcrypt.gensalt()
        # user_birthday = x.validate_user_birthday()
        # user_birthmonth = x.validate_user_birthmonth()
        # user_birthyear = x.validate_user_birthyear()
        user_verification_key = str(uuid.uuid4()).replace("-", "")
        user_password_reset_key = str(uuid.uuid4()).replace("-", "")
        user_inactivation_key = str(uuid.uuid4()).replace("-", "")

        user = {
            "user_id": user_id,
            "user_username": user_username,
            "user_first_name": user_first_name,
            "user_last_name": user_last_name,
            "user_total_followers": 0,
            "user_total_following": 0,
            "user_total_tweets": 0,
            "user_avatar": None,
            "user_cover_image": None,
            "user_description": "",
            "user_geo_location": "",
            "user_website": "",
            "user_created_at": int(time.time()),
            "user_birthday": 0,
            "user_birthmonth": 0,
            "user_birthyear": 0,
            "user_email": user_email,
            # Convert binary to text by decoding
            "user_password": bcrypt.hashpw(user_password.encode(), salt).decode(),
            "user_verification_key": user_verification_key,
            "user_verified_at": 0,
            "user_reset_key": user_password_reset_key,
            "user_inactive": 0,
            "user_inactivation_key": user_inactivation_key,
        }
        values = ""
        for key in user:
            values += f":{key},"
        values = values.rstrip(",")
        print(f'From API sign up after bcrypt"{user["user_password"]}"')

        db = x.db()
        total_rows_inserted = db.execute(
            f"INSERT INTO users VALUES({values})", user).rowcount
        if total_rows_inserted != 1:
            raise Exception("Please, try again")
        email.email_sign_up(user_email, user_verification_key)

########################################
        db.execute("INSERT INTO searchUsers VALUES(?,?,?,?,?)",
                   (user_id, user_username, user_first_name, user_last_name, None))
########################################

        db.commit()
        return {"info": "ok", "message": "Before you can log in, you have to verify your account via your email."}
    except Exception as e:
        print(e)
        if "db" in locals():
            db.rollback()
        traceback.print_exc()
        response.status = 400
        return {"info": "error", "errortype": str(e)}  # cast to string
    finally:
        if "db" in locals():
            db.close()
