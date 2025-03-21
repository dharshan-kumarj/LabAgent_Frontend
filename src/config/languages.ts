import { Language } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    id: '71',
    name: 'Python',
    fileExtension: '.py',
    defaultTemplate: 'def twoSum(nums, target):\n    # Write your code here\n    pass'
  },
  {
    id: '48',
    name: 'C',
    fileExtension: '.c',
    defaultTemplate: 
`#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your code here
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    
    return result;
}`
  },
  {
    id: '62',
    name: 'Java',
    fileExtension: '.java',
    defaultTemplate:
`import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        
        return new int[]{0, 0};
    }
}`
  }
];

export const getLanguageById = (id: string): Language => {
  const lang = SUPPORTED_LANGUAGES.find(lang => lang.id === id);
  if (!lang) {
    return SUPPORTED_LANGUAGES[0]; // Default to Python
  }
  return lang;
};

export const getLanguageByName = (name: string): Language => {
  const normalizedName = name.toLowerCase();
  const lang = SUPPORTED_LANGUAGES.find(lang => 
    lang.name.toLowerCase() === normalizedName
  );
  if (!lang) {
    return SUPPORTED_LANGUAGES[0]; // Default to Python
  }
  return lang;
};