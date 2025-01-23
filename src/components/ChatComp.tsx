import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AiOutlineSend } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";
import AiLoader from "./AllLoader";

import ButtonLoader from "./ButtonLoader";

const ChatComp = () => {
  const [chatMessages, setChatMessages] = useState([
    { sender: "user", message: "How can I extract text from a PDF?" },
    {
      sender: "ai",
      message:
        "You can extract text using libraries like pdf-lib or pdf-parse.",
    },
    { sender: "user", message: "Can I highlight specific sections?" },
    {
      sender: "ai",
      message:
        "Yes, both libraries support text manipulation and highlighting features.",
    },
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef(null);

  const handleSend = (): void => {
    setIsLoading(true);
    setChatMessages((prevmsg) => [
      ...prevmsg,
      { sender: "user", message: userInput },
    ]);

    setTimeout(() => {
      setIsLoading(false);
      if (userInput.toLowerCase().includes("hello")) {
        setChatMessages((prevmsg) => [
          ...prevmsg,
          { sender: "ai", message: "Hello, I am your AI assistant" },
        ]);
      } else if (userInput.toLowerCase().includes("how are you")) {
        setChatMessages((prevmsg) => [
          ...prevmsg,
          { sender: "ai", message: "I am fine and what about you" },
        ]);
      } else if (userInput.toLowerCase().includes("fine")) {
        setChatMessages((prevmsg) => [
          ...prevmsg,
          { sender: "ai", message: "Good to here. How can i help you" },
        ]);
      } else {
        setChatMessages((prevmsg) => [
          ...prevmsg,
          { sender: "ai", message: "I am not able to answer this" },
        ]);
      }
    }, 2000);
    setUserInput("");
  };

  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      // @ts-ignore
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className="w-full h-[100%]  sm:h-[88vh] relative px-2 sm:px-4">
      <nav className="flex w-full font-bold items-center justify-center border-b-2 border-t-2 py-2 bg-white shadow-sm">
        <h1 className="flex items-center gap-2 text-xl">
          <BsChatDots className="text-blue-500" />
        </h1>
      </nav>
      <div className="flex  h-full justify-between">
        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className=" h-64 sm:h-[78vh] scroll-smooth scrollbar-hide pb-6 sm:pb-4   overflow-y-scroll p-1 space-y-4 rounded"
        >
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-center space-x-2">
                {msg.sender === "user" ? (
                  <FaUserAlt className="text-blue-500" />
                ) : (
                  <BsRobot className="text-gray-500" />
                )}
                <div
                  className={`${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  } p-3 rounded-lg max-w-[80%] `}
                >
                  {
                  msg.message}
                </div>
              </div>
            </div>
          ))}
          {isLoading ? <AiLoader /> : null}
        </div>

        <div className="absolute  bottom-0 w-full flex gap-1 items-center justify-center px-1 bg-white ">
          <Input
            className="w-[85%] sm:w-[78%]  border-black rounded p-2"
            placeholder="Ask a question..."
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            />
          <Button onClick={handleSend} className="h-full  py-2 gap-2">
            {isLoading ? (
              <ButtonLoader />
            ) : (
              <>
                {" "}
                Send <AiOutlineSend />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatComp;
