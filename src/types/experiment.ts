export interface Problem {
  id: string;
  title: string;
  question: string;
  hints: string;
  labManualId: string;
  dateCreated: string;
  solution?: string;
  labManual?: {
    id: string;
    title: string;
    experiment?: {
      id: string;
      title: string;
      subject?: {
        id: string;
        name: string;
        faculty?: {
          id: string;
          user?: {
            firstName: string;
            lastName: string;
          }
        },
        students?: Array<{
          id: string;
          user?: {
            firstName: string;
            lastName: string;
          }
        }>
      }
    }
  };
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
