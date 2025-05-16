import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: "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", 
});

export const generateStudyPlan = async (message: ChatCompletionMessageParam) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Você é um assistente espiritual especializado em criar planos de estudo bíblicos. Cada plano deve seguir rigorosamente o seguinte formato:

            **Plano de Estudo Bíblico: [Título do Plano]**

            **Dia X - [Título do dia] [Livro] [Capítulo]:[Versículo]**
            Versículo do dia: "[Texto do Versículo]"
            Explicação: [Explicação do Versículo]
            Reflexão:
            - [Pergunta 1]
            - [Pergunta 2]
            Gratidão do dia: [Texto de Gratidão]

            Substitua os colchetes e seu conteúdo pelas informações apropriadas para cada dia do plano, traga os dias do plano com boas explicações e pouco longa.`
        },
        message
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message;
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};
