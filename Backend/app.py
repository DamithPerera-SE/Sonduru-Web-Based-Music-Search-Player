from flask import Flask
from flask_cors import CORS
from routes.music_routes import music_bp
from routes.auth_routes import auth_bp
from routes.playlist_routes import playlist_bp
import sqlite3

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(music_bp, url_prefix="/api/music")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(playlist_bp, url_prefix="/api/playlist")

# Initialize Database
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    
    # Users
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
    """)
    
    # Playlists
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS playlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    """)
    
    # Playlist Songs
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

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
