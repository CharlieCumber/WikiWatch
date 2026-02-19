import pytz
from datetime import datetime

from helpers.time_zones import datetime_is_time_zone_aware, datetime_to_utc


def test_datetime_is_time_zone_aware_returns_true_for_aware_datetime():
    aware = datetime(2024, 1, 1, 12, 0, 0, tzinfo=pytz.UTC)
    assert datetime_is_time_zone_aware(aware) is True


def test_datetime_is_time_zone_aware_returns_false_for_naive_datetime():
    naive = datetime(2024, 1, 1, 12, 0, 0)
    assert datetime_is_time_zone_aware(naive) is False


def test_datetime_to_utc_with_naive_datetime_assigns_utc_timezone():
    naive = datetime(2024, 6, 15, 14, 30, 0)
    result = datetime_to_utc(naive)
    assert result.tzinfo == pytz.UTC


def test_datetime_to_utc_with_naive_datetime_preserves_time_values():
    naive = datetime(2024, 6, 15, 14, 30, 0)
    result = datetime_to_utc(naive)
    assert result.year == 2024
    assert result.month == 6
    assert result.day == 15
    assert result.hour == 14
    assert result.minute == 30


def test_datetime_to_utc_with_aware_non_utc_datetime_converts_to_utc():
    eastern = pytz.timezone("US/Eastern")
    aware_eastern = eastern.localize(datetime(2024, 6, 15, 10, 30, 0))
    result = datetime_to_utc(aware_eastern)
    assert result.tzinfo == pytz.UTC
    assert result.hour == 14


def test_datetime_to_utc_with_utc_datetime_remains_unchanged():
    utc_dt = datetime(2024, 1, 1, 12, 0, 0, tzinfo=pytz.UTC)
    result = datetime_to_utc(utc_dt)
    assert result.tzinfo == pytz.UTC
    assert result.hour == 12
