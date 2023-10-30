from bottle import post, request, response
import requests
import json
import traceback
import x


@post("/api_send_message")
def _():
    try:
        db = x.db()
        user_api_key = '3f840a44c440429bb29340b887070674'
        sms_message = 'santi'
        sms_to_phone = '30665533'

        payload = {'user_api_key': user_api_key, 'sms_to_phone':
                   sms_to_phone, 'sms_message': sms_message}
        res = r = requests.post(
            'https://smses.eu.pythonanywhere.com/api-send-sms', data=payload)
        print(r)
        print(payload)
        return {"info": "ok"}

    except Exception as e:
        if "db" in locals():
            db.rollback()
        response.status = 400
        traceback.print_exc()
        print(e)
        pass
    finally:
        pass
