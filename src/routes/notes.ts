import { Router } from 'express';
import { createNote, getNotes, getNoteById, updateNote, deleteNote, createNoteSchema, updateNoteSchema } from '../controllers/notesController';
import { validateRequest } from '../middlewares/validateRequest';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.post('/', validateRequest(createNoteSchema), createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', validateRequest(updateNoteSchema), updateNote);
router.delete('/:id', deleteNote);

export default router;
