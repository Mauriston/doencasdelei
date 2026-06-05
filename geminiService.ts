import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("API_KEY is not defined in the environment variables. The chatbot will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });

export const sendMessageToGemini = async (
  message: string, 
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash-lite-latest'; // Fast and capable for this task
    
    // Convert history to compatible format if needed, or just append to prompt
    // For single turn or simple chat, we can use generateContent with system instruction
    
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for factual/regulatory accuracy
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return response.text || "Não foi possível gerar uma resposta no momento. Por favor, tente novamente.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Erro ao conectar com o serviço de Inteligência Artificial. Verifique sua conexão ou a chave de API.";
  }
};