"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { usePostPrompt } from "@/server/hooks/chatHooks";
import { useChatStore } from "@/stores/chat-store";

export default function Dashboard() {
  const [prompt, setPrompt] = useState<string>("");

  const { messages, addMessage } = useChatStore();
  const postPrompt = usePostPrompt();

  const handleSendMessage = () => {
    if (!prompt.trim()) {
      return;
    }

    addMessage({ message: prompt, isBot: false });
    setPrompt("");

    postPrompt.mutate(prompt, {
      onSuccess: (data) => {
        addMessage({ message: data, isBot: true });
      },
      onError: (error) => {
        console.error("Error posting prompt:", error);
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4 overflow-y-auto w-full">
        {/* Chat messages */}
        {/* Make it so that if it is from the user it is on the right side and if it is from the AI it is on the left side*/}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-md max-w-[70%] ${
                msg.isBot
                  ? "bg-gray-100 self-start text-left"
                  : "bg-blue-100 self-end text-right"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t w-[75%]">
        <Textarea
          placeholder="Type your message here..."
          className="w-full resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
      </div>
    </div>
  );
}
