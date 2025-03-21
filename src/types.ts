export interface TestCase {
    id: number;
    input: string;
    expectedOutput: string;
    userOutput?: string;
    status?: 'passed' | 'failed' | 'pending' | 'running';
  }
  
  export interface CodeProblem {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    exampleTestCases: TestCase[];
    hiddenTestCases: TestCase[];
    starterCode: {
      java: string;
      c: string;
      python: string;
    };
    solution: {
      java: string;
      c: string;
      python: string;
    };
    validateFn: (userCode: string, input: string) => Promise<string>;
  }
  
  export interface Language {
    id: string;
    name: string;
    fileExtension: string;
    defaultTemplate: string;
  }
  
  export interface JudgeResponse {
    result: {
      stdout: string | null;
      stderr: string | null;
      compile_output: string | null;
      message: string | null;
      status: {
        id: number;
        description: string;
      };
    };
  }