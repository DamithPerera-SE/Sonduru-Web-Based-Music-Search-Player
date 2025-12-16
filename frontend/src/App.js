import React from "react";
import { Routes, Route } from "react-router-dom";
import MusicSearch from "./components/MusicSearch";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sonduru (සොඳුරු)</h1>

      <Routes>
        <Route path="/" element={<MusicSearch />} />
        <Route path="/player" element={<MusicPlayer />} />
      </Routes>
    </div>
  );
}

export default App;
