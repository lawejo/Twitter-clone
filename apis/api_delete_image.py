from bottle import delete, request, response
import x
import os
import traceback


@delete("/api-delete-image")
def _():

    try:
        deleted_images = ''
        logged_user = request.get_cookie("user", secret=x.COOKIE_SECRET)
        db = x.db()
        delete_cover = request.forms.get("edit_cover_img", "")
        delete_profile = request.forms.get("edit_profile_img", "")
        standard_cover_img = x.default_cover_image()

        if delete_cover and not delete_profile:
            os.remove(delete_cover)
            deleted_images = 'cover'
        if not delete_cover and delete_profile:
            os.remove(delete_profile)
            deleted_images = 'profile'
        if delete_cover and delete_profile:
            os.remove(delete_cover)
            os.remove(delete_profile)
            deleted_images = 'cover+profile'

        db.execute('UPDATE users SET user_cover_image = ? WHERE user_id = ?',
                   (standard_cover_img, logged_user['user_id'])).fetchone()
        db.commit()
        return {"info": "ok", "message": deleted_images, "cover_image": standard_cover_img}
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
