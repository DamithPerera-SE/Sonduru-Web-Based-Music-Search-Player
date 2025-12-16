from flask import Blueprint, request, jsonify
import requests
from config import JAMENDO_CLIENT_ID

music_bp = Blueprint("music_bp", __name__)

@music_bp.route("/search", methods=["GET"])
def search_music():
    query = request.args.get("query")
    if not query:
        return jsonify({"error": "No search query provided"}), 400

    url = f"https://api.jamendo.com/v3.0/tracks/?client_id={JAMENDO_CLIENT_ID}&format=jsonpretty&limit=10&search={query}"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from Jamendo"}), 500

    data = response.json()
    results = []
    for track in data.get("results", []):
        results.append({
            "id": track["id"],
            "name": track["name"],
            "artist_name": track["artist_name"],
            "audio": track["audio"],
            "album_name": track["album_name"]
        })

    return jsonify({"results": results})
