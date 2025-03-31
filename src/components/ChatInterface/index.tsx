"use client";

import type React from "react";
import { useState } from "react";
import { FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
  }>;
}

const removeMarkdownAsterisks = (text: string): string => {
  let cleanedText = text.replace(/\*\*(.*?)\*\*/g, "$1");
  cleanedText = cleanedText.replace(/\*(.*?)\*/g, "$1");
  return cleanedText;
};

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: userMessage.content,
              },
            ],
          },
        ],
      };

      const response = await axios.post<GeminiResponse>(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC5mBvFeU9p2g8t63dSisGKe3rJENtJLBA",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let aiResponseText =
        response.data.candidates[0]?.content.parts[0]?.text ||
        "Sorry, I couldn't generate a response.";

      aiResponseText = removeMarkdownAsterisks(aiResponseText);

      const aiMessage: Message = { role: "assistant", content: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, there was an error processing your request. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="border-b px-6 py-4 w-full max-w-2xl bg-white rounded-t-lg">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <FaRobot className="h-5 w-5" />
          AI Assistant
        </h2>
      </div>
      <ScrollToBottom className="w-full max-w-2xl h-[80vh] flex flex-col shadow-t-lg bg-white overflow-x-hidden overflow-y-scroll">
        {/* Chat Content */}
        <div className="flex-1 p-0 relative">
          <div className="h-full p-6 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <FaRobot className="h-12 w-12 text-gray-400" />
                <p className="text-xl font-medium">How can I help you today?</p>
                <p className="text-sm text-gray-500">
                  Ask me anything and I'll do my best to answer.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-blue-600 text-white">
                        <FaRobot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] overflow-x-scroll ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-white">
                        <FaUser className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollToBottom>
      {/* Input Area */}
      <div className="border-t p-4 bg-white w-full max-w-2xl flex flex-col rounded-b-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`p-2 rounded-full ${
              isLoading || !input.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={isLoading || !input.trim()}
          >
            <FaPaperPlane className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
