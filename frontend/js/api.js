const API_BASE_URL = 'http://localhost:3000/api';

export async function generateFlashcardsFromAPI(topic) {
    try {
        const response = await fetch(`${API_BASE_URL}/gemini/generate-flashcards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic })
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        return data.flashcards;
    } catch (error) {
        console.error('Erro ao gerar flashcards:', error);
        throw error;
    }
}