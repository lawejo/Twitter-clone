from bottle import get, template
import x
##############################


@get("/delete-account")
def _():

    return template("comp_init_deactivate_acc")
