// components/goals/DeleteGoalDialog.tsx
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiTrash2, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

interface DeleteGoalDialogProps {
  goalId: string;
  goalTitle: string;
}

async function deleteGoal(id: string) {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to delete goal");
  }
  return data;
}

export default function DeleteGoalDialog({ goalId, goalTitle }: DeleteGoalDialogProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      setIsOpen(false);
    },
  });

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-white px-4 text-xs font-medium text-red-600 transition-colors active:bg-red-50 sm:hover:bg-red-50"
      >
        <FiTrash2 className="h-3.5 w-3.5" />
        Delete
      </button>

      {/* Modal Backdrop & Container */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark Overlay Shadow */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => !deleteMutation.isPending && setIsOpen(false)} 
          />

          {/* Dialog Content Box */}
          <div className="relative z-10 w-full max-w-[400px] transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all border border-gray-100">
            
            {/* Close Button (X icon) */}
            <button
              onClick={() => setIsOpen(false)}
              disabled={deleteMutation.isPending}
              className="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
            >
              <FiX className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete goal permanently?
              </h3>
            </div>

            {/* Body */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                This will permanently delete <strong>{goalTitle}</strong> and cannot be undone.
              </p>
              
              {deleteMutation.isError && (
                <p className="mt-3 text-xs text-red-500 font-medium">
                  {(deleteMutation.error as Error).message}
                </p>
              )}
            </div>

            {/* Footer / Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={deleteMutation.isPending}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 active:bg-red-800 disabled:opacity-50 flex items-center gap-2"
              >
                {deleteMutation.isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </>
                ) : (
                  "Delete Goal"
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}