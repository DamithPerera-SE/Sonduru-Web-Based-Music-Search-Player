import React, { useState } from 'react';
import { searchMusic } from '../api';
import MusicPlayer from './MusicPlayer';

function MusicSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleSearch = async () => {
    if(!query) return;
    const response = await searchMusic(query);
    setResults(response.data.results);
  };

  return (
    <div>
      <div className="mb-3">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          className="form-control" 
          placeholder="Search for songs..."
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>Search</button>
      </div>

      {results.length > 0 && (
        <div>
          <h5>Search Results:</h5>
          <ul className="list-group">
            {results.map((song) => (
              <li key={song.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  {song.name} - {song.artist_name}
                </div>
                <button className="btn btn-sm btn-success" onClick={() => setCurrentTrack(song.audio)}>
                  Play
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentTrack && <MusicPlayer audioSrc={currentTrack} />}
    </div>
  );
}

export default MusicSearch;
