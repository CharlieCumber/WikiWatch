from datetime import datetime, timedelta

import pandas

from models import db

TIMELINE_MINUTES = 20


def load_data():
    return pandas.read_sql_table(
        "edit_event", con=db.session.connection().engine, parse_dates=["created"]
    )


def get_current_time_whole_minutes():
    now = datetime.now()
    return datetime(
        now.year,
        now.month,
        now.day,
        now.hour,
        now.minute,
    )


def count_true_and_false(series) -> dict:
    counts = series.value_counts()
    return {
        "yes": int(counts.get(True, counts.get(1, 0))),
        "no": int(counts.get(False, counts.get(0, 0))),
    }


def get_change_delta_sample(data, start_time: datetime) -> dict | None:
    end_time = start_time + timedelta(minutes=1)

    return {
        "label": start_time.strftime("%H:%M"),
        "timestamp": start_time.timestamp(),
        "charactersChangedThisMinute": int(
            data[(data["created"] >= start_time) & (data["created"] < end_time)][
                "change_size"
            ].sum()
        ),
        "totalCharactersChanged": int(
            data[data["created"] < end_time]["change_size"].sum()
        ),
    }


def filter_populated_samples(sample: dict) -> bool:
    return sample["totalCharactersChanged"] != 0


def calculate_stats() -> dict:
    data = load_data()
    current_time = get_current_time_whole_minutes()

    return {
        "firstEdit": str(data["created"].min()),
        "lastEdit": str(data["created"].max()),
        "editCount": len(data.index),
        "uniqueUsers": len(data["user"].value_counts()),
        "topCountries": data["country"].value_counts(dropna=True).head(10).to_dict(),
        "topCities": data["city"].value_counts(dropna=True).head(10).to_dict(),
        "anonymous": count_true_and_false(data["is_anon"]),
        "bots": count_true_and_false(data["is_bot"]),
        "minorEdits": count_true_and_false(data["is_minor"]),
        "newPageEdits": count_true_and_false(data["is_new"]),
        "unreviewedEdits": count_true_and_false(data["is_unpatrolled"]),
        "changeDelta": list(
            filter(
                filter_populated_samples,
                [
                    get_change_delta_sample(
                        data, current_time + timedelta(minutes=minutes)
                    )
                    for minutes in range(-TIMELINE_MINUTES, 0)
                ],
            )
        ),
    }
