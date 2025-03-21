import { useEffect, useState } from 'react';
import Split from 'react-split';
import { useLocalStorage } from '@mantine/hooks';
import Header from './components/header';
import ProblemDescription from './components/problemdescription';
import CodeEditor from './components/codeeditor';
import TestCasesPanel from './components/testcasespanel';
import { sampleProblem } from './data/sampleproblem';
import { TestCase } from './types';
import { getLanguageByName } from './config/languages';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage({
    key: 'dark-mode',
    defaultValue: true,
  });
  
  const [testCases, setTestCases] = useState<TestCase[]>(
    sampleProblem.exampleTestCases
  );
  
  const [currentLanguage, setCurrentLanguage] = useState('python');
  const [isRunning, setIsRunning] = useState(false);
  const [runningTestId, setRunningTestId] = useState<number | null>(null);
  const [consoleError, setConsoleError] = useState<string | null>(null);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'theme-dark' : 'theme-light';
  }, [isDarkMode]);

  // Update the handleRunCode function to improve error handling and output capture

const handleRunCode = async (code: string, language: string) => {
    setIsRunning(true);
    setConsoleError(null);
    setCurrentLanguage(language.toLowerCase());
    
    console.log(`Running code in ${language} language`);
    
    // Reset all test cases to pending
    const updatedTestCases = testCases.map((testCase) => ({
      ...testCase,
      status: 'pending' as const,
      userOutput: undefined
    }));
    setTestCases(updatedTestCases);
    
    try {
      // Run each test case sequentially
      for (let i = 0; i < updatedTestCases.length; i++) {
        const testCase = updatedTestCases[i];
        
        // Update this test case to running status
        setRunningTestId(testCase.id);
        setTestCases(prev => prev.map(tc => 
          tc.id === testCase.id 
            ? { ...tc, status: 'running' as const } 
            : tc
        ));
        
        try {
          console.log(`Running test case ${testCase.id}: ${testCase.input}`);
          // Use the validateFn from the problem to execute this test case
          const output = await sampleProblem.validateFn(code, testCase.input);
          console.log(`Test case ${testCase.id} succeeded with output:`, output);
          
          // Update this test case with the results
          setTestCases(prev => prev.map(tc => 
            tc.id === testCase.id 
              ? { 
                  ...tc, 
                  status: 'passed' as const,
                  userOutput: output 
                } 
              : tc
          ));
        } catch (error) {
          console.error(`Test case ${testCase.id} failed:`, error);
          // Set the error for this specific test case
          let errorMessage = 'An unknown error occurred';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          
          setConsoleError(errorMessage);
          
          // Update this test case with failure status and any output we received
          setTestCases(prev => prev.map(tc => 
            tc.id === testCase.id 
              ? { 
                  ...tc, 
                  status: 'failed' as const,
                  userOutput: `Error: ${errorMessage}`
                } 
              : tc
          ));
          
          // Stop running further test cases after a failure
          break;
        }
      }
    } catch (error) {
      console.error('Error running code:', error);
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setConsoleError(`Execution error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
      setRunningTestId(null);
    }
  };

  return (
    <>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="flex-grow-1 overflow-hidden">
        <Split
          className="split split-horizontal"
          sizes={[40, 60]}
          minSize={300}
          gutterSize={8}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <div className="h-100 overflow-hidden">
            <ProblemDescription problem={sampleProblem} />
          </div>
          
          <div className="h-100 d-flex flex-column overflow-hidden">
            <Split
              className="split split-vertical"
              sizes={[70, 30]}
              minSize={100}
              gutterSize={8}
              gutterAlign="center"
              snapOffset={30}
              dragInterval={1}
              direction="vertical"
              cursor="row-resize"
            >
              <div className="overflow-hidden">
                <CodeEditor
                  initialCode={sampleProblem.starterCode[currentLanguage as keyof typeof sampleProblem.starterCode]}
                  language={currentLanguage}
                  onRun={handleRunCode}
                  theme={isDarkMode ? 'vs-dark' : 'vs-light'}
                  isRunning={isRunning}
                />
              </div>
              <div className="overflow-hidden">
                <TestCasesPanel 
                  testCases={testCases} 
                  runningTestId={runningTestId}
                  error={consoleError}
                />
              </div>
            </Split>
          </div>
        </Split>
      </div>
    </>
  );
}

export default App;