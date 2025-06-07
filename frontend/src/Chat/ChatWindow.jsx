// src/Chat/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';

/**
 * ChatWindow
 *
 * A simple chat interface that allows the user to send messages and receive
 * responses from a “bot” (e.g. a chatbot API). Messages are displayed using
 * ChatBubble components in a scrollable container.
 *
 * This component assumes there is a backend endpoint at `/api/chat`
 * that accepts:
 *   POST /api/chat        { message: string }
 * and returns:
 *   { reply: string }
 *
 * Adjust the endpoint (or proxy) as needed to point to your actual chatbot service.
 */
const ChatWindow = () => {
  // State: list of messages (each with text, sender, and unique id)
  const [messages, setMessages] = useState([]);
  // State: current text in the input field
  const [inputText, setInputText] = useState('');
  // State: whether we are waiting for bot response
  const [isLoading, setIsLoading] = useState(false);
  // Reference to the bottom of the chat, to auto-scroll into view
  const bottomRef = useRef(null);

  // Whenever messages change, scroll to the bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  /**
   * sendMessageToBot
   *
   * Sends the user's message to the backend `/api/chat` endpoint and awaits
   * a bot reply. Appends both user message and bot reply into `messages`.
   */
  const sendMessageToBot = async (userText) => {
    // Append the user’s message immediately
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + '-user', text: userText, sender: 'user' },
    ]);

    setIsLoading(true);

    try {
      // POST to your backend. Make sure /api/chat is implemented in the backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botReply = data.reply || 'Sorry, I did not understand that.';

      // Append the bot’s reply
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + '-bot', text: botReply, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error while sending to bot:', error);
      // Show a generic error bubble from bot
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + '-bot-error',
          text: 'Oops! Something went wrong. Please try again later.',
          sender: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleSubmit
   *
   * Called when the user submits the form (presses “Enter” or clicks Send).
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    // Clear input field and send to bot
    setInputText('');
    sendMessageToBot(trimmed);
  };

  return (
    <div className="flex flex-col h-full bg-fortino-darkGreen rounded-lg shadow-md overflow-hidden">
      {/* Chat history area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {/* Dummy element to scroll into view */}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-t border-fortino-goldSoft p-2"
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3 py-2 mr-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className={`px-4 py-2 rounded-md font-medium transition
            ${
              isLoading || !inputText.trim()
                ? 'bg-fortino-goldSoft/60 cursor-not-allowed'
                : 'bg-fortino-goldSoft hover:bg-fortino-goldSoft/90'
            }`}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
