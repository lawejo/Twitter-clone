from bottle import post, request, response
import time
import x
import bcrypt


@post("/login")
def _():
    try:
      # if user is logged, go to the profile page of that user
        # user = request.get_cookie("user", secret=x.COOKIE_SECRET)
        # if user:
        #     return {"info": "success login", "user_name": user["user_username"]}
        db = x.db()
        user_email_username = request.forms.get('user_email_username')
        user = ''
        if "@" in user_email_username:
            user = db.execute(
                "SELECT * FROM users WHERE user_email = ? LIMIT 1", (user_email_username,)).fetchone()
        else:
            user = db.execute(
                "SELECT * FROM users WHERE user_username = ? LIMIT 1", (user_email_username,)).fetchone()
        user_password = request.forms.get('user_password')

        if not user:
            raise Exception(400, "Wrong email or Username")

        if not bcrypt.checkpw(user_password.encode(), user["user_password"].encode()):
            raise Exception(400, "Invalid credentials")

        if user["user_verified_at"] == "0":
            raise Exception(
                "Your account has yet to be verified, please follow the link to completed your account.")

        if user["user_inactive"] == "1":
            print(user)
            raise Exception(
                "It appears you deleted your account. Contact support to have your account retrieved.")
        try:

            import production
            is_cookie_https = True
        except:
            is_cookie_https = False
        response.set_cookie("user", user, secret=x.COOKIE_SECRET,
                            httponly=True)
        return {"info": "ok", "message": "You will be redirected shortly."}
    except Exception as e:
        print(e)
        try:
            response.status = e.args[0]
            return {"info": "error", "errortype": e.args[1]}
        except:
            response.status = 500
            return {"info": "error", "errortype": str(e)}
    finally:
        if "db" in locals():
            db.close()
