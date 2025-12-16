from flask import Blueprint, request, jsonify
import sqlite3
from config import DATABASE

playlist_bp = Blueprint("playlist_bp", __name__)

# Create Playlist
@playlist_bp.route("/create", methods=["POST"])
def create_playlist():
    data = request.json
    user_id = data.get("user_id")
    name = data.get("name")

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO playlists (user_id, name) VALUES (?, ?)", (user_id, name))
    conn.commit()
    conn.close()
    return jsonify({"message": "Playlist created successfully"})

# Add Song to Playlist
@playlist_bp.route("/add_song", methods=["POST"])
def add_song():
    data = request.json
    playlist_id = data.get("playlist_id")
    song_id = data.get("song_id")
    song_name = data.get("song_name")
    artist = data.get("artist")
    url = data.get("url")

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO playlist_songs (playlist_id, song_id, song_name, artist, url) VALUES (?, ?, ?, ?, ?)",
        (playlist_id, song_id, song_name, artist, url)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Song added to playlist"})

# Get User Playlists
@playlist_bp.route("/<int:user_id>", methods=["GET"])
def get_playlists(user_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM playlists WHERE user_id = ?", (user_id,))
    playlists = cursor.fetchall()
    result = []
    for pl in playlists:
        result.append({"id": pl[0], "user_id": pl[1], "name": pl[2]})
    conn.close()
    return jsonify(result)
