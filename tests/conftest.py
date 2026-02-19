import os
import pytest
from unittest.mock import patch

from app import create_app
from models import db as _db


@pytest.fixture
def app():
    env_overrides = {
        "SECRET_KEY": "test-secret",
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
    }
    with patch.dict(os.environ, env_overrides), patch("app.WikiListener"):
        test_app = create_app()
        test_app.config["TESTING"] = True

    with test_app.app_context():
        _db.create_all()
        yield test_app
        _db.session.remove()
        _db.drop_all()


@pytest.fixture
def db(app):
    return _db
