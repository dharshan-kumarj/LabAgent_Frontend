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
