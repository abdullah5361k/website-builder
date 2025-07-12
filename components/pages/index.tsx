"use client";

import { useState } from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const {
    conversations,
    currentConversation,
    selectedModel,
    isLoading,
    models,
    setSelectedModel,
    setCurrentConversationId,
    createConversation,
    deleteConversation,
    sendMessage,
  } = useChat();

  const exportChat = () => {
    if (!currentConversation || currentConversation.messages.length === 0) {
      toast({
        title: "No chat to export",
        description: "Start a conversation first.",
        variant: "destructive",
      });
      return;
    }

    const chatData = {
      title: currentConversation.title,
      model: selectedModel.name,
      messages: currentConversation.messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      })),
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deepseek-chat-${currentConversation.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Chat exported",
      description: "Your conversation has been downloaded as a JSON file.",
    });
  };

  return (
    <div className="h-screen flex bg-customBg">
      {/* <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversation?.id || null}
        onSelectConversation={setCurrentConversationId}
        onCreateConversation={createConversation}
        onDeleteConversation={deleteConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          selectedModel={selectedModel}
          models={models}
          onModelChange={setSelectedModel}
          onExportChat={exportChat}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          currentTitle={currentConversation?.title}
        />

        <ChatMessages
          messages={currentConversation?.messages || []}
          isLoading={isLoading}
        />

        <ChatInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          placeholder={`Ask ${selectedModel.name} anything...`}
        />
      </div> */}
    </div>
  );
};

export default Index;
