import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MusicSearch() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/music/search?query=${query}`
      );
      const data = await res.json();
      setSongs(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const playSong = (index) => {
    navigate("/player", {
      state: {
        songs,
        index
      }
    });
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="input-group mb-4">
        <input
          className="form-control"
          placeholder="Search song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p className="text-center">Searching...</p>}

      {/* Song List */}
      <div className="list-group">
        {songs.map((song, index) => (
          <button
            key={song.id || index}
            className="list-group-item list-group-item-action"
            onClick={() => playSong(index)}
          >
            <strong>{song.name}</strong>
            <br />
            <small>
              {song.artist_name} – {song.album_name}
            </small>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MusicSearch;
