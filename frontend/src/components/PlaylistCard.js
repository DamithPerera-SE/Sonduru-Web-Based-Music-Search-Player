import React from "react";

export default function PlaylistCard({ name }) {
  return (
    <div className="card shadow-sm p-3 mb-2">
      <strong>{name}</strong>
    </div>
  );
}
