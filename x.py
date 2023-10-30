from bottle import request, response, template, get
import sqlite3
import pathlib
import re
import bridges.login
import uuid
import os
from datetime import date
import traceback
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)
COOKIE_SECRET = os.getenv('COOKIE_SECRET')

##############################

keys_list = ['user_password', 'user_verified_at', 'user_reset_key',
             'user_inactive', 'user_verification_key', 'user_inactivation_key']

##############################


def dict_factory(cursor, row):
    col_names = [col[0] for col in cursor.description]
    return {key: value for key, value in zip(col_names, row)}

###########################


def db():
    try:
        db = sqlite3.connect(
            str(pathlib.Path(__file__).parent.resolve())+"/twitter.db")
        db.execute("PRAGMA foreign_keys=ON")
        db.row_factory = dict_factory
        return db
    except Exception as e:
        print(e)
    finally:
        pass

##############################


def disable_cache():
    response.add_header("Cache-Control", "no-cache, no-store, must-revalidate")
    response.add_header("Pragma", "no-cache")
    response.add_header("Expires", 0)
##############################


TWEET_MIN_LEN = 1
TWEET_MAX_LEN = 280


def validate_tweet():
    error = f"message min {TWEET_MIN_LEN} max {TWEET_MAX_LEN} characters"
    if len(request.forms.message) < TWEET_MIN_LEN:
        raise Exception(error)
    if len(request.forms.message) > TWEET_MAX_LEN:
        raise Exception(error)
    return request.forms.get("message")


##############################

USER_USERNAME_MIN = 4
USER_USERNAME_MAX = 15
USER_USERNAME_REGEX = "^[a-zA-Z0-9_]*$"

# english letter only and numbers from 0 to 9


def validate_user_username():
    error = f"Your username must be {USER_USERNAME_MIN} to {USER_USERNAME_MAX} english letters or numbers from 0 to 9"
    request.forms.user_username = request.forms.user_username.strip()
    if len(request.forms.user_username) < USER_USERNAME_MIN:
        raise Exception(error)
    if len(request.forms.user_username) > USER_USERNAME_MAX:
        raise Exception(error)
    if not re.match(USER_USERNAME_REGEX, request.forms.user_username):
        raise Exception(error)
    return request.forms.user_username
##############################

##############################


USER_FIRST_NAME_MIN = 1
USER_FIRST_NAME_MAX = 50
USER_FIRST_NAME_REGEX = "^[a-zA-Z-9_]*$"

# english letter only and numbers from 0 to 9


def validate_user_first_name():
    error = f"First name must {USER_FIRST_NAME_MIN} to {USER_FIRST_NAME_MAX} letters or numbers from 0 to 9"
    request.forms.user_first_name = request.forms.user_first_name.strip()
    if len(request.forms.user_first_name) < USER_FIRST_NAME_MIN:
        raise Exception(error)
    if len(request.forms.user_first_name) > USER_FIRST_NAME_MAX:
        raise Exception(error)
    if not re.match(USER_FIRST_NAME_REGEX, request.forms.user_first_name):
        raise Exception(error)
    return request.forms.user_first_name
##############################

##############################


USER_LAST_NAME_MIN = 1
USER_LAST_NAME_MAX = 50
USER_LAST_NAME_REGEX = "^[a-zA-Z-9_]*$"

# english letter only and numbers from 0 to 9


def validate_user_last_name():
    error = f"Your last name must {USER_LAST_NAME_MIN} to {USER_LAST_NAME_MAX} letters or numbers from 0 to 9. No spaces"
    request.forms.user_last_name = request.forms.user_last_name.strip()
    if len(request.forms.user_last_name) < USER_LAST_NAME_MIN:
        raise Exception(error)
    if len(request.forms.user_last_name) > USER_LAST_NAME_MAX:
        raise Exception(error)
    if not re.match(USER_LAST_NAME_REGEX, request.forms.user_last_name):
        raise Exception(error)
    return request.forms.user_last_name

##############################
##############################


USER_PASSWORD_MIN = 6
USER_PASSWORD_MAX = 50


def validate_user_password():
    error = f"Your password has to be {USER_PASSWORD_MIN} to {USER_PASSWORD_MAX} characters"
    user_password = request.forms.get("user_password", "")
    user_password = user_password.strip()
    print(user_password)
    request.forms.user_password = request.forms.user_password.strip()
    if len(user_password) < USER_PASSWORD_MIN:
        raise Exception(error)
    if len(user_password) > USER_PASSWORD_MAX:
        raise Exception(error)
    return user_password


