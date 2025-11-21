import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
// Modelos válidos: gemini-1.5-flash, gemini-1.5-pro, gemini-2.0-flash-exp
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function generateFlashcards(topic) {
    const prompt = `
Crie exatamente 10 flashcards sobre o seguinte tópico: "${topic}"

Regras importantes:
- Cada flashcard deve ter uma pergunta/conceito (front) e uma resposta/explicação (back)
- As respostas devem ser claras, concisas e educativas
- Mantenha um nível de dificuldade progressivo (do mais fácil ao mais difícil)
- Use linguagem em português brasileiro
- Retorne APENAS um JSON válido no seguinte formato:

{
  "flashcards": [
    {
      "front": "Pergunta ou conceito aqui",
      "back": "Resposta ou explicação detalhada aqui"
    }
  ]
}

Não adicione nenhum texto antes ou depois do JSON.
`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Erro da API Gemini:', errorData);
            
            if (response.status === 429) {
                throw new Error('Limite de requisições atingido. Aguarde alguns minutos e tente novamente.');
            }
            throw new Error(`Gemini API Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        
        //  o texto da resposta do Gemini
        const textResponse = data.candidates[0].content.parts[0].text;
        
        const cleanJson = textResponse
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();
        
        // Parse do JSON
        const flashcardsData = JSON.parse(cleanJson);
        
        return flashcardsData.flashcards;
        
    } catch (error) {
        console.error('Erro ao gerar flashcards:', error);
        throw error;
    }
}