from bottle import get, template
##############################


@get("/forgot-password")
def _():

    return template("forgot-password")
