import { Response, NextFunction } from 'express';
import prisma from '../utils/db';
import { AuthRequest } from '../middlewares/authMiddleware';

export const getAllNotes = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const [notes, total] = await Promise.all([
            prisma.note.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: { email: true }
                    }
                }
            }),
            prisma.note.count(),
        ]);

        res.json({
            data: notes,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

export const deleteAnyNote = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const noteId = req.params.id as string;

        const note = await prisma.note.findUnique({
            where: { id: noteId },
        });

        if (!note) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        await prisma.note.delete({
            where: { id: noteId },
        });

        res.json({ message: 'Note deleted successfully by admin' });
    } catch (error) {
        next(error);
    }
};
