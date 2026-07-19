// app/dashboard/add-goal/page.tsx
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  FiTarget,
  FiFileText,
  FiCalendar,
  FiFlag,
  FiImage,
  FiAlignLeft,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

// প্রজেক্টের Better Auth ক্লায়েন্ট
import { authClient } from "@/lib/auth-client"; 

interface GoalFormData {
  title: string;
  targetRole: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  imageUrl?: string;
}

const initialForm: GoalFormData = {
  title: "",
  targetRole: "",
  description: "",
  dueDate: "",
  priority: "medium",
  imageUrl: "",
};

async function createGoal(payload: GoalFormData) {
  // তোর দেখানো নিয়মে Better Auth থেকে অ্যাক্টিভ টোকেন নেওয়া হচ্ছে
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  if (!token) {
    throw new Error("আপনার সেশন শেষ হয়ে গেছে। দয়া করে আবার লগইন করুন।");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to create goal");
  }
  return data;
}

export default function AddGoalPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<GoalFormData>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      setShowSuccess(true);
      setForm(initialForm);
      queryClient.invalidateQueries({ queryKey: ["explore-goals"] });
      
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/dashboard/manage-goals"); 
      }, 2000);
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

  const inputClasses = (fieldError: string | undefined) => `
    min-h-[44px] w-full rounded-lg border py-2.5 pl-10 pr-3 
    text-sm outline-none transition-colors 
    focus:border-blue-600 focus:ring-1 focus:ring-blue-600
    text-gray-950 font-medium border-gray-300 shadow-inner
    \${fieldError ? "border-red-400 bg-red-50" : "bg-gray-50/50"}
  `;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 sm:mb-8 border-b border-gray-100 pb-5">
          <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">Add Career Goal</h1>
          <p className="mt-2 text-base text-gray-600">
            Set a new goal to track your progress toward your dream career.
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 flex items-start gap-3 rounded-lg bg-green-50 px-5 py-4 text-sm text-green-800 border border-green-200 shadow-sm">
            <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <p className="font-semibold">Success!</p>
              <p>Goal added successfully!</p>
            </div>
          </div>
        )}

        {mutation.isError && (
          <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 px-5 py-4 text-sm text-red-800 border border-red-200 shadow-sm">
            <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div>
              <p className="font-semibold">Error!</p>
              <p>{(mutation.error as Error).message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:gap-6 sm:p-8" noValidate>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">Goal Title</label>
            <div className="relative">
              <FiTarget className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Become a Full Stack Developer"
                className={inputClasses(errors.title)}
              />
            </div>
            {errors.title && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.title}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">Target Role</label>
            <div className="relative">
              <FiFileText className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={form.targetRole}
                onChange={(e) => handleChange("targetRole", e.target.value)}
                placeholder="Frontend Developer"
                className={inputClasses(errors.targetRole)}
              />
            </div>
            {errors.targetRole && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.targetRole}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">Description</label>
            <div className="relative">
              <FiAlignLeft className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe what you want to achieve with this goal..."
                rows={5}
                className={`${inputClasses(errors.description)} resize-none`}
              />
            </div>
            {errors.description && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">Due Date</label>
              <div className="relative">
                <FiCalendar className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  className={inputClasses(errors.dueDate)}
                />
              </div>
              {errors.dueDate && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.dueDate}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">Priority</label>
              <div className="relative">
                <FiFlag className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <select
                  value={form.priority}
                  onChange={(e) => handleChange("priority", e.target.value as GoalFormData['priority'])}
                  className={`${inputClasses(undefined)} appearance-none`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Cover Image URL <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <div className="relative">
              <FiImage className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={inputClasses(undefined)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="mt-2 min-h-[50px] w-full rounded-xl bg-blue-600 text-base font-bold text-white transition-all shadow-md hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
          >
            {mutation.isPending ? "Adding Goal..." : "Add Goal"}
          </button>
        </form>
      </div>
    </div>
  );
}