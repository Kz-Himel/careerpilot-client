// src/types/goal.ts

export interface GoalFormData {
  title: string;              // e.g. "Data Scientist"
  description: string;        // overview of the role
  requiredSkills: string[];   // e.g. ["Python", "SQL", "Statistics"]
  salaryRange: string;        // e.g. "$70k - $100k"
  estimatedTime: string;      // e.g. "6-8 months"
  imageUrl: string;
}

export interface Goal extends GoalFormData {
  _id: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
}