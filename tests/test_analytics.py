from datetime import datetime

import pandas

from services.analytics import (
    count_true_and_false,
    filter_populated_samples,
    get_change_delta_sample,
    get_current_time_whole_minutes,
)


def test_get_current_time_whole_minutes_zeroes_seconds():
    result = get_current_time_whole_minutes()
    assert result.second == 0


def test_get_current_time_whole_minutes_zeroes_microseconds():
    result = get_current_time_whole_minutes()
    assert result.microsecond == 0


def test_get_current_time_whole_minutes_matches_current_minute():
    before = datetime.now().replace(second=0, microsecond=0)
    result = get_current_time_whole_minutes()
    after = datetime.now().replace(second=0, microsecond=0)
    assert before <= result <= after


def test_count_true_and_false_counts_true_values():
    series = pandas.Series([True, True, False, True])
    result = count_true_and_false(series)
    assert result["yes"] == 3


def test_count_true_and_false_counts_false_values():
    series = pandas.Series([True, False, False])
    result = count_true_and_false(series)
    assert result["no"] == 2


def test_count_true_and_false_with_integer_values():
    series = pandas.Series([1, 1, 0, 1])
    result = count_true_and_false(series)
    assert result["yes"] == 3
    assert result["no"] == 1


def test_count_true_and_false_with_empty_series():
    series = pandas.Series([], dtype=bool)
    result = count_true_and_false(series)
    assert result["yes"] == 0
    assert result["no"] == 0


def test_get_change_delta_sample_label_uses_hour_and_minute():
    data = pandas.DataFrame({"created": [], "change_size": []})
    start = datetime(2024, 6, 15, 14, 30, 0)
    result = get_change_delta_sample(data, start)
    assert result["label"] == "14:30"


def test_get_change_delta_sample_timestamp_matches_start_time():
    data = pandas.DataFrame({"created": [], "change_size": []})
    start = datetime(2024, 6, 15, 14, 30, 0)
    result = get_change_delta_sample(data, start)
    assert result["timestamp"] == start.timestamp()


def test_get_change_delta_sample_sums_characters_changed_within_window():
    start = datetime(2024, 6, 15, 14, 30, 0)
    mid_window = datetime(2024, 6, 15, 14, 30, 45)
    after_window = datetime(2024, 6, 15, 14, 31, 0)
    data = pandas.DataFrame(
        {
            "created": [start, mid_window, after_window],
            "change_size": [100, 50, 200],
        }
    )
    result = get_change_delta_sample(data, start)
    assert result["charactersChangedThisMinute"] == 150


def test_get_change_delta_sample_excludes_edits_after_window_from_total():
    start = datetime(2024, 6, 15, 14, 30, 0)
    after_window = datetime(2024, 6, 15, 14, 31, 0)
    data = pandas.DataFrame(
        {
            "created": [start, after_window],
            "change_size": [100, 999],
        }
    )
    result = get_change_delta_sample(data, start)
    assert result["totalCharactersChanged"] == 100


def test_get_change_delta_sample_total_includes_edits_before_window():
    start = datetime(2024, 6, 15, 14, 30, 0)
    before_window = datetime(2024, 6, 15, 14, 0, 0)
    data = pandas.DataFrame(
        {
            "created": [before_window, start],
            "change_size": [300, 100],
        }
    )
    result = get_change_delta_sample(data, start)
    assert result["totalCharactersChanged"] == 400


def test_filter_populated_samples_returns_true_for_nonzero_total():
    sample = {"totalCharactersChanged": 100}
    assert filter_populated_samples(sample) is True


def test_filter_populated_samples_returns_false_for_zero_total():
    sample = {"totalCharactersChanged": 0}
    assert filter_populated_samples(sample) is False
