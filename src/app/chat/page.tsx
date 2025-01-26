/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from 'axios';
import React, { useState } from 'react';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([]);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      const res = await axios.post('/api/chat', { body: message });
      console.log("Response from API:", res.data);

      // Extracting the AI response from the 'output' field
      const aiResponse = res.data.output?.candidates?.[0]?.content?.parts?.map((part: any) => part.text).join(" ") || "No response";

      // Add user and AI response to the chat history
      setChatHistory((prev) => [
        ...prev,
        { sender: 'user', text: message },
        { sender: 'ai', text: aiResponse }
      ]);
      
      setMessage('');  // Clear the message input field
    } catch (error: any) {
      console.log("Something went wrong on frontend:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-cheer p-6 text-gray-800">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-lavender text-center mb-6">
          Share Your Feelings 💬
        </h1>
        <p className="text-center text-lg">
          Talk to our AI assistant about how you are feeling today.
        </p>
      </div>
    
      {/* Chat Box */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-4 flex flex-col gap-4 overflow-y-auto h-[400px]">
        {chatHistory.map((message, index) => (
          <div key={index}
            className={`self-${message.sender === 'user' ? 'end' : 'start'} ${
              message.sender === 'user' ? 'bg-gray-200 text-gray-800' : 'bg-lavender text-white'
            } p-4 rounded-2xl max-w-[70%]`}>
            {message.sender === 'ai' ? message.text : message.text}
          </div>
        ))}
      </div>
    
      {/* Input Area */}
      <div className="w-full max-w-3xl flex items-center gap-4">
        <input
          type="text"
          placeholder="Share your feelings..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)} // Allow sending message on Enter key press
          className="flex-1 border-2 border-lavender rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-lavender"
        />
        <button
          className="px-6 py-3 bg-lavender text-white font-semibold rounded-lg shadow hover:opacity-90"
          onClick={sendMessage} // Trigger sendMessage on button click
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
