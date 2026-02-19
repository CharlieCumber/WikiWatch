from os import environ

from flask import Flask

from config.flask import FlaskConfig
from models import db, migrate
from services.wiki_listener import WikiListener
from sockets import socketio


def _is_primary_process(debug: bool) -> bool:
    in_development = debug or environ.get("FLASK_ENV") == "development"
    return not in_development or environ.get("WERKZEUG_RUN_MAIN") == "true"


def create_app():
    app = Flask(__name__)
    app.config.from_object(FlaskConfig())

    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app, cors_allowed_origins="http://localhost:3000")

    wiki_listener = WikiListener(app)

    if _is_primary_process(app.debug):
        wiki_listener.start()

    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=5000)

    return app
