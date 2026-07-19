// // app/dashboard/ai-roadmap/page.tsx
// "use client";

// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import {
//   FiTarget,
//   FiBriefcase,
//   FiClock,
//   FiBarChart2,
//   FiX,
//   FiRefreshCw,
//   FiSave,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiPlus,
// } from "react-icons/fi";
// import { authClient } from "@/lib/auth-client";
// import type { RoadmapData, RoadmapFormInput } from "@/types/roadmap";

// async function generateRoadmap(input: RoadmapFormInput): Promise<RoadmapData> {
//   const tokenRes = await authClient.token?.();
//   const token = tokenRes?.data?.token;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roadmaps/generate`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(input),
//   });

//   const data = await res.json();
//   if (!res.ok || !data.success) throw new Error(data.message || "Failed to generate roadmap");
//   return data.data;
// }

// async function saveRoadmap(roadmap: RoadmapData) {
//   const tokenRes = await authClient.token?.();
//   const token = tokenRes?.data?.token;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roadmaps`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(roadmap),
//   });

//   const data = await res.json();
//   if (!res.ok || !data.success) throw new Error(data.message || "Failed to save roadmap");
//   return data;
// }

// const initialForm: RoadmapFormInput = {
//   currentRole: "",
//   targetRole: "",
//   currentSkills: [],
//   weeklyStudyHours: 10,
//   experienceLevel: "beginner",
// };

// export default function AIRoadmapPage() {
//   const [form, setForm] = useState<RoadmapFormInput>(initialForm);
//   const [skillInput, setSkillInput] = useState("");
//   const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
//   const [showSaved, setShowSaved] = useState(false);

//   const generateMutation = useMutation({
//     mutationFn: generateRoadmap,
//     onSuccess: (data) => setRoadmap(data),
//   });

//   const saveMutation = useMutation({
//     mutationFn: saveRoadmap,
//     onSuccess: () => {
//       setShowSaved(true);
//       setTimeout(() => setShowSaved(false), 3000);
//     },
//   });

//   const addSkill = () => {
//     const trimmed = skillInput.trim();
//     if (trimmed && !form.currentSkills.includes(trimmed)) {
//       setForm((prev) => ({ ...prev, currentSkills: [...prev.currentSkills, trimmed] }));
//     }
//     setSkillInput("");
//   };

//   const removeSkill = (skill: string) => {
//     setForm((prev) => ({
//       ...prev,
//       currentSkills: prev.currentSkills.filter((s) => s !== skill),
//     }));
//   };

//   const handleGenerate = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.targetRole.trim()) return;
//     generateMutation.mutate(form);
//   };

//   const handleRegenerate = () => {
//     generateMutation.mutate(form);
//   };

//   return (
//     <div className="mx-auto max-w-5xl">
//       <div className="mb-5 sm:mb-6">
//         <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">AI Career Roadmap Generator</h1>
//         <p className="mt-1 text-sm text-gray-500">Tell us your goal and get a personalized roadmap.</p>
//       </div>

