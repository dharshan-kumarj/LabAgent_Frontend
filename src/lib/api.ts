import { Experiment } from '@/types/experiment';
import { mockExperiments } from '@/lib/mockData';

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
