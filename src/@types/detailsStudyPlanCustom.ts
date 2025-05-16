export type StudyDay = {
  title: string;
  verse: string;
  explanation: string;
  refletion: string[];
  gratitude: string;
};

export type BibleStudyPlan = {
  title: string;
  days: Record<string, StudyDay>;
};