import json
import pytest

from helpers.exceptions import UnexpectedActionException
from models.edit_event import EditEvent

EDIT_MESSAGE = json.dumps(
    {
        "action": "edit",
        "page_title": "Python (programming language)",
        "change_size": 150,
        "is_anon": False,
        "is_bot": False,
        "is_minor": True,
        "is_new": False,
        "is_unpatrolled": False,
        "user": "TestUser",
        "geo_ip": None,
    }
)

EDIT_MESSAGE_WITH_GEO = json.dumps(
    {
        "action": "edit",
        "page_title": "London",
        "change_size": 50,
        "is_anon": True,
        "is_bot": False,
        "is_minor": False,
        "is_new": False,
        "is_unpatrolled": True,
        "user": None,
        "geo_ip": {
            "city": "London",
            "country_name": "United Kingdom",
            "region_name": "England",
        },
    }
)


def test_from_wiki_message_parses_page_title():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.page_title == "Python (programming language)"


def test_from_wiki_message_parses_characters_changed():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.characters_changed == 150


def test_from_wiki_message_parses_editor_username():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.editor_username == "TestUser"


def test_from_wiki_message_parses_is_anonymous():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.is_anonymous is False


def test_from_wiki_message_parses_is_bot():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.is_bot is False


def test_from_wiki_message_parses_is_minor_edit():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.is_minor_edit is True


def test_from_wiki_message_parses_is_new_page():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.is_new_page is False


def test_from_wiki_message_parses_is_unreviewed():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.is_unreviewed is False


def test_from_wiki_message_without_geo_ip_sets_city_to_none():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.city is None


def test_from_wiki_message_without_geo_ip_sets_country_to_none():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.country is None


def test_from_wiki_message_without_geo_ip_sets_region_to_none():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.region is None


def test_from_wiki_message_with_geo_ip_parses_city():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE_WITH_GEO)
    assert event.city == "London"


def test_from_wiki_message_with_geo_ip_parses_country():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE_WITH_GEO)
    assert event.country == "United Kingdom"


def test_from_wiki_message_with_geo_ip_parses_region():
    event = EditEvent.from_wiki_message(EDIT_MESSAGE_WITH_GEO)
    assert event.region == "England"


def test_from_wiki_message_raises_for_non_edit_action():
    message = json.dumps({"action": "new", "page_title": "Test"})
    with pytest.raises(UnexpectedActionException):
        EditEvent.from_wiki_message(message)


def test_save_sets_created_timestamp(db):
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.created is None
    event.save()
    assert event.created is not None


def test_save_assigns_id(db):
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    assert event.id is None
    event.save()
    assert event.id is not None


def test_save_persists_to_database(db):
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    event.save()
    retrieved = db.session.get(EditEvent, event.id)
    assert retrieved.page_title == "Python (programming language)"


def test_save_does_not_change_id_on_subsequent_save(db):
    event = EditEvent.from_wiki_message(EDIT_MESSAGE)
    event.save()
    first_id = event.id
    event.save()
    assert event.id == first_id
