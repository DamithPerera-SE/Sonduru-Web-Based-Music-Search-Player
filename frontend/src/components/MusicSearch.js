import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';

function MusicSearch() {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/music/search?query=${query}`);
      const data = await res.json();
      setSongs(data.results);
      setCurrentIndex(-1); // Reset current song
    } catch (err) {
      console.error(err);
      alert("Error fetching songs");
    }
  };

  const playNext = () => {
    if (currentIndex < songs.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const playPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div>
      {/* Search Box */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Songs List */}
      <div className="list-group mb-5">
        {songs.map((song, index) => (
          <button
            key={song.id}
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            <div>
              <strong>{song.name}</strong> <br />
              <small>{song.artist_name} - {song.album_name}</small>
            </div>
          </button>
        ))}
      </div>

      {/* Music Player */}
      {currentIndex >= 0 && (
        <MusicPlayer
          song={songs[currentIndex]}
          playNext={playNext}
          playPrev={playPrev}
        />
      )}
    </div>
  );
}

export default MusicSearch;
