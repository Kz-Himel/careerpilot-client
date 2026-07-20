// "use client";

// import { useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
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
//   FiBookmark,
// } from "react-icons/fi";
// import { authClient } from "@/lib/auth-client";
// import type { RoadmapData, RoadmapFormInput } from "@/types/roadmap";

// interface ExtendedRoadmapFormInput extends RoadmapFormInput {
//   savedGuideId?: string;
// }

// interface SavedGuide {
//   _id: string;
//   title: string;
//   requiredSkills?: string[];
//   salaryRange?: string;
//   estimatedTime?: string;
// }

// async function fetchSavedGuides(): Promise<SavedGuide[]> {
//   const tokenRes = await authClient.token?.();
//   const token = tokenRes?.data?.token;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/saved-goals/saved`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await res.json();
//   if (!res.ok || !data.success) return [];
//   return data.data || [];
// }

// async function generateRoadmap(input: ExtendedRoadmapFormInput): Promise<RoadmapData> {
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

// const initialForm: ExtendedRoadmapFormInput = {
//   currentRole: "",
//   targetRole: "",
//   currentSkills: [],
//   weeklyStudyHours: 10,
//   experienceLevel: "beginner",
//   savedGuideId: "",
// };

// export default function AIRoadmapPage() {
//   const [form, setForm] = useState<ExtendedRoadmapFormInput>(initialForm);
//   const [skillInput, setSkillInput] = useState("");
//   const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
//   const [showSaved, setShowSaved] = useState(false);

//   const { data: savedGuides = [], isLoading: isLoadingGuides } = useQuery({
//     queryKey: ["savedGuides"],
//     queryFn: fetchSavedGuides,
//   });

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

//   const handleSavedGuideChange = (guideId: string) => {
//     const selectedGuide = savedGuides.find((g) => g._id === guideId);
//     setForm((prev) => ({
//       ...prev,
//       savedGuideId: guideId,
//       targetRole: selectedGuide ? selectedGuide.title : prev.targetRole,
//     }));
//   };

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

//     const payload = { ...form };
//     if (!payload.savedGuideId) delete payload.savedGuideId;

//     generateMutation.mutate(payload);
//   };

//   const handleRegenerate = () => {
//     const payload = { ...form };
//     if (!payload.savedGuideId) delete payload.savedGuideId;
//     generateMutation.mutate(payload);
//   };

//   return (
//     <div className="mx-auto max-w-5xl">
//       <div className="mb-6 sm:mb-8">
//         <h1 className="heading-page">AI Career Roadmap Generator</h1>
//         <p className="mt-1.5 text-body">Tell us your goal and get a personalized roadmap.</p>
//       </div>

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
//         <form
//           onSubmit={handleGenerate}
//           className="card card-body flex h-fit flex-col gap-4"
//           noValidate
//         >
//           <h2 className="heading-card">Tell us your goal</h2>

//           <div>
//             <label className="form-label">Use a Saved Goal as Context (Optional)</label>
//             <div className="relative">
//               <FiBookmark className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//               <select
//                 value={form.savedGuideId || ""}
//                 onChange={(e) => handleSavedGuideChange(e.target.value)}
//                 className="form-select pl-10"
//               >
//                 <option value="">-- Select from your saved goals --</option>
//                 {isLoadingGuides ? (
//                   <option disabled value="">Loading saved goals...</option>
//                 ) : savedGuides && savedGuides.length > 0 ? (
//                   savedGuides.map((guide) => (
//                     <option key={guide._id} value={guide._id}>
//                       {guide.title}
//                     </option>
//                   ))
//                 ) : (
//                   <option disabled value="">No saved goals found</option>
//                 )}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="form-label">I want to become</label>
//             <div className="relative">
//               <FiTarget className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 value={form.targetRole}
//                 onChange={(e) => setForm((p) => ({ ...p, targetRole: e.target.value }))}
//                 placeholder="Frontend Developer"
//                 required
//                 className="form-input-icon"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="form-label">Current Role</label>
//             <div className="relative">
//               <FiBriefcase className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 value={form.currentRole}
//                 onChange={(e) => setForm((p) => ({ ...p, currentRole: e.target.value }))}
//                 placeholder="Student, Junior Developer, etc."
//                 className="form-input-icon"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="form-label">My Experience Level</label>
//             <div className="relative">
//               <FiBarChart2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//               <select
//                 value={form.experienceLevel}
//                 onChange={(e) =>
//                   setForm((p) => ({ ...p, experienceLevel: e.target.value as ExtendedRoadmapFormInput["experienceLevel"] }))
//                 }
//                 className="form-select pl-10"
//               >
//                 <option value="beginner">Beginner</option>
//                 <option value="intermediate">Intermediate</option>
//                 <option value="advanced">Advanced</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="form-label">Current Skills (Optional)</label>
//             <div className="mb-2 flex flex-wrap gap-1.5">
//               {form.currentSkills.map((skill) => (
//                 <span key={skill} className="badge badge-primary flex items-center gap-1 px-2.5 py-1">
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
//                 className="form-input flex-1"
//               />
//               <button
//                 type="button"
//                 onClick={addSkill}
//                 className="btn btn-secondary btn-md h-[44px] w-[44px] rounded-xl p-0"
//               >
//                 <FiPlus className="h-4 w-4" />
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="form-label">Weekly Study Hours</label>
//             <div className="relative">
//               <FiClock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//               <select
//                 value={form.weeklyStudyHours}
//                 onChange={(e) =>
//                   setForm((p) => ({ ...p, weeklyStudyHours: Number(e.target.value) }))
//                 }
//                 className="form-select pl-10"
//               >
//                 <option value={5}>5 hrs</option>
//                 <option value={10}>10 hrs</option>
//                 <option value={15}>15 hrs</option>
//                 <option value={20}>20+ hrs</option>
//               </select>
//             </div>
//           </div>

