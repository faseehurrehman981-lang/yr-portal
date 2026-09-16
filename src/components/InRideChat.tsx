"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  sender: "ME" | "THEM";
  text: string;
  time: string;
};

export default function InRideChat({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: "DRIVER" | "CUSTOMER" }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "THEM", text: role === "CUSTOMER" ? "I am on my way." : "Where exactly are you?", time: "10:45 AM" },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "ME",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate auto-reply for MVP
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "THEM",
        text: role === "CUSTOMER" ? "Okay, got it." : "I'm standing near the gate.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="bg-white w-full h-full sm:h-auto sm:max-h-[600px] sm:w-[400px] flex flex-col shadow-2xl sm:rounded-2xl overflow-hidden animate-in slide-in-from-right sm:slide-in-from-bottom-8">
        
        {/* Header */}
        <div className="bg-[#0F5C35] text-white p-4 flex justify-between items-center shadow-md z-10">
          <div>
            <h3 className="font-bold">{role === "CUSTOMER" ? "Chat with Driver" : "Chat with Customer"}</h3>
            <p className="text-green-200 text-xs">Live Support</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === "ME" ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                msg.sender === "ME" 
                  ? "bg-[#0F5C35] text-white rounded-br-none" 
                  : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
              }`}>
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 text-black px-4 py-2.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#0F5C35]/50"
          />
          <button 
            type="submit" 
            disabled={!message.trim()}
            className="bg-[#F37021] text-white p-2.5 rounded-full hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>
    </div>
  );
}
