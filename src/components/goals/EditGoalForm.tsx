// components/goals/EditGoalForm.tsx
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiBriefcase,
  FiAlignLeft,
  FiDollarSign,
  FiClock,
  FiPlus,
  FiX,
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
    throw new Error(data.message || "Failed to update career guide");
  }
  return data;
}

export default function EditGoalForm({ goal, onSuccess, onCancel }: EditGoalFormProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<GoalFormData>({
    title: goal.title,
    description: goal.description,
    requiredSkills: goal.requiredSkills ?? [],
    salaryRange: goal.salaryRange,
    estimatedTime: goal.estimatedTime,
    imageUrl: goal.imageUrl ?? "",
  });

  const [skillInput, setSkillInput] = useState("");
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

  const handleChange = (field: keyof Omit<GoalFormData, "requiredSkills">, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !form.requiredSkills.includes(trimmed)) {
      setForm((prev) => ({ ...prev, requiredSkills: [...prev.requiredSkills, trimmed] }));
      if (errors.requiredSkills) setErrors((prev) => ({ ...prev, requiredSkills: "" }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s !== skill),
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "Role/title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (form.requiredSkills.length === 0) newErrors.requiredSkills = "Add at least one required skill";
    if (!form.salaryRange.trim()) newErrors.salaryRange = "Salary range is required";
    if (!form.estimatedTime.trim()) newErrors.estimatedTime = "Estimated time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };

  const inputClasses = (fieldError: string | undefined) => `
    min-h-[44px] w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors
    ${
      fieldError
        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-blue-200 bg-blue-50/40 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
    }
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:gap-5 sm:p-6"
      noValidate
    >
      {showSuccess && (
        <div className="flex items-start gap-2 rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700">
          <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Career guide updated successfully!</span>
        </div>
      )}

      {mutation.isError && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(mutation.error as Error).message}</span>
        </div>
      )}

      {/* Role/Title */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Role / Title</label>
        <div className="relative">
          <FiBriefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClasses(errors.title)}
          />
        </div>
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
        <div className="relative">
          <FiAlignLeft className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-blue-500" />
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className={`${inputClasses(errors.description)} resize-none`}
          />
        </div>
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
      </div>

      {/* Required Skills - tag input */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Required Skills</label>

        {form.requiredSkills.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {form.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800"
              >
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="Python, SQL, Statistics..."
            className={`${inputClasses(errors.requiredSkills)} !pl-3`}
          />
          <button
            type="button"
            onClick={addSkill}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-blue-200 bg-blue-50/40 text-blue-600 hover:bg-blue-100"
          >
            <FiPlus className="h-4 w-4" />
          </button>
        </div>
        {errors.requiredSkills && <p className="mt-1 text-xs text-red-500">{errors.requiredSkills}</p>}
      </div>

      {/* Salary Range + Estimated Time */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Salary Range</label>
          <div className="relative">
            <FiDollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              value={form.salaryRange}
              onChange={(e) => handleChange("salaryRange", e.target.value)}
              placeholder="$70k - $100k"
              className={inputClasses(errors.salaryRange)}
            />
          </div>
          {errors.salaryRange && <p className="mt-1 text-xs text-red-500">{errors.salaryRange}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Estimated Time</label>
          <div className="relative">
            <FiClock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              value={form.estimatedTime}
              onChange={(e) => handleChange("estimatedTime", e.target.value)}
              placeholder="6-8 months"
              className={inputClasses(errors.estimatedTime)}
            />
          </div>
          {errors.estimatedTime && <p className="mt-1 text-xs text-red-500">{errors.estimatedTime}</p>}
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
          {mutation.isPending ? "Updating..." : "Update Guide"}
        </button>
      </div>
    </form>
  );
}