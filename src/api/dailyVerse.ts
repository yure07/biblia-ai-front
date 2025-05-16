import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: "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", 
})

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