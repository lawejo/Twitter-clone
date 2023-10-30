from bottle import default_app, get, post, request, response, run, static_file
import git
import routes.render_new_password
import routes.render_forgot_password
import routes.render_verification
import routes.render_sign_up
import routes.render_index
import routes.render_profile
import routes.render_login
import routes.render_logout
import bridges.login
import apis.api_delete_tweet
import apis.api_like_remove_tweet
import apis.api_like_tweet
import apis.api_upload_picture
import apis.api_search
import apis.api_deactivate_acc_set
import apis.api_deactivate_acc_email
import apis.api_new_password
import apis.api_forgot_password
import apis.api_verification
import apis.api_tweet
import apis.api_sign_up
import apis.api_remove_follow
import apis.api_follow
import apis.api_send_message
import apis.api_delete_image
import apis.api_update_user_info
import apis.api_upate_user_info_images
import apis.api_retweet
import apis.api_tweet_since_created
import os

##############################
GIT_HOOK_PASSWORD = os.getenv('GIT_HOOK_PASSWORD')
##############################


@get("/js/<filename>")
def _(filename):
    return static_file(filename, "js")
##############################


@post('/'+GIT_HOOK_PASSWORD)
def git_update():
    repo = git.Repo('./mysite')
    origin = repo.remotes.origin
    repo.create_head('main', origin.refs.main).set_tracking_branch(
        origin.refs.main).checkout()
    origin.pull()
    return ""
##############################


@get("/images/<filename:re:.*\.jpg>")
def _(filename):
    return static_file(filename, root="./images")


@get("/images/<filename:re:.*\.JPG>")
def _(filename):
    return static_file(filename, root="./images")


@get("/images/<filename:re:.*\.jpeg>")
def _(filename):
    return static_file(filename, root="./images")

##############################


@get("/images/<filename:re:.*\.png>")
def _(filename):
    return static_file(filename, root="./images")

#############################

##############################


@get("/images/<filename:re:.*\.png>")
def _(filename):
    return static_file(filename, root="./images")

#############################
#


@get("/output.css")
def _():
    return static_file("output.css", root=".")


##############################


##############################
try:
    import production
    application = default_app()
except Exception as ex:
    print("Running local server")
    run(host="127.0.0.1", port=2, debug=True, reloader=True, )
