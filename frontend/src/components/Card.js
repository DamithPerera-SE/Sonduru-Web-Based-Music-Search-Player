import React from "react";

export default function SongCard({ song, onPlay }) {
  return (
    <div className="card shadow h-100 song-card">
      <div className="card-body">
        <h6 className="fw-bold">{song.title}</h6>
        <p className="text-muted">{song.artist}</p>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onPlay(song)}
        >
          ▶ Play
        </button>
      </div>
    </div>
  );
}
