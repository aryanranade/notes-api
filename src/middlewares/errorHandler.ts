import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    if (err.name === 'ZodError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.errors
        });
    }

    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Internal Server Error' : err.message;

    res.status(statusCode).json({ error: message });
};
