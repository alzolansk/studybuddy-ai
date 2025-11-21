import express from "express"; 
import { generateFlashcards } from "../services/geminiClient.js";

const router = express.Router();

router.post('/generate-flashcards', async (req, res) => {
    try {
        const { topic } = req.body;

        if(!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }

        const flashcards = await generateFlashcards(topic);
        res.json({ flashcards });
    } catch (error) {
        console.error('Erro ao gerar flashcards:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;