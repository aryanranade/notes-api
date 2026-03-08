import { Router } from 'express';
import { getAllNotes, deleteAnyNote } from '../controllers/adminController';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);
router.use(authorizeAdmin);

router.get('/notes', getAllNotes);
router.delete('/notes/:id', deleteAnyNote);

export default router;
