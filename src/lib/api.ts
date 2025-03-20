import { Experiment, LabManual } from '@/types/experiment';
import { mockExperiments } from '@/lib/mockData';
import { generateSampleProblem } from '@/lib/sampleProblem';

export const fetchExperiments = async (): Promise<Experiment[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockExperiments);
    }, 500);
  });
};

export const getExperimentById = async (id: string): Promise<Experiment> => {
  // Simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const experiment = mockExperiments.find(exp => exp.id === id);
      if (experiment) {
        resolve(experiment);
      } else {
        reject(new Error('Experiment not found'));
      }
    }, 500);
  });
};

export const getLabManualById = async (experimentId: string, labManualId: string): Promise<LabManual> => {
  // Simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const experiment = mockExperiments.find(exp => exp.id === experimentId);
      if (experiment) {
        const labManual = experiment.labManuals.find(lm => lm.id === labManualId);
        if (labManual) {
          // Add a few sample problems if there are none
          if (labManual.problems.length === 0) {
            const problemTypes = ['Array', 'String', 'Tree', 'Graph', 'Dynamic Programming'];
            labManual.problems = problemTypes.map((type, index) => {
              const id = `prob-${Date.now()}-${index}`;
              return {
                id,
                title: `${type} Challenge`,
                question: `# ${type} Problem\nImplement a solution using ${type}.`,
                hints: `Think about ${type} algorithms.`,
                labManualId: labManual.id,
                dateCreated: new Date().toISOString(),
              };
            });
          }
          resolve(labManual);
        } else {
          reject(new Error('Lab Manual not found'));
        }
      } else {
        reject(new Error('Experiment not found'));
      }
    }, 500);
  });
};

export const getProblemById = async (labManualId: string, problemId: string): Promise<any> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a random problem type
      const problemTypes = ['Array', 'String', 'Tree', 'Graph', 'Dynamic Programming'];
      const randomType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
      
      // Generate a sample problem
      const problem = generateSampleProblem(problemId, randomType);
      resolve(problem);
    }, 500);
  });
};
