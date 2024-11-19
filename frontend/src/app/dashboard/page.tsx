import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4 overflow-y-auto w-full">
        {/* Chat messages */}
        {/* Make it so that if it is from the user it is on the right side and if it is from the AI it is on the left side*/}
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-md">
            Hello! How can I help you today?
          </div>
          <div className="bg-gray-100 p-3 rounded-md">
            I would like to know more about your services.
          </div>
          <div className="bg-gray-100 p-3 rounded-md">
            Of course! Let me give you a brief overview...
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t w-[75%]">
        <Textarea
          placeholder="Type your message here..."
          className="w-full resize-none"
        />
      </div>
    </div>
  );
}
