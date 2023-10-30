import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
########################################


def email_forgot_password(receiver_email, user_password_reset_key):

    sender_email = "fulldemo93@gmail.com"
    receiver_email = receiver_email
    password = os.getenv('EMAIL_PASSWORD')

    message = MIMEMultipart("alternative")
    message["Subject"] = "Reset password"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message
    text = """\
            Hi,
            How are you?
            www.your_website_here.com"""
    html = f"""<!DOCTYPE html
            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:v="urn:schemas-microsoft-com:vml" lang="en">

            <head>
            <link rel="stylesheet" type="text/css" hs-webfonts="true"
            href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi">
            <title>Email template</title>
            <meta property="og:title" content="Email template">

            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

            <meta http-equiv="X-UA-Compatible" content="IE=edge">

            <meta name="viewport" content="width=device-width, initial-scale=1.0">


            </head>

            <body bgcolor="#F5F8FA"
            style="width: 100%; margin: auto 0; padding:0; font-family:Lato, sans-serif; font-size:18px; color:#33475B; word-break:break-word">

            <! First Row -->

                <table role="presentation" border="0" cellpadding="0" cellspacing="10px"
                    style="padding: 30px 30px 30px 60px;">
                    <tr>
                        <td style="vertical-align: top;
            ">
                            <h2 style="font-size: 28px; font-weight: 900;">Reset password</h2>
                            <p style="font-weight: 100;">
                                Hi there,
                            </p>
                            <p style="font-weight: 100;">
                            In order for you to reset your password please follow the link and copy the reset code:
                            </p>
                                <p
                    style="border: 1px solid lightgrey; width: fit-content; padding: 8px; border-radius: 5px; background-color: lightgray; color: black;">
                    {user_password_reset_key}</p>
                                <a href="https://lawejo.eu.pythonanywhere.com/new-password" style="cursor: pointer; font: inherit; background-color: #1DA1F2; border: none; padding: 10px; text-transform: uppercase; letter-spacing: 2px; font-weight: 900; color: white; border-radius: 5px; box-shadow: 3px 3px #0074bc; text-decoration: none;">Reset Your Password</a>


                            </a>
                        </td>
                    </tr>
                </table>


            </div>
            </body>

            </html>


            """

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
