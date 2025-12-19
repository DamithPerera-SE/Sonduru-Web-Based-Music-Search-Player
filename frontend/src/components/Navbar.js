import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand fw-bold" to="/">
        🎶 Sonduru
      </Link>
      <div>
        <Link className="btn btn-outline-light btn-sm me-2" to="/favorites">
          ❤️ Favorites
        </Link>
        <Link className="btn btn-outline-light btn-sm" to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
}
