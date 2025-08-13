import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-base-200 p-4 shadow-md flex flex-col justify-between border-t-4 border-blue-400
                 hover:shadow-xl hover:scale-[1.02] transition-transform duration-200
                 w-full md:w-auto"
    >
      <div>
        <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
        <p className="text-gray-300">{note.content}</p>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => navigate(`/note/${note._id}/edit`)}

          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          title="Edit"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="text-red-500 hover:text-red-400 transition-colors duration-200"
          title="Delete"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
