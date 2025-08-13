import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import NoteDetails from "./Pages/NoteDetails";
import EditNote from "./Pages/EditNote"; // ✅ Import EditNote page
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <div data-theme="night" className="min-h-screen">
      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Navbar */}
      <NavBar user={user} setUser={setUser} />

      {/* Routes */}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} user={user} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute user={user}>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/note/:id"
          element={
            <ProtectedRoute user={user}>
              <NoteDetails />
            </ProtectedRoute>
          }
        />
        {/* ✅ New Edit Note Route */}
        <Route
          path="/note/:id/edit"
          element={
            <ProtectedRoute user={user}>
              <EditNote />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