//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-[380px_1fr]">
//         {/* Form panel */}
//         <form
//           onSubmit={handleGenerate}
//           className="flex h-fit flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
//           noValidate
//         >
//           <h2 className="text-base font-semibold text-gray-900">Tell us your goal</h2>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">
//               I want to become
//             </label>
//             <div className="relative">
//               <FiTarget className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 value={form.targetRole}
//                 onChange={(e) => setForm((p) => ({ ...p, targetRole: e.target.value }))}
//                 placeholder="Frontend Developer"
//                 required
//                 className="min-h-[44px] w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">Current Role</label>
//             <div className="relative">
//               <FiBriefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 value={form.currentRole}
//                 onChange={(e) => setForm((p) => ({ ...p, currentRole: e.target.value }))}
//                 placeholder="Student, Junior Developer, etc."
//                 className="min-h-[44px] w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">
//               My Experience Level
//             </label>
//             <div className="relative">
//               <FiBarChart2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <select
//                 value={form.experienceLevel}
//                 onChange={(e) =>
//                   setForm((p) => ({ ...p, experienceLevel: e.target.value as any }))
//                 }
//                 className="min-h-[44px] w-full appearance-none rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               >
//                 <option value="beginner">Beginner</option>
//                 <option value="intermediate">Intermediate</option>
//                 <option value="advanced">Advanced</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">
//               Current Skills (Optional)
//             </label>
//             <div className="mb-2 flex flex-wrap gap-1.5">
//               {form.currentSkills.map((skill) => (
//                 <span
//                   key={skill}
//                   className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
//                 >
//                   {skill}
//                   <button type="button" onClick={() => removeSkill(skill)}>
//                     <FiX className="h-3 w-3" />
//                   </button>
//                 </span>
//               ))}
//             </div>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={skillInput}
//                 onChange={(e) => setSkillInput(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     addSkill();
//                   }
//                 }}
//                 placeholder="HTML, CSS, JavaScript..."
//                 className="min-h-[42px] flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={addSkill}
//                 className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-lg border border-gray-200 text-gray-500 active:bg-gray-50 sm:hover:bg-gray-50"
//               >
//                 <FiPlus className="h-4 w-4" />
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-gray-700">
//               Weekly Study Hours
//             </label>
//             <div className="relative">
//               <FiClock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <select
//                 value={form.weeklyStudyHours}
//                 onChange={(e) =>
//                   setForm((p) => ({ ...p, weeklyStudyHours: Number(e.target.value) }))
//                 }
//                 className="min-h-[44px] w-full appearance-none rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               >
//                 <option value={5}>5 hrs</option>
//                 <option value={10}>10 hrs</option>
//                 <option value={15}>15 hrs</option>
//                 <option value={20}>20+ hrs</option>
//               </select>
//             </div>
//           </div>

//           {generateMutation.isError && (
//             <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
//               <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
//               <span>{(generateMutation.error as Error).message}</span>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={generateMutation.isPending}
//             className="mt-1 min-h-[46px] w-full rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors active:bg-blue-700 disabled:opacity-60 sm:hover:bg-blue-700"
//           >
//             {generateMutation.isPending ? "Generating..." : "Generate Roadmap"}
//           </button>
//         </form>

//         {/* Roadmap display panel */}
//         <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
//           {!roadmap && !generateMutation.isPending && (
//             <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
//               <FiTarget className="mb-3 h-10 w-10 text-gray-300" />
//               <p className="text-sm font-medium text-gray-600">No roadmap yet</p>
//               <p className="mt-1 text-xs text-gray-400">
//                 Fill the form and generate your personalized roadmap.
//               </p>
//             </div>
//           )}

//           {generateMutation.isPending && (
//             <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
//               <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
//               <p className="text-sm text-gray-500">Generating your roadmap...</p>
//             </div>
//           )}

//           {roadmap && !generateMutation.isPending && (
//             <>
//               <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                   <h2 className="text-base font-bold text-gray-900 sm:text-lg">
//                     {roadmap.targetRole} Roadmap
//                   </h2>
//                   <p className="text-xs text-gray-400">{roadmap.durationMonths} Month Plan</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleRegenerate}
//                     disabled={generateMutation.isPending}
//                     className="flex min-h-[38px] items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 active:bg-gray-50 disabled:opacity-60 sm:hover:bg-gray-50"
//                   >
//                     <FiRefreshCw className="h-3.5 w-3.5" />
//                     Regenerate
//                   </button>
//                   <button
//                     onClick={() => saveMutation.mutate(roadmap)}
//                     disabled={saveMutation.isPending}
//                     className="flex min-h-[38px] items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white active:bg-blue-700 disabled:opacity-60 sm:hover:bg-blue-700"
//                   >
//                     <FiSave className="h-3.5 w-3.5" />
//                     {saveMutation.isPending ? "Saving..." : "Save"}
//                   </button>
//                 </div>
//               </div>

//               {showSaved && (
//                 <div className="mb-4 flex items-start gap-2 rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700">
//                   <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
//                   <span>Roadmap saved successfully!</span>
//                 </div>
//               )}

