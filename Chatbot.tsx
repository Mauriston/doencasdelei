import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'Olá, Doutor(a). Sou o assistente virtual da JRS. Posso ajudar com dúvidas sobre o enquadramento legal de doenças, critérios da Portaria 3.551 ou redação de laudos. Como posso ajudar hoje?',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    // Add current user message to history context manually since we updated state but API needs it
    history.push({ role: 'user', text: input });

    try {
      const responseText = await sendMessageToGemini(input, history);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] md:h-[600px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="bg-navy p-3 flex items-center justify-between">
        <h3 className="text-white font-heading text-sm md:text-base flex items-center">
          <Bot className="mr-2 text-gold" size={18} />
          Assistente Pericial (Gemini)
        </h3>
        <span className="text-[10px] text-green bg-white/10 px-2 py-0.5 rounded">Online</span>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`flex max-w-[85%] md:max-w-[75%] rounded-lg p-3 text-sm font-body shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-navy-light text-white rounded-tr-none' 
                  : 'bg-white text-gray-text border border-gray-200 rounded-tl-none'
              }`}
            >
              <div className="mr-2 mt-0.5 flex-shrink-0 opacity-80">
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-navy" />}
              </div>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="bg-white border border-gray-200 rounded-lg p-3 rounded-tl-none shadow-sm flex items-center">
              <Loader2 className="animate-spin text-gold mr-2" size={16} />
              <span className="text-xs text-gray-500">Analisando normas...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua dúvida sobre a legislação..."
            className="flex-grow p-3 rounded-lg bg-gray-light border-none focus:ring-2 focus:ring-navy outline-none text-sm font-body"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-full transition-colors ${
              isLoading || !input.trim() 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gold text-navy hover:bg-gold-dark'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          As respostas são geradas por IA com base na DGPM-406. Verifique sempre a norma original.
        </p>
      </div>
    </div>
  );
};