import React, { useRef, useState, useEffect } from 'react';

function MusicPlayer({ song, playNext, playPrev }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [song]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const handleProgressChange = (e) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const vol = e.target.value;
    if (audioRef.current) audioRef.current.volume = vol;
    setVolume(vol);
  };

  return (
    <div className="card fixed-bottom mb-0 p-2">
      <div className="d-flex align-items-center justify-content-between">
        {/* Song info */}
        <div>
          <strong>{song.name}</strong> <br />
          <small>{song.artist_name}</small>
        </div>

        {/* Controls */}
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-sm btn-secondary" onClick={playPrev}>⏮️</button>
          <button className="btn btn-sm btn-primary" onClick={togglePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="btn btn-sm btn-secondary" onClick={playNext}>⏭️</button>
        </div>

        {/* Progress bar */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="form-range mx-2"
        />

        {/* Volume control */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="form-range"
          style={{ width: '100px' }}
        />

        <audio
          ref={audioRef}
          src={song.audio}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNext}
        />
      </div>
    </div>
  );
}

export default MusicPlayer;
