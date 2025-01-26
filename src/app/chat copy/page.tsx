/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import axios from 'axios';
import React, { useState } from 'react';

const ChatPage = () => {
   
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([]);

const sendMessage = async(e:any) =>{
  e.preventDefault();

  if (!message.trim()) return;

 try {
  const res = await axios.post('/api/chat', {message})
  console.log(res.data);
  setChatHistory((prev) => [...prev, 
    { sender: 'user', text: message }, 
    { sender: 'ai', text: res.data.output }]);
  setMessage('')
 } catch (error:any) {
  console.log("something went wrong1:"+error);
  
 }
  
}

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-cheer p-6 text-gray-800">

      {/* Header */}
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-lavender text-center mb-6">
          Share Your Feelings 💬
        </h1>
        <p className="text-center text-lg">
          Talk to our AI assistant about how you are feeling today.
        </p>
      </div>

      {/* Chat Box */}
      {chatHistory.map((chat, index) => (
      <div
        key={index}
        className={`self-${chat.sender === "user" ? "end" : "start"} ${
          chat.sender === "user" ? "bg-gray-200 text-gray-800" : "bg-lavender text-white"
        } p-4 rounded-2xl max-w-[70%]`}
      >
        {chat.text}
      </div>
       ))}


      {/* Input Area */}
      <div className="w-full max-w-3xl flex items-center gap-4">
        <input
          type="text"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Share your feelings..."
          className="flex-1 border-2 border-lavender rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-lavender"
        />
        <button className="px-6 py-3 bg-lavender text-white font-semibold rounded-lg shadow hover:opacity-90">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;


// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client"
// import axios from 'axios';
// import React, { useState, useRef, useEffect } from 'react';

// const ChatPage = () => {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState<any[]>([]);

//   const sendMsg = async (e: any) => {
//     e.preventDefault();

//     // Add the user message to chat history
//     setChatHistory([...chatHistory, { sender: 'user', text: message }]);

//     try {
//       // Send the message to the backend API
//       const res = await axios.post('/api/chat', { message });
//       console.log(res.data);

//       // Add the AI response to chat history
//       setChatHistory([
//         ...chatHistory,
//         { sender: 'user', text: message },
//         { sender: 'ai', text: res.data.reply },
//       ]);
      
//       // Clear the message input field
//       setMessage('');

//     } catch (error: any) {
//       console.log('Something went wrong:', error);
//     }
//   };

//   // Auto-scroll to the newest message
//   const chatBoxRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     chatBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
//   }, [chatHistory]);

//   return (
//     <div className="min-h-screen flex flex-col justify-between items-center bg-cheer p-6 text-gray-800">
//       <div className="w-full max-w-3xl">
//         <h1 className="text-4xl font-bold text-lavender text-center mb-6">
//           Share Your Feelings 💬
//         </h1>
//         <p className="text-center text-lg">
//           Talk to our AI assistant about how you are feeling today.
//         </p>
//       </div>

//       {/* Chat Box */}
//       <div
//         className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-4 flex flex-col gap-4 overflow-y-auto h-[400px]"
//         ref={chatBoxRef}
//       >
//         {chatHistory.map((message, index) => (
//           <div
//             key={index}
//             className={`self-${message.sender === 'user' ? 'end' : 'start'} ${
//               message.sender === 'user' ? 'bg-gray-200 text-gray-800' : 'bg-lavender text-white'
//             } p-4 rounded-2xl max-w-[70%]`}
//           >
//             {message.text}
//           </div>
//         ))}
//       </div>

//       {/* Input Area */}
//       <div className="w-full max-w-3xl flex items-center gap-4">
//         <input
//           type="text"
//           placeholder="Share your feelings..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 border-2 border-lavender rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-lavender"
//         />
//         <button
//           className="px-6 py-3 bg-lavender text-white font-semibold rounded-lg shadow hover:opacity-90"
//           onClick={sendMsg}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
