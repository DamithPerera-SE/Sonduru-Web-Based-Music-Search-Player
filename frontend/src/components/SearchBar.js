import React from "react";

export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="input-group mb-4 shadow">
      <input
        className="form-control"
        placeholder="Search songs, artists, albums..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-dark" onClick={onSearch}>
        🔍 Search
      </button>
    </div>
  );
}
