import Note from "../model/Note.js";
import mongoose from "mongoose";
// GET all notes for the logged-in user
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// CREATE a new note
export async function createNote(req, res) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Please add title and content" });
        }

        const note = await Note.create({
            title,
            content,
            user: req.user._id
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// UPDATE a note
export async function UpdateNote(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Make sure the note belongs to the logged-in user
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// DELETE a note
export async function deleteNote(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Make sure the note belongs to the logged-in user
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await note.deleteOne();
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
