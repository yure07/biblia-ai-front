import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";



export const sendMessageToAPI = async (messages: ChatCompletionMessageParam[]) => {
  try {
    const systemMessage: ChatCompletionMessageParam = {
      role: "system",
      content:
        "Você é um assistente que responde exclusivamente com base nas escrituras sagradas (Bíblia). Se a pergunta for antiética, ilegal ou fora dos princípios bíblicos, você deve responder com um conselho baseado na Bíblia, sem incentivar más ações.",
    };

    // Adicionamos a mensagem de sistema ao início do histórico de mensagens
    const updatedMessages = [systemMessage, ...messages];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: updatedMessages, // Agora inclui a instrução fixa
      max_tokens: 300,
      temperature: 0.7,
    });

    return completion.choices[0].message;
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};

