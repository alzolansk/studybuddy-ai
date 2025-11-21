import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import geminiRoutes from './routes/gemini.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/gemini', geminiRoutes);

app.get('/health', (req, res) => {
    res.json('Server is healthy');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});