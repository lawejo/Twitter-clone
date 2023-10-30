from bottle import get, response, template, request
import x
import shared.queries as queries
import traceback


@get("/delete-account/<user_inactivation_key>")
def _(user_inactivation_key):
    try:

        db = x.db()
        user = db.execute(
            "SELECT * FROM users WHERE user_inactivation_key = ?", (user_inactivation_key,)).fetchone()

        if not user:
            raise Exception("inactivation key invalid")

        db.execute(
            "UPDATE users SET user_inactive = '1' WHERE user_inactivation_key = ?", (user_inactivation_key, )).fetchone()
        user_inactive = db.execute(
            "SELECT * FROM users WHERE user_id = ?", (user['user_id'], )).fetchone()
        print(user_inactive)
        print("FROM DEACTIVATE ACC INACTIVATE 1")
        response.add_header(
            "Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        response.add_header("Pragma", "no-cache")
        response.add_header("Expires", 0)
        response.delete_cookie("user", secret=x.COOKIE_SECRET)
        db.commit()
        return template("account_deactivated")
    except Exception as e:
        if "db" in locals():
            db.rollback()
        response.status = 400
        traceback.print_exc()
        return {"info": "error", "errortype": str(e)}
    finally:
        if "db" in locals():
            db.close()
