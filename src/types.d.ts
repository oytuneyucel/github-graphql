export interface WeeklyCommitActivity {
  total: number;
  week: number;
  days: number[];
}

export interface WeeklyConsolidatedActivity {
  days: DailyCommitHistory[];
  month: number;
}

export interface DailyCommitHistory {
  commits: number;
  date: number;
}
