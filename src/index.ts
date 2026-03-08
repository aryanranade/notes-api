import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth';
import notesRoutes from './routes/notes';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger Documentation
try {
    const swaggerDocument = YAML.load(path.join(process.cwd(), 'swagger.yaml'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
    console.log('Swagger docs couldn\'t be loaded', error);
}

// Global Routes Registration
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/admin', adminRoutes);

// Healthcheck
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// App-level error handler (should be defined last)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
