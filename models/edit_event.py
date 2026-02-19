import json
from datetime import datetime

from helpers.exceptions import UnexpectedActionException
from helpers.time_zones import datetime_to_utc
from models import db

STRING_FIELD_MAX_LENGTH = 300


class EditEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    page_title = db.Column(db.String(STRING_FIELD_MAX_LENGTH))
    characters_changed = db.Column("change_size", db.Integer)
    is_anonymous = db.Column("is_anon", db.Boolean)
    is_bot = db.Column(db.Boolean)
    is_minor_edit = db.Column("is_minor", db.Boolean)
    is_new_page = db.Column("is_new", db.Boolean)
    is_unreviewed = db.Column("is_unpatrolled", db.Boolean)
    editor_username = db.Column("user", db.String(STRING_FIELD_MAX_LENGTH))
    city = db.Column(db.String(STRING_FIELD_MAX_LENGTH))
    country = db.Column(db.String(STRING_FIELD_MAX_LENGTH))
    region = db.Column(db.String(STRING_FIELD_MAX_LENGTH))
    created = db.Column(db.DateTime(timezone=True))

    @classmethod
    def from_wiki_message(cls, raw_message):
        message = json.loads(raw_message)

        action_type = message.get("action")
        if action_type != "edit":
            raise UnexpectedActionException(expected="edit", actual=action_type)

        geo_data = message.get("geo_ip")

        return cls(
            page_title=message.get("page_title"),
            characters_changed=message.get("change_size"),
            is_anonymous=message.get("is_anon"),
            is_bot=message.get("is_bot"),
            is_new_page=message.get("is_new"),
            is_minor_edit=message.get("is_minor"),
            is_unreviewed=message.get("is_unpatrolled"),
            editor_username=message.get("user"),
            city=geo_data.get("city") if geo_data else None,
            country=geo_data.get("country_name") if geo_data else None,
            region=geo_data.get("region_name") if geo_data else None,
        )

    def save(self) -> None:
        if self.id is None:
            self.created = datetime_to_utc(datetime.now())
            db.session.add(self)
        db.session.commit()
