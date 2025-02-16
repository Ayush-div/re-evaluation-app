import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! Welcome to our student answer sheet revaluation platform. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    console.log(newMessages);
    
    try {
      const response = await axios.post("/api/organization/chat", { messages: newMessages });
      setMessages([...newMessages, { role: "assistant", content: response.data.response }]);
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I can't respond right now." }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="w-80 bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden flex flex-col"
        >
          <div className="bg-blue-600 text-white p-3 font-bold flex justify-between">
            Chatbot
            <button onClick={() => setIsOpen(false)} className="text-white">✕</button>
          </div>
          <div className="p-3 h-64 overflow-y-auto flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`p-2 rounded-lg max-w-xs ${msg.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 self-start"}`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={chatRef} />
          </div>
          <div className="p-3 flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-l-md"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button 
              onClick={sendMessage} 
              className="bg-blue-600 text-white px-4 rounded-r-md"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;
