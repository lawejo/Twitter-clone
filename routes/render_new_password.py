from bottle import get, template
import x
##############################


@get("/new-password")
def _():

    return template("new-password", password_min_length=x.USER_PASSWORD_MIN, password_max_length=x.USER_PASSWORD_MAX)
