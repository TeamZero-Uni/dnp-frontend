import { useState, useRef, useEffect } from "react";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend } from "react-icons/io5";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you?", sender: "bot" },
  ]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle form submission (works for both Enter key and button click)
  const handleSend = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: trimmedInput, sender: "user" },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 cursor-pointer text-white p-4 rounded-full transition-transform duration-200 hover:scale-110 active:translate-y-1 active:scale-100 bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-800 animate-chat-pulse"
          aria-label="Open chat"
        >
          <style>{`
            @keyframes chat-pulse {
              0%, 100% { transform: perspective(200px) rotateX(10deg) scale(1); }
              50% { transform: perspective(200px) rotateX(10deg) scale(1.12); }
            }
            .animate-chat-pulse {
              animation: chat-pulse 3s ease-in-out infinite;
            }
          `}</style>
          <IoChatbubbleEllipsesOutline size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px]">
          <div className="bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-slate-200 h-[480px]">
            
            {/* Header */}
            <div className="bg-indigo-600 text-white px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base">💬 Support Chat</h3>
                <p className="text-xs text-indigo-200">We typically reply instantly</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-indigo-700 p-1.5 rounded-xl transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <IoClose size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[80%] ${msg.sender === "user" ? "ml-auto" : ""}`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-sm shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-slate-200 bg-white flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white p-2.5 rounded-xl transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <IoSend size={18} />
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}