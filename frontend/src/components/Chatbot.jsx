import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hello! Welcome to our re-evaluation portal. How can I assist you today?" 
    }
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
      const response = await axios.post("/api/organization/chat", { 
        messages: newMessages 
      });
      setMessages([
        ...newMessages, 
        { role: "assistant", content: response.data.response }
      ]);
    } catch (error) {
      setMessages([
        ...newMessages, 
        { role: "assistant", content: "Sorry, I can't respond right now." }
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-['Urbanist']">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 40
            }}
            className="w-96 bg-white shadow-xl rounded-[16px] border border-[#DADADA] overflow-hidden flex flex-col mb-4"
          >
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Chat Support</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-800 p-1 rounded transition-all duration-200"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 h-96 overflow-y-auto flex flex-col space-y-4 bg-[#F7F8F9]">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-[12px] ${
                    msg.role === "user" 
                      ? "bg-black text-white" 
                      : "bg-white border border-[#DADADA]"
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={chatRef} />
            </div>

            <div className="p-4 border-t border-[#DADADA] bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-[#DADADA] rounded-[8px] focus:outline-none focus:border-black transition-all duration-200"
                />
                <button 
                  onClick={sendMessage}
                  className="px-4 py-2 bg-black text-white rounded-[8px] hover:bg-gray-800 transition-all duration-200"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-black hover:bg-gray-800 w-14 h-14 rounded-full shadow-lg 
                   flex items-center justify-center relative
                   transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={false}
          animate={isOpen ? { rotate: 180, scale: 1.2 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-white"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
          )}
        </motion.div>
        
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs
                       w-5 h-5 rounded-full flex items-center justify-center"
          >
            1
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