def validate_user_confirm_password():
    error = f"Please make sure to write the same in both password fields"
    user_password = request.forms.get("user_password", "")
    user_confirm_password = request.forms.get("user_confirm_password", "")
    user_password = user_password.strip()
    user_confirm_password = user_confirm_password.strip()
    if user_confirm_password != user_password:
        raise Exception(error)
    return user_confirm_password
##############################
##############################


def validate_new_user_password():
    error = f"user_password {USER_PASSWORD_MIN} to {USER_PASSWORD_MAX} characters"
    new_user_password = request.forms.get("new_user_password", "")
    new_user_password = new_user_password.strip()
    if len(new_user_password) < USER_PASSWORD_MIN:
        raise Exception(error)
    if len(new_user_password) > USER_PASSWORD_MAX:
        raise Exception(error)
    return new_user_password


def validate_new_user_confirm_password():
    error = f"Your new password and the confirm passwords are different. Please ensure to write the samme in both fields"
    new_user_password = request.forms.get("new_user_password", "")
    new_user_confirm_password = request.forms.get(
        "new_user_confirm_password", "")
    new_user_password = new_user_password.strip()
    new_user_confirm_password = new_user_confirm_password.strip()
    if new_user_confirm_password != new_user_password:
        raise Exception(error)
    return new_user_confirm_password
##############################
##############################


USER_EMAIL_MIN = 6
USER_EMAIL_MAX = 100
USER_EMAIL_REGEX = "^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$"


def validate_user_email():
    error = f"Your email is invalid"
    request.forms.user_email = request.forms.user_email.strip()
    if len(request.forms.user_email) < USER_EMAIL_MIN:
        raise Exception(error)

    if len(request.forms.user_email) > USER_EMAIL_MAX:
        raise Exception(error)

    if not re.match(USER_EMAIL_REGEX, request.forms.user_email):
        raise Exception(error)
    return request.forms.user_email

##############################
##############################


def validate_user_birthday():
    error = f"please fill in user_birthday"
    request.forms.user_birthday = request.forms.user_birthday.strip()
    if not (request.forms.user_birthday):
        raise Exception(error)
    return request.forms.user_birthday
##############################
##############################


def validate_user_birthmonth():
    error = f"please fill in user_birthmonth"
    request.forms.user_birthmonth = request.forms.user_birthmonth.strip()
    if not (request.forms.user_birthmonth):
        raise Exception(error)
    request.forms.user_birthmonth
##############################
##############################


def validate_user_birthyear():
    error = f"please fill in user_birthyear"
    request.forms.user_birthyear = request.forms.user_birthyear.strip()
    if not (request.forms.user_birthyear):
        raise Exception(error)
    return request.forms.user_birthyear


##############################
##############################
#  if date.today().month - int(request.forms.user_birthmonth) > 0:
#             raise Exception(f"user_birthmonth {error}")
# if int(request.forms.user_birthmonth) - date.today().month > 0:
#            raise Exception(f"user_birthmonth {error}")
def validate_user_age():
    error = f"-The age limit is thirtheen"
    if date.today().year - int(request.forms.user_birthyear) < 13:
        raise Exception(f"user_birthyear {error}")
    # Birth month, 1step, check what date.today is bigger than user_birthmonth, in order to subtract correctly
    if date.today().month > int(request.forms.user_birthmonth):
        if date.today().month - int(request.forms.user_birthmonth) > 0:
            raise Exception('Todays months is larger that user_birthmonth')
    elif int(request.forms.user_birthmonth) > date.today().month:
        if int(request.forms.user_birthmonth) - date.today().month > 0:
            raise Exception('User_birthmonth is larger than todays month')
    if date.today().day - int(request.forms.user_birthday) < 0:
        raise Exception(f"user_birthday {error}")
    return


def validate_user_verification_key():
    error = f"Verification key incorrect or missing"
    user_verification_key = request.forms.user_key
    if not user_verification_key:
        raise Exception(error)
    return user_verification_key

##############################
##############################


def validate_image(upload):
    name, ext = os.path.splitext(upload.filename)

    if ext not in ('.PNG', 'JPG', 'JPEG', 'SVG'):
        ext = ext.lower()
    if ext not in ('.png', '.jpg', '.jpeg', '.svg',):
        response.status = 400
        raise Exception("File extension not allowed.")
    name = str(uuid.uuid4().hex)
    upload_filename = upload.filename = name + ext
    upload.save(str(pathlib.Path(__file__).parent.resolve())+"/images")
    return upload_filename
##############################
##############################


def default_cover_image():
    return "bcb04249954e43cabc73216f5d69ae3a.png"

##############################
##############################
