// components/goals/EditGoalForm.tsx
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiTarget,
  FiFileText,
  FiCalendar,
  FiFlag,
  FiAlignLeft,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import type { Goal, GoalFormData } from "@/types/goal";

interface EditGoalFormProps {
  goal: Goal;
  onSuccess?: () => void;
  onCancel?: () => void;
}

async function updateGoal(id: string, payload: Partial<GoalFormData>) {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to update goal");
  }
  return data;
}

export default function EditGoalForm({ goal, onSuccess, onCancel }: EditGoalFormProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<GoalFormData>({
    title: goal.title,
    targetRole: goal.targetRole,
    description: goal.description,
    dueDate: goal.dueDate?.slice(0, 10) ?? "",
    priority: goal.priority,
    imageUrl: goal.imageUrl ?? "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: Partial<GoalFormData>) => updateGoal(goal._id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goal-details", goal._id] });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess?.();
      }, 1200);
    },
  });

  const handleChange = (field: keyof GoalFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "Goal title is required";
    if (!form.targetRole.trim()) newErrors.targetRole = "Target role is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.dueDate) newErrors.dueDate = "Due date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:gap-5 sm:p-6"
      noValidate
    >
      {showSuccess && (
        <div className="flex items-start gap-2 rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700">
          <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Goal updated successfully!</span>
        </div>
      )}

      {mutation.isError && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(mutation.error as Error).message}</span>
        </div>
      )}

      {/* Title */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Goal Title</label>
        <div className="relative">
          <FiTarget className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`min-h-[44px] w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
              errors.title ? "border-red-400" : "border-gray-200"
            }`}
          />
        </div>
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      {/* Target Role */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Target Role</label>
        <div className="relative">
          <FiFileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={form.targetRole}
            onChange={(e) => handleChange("targetRole", e.target.value)}
            className={`min-h-[44px] w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
              errors.targetRole ? "border-red-400" : "border-gray-200"
            }`}
          />
        </div>
        {errors.targetRole && <p className="mt-1 text-xs text-red-500">{errors.targetRole}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
        <div className="relative">
          <FiAlignLeft className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className={`w-full resize-none rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
              errors.description ? "border-red-400" : "border-gray-200"
            }`}
          />
        </div>
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
      </div>

      {/* Due Date + Priority */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Due Date</label>
          <div className="relative">
            <FiCalendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className={`min-h-[44px] w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                errors.dueDate ? "border-red-400" : "border-gray-200"
              }`}
            />
          </div>
          {errors.dueDate && <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Priority</label>
          <div className="relative">
            <FiFlag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={form.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
              className="min-h-[44px] w-full appearance-none rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-1 flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="min-h-[46px] flex-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 active:bg-gray-50 sm:hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="min-h-[46px] flex-1 rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors active:bg-blue-700 disabled:opacity-60 sm:hover:bg-blue-700"
        >
          {mutation.isPending ? "Updating..." : "Update Goal"}
        </button>
      </div>
    </form>
  );
}