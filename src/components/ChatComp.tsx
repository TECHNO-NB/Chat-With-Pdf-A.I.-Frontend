import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AiOutlineSend } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { BsRobot, BsChatDots } from "react-icons/bs";
import AiLoader from "./AllLoader";
import ButtonLoader from "./ButtonLoader";
import axios from "axios";

const ChatComp = () => {
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async (): Promise<void> => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    const userMessage = { sender: "user", message: userInput };
    setChatMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("/api/ask-ai", {
        chatMessages: userInput,
      });

      const aiMessage = res.data?.message || "No response from AI.";
      setChatMessages((prev) => [...prev, { sender: "ai", message: aiMessage }]);
    } catch (error) {
      console.error(error);
      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", message: "Something went wrong. Try again." },
      ]);
    }

    setUserInput("");
    setIsLoading(false);
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Top Nav */}
      <nav className="flex w-full font-bold items-center justify-center border-b py-3 shadow-sm bg-white">
        <h1 className="flex items-center gap-2 text-xl">
          <BsChatDots className="text-blue-500" />
          AI Chat
        </h1>
      </nav>

      {/* Chat Box */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-hide"
      >
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-start space-x-2 max-w-[80%]">
              {msg.sender === "user" ? (
                <FaUserAlt className="text-blue-500 mt-1" />
              ) : (
                <BsRobot className="text-gray-500 mt-1" />
              )}
              <div
                className={`p-3 rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          </div>
        ))}
        {isLoading && <AiLoader />}
      </div>

      {/* Input Section */}
      <div className="w-full px-4 py-3 border-t bg-white">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Input
            className="w-full sm:flex-1 border-gray-400 rounded-md p-2 text-sm"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="w-full sm:w-auto px-5 py-2 text-sm flex items-center gap-2"
          >
            {isLoading ? <ButtonLoader /> : <>Send <AiOutlineSend /></>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatComp;
