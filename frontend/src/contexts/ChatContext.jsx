// src/contexts/ChatContext.jsx
import React, { createContext, useState } from 'react';

/**
 * ChatContext
 *
 * Manages chat conversation between user and bot.
 */
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);

  /**
   * sendMessage
   *
   * Sends the user's message to the backend and appends bot reply.
   */
  const sendMessage = async (text) => {
    // Add user message
    const userMsg = { id: Date.now() + '-user', text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      const botMsg = {
        id: Date.now() + '-bot',
        text: data.reply || 'No reply from bot.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);
      return botMsg;
    } catch (err) {
      console.error(err);
      const errorMsg = {
        id: Date.now() + '-bot-error',
        text: 'Error communicating with chat service.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMsg]);
      throw err;
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, isSending, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
