// app/dashboard/add-goal/page.tsx
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  FiBriefcase,
  FiAlignLeft,
  FiDollarSign,
  FiClock,
  FiImage,
  FiPlus,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

interface GuideFormData {
  title: string;
  description: string;
  requiredSkills: string[];
  salaryRange: string;
  estimatedTime: string;
  imageUrl?: string;
}

const initialForm: GuideFormData = {
  title: "",
  description: "",
  requiredSkills: [],
  salaryRange: "",
  estimatedTime: "",
  imageUrl: "",
};

async function createGuide(payload: GuideFormData) {
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
    throw new Error(data.message || "Failed to post career guide");
  }
  return data;
}

export default function AddGoalPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<GuideFormData>(initialForm);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: createGuide,
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

  const handleChange = (field: keyof GuideFormData, value: string) => {
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
    if (!form.salaryRange.trim()) newErrors.salaryRange = "Approximate salary range is required";
    if (!form.estimatedTime.trim()) newErrors.estimatedTime = "Estimated time to learn is required";
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
    text-gray-950 font-medium shadow-inner
    ${
      fieldError
        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-blue-300 bg-blue-50/40 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
    }
  `;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 sm:mb-8 border-b border-gray-100 pb-5">
          <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">Share a Career Guide</h1>
          <p className="mt-2 text-base text-gray-600">
            Post a guide about a role — skills needed, salary range, and how long it takes to learn.
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 flex items-start gap-3 rounded-lg bg-green-50 px-5 py-4 text-sm text-green-800 border border-green-200 shadow-sm">
            <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <p className="font-semibold">Success!</p>
              <p>Career guide posted successfully!</p>
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

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:gap-6 sm:p-8"
          noValidate
        >
          {/* Role/Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">Role / Title</label>
            <div className="relative">
              <FiBriefcase className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Data Scientist"
                className={inputClasses(errors.title)}
              />
            </div>
            {errors.title && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">Description / Overview</label>
            <div className="relative">
              <FiAlignLeft className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-blue-500" />
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="What does this role involve? What should someone know before starting?"
                rows={5}
                className={`${inputClasses(errors.description)} resize-none`}
              />
            </div>
            {errors.description && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Required Skills - tag input */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">Required Skills</label>

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
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-blue-300 bg-blue-50/40 text-blue-600 shadow-inner transition-colors hover:bg-blue-100"
              >
                <FiPlus className="h-5 w-5" />
              </button>
            </div>
            {errors.requiredSkills && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.requiredSkills}</p>
            )}
          </div>

          {/* Salary range + Estimated time */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Approx. Salary Range
              </label>
              <div className="relative">
                <FiDollarSign className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  value={form.salaryRange}
                  onChange={(e) => handleChange("salaryRange", e.target.value)}
                  placeholder="$70k - $100k"
                  className={inputClasses(errors.salaryRange)}
                />
              </div>
              {errors.salaryRange && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.salaryRange}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Estimated Time to Learn
              </label>
              <div className="relative">
                <FiClock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  value={form.estimatedTime}
                  onChange={(e) => handleChange("estimatedTime", e.target.value)}
                  placeholder="6-8 months"
                  className={inputClasses(errors.estimatedTime)}
                />
              </div>
              {errors.estimatedTime && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.estimatedTime}</p>
              )}
            </div>
          </div>

          {/* Optional image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Cover Image URL <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <div className="relative">
              <FiImage className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
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
            {mutation.isPending ? "Posting Guide..." : "Post Career Guide"}
          </button>
        </form>
      </div>
    </div>
  );
}