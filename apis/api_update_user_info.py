from bottle import put, request, response
import x
import uuid
import bcrypt
import os
import traceback


@put("/api-update-user-info")
def _():
    try:
        db = x.db()
        logged_user = request.get_cookie("user", secret=x.COOKIE_SECRET)
        logged_user_current_avatar = logged_user['user_avatar']
        logged_user_current_cover = logged_user['user_cover_image']
        user_first_name = request.forms.get("user_firstname", "")
        user_lastname = request.forms.get("user_lastname", "")
        user_description = request.forms.get("user_description", "")
        user_geo_location = request.forms.get("user_geo_location", "")
        user_website = request.forms.get("user_website", "")

        db.execute(
            "UPDATE users SET user_first_name = ? WHERE user_id = ?", (user_first_name, logged_user['user_id'])).fetchone()
        db.execute(
            "UPDATE users SET user_last_name = ? WHERE user_id = ?", (user_lastname, logged_user['user_id'])).fetchone()
        db.execute(
            "UPDATE users SET user_description = ? WHERE user_id = ?", (user_description, logged_user['user_id'])).fetchone()
        db.execute(
            "UPDATE users SET user_geo_location = ? WHERE user_id = ?", (user_geo_location, logged_user['user_id'])).fetchone()
        db.execute(
            "UPDATE users SET user_website = ? WHERE user_id = ?", (user_website, logged_user['user_id'])).fetchone()
        user = db.execute('SELECT * FROM users WHERE user_id = ?',
                          (logged_user['user_id'],)).fetchone()

        if user:
            [user.pop(key) for key in x.keys_list]

        response.set_cookie("user", user, secret=x.COOKIE_SECRET,
                            httponly=True)
        db.commit()
        return {"info": "ok", "message": "User information successfully changed", "user_info": user}
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