//           {generateMutation.isError && (
//             <div className="alert alert-error">
//               <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
//               <span>{(generateMutation.error as Error).message}</span>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={generateMutation.isPending}
//             className="btn btn-primary btn-lg mt-1 w-full rounded-xl"
//           >
//             {generateMutation.isPending ? "Generating..." : "Generate Roadmap"}
//           </button>
//         </form>

//         <div className="card card-body min-h-[400px]">
//           {!roadmap && !generateMutation.isPending && (
//             <div className="empty-state h-full border-0 bg-transparent py-12">
//               <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
//                 <FiTarget className="h-7 w-7 text-slate-300" />
//               </div>
//               <p className="text-sm font-semibold text-slate-600">No roadmap yet</p>
//               <p className="mt-1 text-xs text-slate-400">
//                 Fill the form and generate your personalized roadmap.
//               </p>
//             </div>
//           )}

//           {generateMutation.isPending && (
//             <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
//               <div className="mb-4 h-10 w-10 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
//               <p className="text-sm font-medium text-slate-500">Generating your roadmap...</p>
//             </div>
//           )}

//           {roadmap && !generateMutation.isPending && (
//             <>
//               <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                   <h2 className="heading-card">{roadmap.targetRole} Roadmap</h2>
//                   <p className="text-xs text-slate-400">{roadmap.durationMonths} Month Plan</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleRegenerate}
//                     disabled={generateMutation.isPending}
//                     className="btn btn-secondary btn-sm rounded-xl"
//                   >
//                     <FiRefreshCw className="h-3.5 w-3.5" />
//                     Regenerate
//                   </button>
//                   <button
//                     onClick={() => saveMutation.mutate(roadmap)}
//                     disabled={saveMutation.isPending}
//                     className="btn btn-primary btn-sm rounded-xl"
//                   >
//                     <FiSave className="h-3.5 w-3.5" />
//                     {saveMutation.isPending ? "Saving..." : "Save"}
//                   </button>
//                 </div>
//               </div>

//               {showSaved && (
//                 <div className="alert alert-success mb-4">
//                   <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
//                   <span>Roadmap saved successfully!</span>
//                 </div>
//               )}

//               <div className="flex flex-col gap-3">
//                 {roadmap.months.map((month) => (
//                   <div
//                     key={month.monthNumber}
//                     className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition-colors hover:border-indigo-100 hover:bg-indigo-50/30"
//                   >
//                     <div className="mb-2 flex items-center gap-2.5">
//                       <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-[11px] font-bold text-white">
//                         {month.monthNumber}
//                       </span>
//                       <h3 className="text-sm font-semibold text-slate-900">{month.title}</h3>
//                     </div>
//                     <ul className="ml-9 flex flex-col gap-1">
//                       {month.topics.map((topic, i) => (
//                         <li key={i} className="text-xs text-slate-600 sm:text-sm">
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



"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FiTarget,
  FiBriefcase,
  FiClock,
  FiBarChart2,
  FiCalendar,
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

interface ExtendedRoadmapFormInput extends RoadmapFormInput {
  savedGuideId?: string;
}

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
  desiredDurationMonths: 3,
  savedGuideId: "",
};

