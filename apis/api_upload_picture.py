from bottle import post, request, response
import uuid
import os
import traceback


@post("/api-upload-picture")
def _():
    try:
        upload = request.files.get("picture")
        name, ext = os.path.splitext(upload.filename)
        if ext not in ('.PNG', 'JPG', 'JPEG', 'SVG'):
            ext = ext.lower()
        if ext not in ('.png', '.jpg', '.JPG', '.jpeg', '.svg'):
            response.status = 400
            return "File extension not allowed."

        name = str(uuid.uuid4().hex)
        upload.filename = name + ext

        destination = 'images'
        upload.save(destination)

        return "picture uploaded"
    except Exception as e:
        if "db" in locals():
            db.rollback()
        traceback.print_exc()
        print(e)
# TODO: Issue is that I cant save a str to the image folder
    finally:
        pass
