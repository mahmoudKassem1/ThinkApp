import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let message = "Login failed";
        try {
          const errData = await res.json();
          message = errData.message || message;
        } catch {
          // backend sent no JSON
        }
        throw new Error(message);
      }

      const data = await res.json();

      // ✅ Save the JWT token separately for protected routes
      localStorage.setItem("token", data.token);

      // ✅ Save the user info
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      toast.success("Logged in successfully!", { position: "top-right" });
      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-lg bg-base-200 w-80"
      >
        <h2 className="text-2xl mb-4 text-center text-primary font-bold">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
          required
        />
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
