import React, { useRef, useState, useEffect } from 'react';

function MusicPlayer({ song, playNext, playPrev, loop = false, shuffle = false }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [song]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setProgress((current / dur) * 100);

    setCurrentTime(formatTime(current));
    setDuration(formatTime(dur));
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

  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleEnded = () => {
    if (loop) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (shuffle) {
      playNext(Math.floor(Math.random() * 10)); // Example shuffle logic
    } else {
      playNext();
    }
  };

  if (!song) return null;

  return (
    <div className="card fixed-bottom mb-0 p-3 bg-dark text-light" style={{ borderRadius: 0 }}>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        {/* Album Art & Info */}
        <div className="d-flex align-items-center gap-3">
          <img src={song.album_image || 'https://via.placeholder.com/50'} alt={song.name} width={50} height={50} style={{ borderRadius: '5px' }}/>
          <div>
            <strong>{song.name}</strong> <br />
            <small>{song.artist_name}</small>
          </div>
        </div>

        {/* Controls */}
        <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
          <button className="btn btn-secondary btn-sm" onClick={playPrev}>⏮️</button>
          <button className="btn btn-primary btn-sm" onClick={togglePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="btn btn-secondary btn-sm" onClick={playNext}>⏭️</button>
          <button className={`btn btn-sm ${loop ? 'btn-success' : 'btn-secondary'}`} onClick={() => {}} title="Loop">🔁</button>
          <button className={`btn btn-sm ${shuffle ? 'btn-success' : 'btn-secondary'}`} onClick={() => {}} title="Shuffle">🔀</button>
        </div>

        {/* Progress & Time */}
        <div className="d-flex align-items-center gap-2 flex-grow-1 mx-3">
          <span>{currentTime}</span>
          <input type="range" min="0" max="100" value={progress} onChange={handleProgressChange} className="form-range"/>
          <span>{duration}</span>
        </div>

        {/* Volume */}
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="form-range" style={{ width: '100px' }}/>

        <audio ref={audioRef} src={song.audio} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}/>
      </div>
    </div>
  );
}

export default MusicPlayer;
