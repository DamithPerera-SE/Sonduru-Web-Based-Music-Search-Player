from flask import Flask
from flask_cors import CORS
from routes.music_routes import music_bp
from routes.auth_routes import auth_bp
from routes.playlist_routes import playlist_bp
import sqlite3
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Register Blueprints with correct prefixes
app.register_blueprint(music_bp, url_prefix="/api/music")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(playlist_bp, url_prefix="/api/playlist")

# Simple test route to ensure server is running
@app.route("/")
def home():
    return "Flask server is running!"

# Initialize Database
def init_db():
    # Create database file if it doesn't exist
    if not os.path.exists("database.db"):
        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()

        # Users table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        """)

        # Playlists table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS playlists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            name TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
        """)

        # Playlist Songs table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS playlist_songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            playlist_id INTEGER,
            song_id TEXT,
            song_name TEXT,
            artist TEXT,
            url TEXT,
            FOREIGN KEY(playlist_id) REFERENCES playlists(id)
        )
        """)

        conn.commit()
        conn.close()
        print("Database initialized successfully!")
    else:
        print("Database already exists!")

# Run the app
if __name__ == "__main__":
    init_db()
    app.run(debug=True)
