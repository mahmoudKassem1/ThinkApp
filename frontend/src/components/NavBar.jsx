import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
   <div className="navbar bg-base-100 bg-opacity-90 px-4 shadow-lg text-white border-b-4 border-blue-500">
      {/* Left Side */}
      <div className="flex-1">
        <Link
          to="/"
          className="font-bold text-xl tracking-wider hover:opacity-80 transition"
        >
          ThinkApp
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login" className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="font-medium">Hello, {user.name}</span>
            <Link to="/create" className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm">
              + Create Note
            </Link>
            <button onClick={handleLogout} className="btn bg-red-600 hover:bg-red-500 text-white btn-sm">
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="btn btn-sm border border-white text-white hover:bg-white hover:text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-base-200 rounded-lg shadow-lg p-4 flex flex-col gap-2 z-50 md:hidden text-white">
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm w-full"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm w-full"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="font-medium">Hello, {user.name}</span>
              <Link
                to="/create"
                className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm w-full"
                onClick={() => setMenuOpen(false)}
              >
                + Create Note
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="btn bg-red-600 hover:bg-red-500 text-white btn-sm w-full"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