//               <div className="flex flex-col gap-3">
//                 {roadmap.months.map((month) => (
//                   <div
//                     key={month.monthNumber}
//                     className="rounded-xl border border-gray-100 bg-gray-50 p-4"
//                   >
//                     <div className="mb-2 flex items-center gap-2">
//                       <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
//                         {month.monthNumber}
//                       </span>
//                       <h3 className="text-sm font-semibold text-gray-900">{month.title}</h3>
//                     </div>
//                     <ul className="ml-8 flex flex-col gap-1">
//                       {month.topics.map((topic, i) => (
//                         <li key={i} className="text-xs text-gray-600 sm:text-sm">
//                           • {topic}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// app/dashboard/ai-roadmap/page.tsx
"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FiTarget,
  FiBriefcase,
  FiClock,
  FiBarChart2,
  FiX,
  FiRefreshCw,
  FiSave,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
  FiBookmark,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import type { RoadmapData, RoadmapFormInput } from "@/types/roadmap";

// টাইপ এক্সটেনশন: ফর্মে savedGuideId যুক্ত করা
interface ExtendedRoadmapFormInput extends RoadmapFormInput {
  savedGuideId?: string;
}

// সেভ করা গাইডের টাইপ
interface SavedGuide {
  _id: string;
  title: string;
  requiredSkills?: string[];
  salaryRange?: string;
  estimatedTime?: string;
}

