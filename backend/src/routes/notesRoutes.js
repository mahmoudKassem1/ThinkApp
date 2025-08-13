import express from 'express';
import {
  getAllNotes,
  createNote,
  UpdateNote,
  deleteNote,
} from '../controllers/notesController.js';
import { protect } from '../middleware/authMiddleware.js';
import Note from '../model/Note.js';
const router = express.Router();

router.get('/', protect, getAllNotes);
router.post('/', protect, createNote);

// ✅ Get note by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', protect, UpdateNote);
router.delete('/:id', protect, deleteNote);

export default router;
