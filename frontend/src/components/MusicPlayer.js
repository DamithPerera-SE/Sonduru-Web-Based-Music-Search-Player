import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MusicPlay() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const playlist = state?.songs || [];
  const [index, setIndex] = useState(state?.index || 0);
  const song = playlist[index];

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  /* Load & play song safely */
  useEffect(() => {
    if (!audioRef.current || !song) return;

    audioRef.current.load();
    audioRef.current.volume = volume;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [index]);

  if (!song) {
    return (
      <div className="text-center mt-5">
        <h4>No song selected</h4>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  /* Controls */
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const next = () => index < playlist.length - 1 && setIndex(index + 1);
  const prev = () => index > 0 && setIndex(index - 1);

  /* Progress handling */
  const updateProgress = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 0;
    if (isFinite(total)) {
      setProgress((current / total) * 100);
    }
  };

  const seek = (e) => {
    if (!audioRef.current || !isFinite(duration)) return;
    audioRef.current.currentTime =
      (e.target.value / 100) * duration;
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/")} style={styles.backBtn}>
          ⬅ Back
        </button>
        <span>Windows Media Player Style</span>
      </div>

      {/* Album Art */}
      <div style={styles.artBox}>
        <div style={styles.artInner}>
          🎵
        </div>
      </div>

      {/* Song Info */}
      <h3 style={{ marginTop: 20 }}>{song.name}</h3>
      <p style={{ color: "#aaa" }}>{song.artist_name}</p>

      {/* Progress */}
      <input
        type="range"
        value={progress}
        min="0"
        max="100"
        onChange={seek}
        style={styles.progress}
      />

      {/* Controls */}
      <div style={styles.controls}>
        <button onClick={prev}>⏮</button>
        <button onClick={togglePlay} style={styles.playBtn}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={next}>⏭</button>
      </div>

      {/* Volume */}
      <div style={styles.volume}>
        🔊
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            setVolume(e.target.value);
            audioRef.current.volume = e.target.value;
          }}
        />
      </div>

      {/* Audio */}
      <audio
        ref={audioRef}
        src={song.audio_url}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={() =>
          setDuration(audioRef.current.duration)
        }
        onEnded={next}
      />
    </div>
  );
}

/* 🎨 Styles (Windows Media Player feel) */
const styles = {
  wrapper: {
    height: "100vh",
    background: "radial-gradient(circle at top, #1b3a57, #000)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif"
  },
  header: {
    position: "absolute",
    top: 20,
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    opacity: 0.8
  },
  backBtn: {
    background: "none",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  artBox: {
    width: 220,
    height: 220,
    background: "#000",
    border: "3px solid #2b6cb0",
    boxShadow: "0 0 30px #2b6cb0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  artInner: {
    fontSize: 80,
    opacity: 0.3
  },
  progress: {
    width: "60%",
    marginTop: 20
  },
  controls: {
    marginTop: 20,
    display: "flex",
    gap: 20,
    fontSize: 24
  },
  playBtn: {
    fontSize: 30,
    background: "#2b6cb0",
    border: "none",
    borderRadius: "50%",
    width: 60,
    height: 60,
    color: "#fff"
  },
  volume: {
    marginTop: 20,
    display: "flex",
    gap: 10,
    alignItems: "center"
  }
};

export default MusicPlay;


