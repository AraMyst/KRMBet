// src/Chat/ChatBubble.jsx
import React from 'react';

/**
 * ChatBubble
 *
 * Displays a single chat message (either from the user or from the bot).
 *
 * Props:
 *   - message: {
 *       id: string | number,
 *       text: string,
 *       sender: 'user' | 'bot'
 *     }
 *
 * Depending on `sender`, the bubble is aligned left (bot) or right (user),
 * using Fortino’s color palette.
 */
const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  // Choose alignment and colors based on sender
  const containerClasses = isUser
    ? 'justify-end'
    : 'justify-start';

  const bubbleClasses = isUser
    ? 'bg-fortino-goldSoft text-black self-end'
    : 'bg-fortino-darkGreen text-fortino-softWhite self-start';

  return (
    <div className={`flex ${containerClasses} mb-2`}>
      <div
        className={`${bubbleClasses} px-4 py-2 rounded-lg max-w-[75%]`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatBubble;
