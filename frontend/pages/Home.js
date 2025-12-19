import React, { useState } from "react";
import { searchSongs } from "../services/api";
import SearchBar from "../components/SearchBar";
import SongCard from "../components/SongCard";
import Player from "../components/Player";

export default function Home() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSearch = async () => {
    const res = await searchSongs(query);
    setSongs(res.data);
  };

  const playSong = (song) => {
    audio.pause();
    const newAudio = new Audio(song.audioUrl);
    setAudio(newAudio);
    setCurrentSong(song);
    newAudio.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="container py-4">
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <div className="row">
        {songs.map((song) => (
          <div className="col-md-6 mb-3" key={song.id}>
            <SongCard song={song} onPlay={playSong} />
          </div>
        ))}
      </div>
      <Player song={currentSong} isPlaying={isPlaying} onToggle={togglePlay} />
    </div>
  );
}
