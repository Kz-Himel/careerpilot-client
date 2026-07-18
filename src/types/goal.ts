// src/types/goal.ts

export interface GoalFormData {
  title: string;
  targetRole: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  imageUrl: string;
}

export interface Goal extends GoalFormData {
  _id: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
}