async function fetchSavedGuides(): Promise<SavedGuide[]> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  // ইউআরএল-এর শেষে /saved যোগ করা হলো
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/saved-goals/saved`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok || !data.success) return [];
  return data.data || [];
}

async function generateRoadmap(input: ExtendedRoadmapFormInput): Promise<RoadmapData> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roadmaps/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to generate roadmap");
  return data.data;
}

async function saveRoadmap(roadmap: RoadmapData) {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roadmaps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roadmap),
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to save roadmap");
  return data;
}

const initialForm: ExtendedRoadmapFormInput = {
  currentRole: "",
  targetRole: "",
  currentSkills: [],
  weeklyStudyHours: 10,
  experienceLevel: "beginner",
  savedGuideId: "",
};

export default function AIRoadmapPage() {
  const [form, setForm] = useState<ExtendedRoadmapFormInput>(initialForm);
  const [skillInput, setSkillInput] = useState("");
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [showSaved, setShowSaved] = useState(false);

  // সেভ করা গোলগুলো সার্ভার থেকে নিয়ে আসা
  const { data: savedGuides = [], isLoading: isLoadingGuides } = useQuery({
    queryKey: ["savedGuides"],
    queryFn: fetchSavedGuides,
  });

  const generateMutation = useMutation({
    mutationFn: generateRoadmap,
    onSuccess: (data) => setRoadmap(data),
  });

  const saveMutation = useMutation({
    mutationFn: saveRoadmap,
    onSuccess: () => {
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    },
  });

  const handleSavedGuideChange = (guideId: string) => {
    const selectedGuide = savedGuides.find((g) => g._id === guideId);
    setForm((prev) => ({
      ...prev,
      savedGuideId: guideId,
      targetRole: selectedGuide ? selectedGuide.title : prev.targetRole,
    }));
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !form.currentSkills.includes(trimmed)) {
      setForm((prev) => ({ ...prev, currentSkills: [...prev.currentSkills, trimmed] }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      currentSkills: prev.currentSkills.filter((s) => s !== skill),
    }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.targetRole.trim()) return;

    const payload = { ...form };
    if (!payload.savedGuideId) delete payload.savedGuideId;

    generateMutation.mutate(payload);
  };

  const handleRegenerate = () => {
    const payload = { ...form };
    if (!payload.savedGuideId) delete payload.savedGuideId;
    generateMutation.mutate(payload);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">AI Career Roadmap Generator</h1>
        <p className="mt-1 text-sm text-gray-500">Tell us your goal and get a personalized roadmap.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[380px_1fr]">
        {/* Form panel */}
        <form
          onSubmit={handleGenerate}
          className="flex h-fit flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
          noValidate
        >
          <h2 className="text-base font-semibold text-gray-900">Tell us your goal</h2>

          {/* সেভ করা গোল সিলেক্ট করার ড্রপডাউন (সবসময় দৃশ্যমান) */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Use a Saved Goal as Context (Optional)
            </label>
            <div className="relative">
              <FiBookmark className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={form.savedGuideId || ""}
                onChange={(e) => handleSavedGuideChange(e.target.value)}
                className="min-h-[44px] w-full appearance-none rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">-- Select from your saved goals --</option>
                {isLoadingGuides ? (
                  <option disabled value="">Loading saved goals...</option>
                ) : savedGuides && savedGuides.length > 0 ? (
                  savedGuides.map((guide) => (
                    <option key={guide._id} value={guide._id}>
                      {guide.title}
                    </option>
                  ))
                ) : (
                  <option disabled value="">No saved goals found</option>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              I want to become
            </label>
            <div className="relative">
              <FiTarget className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={form.targetRole}
                onChange={(e) => setForm((p) => ({ ...p, targetRole: e.target.value }))}
                placeholder="Frontend Developer"
                required
                className="min-h-[44px] w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Current Role</label>
            <div className="relative">
              <FiBriefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={form.currentRole}
                onChange={(e) => setForm((p) => ({ ...p, currentRole: e.target.value }))}
                placeholder="Student, Junior Developer, etc."
                className="min-h-[44px] w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              My Experience Level
            </label>
            <div className="relative">
              <FiBarChart2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={form.experienceLevel}
                onChange={(e) =>
                  setForm((p) => ({ ...p, experienceLevel: e.target.value as any }))
                }
                className="min-h-[44px] w-full appearance-none rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Current Skills (Optional)
            </label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {form.currentSkills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)}>
                    <FiX className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
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
                placeholder="HTML, CSS, JavaScript..."
                className="min-h-[42px] flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addSkill}
                className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-lg border border-gray-200 text-gray-500 active:bg-gray-50 sm:hover:bg-gray-50"
              >
                <FiPlus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Weekly Study Hours
            </label>
            <div className="relative">
              <FiClock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={form.weeklyStudyHours}
                onChange={(e) =>
                  setForm((p) => ({ ...p, weeklyStudyHours: Number(e.target.value) }))
                }
                className="min-h-[44px] w-full appearance-none rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value={5}>5 hrs</option>
                <option value={10}>10 hrs</option>
                <option value={15}>15 hrs</option>
                <option value={20}>20+ hrs</option>
              </select>
            </div>
          </div>

          {generateMutation.isError && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
              <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{(generateMutation.error as Error).message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={generateMutation.isPending}
            className="mt-1 min-h-[46px] w-full rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors active:bg-blue-700 disabled:opacity-60 sm:hover:bg-blue-700"
          >
            {generateMutation.isPending ? "Generating..." : "Generate Roadmap"}
          </button>
        </form>

        {/* Roadmap display panel */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          {!roadmap && !generateMutation.isPending && (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <FiTarget className="mb-3 h-10 w-10 text-gray-300" />
              <p className="text-sm font-medium text-gray-600">No roadmap yet</p>
              <p className="mt-1 text-xs text-gray-400">
                Fill the form and generate your personalized roadmap.
              </p>
            </div>
          )}

          {generateMutation.isPending && (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
              <p className="text-sm text-gray-500">Generating your roadmap...</p>
            </div>
          )}

          {roadmap && !generateMutation.isPending && (
            <>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                    {roadmap.targetRole} Roadmap
                  </h2>
                  <p className="text-xs text-gray-400">{roadmap.durationMonths} Month Plan</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleRegenerate}
                    disabled={generateMutation.isPending}
                    className="flex min-h-[38px] items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 active:bg-gray-50 disabled:opacity-60 sm:hover:bg-gray-50"
                  >
                    <FiRefreshCw className="h-3.5 w-3.5" />
                    Regenerate
                  </button>
                  <button
                    onClick={() => saveMutation.mutate(roadmap)}
                    disabled={saveMutation.isPending}
                    className="flex min-h-[38px] items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white active:bg-blue-700 disabled:opacity-60 sm:hover:bg-blue-700"
                  >
                    <FiSave className="h-3.5 w-3.5" />
                    {saveMutation.isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>

              {showSaved && (
                <div className="mb-4 flex items-start gap-2 rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700">
                  <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Roadmap saved successfully!</span>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {roadmap.months.map((month) => (
                  <div
                    key={month.monthNumber}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                        {month.monthNumber}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-900">{month.title}</h3>
                    </div>
                    <ul className="ml-8 flex flex-col gap-1">
                      {month.topics.map((topic, i) => (
                        <li key={i} className="text-xs text-gray-600 sm:text-sm">
                          • {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}