import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";



export const getRandomVerse = async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Você é um assistente espiritual. Gere um versículo bíblico de linguagem simples para motivação matinal.
          O formato deve ser:
          
          "\"[texto do versículo]\" - [livro] [capítulo]:[versículo]"`
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao obter versículo aleatório:", error);
    throw error;
  }
}