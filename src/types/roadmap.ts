// src/types/roadmap.ts
export interface RoadmapMonth {
  monthNumber: number;
  title: string;
  topics: string[];
}

export interface RoadmapData {
  targetRole: string;
  durationMonths: number;
  months: RoadmapMonth[];
}

export interface SavedRoadmap extends RoadmapData {
  _id: string;
  userEmail: string;
  progress: number;
  generatedAt: string;
}

export interface RoadmapFormInput {
  currentRole: string;
  targetRole: string;
  currentSkills: string[];
  weeklyStudyHours: number;
  experienceLevel: "beginner" | "intermediate" | "advanced";
}