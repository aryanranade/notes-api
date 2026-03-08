import { Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../utils/db';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createNoteSchema = z.object({
    body: z.object({
        title: z.string().min(1),
        content: z.string().min(1),
    }),
});

export const updateNoteSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
    }),
});

export const createNote = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, content } = req.body;
        const userId = req.user!.id;

        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId,
            },
        });

        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
};

export const getNotes = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user!.id;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = req.query.search as string;

        const skip = (page - 1) * limit;

        const whereClause: any = { userId };
        if (search) {
            whereClause.title = { contains: search };
        }

        const [notes, total] = await Promise.all([
            prisma.note.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.note.count({ where: whereClause }),
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

export const getNoteById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user!.id;
        const noteId = req.params.id as string;

        const note = await prisma.note.findFirst({
            where: { id: noteId, userId },
        });

        if (!note) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        res.json(note);
    } catch (error) {
        next(error);
    }
};

export const updateNote = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user!.id;
        const noteId = req.params.id as string;
        const { title, content } = req.body;

        const note = await prisma.note.findFirst({
            where: { id: noteId, userId },
        });

        if (!note) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        const updatedNote = await prisma.note.update({
            where: { id: noteId },
            data: {
                title: title !== undefined ? title : note.title,
                content: content !== undefined ? content : note.content,
            },
        });

        res.json(updatedNote);
    } catch (error) {
        next(error);
    }
};

export const deleteNote = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user!.id;
        const noteId = req.params.id as string;

        const note = await prisma.note.findFirst({
            where: { id: noteId, userId },
        });

        if (!note) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        await prisma.note.delete({
            where: { id: noteId },
        });

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        next(error);
    }
};
