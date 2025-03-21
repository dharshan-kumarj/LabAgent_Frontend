import { CodeProblem } from '../types';
import axios from 'axios';
import { SUPPORTED_LANGUAGES } from '../config/languages';

// Helper function to validate Two Sum results
const validateTwoSum = (nums: number[], target: number, result: number[]): boolean => {
  if (!result || result.length !== 2) return false;
  
  const [idx1, idx2] = result;
  if (idx1 < 0 || idx1 >= nums.length || idx2 < 0 || idx2 >= nums.length || idx1 === idx2) {
    return false;
  }
  
  return nums[idx1] + nums[idx2] === target;
};

// Parse the test case input into actual values
const parseInput = (input: string): { nums: number[], target: number } => {
  try {
    // Extract nums and target from string like "nums = [2,7,11,15], target = 9"
    const numsMatch = input.match(/nums\s*=\s*\[(.*?)\]/);
    const targetMatch = input.match(/target\s*=\s*(\d+)/);
    
    if (!numsMatch || !targetMatch) {
      throw new Error('Invalid input format');
    }
    
    const nums = numsMatch[1].split(',').map(num => parseInt(num.trim(), 10));
    const target = parseInt(targetMatch[1], 10);
    
    return { nums, target };
  } catch (error) {
    console.error('Error parsing input:', error);
    return { nums: [], target: 0 };
  }
};

// Parse the output string into an array of numbers
const parseOutput = (output: string): number[] => {
  try {
    // Parse output like "[0,1]" into [0, 1]
    const match = output.match(/\[(.*?)\]/);
    if (!match) {
      return [];
    }
    return match[1].split(',').map(num => parseInt(num.trim(), 10));
  } catch (error) {
    console.error('Error parsing output:', error);
    return [];
  }
};

// Helper function to prepare the full code for submission based on language
const prepareSubmissionCode = (userCode: string, language: string, input: string): string => {
  const { nums, target } = parseInput(input);
  
  switch (language.toLowerCase()) {
    case 'python':
      return `${userCode}

# Test code
nums = ${JSON.stringify(nums)}
target = ${target}
result = twoSum(nums, target)
print(result)`;
      
    case 'java':
      return `import java.util.*;

${userCode}

public class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = ${JSON.stringify(nums).replace('[', '{').replace(']', '}')};
        int target = ${target};
        int[] result = solution.twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}`;
      
    case 'c':
      return `${userCode}

int main() {
    int nums[] = {${nums.join(', ')}};
    int target = ${target};
    int returnSize;
    int* result = twoSum(nums, ${nums.length}, target, &returnSize);
    
    printf("[%d,%d]\\n", result[0], result[1]);
    free(result);
    return 0;
}`;
      
    default:
      return userCode;
  }
};

// Function to use Judge0 API for code execution
const executeWithJudge0 = async (code: string, languageName: string, stdin: string = ''): Promise<string> => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.name.toLowerCase() === languageName.toLowerCase());
  if (!language) {
    throw new Error(`Language ${languageName} not supported`);
  }

  try {
    const response = await axios.post('http://localhost:3001/submit', {
      source_code: code,
      language_id: parseInt(language.id),
      stdin: stdin
    });

    const result = response.data.result;
    
    if (result.status.id !== 3) { // Not Accepted
      if (result.stderr) {
        throw new Error(`Runtime Error: ${result.stderr}`);
      } else if (result.compile_output) {
        throw new Error(`Compilation Error: ${result.compile_output}`);
      } else if (result.message) {
        throw new Error(`Error: ${result.message}`);
      } else {
        throw new Error(`Execution Error: ${result.status.description}`);
      }
    }
    
    return result.stdout || '';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message;
      throw new Error(`API Error: ${errorMessage}`);
    }
    throw error;
  }
};

// The async validator function that will be called for each test case
// Inside validateTwoSumSolution function, modify these parts:

const validateTwoSumSolution = async (userCode: string, input: string): Promise<string> => {
    try {
      // Extract language from code (simplified - in real app you'd pass this in)
      let languageName = 'python';
      if (userCode.includes('class Solution')) {
        languageName = 'java';
      } else if (userCode.includes('#include')) {
        languageName = 'c';
      }
      
      // Prepare the full code with test harness
      const fullCode = prepareSubmissionCode(userCode, languageName, input);
      
      console.log('Executing code with Judge0:', languageName);
      
      // Execute code with Judge0
      const output = await executeWithJudge0(fullCode, languageName);
      console.log('Judge0 returned output:', output);
      
      // Parse the input and expected output
      const { nums, target } = parseInput(input);
      const result = parseOutput(output);
      
      // Log more details for debugging
      console.log('Parsed input:', { nums, target });
      console.log('Parsed output:', result);
      
      // Validate if the solution is correct
      const isValid = validateTwoSum(nums, target, result);
      
      if (!isValid) {
        throw new Error(`Invalid solution. Your output: ${output}`);
      }
      
      return output.trim();
    } catch (error) {
      console.error('Validation error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred during validation');
    }
};

export const sampleProblem: CodeProblem = {
  id: "two-sum",
  title: "Two Sum",
  difficulty: "Easy",
  description: `
# Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

## Example 1:

\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

## Example 2:

\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

## Example 3:

\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

## Constraints:

- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- **Only one valid answer exists.**
  `,
  exampleTestCases: [
    {
      id: 1,
      input: "nums = [2,7,11,15], target = 9",
      expectedOutput: "[0,1]",
      status: "pending"
    },
    {
      id: 2,
      input: "nums = [3,2,4], target = 6",
      expectedOutput: "[1,2]",
      status: "pending"
    },
    {
      id: 3,
      input: "nums = [3,3], target = 6",
      expectedOutput: "[0,1]",
      status: "pending"
    }
  ],
  hiddenTestCases: [
    {
      id: 4,
      input: "nums = [1,2,3,4,5], target = 9",
      expectedOutput: "[3,4]",
      status: "pending"
    },
    {
      id: 5,
      input: "nums = [-1,-2,-3,-4,-5], target = -8",
      expectedOutput: "[2,4]",
      status: "pending"
    }
  ],
  starterCode: {
    python: `def twoSum(nums, target):
    # Write your Python code here
    pass`,
    c: `#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your C code here
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    
    return result;
}`,
    java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your Java code here
        
        return new int[]{0, 0};
    }
}`
  },
  solution: {
    python: `def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []`,
    c: `#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    
    // Create a hash table
    struct {
        int value;
        int index;
        int used;
    } hash[numsSize];
    
    // Initialize hash table
    for (int i = 0; i < numsSize; i++) {
        hash[i].used = 0;
    }
    
    for (int i = 0; i < numsSize; i++) {
        int complement = target - nums[i];
        
        // Check if complement exists in hash table
        for (int j = 0; j < i; j++) {
            if (hash[j].used && hash[j].value == complement) {
                result[0] = hash[j].index;
                result[1] = i;
                return result;
            }
        }
        
        // Add current number to hash table
        hash[i].value = nums[i];
        hash[i].index = i;
        hash[i].used = 1;
    }
    
    // No solution found
    result[0] = -1;
    result[1] = -1;
    return result;
}`,
    java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}`
  },
  validateFn: validateTwoSumSolution
};