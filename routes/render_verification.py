from bottle import get, template
##############################


@get("/verification")
def _():

    return template("verification")
