from bottle import get, response, template


@get("/logout")
def _():
    response.set_cookie("user", "", expires=0)
    response.status = 303
    response.set_header("Location", "/")
    return
