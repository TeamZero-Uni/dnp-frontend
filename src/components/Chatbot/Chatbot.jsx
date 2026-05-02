import { useEffect, useMemo, useRef, useState } from "react";
import { 
  IoChatbubbleEllipsesOutline, 
  IoClose,
  IoPrint,         
  IoSparkles, 
  IoChatbubbles,
  IoChevronForward,
  IoArrowBack,
  IoRefreshOutline,
  IoBulb,       // Solid bulb icon for Light Letter
  IoConstruct   // Wrench icon for 3D Parts
} from "react-icons/io5";

import LightLetter from "./LightLetter";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [customMessage, setCustomMessage] = useState("");
  const endRef = useRef(null);

  const chatTree = useMemo(
    () => ({
      start: {
        text: "How can we help?",
        options: [
          { id: "3d-printing", title: "3D Printing", subtitle: "Light Letter & 3D Part", icon: IoPrint, colorClass: "from-blue-500 to-indigo-600", glowColor: "shadow-indigo-500/40" },
          { id: "laser-cutting", title: "Laser Cutting", subtitle: "Cutting & Lighting", icon: IoSparkles, colorClass: "from-amber-400 to-orange-500", glowColor: "shadow-orange-500/40" },
          { id: "other-service", title: "Other Service", subtitle: "Custom request", icon: IoChatbubbles, colorClass: "from-emerald-400 to-teal-500", glowColor: "shadow-teal-500/40" },
        ],
      },
      "3d-printing": {
        text: "Please choose a 3D printing option.",
        options: [
          { id: "light-letter", title: "Light Letter", subtitle: "Illuminated signs", icon: IoBulb, colorClass: "from-indigo-500 to-purple-600", glowColor: "shadow-purple-500/40" },
          { id: "3d-part", title: "3D Parts", subtitle: "Custom parts", icon: IoConstruct, colorClass: "from-purple-500 to-fuchsia-600", glowColor: "shadow-fuchsia-500/40" },
        ],
      },
      "light-letter": {
        text: "here",
        options: [],
      },
      "3d-part": {
        text: "Please provide the file type, quantity, and finish requirements for 3D Parts.",
        options: [],
      },
      "laser-cutting": {
        text: "Please share the material, thickness, size, and quantity for laser cutting.",
        options: [{ id: "start", title: "Main Menu", subtitle: "Return to start", icon: IoChevronForward, colorClass: "from-slate-500 to-slate-700", glowColor: "shadow-slate-400/40" }],
      },
      "other-service": {
        text: "Please describe your custom request and we will guide you to the next step.",
        options: [{ id: "start", title: "Main Menu", subtitle: "Return to start", icon: IoChevronForward, colorClass: "from-slate-500 to-slate-700", glowColor: "shadow-slate-400/40" }],
      },
    }),
    []
  );

  const getBotAvatar = () => "D";
  const getNodePrompt = (nodeId) => {
    const node = chatTree[nodeId];
    if (!node) return "";
    return node.text;
  };

  const addBotMessage = (nodeId, pushHistory = true) => {
    const node = chatTree[nodeId];
    if (!node) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        sender: "bot",
        text: node.text,
        nodeId,
        options: node.options ?? [],
      },
    ]);
    setActiveNodeId(nodeId);
  };

  const startConversation = () => {
    setMessages([]);
    setActiveNodeId(null);
    setCustomMessage("");
    addBotMessage("start", true);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      startConversation();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePickOption = (option) => {
    if (!activeNodeId) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        sender: "user",
        text: option.title,
      },
    ]);

    addBotMessage(option.id, true);
  };

  const handleQuickReply = (option) => {
    handlePickOption(option);
  };

  const handleSendCustomMessage = (event) => {
    event.preventDefault();

    const text = customMessage.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        sender: "user",
        text,
      },
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}-bot`,
        sender: "bot",
        text: "Thank you. Your message has been received. Our team will review it and respond shortly.",
      },
    ]);

    setCustomMessage("");
  };

  const handleLightLetterRequest = (payload) => {
    const quantityText = payload.quantity ? `${payload.quantity} pcs` : "unspecified quantity";
    const sizeText = payload.sizeType === "large" ? "Large size" : "Small size";
    const noteText = payload.notes ? ` Notes: ${payload.notes}` : "";

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        sender: "user",
        text: `Light Letter request - ${quantityText}, ${sizeText}, Material: ${payload.material}.`,
      },
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}-bot`,
        sender: "bot",
        text: `Thank you. We have recorded the reference images and request details. Our team will review the selected size and material and contact you shortly.${noteText}`,
      },
    ]);
  };

  useEffect(() => {
    if (!isOpen) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages]);

  return (
    <>
      {/* Bubble Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 cursor-pointer text-white p-3 rounded-full transition-transform duration-200 hover:scale-110 active:translate-y-1 active:scale-100 bg-linear-to-br from-indigo-500 to-slate-800 shadow-xl shadow-indigo-500/30 animate-chat-pulse"
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
            @keyframes fade-in {
              from { opacity: 0; transform: translateX(10px); }
              to { opacity: 1; transform: translateX(0); }
            }
            .animate-fade-in {
              animation: fade-in 0.25s ease-out forwards;
            }
          `}</style>
          <IoChatbubbleEllipsesOutline size={20} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-70">
          <div className="bg-slate-50/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/60 h-96">
            
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 text-slate-800 px-5 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-bold text-base tracking-tight">
                    How can we help?
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePickOption({ id: "3d-printing", title: "Back" })}
                  className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
                  aria-label="Back"
                  title="Back"
                  type="button"
                >
                  <IoArrowBack size={15} />
                </button>

                <button
                  onClick={() => handlePickOption({ id: "start", title: "Main Menu" })}
                  className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
                  aria-label="Main Menu"
                  title="Main Menu"
                  type="button"
                >
                  <IoChevronForward size={15} />
                </button>

                <button
                  onClick={startConversation}
                  className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Reset chat"
                  title="Reset chat"
                  type="button"
                >
                  <IoRefreshOutline size={15} />
                </button>

                <button
                  onClick={handleClose}
                  className="hover:bg-slate-100 text-slate-400 hover:text-slate-700 p-1.5 rounded-full transition-colors cursor-pointer"
                  aria-label="Close chat"
                  type="button"
                >
                  <IoClose size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-5 overflow-y-auto overflow-x-hidden">
              {messages.map((message, index) => {
                const isBot = message.sender === "bot";
                const isLatestBot = isBot && index === messages.length - 1 && message.nodeId === activeNodeId;

                return (
                  <div key={message.id} className={`mb-4 flex ${isBot ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-full ${isBot ? "w-full" : "max-w-[80%]"}`}>
                      <div className={`mb-2 flex items-start gap-3 ${isBot ? "" : "flex-row-reverse"}`}>
                        {isBot && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white shadow-sm">
                            {getBotAvatar()}
                          </div>
                        )}

                        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${isBot ? "bg-white text-slate-700 border border-slate-100 shadow-sm" : "bg-slate-800 text-white ml-auto"}`}>
                          {message.text}
                        </div>
                      </div>

                      {isBot && message.options?.length > 0 && (
                        <div className="ml-12 flex flex-col gap-3 animate-fade-in">
                          {message.options.map((item) => (
                            <button
                              key={`${message.id}-${item.id}`}
                              onClick={() => handleQuickReply(item)}
                              disabled={!isLatestBot}
                              className="inline-flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-sm"
                            >
                              <span className={`flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br ${item.colorClass} text-white shadow-sm`}>
                                <item.icon size={12} />
                              </span>
                              <span className="font-medium text-[13px] leading-tight">
                                {item.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {activeNodeId === "light-letter" && (
                <div className="mb-4 animate-fade-in">
                  <LightLetter onSubmitRequest={handleLightLetterRequest} />
                </div>
              )}

              {messages.length === 0 && (
                <div className="mb-4 flex items-start gap-3 animate-fade-in">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white shadow-sm">
                    {getBotAvatar()}
                  </div>
                  <div className="max-w-full rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                    {getNodePrompt("start")}
                  </div>
                </div>
              )}

              <div ref={endRef} />

            </div>

            <div className="border-t border-slate-100 bg-white/80 px-4 py-3">
              <form onSubmit={handleSendCustomMessage} className="flex w-full items-center gap-2">
                <input
                  type="text"
                  value={customMessage}
                  onChange={(event) => setCustomMessage(event.target.value)}
                  placeholder="Write your message..."
                  className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-400"
                />
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}