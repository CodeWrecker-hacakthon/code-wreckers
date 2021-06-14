"contains code for running the app"
from os import environ

from api.app import create_app
from api.helpers.mail import mail

app = create_app()
app.config.from_object(environ.get("APP_SETTINGS"))
mail.init_app(app)

if __name__ == "__main__":
    app.run()
