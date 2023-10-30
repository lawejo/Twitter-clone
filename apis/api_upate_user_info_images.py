from bottle import put, request, response
import x
import uuid
import bcrypt
import os
import traceback
import pathlib


@put("/api-update-user-info-images")
def _():
    try:
        db = x.db()
        updates = []
        ##################################################
        logged_user = request.get_cookie("user", secret=x.COOKIE_SECRET)
        user = db.execute(
            "SELECT * FROM users WHERE user_id = ?", (logged_user['user_id'], )).fetchone()
        ##################################################
        logged_user_current_avatar = user['user_avatar']
        logged_user_current_cover = user['user_cover_image']
        ##################################################
        cover_image = request.files.get("cover_file", "")
        avatar_image = request.files.get("profile_file", "")
        ##################################################

        if 'empty' not in cover_image.filename:
            cover_image_path = x.validate_image(cover_image)
            if logged_user_current_cover:
                logged_user_current_cover_path = (str(pathlib.Path(
                    __file__).parent.parent.resolve())+"/images/"+logged_user_current_cover)
                os.remove(logged_user_current_cover_path)
            db.execute(
                "UPDATE users SET user_cover_image = ? WHERE user_id = ?", (cover_image_path, logged_user['user_id'])).fetchone()
            updates.append("cover")

        if 'empty' not in avatar_image.filename:
            avatar_image_path = x.validate_image(avatar_image)
            if logged_user_current_avatar:
                logged_user_current_avatar_path = (str(pathlib.Path(
                    __file__).parent.parent.resolve())+"/images/"+logged_user_current_avatar)
                os.remove(logged_user_current_avatar_path)
            db.execute(
                "UPDATE users SET user_avatar = ? WHERE user_id = ?", (avatar_image_path, logged_user['user_id'])).fetchone()
            updates.append("avatar")

        user_refetch = db.execute('SELECT * FROM users WHERE user_id = ?',
                                  (logged_user['user_id'],)).fetchone()

        if user_refetch:
            [user_refetch.pop(key) for key in x.keys_list]

        response.set_cookie("user", user_refetch, secret=x.COOKIE_SECRET,
                            httponly=True)

        db.commit()
        return {"info": "ok", "message": "User images updates", "user": user_refetch, "updates": updates}
    except Exception as e:
        if "db" in locals():
            db.rollback()
        traceback.print_exc()
        print(e)
        if "db" in locals():
            db.rollback()
        response.status = 400
        return {"info": "error", "errortype": str(e)}
    finally:
        if "db" in locals():
            db.close()
