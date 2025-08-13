import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get the JWT token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create a note!", { position: "top-right" });
      setLoading(false);
      return navigate("/login");
    }

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        toast.success("Note created successfully! 📝", { position: "top-right" });
        navigate("/");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to create note", { position: "top-right" });
      }
    } catch (err) {
      console.error("Error creating note:", err);
      toast.error("Something went wrong!", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100">
      <div className="card w-full max-w-lg shadow-xl bg-base-200">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-primary text-center">
            Create Note
          </h2>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Write your note here..."
              className="textarea textarea-bordered w-full min-h-[150px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="flex justify-between">
              <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`} disabled={loading}>
                Save
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary" disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
