"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FiBookmark } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

interface SaveGuideButtonProps {
  goalId: string;
}

async function saveGuide(goalId: string) {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/saved-goals/save/${goalId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to save guide");
  }
  return data;
}

export default function SaveGuideButton({ goalId }: SaveGuideButtonProps) {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [isSaved, setIsSaved] = useState(false);

  const mutation = useMutation({
    mutationFn: () => saveGuide(goalId),
    onSuccess: () => {
      setIsSaved(true);
      toast.success("Saved! You can use this in your AI Roadmap.");
    },
    onError: (err: Error) => {
      if (err.message.toLowerCase().includes("already saved")) {
        toast("Already saved to your list.");
        setIsSaved(true);
      } else {
        toast.error(err.message);
      }
    },
  });

  const handleClick = () => {
    if (sessionLoading) return;

    if (!session) {
      toast.error("Login to bookmark this guide");
      return;
    }

    if (isSaved || mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      disabled={mutation.isPending}
      className={`btn btn-md rounded-xl ${
        isSaved
          ? "border border-indigo-200 bg-indigo-50 text-indigo-700"
          : "btn-secondary"
      }`}
    >
      <FiBookmark className={`h-4 w-4 ${isSaved ? "fill-indigo-600" : ""}`} />
      {mutation.isPending ? "Saving..." : isSaved ? "Saved" : "Save Guide"}
    </button>
  );
}
