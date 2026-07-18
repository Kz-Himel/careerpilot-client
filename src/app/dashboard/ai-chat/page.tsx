// app/dashboard/ai-chat/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiSend, FiCpu, FiUser, FiTrash2 } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import type { ChatMessage } from "@/types/chat";

async function fetchChatHistory(): Promise<ChatMessage[]> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load chat history");
  return data.data;
}

async function sendChatMessage(message: string) {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to send message");
  return data.data as { reply: string; suggestedPrompts: string[] };
}

async function clearChatHistory() {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/history`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to clear chat");
  return data;
}

const defaultPrompts = [
  "What should I learn next?",
  "Am I ready for a job?",
  "Improve my resume",
];

export default function AIChatPage() {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(defaultPrompts);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading } = useQuery({
    queryKey: ["chat-history"],
    queryFn: fetchChatHistory,
  });

  const sendMutation = useMutation({
    mutationFn: sendChatMessage,
    onMutate: async (message: string) => {
      // optimistically show user message immediately
      await queryClient.cancelQueries({ queryKey: ["chat-history"] });
      const previous = queryClient.getQueryData<ChatMessage[]>(["chat-history"]) ?? [];
      queryClient.setQueryData<ChatMessage[]>(["chat-history"], [
        ...previous,
        { role: "user", content: message, timestamp: new Date() },
      ]);
      return { previous };
    },
    onSuccess: (data) => {
      queryClient.setQueryData<ChatMessage[]>(["chat-history"], (old = []) => [
        ...old,
        { role: "assistant", content: data.reply, timestamp: new Date() },
      ]);
      setSuggestedPrompts(data.suggestedPrompts ?? defaultPrompts);
    },
    onError: (_err, _message, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["chat-history"], context.previous);
      }
    },
  });

  const clearMutation = useMutation({
    mutationFn: clearChatHistory,
    onSuccess: () => {
      queryClient.setQueryData(["chat-history"], []);
      setSuggestedPrompts(defaultPrompts);
    },
  });

  const handleSend = (text?: string) => {
    const message = (text ?? input).trim();
    if (!message || sendMutation.isPending) return;
    sendMutation.mutate(message);
    setInput("");
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sendMutation.isPending]);

  return (
    <div className="mx-auto flex h-[calc(100dvh-8rem)] max-w-3xl flex-col sm:h-[calc(100dvh-9rem)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">AI Career Coach</h1>
          <p className="mt-0.5 text-sm text-gray-500">Ask anything about your career journey.</p>
        </div>
        {messages && messages.length > 0 && (
          <button
            onClick={() => clearMutation.mutate()}
            disabled={clearMutation.isPending}
            className="flex min-h-[38px] items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-600 active:bg-gray-50 disabled:opacity-60 sm:hover:bg-gray-50"
          >
            <FiTrash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Chat window */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
      >
        {isLoading && (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Loading conversation...
          </div>
        )}

        {!isLoading && (!messages || messages.length === 0) && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <FiCpu className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Hello! How can I help you today?</p>
            <p className="mt-1 text-xs text-gray-400">Ask about roadmaps, skills, or job readiness.</p>
          </div>
        )}

        {messages?.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                msg.role === "user" ? "bg-gray-100 text-gray-600" : "bg-blue-50 text-blue-600"
              }`}
            >
              {msg.role === "user" ? <FiUser className="h-4 w-4" /> : <FiCpu className="h-4 w-4" />}
            </div>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[70%] ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {sendMutation.isPending && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <FiCpu className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-gray-50 px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Suggested prompts */}
      {suggestedPrompts.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              disabled={sendMutation.isPending}
              className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 active:bg-blue-100 disabled:opacity-60 sm:hover:bg-blue-100"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything..."
          className="min-h-[46px] flex-1 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={sendMutation.isPending || !input.trim()}
          className="flex min-h-[46px] min-w-[46px] items-center justify-center rounded-lg bg-blue-600 text-white transition-colors active:bg-blue-700 disabled:opacity-50 sm:hover:bg-blue-700"
        >
          <FiSend className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}