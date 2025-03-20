export interface Problem {
  id: string;
  title: string;
  question: string;
  hints: string;
  labManualId: string;
  dateCreated: string;
}

export interface LabManual {
  id: string;
  title: string;
  description: string;
  experimentId: string;
  content: string;
  dateCreated: string;
  problems: Problem[];
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  dateCreated: string;
  labManuals: LabManual[];
}
