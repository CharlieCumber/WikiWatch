from datetime import datetime

from flask_socketio import SocketIO

from services.analytics import calculate_stats

socketio = SocketIO()


def broadcast_stats():
    socketio.emit(
        "stats", {"time": datetime.now().isoformat(), "data": calculate_stats()}
    )