export default function AIRoadmapPage() {
  const [form, setForm] = useState<ExtendedRoadmapFormInput>(initialForm);
  const [skillInput, setSkillInput] = useState("");
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [showSaved, setShowSaved] = useState(false);

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
      <div className="mb-6 sm:mb-8">
        <h1 className="heading-page">AI Career Roadmap Generator</h1>
        <p className="mt-1.5 text-body">Tell us your goal and get a personalized roadmap.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        <form
          onSubmit={handleGenerate}
          className="card card-body flex h-fit flex-col gap-4"
          noValidate
        >
          <h2 className="heading-card">Tell us your goal</h2>

          <div>
            <label className="form-label">Use a Saved Goal as Context (Optional)</label>
            <div className="relative">
              <FiBookmark className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={form.savedGuideId || ""}
                onChange={(e) => handleSavedGuideChange(e.target.value)}
                className="form-select pl-10"
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
            <label className="form-label">I want to become</label>
            <div className="relative">
              <FiTarget className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={form.targetRole}
                onChange={(e) => setForm((p) => ({ ...p, targetRole: e.target.value }))}
                placeholder="Frontend Developer"
                required
                className="form-input-icon"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Current Role</label>
            <div className="relative">
              <FiBriefcase className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={form.currentRole}
                onChange={(e) => setForm((p) => ({ ...p, currentRole: e.target.value }))}
                placeholder="Student, Junior Developer, etc."
                className="form-input-icon"
              />
            </div>
          </div>

          <div>
            <label className="form-label">My Experience Level</label>
            <div className="relative">
              <FiBarChart2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={form.experienceLevel}
                onChange={(e) =>
                  setForm((p) => ({ ...p, experienceLevel: e.target.value as ExtendedRoadmapFormInput["experienceLevel"] }))
                }
                className="form-select pl-10"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Roadmap Length</label>
            <div className="relative">
              <FiCalendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={form.desiredDurationMonths}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    desiredDurationMonths: Number(e.target.value) as ExtendedRoadmapFormInput["desiredDurationMonths"],
                  }))
                }
                className="form-select pl-10"
              >
                <option value={3}>3 Months (Quick Start)</option>
                <option value={6}>6 Months (Standard)</option>
                <option value={12}>12 Months (In-Depth)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Current Skills (Optional)</label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {form.currentSkills.map((skill) => (
                <span key={skill} className="badge badge-primary flex items-center gap-1 px-2.5 py-1">
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
                className="form-input flex-1"
              />
              <button
                type="button"
                onClick={addSkill}
                className="btn btn-secondary btn-md h-[44px] w-[44px] rounded-xl p-0"
              >
                <FiPlus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="form-label">Weekly Study Hours</label>
            <div className="relative">
              <FiClock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={form.weeklyStudyHours}
                onChange={(e) =>
                  setForm((p) => ({ ...p, weeklyStudyHours: Number(e.target.value) }))
                }
                className="form-select pl-10"
              >
                <option value={5}>5 hrs</option>
                <option value={10}>10 hrs</option>
                <option value={15}>15 hrs</option>
                <option value={20}>20+ hrs</option>
              </select>
            </div>
          </div>

          {generateMutation.isError && (
            <div className="alert alert-error">
              <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{(generateMutation.error as Error).message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={generateMutation.isPending}
            className="btn btn-primary btn-lg mt-1 w-full rounded-xl"
          >
            {generateMutation.isPending ? "Generating..." : "Generate Roadmap"}
          </button>
        </form>

        <div className="card card-body min-h-[400px]">
          {!roadmap && !generateMutation.isPending && (
            <div className="empty-state h-full border-0 bg-transparent py-12">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <FiTarget className="h-7 w-7 text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-600">No roadmap yet</p>
              <p className="mt-1 text-xs text-slate-400">
                Fill the form and generate your personalized roadmap.
              </p>
            </div>
          )}

          {generateMutation.isPending && (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <div className="mb-4 h-10 w-10 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
              <p className="text-sm font-medium text-slate-500">Generating your roadmap...</p>
            </div>
          )}

          {roadmap && !generateMutation.isPending && (
            <>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="heading-card">{roadmap.targetRole} Roadmap</h2>
                  <p className="text-xs text-slate-400">{roadmap.durationMonths} Month Plan</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleRegenerate}
                    disabled={generateMutation.isPending}
                    className="btn btn-secondary btn-sm rounded-xl"
                  >
                    <FiRefreshCw className="h-3.5 w-3.5" />
                    Regenerate
                  </button>
                  <button
                    onClick={() => saveMutation.mutate(roadmap)}
                    disabled={saveMutation.isPending}
                    className="btn btn-primary btn-sm rounded-xl"
                  >
                    <FiSave className="h-3.5 w-3.5" />
                    {saveMutation.isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>

              {showSaved && (
                <div className="alert alert-success mb-4">
                  <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Roadmap saved successfully!</span>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {roadmap.months.map((month) => (
                  <div
                    key={month.monthNumber}
                    className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition-colors hover:border-indigo-100 hover:bg-indigo-50/30"
                  >
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-[11px] font-bold text-white">
                        {month.monthNumber}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-900">{month.title}</h3>
                    </div>
                    <ul className="ml-9 flex flex-col gap-1">
                      {month.topics.map((topic, i) => (
                        <li key={i} className="text-xs text-slate-600 sm:text-sm">
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