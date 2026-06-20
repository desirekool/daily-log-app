export interface User {
  id: number;
  username: string;
  email: string;
}

export interface PlanColumn {
  id: number;
  name: string;
  description: string;
  type: string;
  isTracker: boolean;
  position: number;
  planId: number;
}

export interface Section {
  id: number;
  name: string;
  description: string;
  position: number;
  planId: number;
  dailyLogs?: DailyLog[];
}

export interface LogEntry {
  id: number;
  entryValue: string;
  dailyLogId: number;
  planColumnId: number;
  planColumn?: PlanColumn;
}

export interface DailyLog {
  id: number;
  date: string;
  dayNumber: number;
  userId: number;
  planId: number;
  sectionId?: number;
  section?: Section;
  comment?: string;
  logEntries: LogEntry[];
}

export interface PlanDetailResponse {
  plan: Plan;
  sectionProgress: SectionProgress[];
}

export type PlanPhase = 'SETUP' | 'HYDRATE' | 'EXECUTE' | 'REVIEW';

export interface Plan {
  id: number;
  name: string;
  description: string;
  userId: number;
  phase: PlanPhase;
  columns: PlanColumn[];
  sections: Section[];
  dailyLogs?: DailyLog[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SectionProgress {
  sectionId: number;
  sectionName: string;
  totalLogs: number;
  completedLogs: number;
  percentage: number;
}
