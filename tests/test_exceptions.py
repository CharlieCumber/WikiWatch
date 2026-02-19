import pytest

from helpers.exceptions import UnexpectedActionException


def test_unexpected_action_exception_is_an_exception():
    exc = UnexpectedActionException(expected="edit", actual="new")
    assert isinstance(exc, Exception)


def test_unexpected_action_exception_message_includes_expected_action():
    exc = UnexpectedActionException(expected="edit", actual="new")
    assert "edit" in exc.message


def test_unexpected_action_exception_message_includes_actual_action():
    exc = UnexpectedActionException(expected="edit", actual="new")
    assert "new" in exc.message


def test_unexpected_action_exception_can_be_raised_and_caught():
    with pytest.raises(UnexpectedActionException):
        raise UnexpectedActionException(expected="edit", actual="delete")
