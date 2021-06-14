from flask_mail import Message, Mail

mail = Mail()


def send_mail(message, receiver, subject='Japotech Web system', reply_to="abionatline@gmail.com"):
    msg = Message(body=message, subject=subject,
                  recipients=[receiver],
                  reply_to=reply_to)
    mail.send(msg)

    return None
