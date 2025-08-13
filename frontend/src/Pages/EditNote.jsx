import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setNote(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Error fetching note:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      if (res.ok) {
        navigate("/");
        toast.success("Edited successfully ✅");
      } else {
        const data = await res.json();
        console.error(data.message);
        toast.error(data.message || "Failed to edit note ❌");
      }
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow-md border-t-4 border-blue-400">
      <h1 className="text-2xl font-bold mb-4 text-white">Edit Note</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          required
        />
        <textarea
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          className="w-full p-3 bg-gray-800 text-white rounded h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Content"
          required
        />
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
