from flask_mail import Message, Mail

mail = Mail()


def send_mail(message, receiver, subject='iReporter App', reply_to="kalsmicireporter@gmail.com"):
    msg = Message(body=message, subject=subject,
                  recipients=[receiver],
                  reply_to=reply_to)
    mail.send(msg)

    return None
