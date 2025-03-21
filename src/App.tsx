import { useEffect, useState } from "react";
import Split from "react-split";
import { useLocalStorage } from "@mantine/hooks";
import Header from "./components/header";
import ProblemDescription from "./components/problemdescription";
import CodeEditor from "./components/codeeditor";
import TestCasesPanel from "./components/testcasespanel";
import { sampleProblem } from "./data/sampleproblem";
import { TestCase } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage({
    key: "dark-mode",
    defaultValue: true,
  });

  const [testCases, setTestCases] = useState<TestCase[]>(sampleProblem.exampleTestCases);
  const [currentLanguage, setCurrentLanguage] = useState("python");
  const [isRunning, setIsRunning] = useState(false);
  const [runningTestId, setRunningTestId] = useState<number | null>(null);
  const [consoleError, setConsoleError] = useState<string | null>(null);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "theme-dark" : "theme-light";
  }, [isDarkMode]);

  const handleRunCode = async (code: string, language: string) => {
    setIsRunning(true);
    setConsoleError(null);
    setCurrentLanguage(language.toLowerCase());

    console.log(`Running code in ${language} language`);

    setTestCases((prev) =>
      prev.map((testCase) => ({
        ...testCase,
        status: "pending" as const,
        userOutput: undefined,
      }))
    );

    try {
      for (const testCase of testCases) {
        setRunningTestId(testCase.id);

        setTestCases((prev) =>
          prev.map((tc) =>
            tc.id === testCase.id ? { ...tc, status: "running" as const } : tc
          )
        );

        try {
          console.log(`Running test case ${testCase.id}: ${testCase.input}`);
          const output = await sampleProblem.validateFn(code, testCase.input);
          console.log(`Test case ${testCase.id} succeeded with output:`, output);

          setTestCases((prev) =>
            prev.map((tc) =>
              tc.id === testCase.id
                ? { ...tc, status: "passed" as const, userOutput: output }
                : tc
            )
          );
        } catch (error) {
          console.error(`Test case ${testCase.id} failed:`, error);
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          setConsoleError(errorMessage);

          setTestCases((prev) =>
            prev.map((tc) =>
              tc.id === testCase.id
                ? { ...tc, status: "failed" as const, userOutput: `Error: ${errorMessage}` }
                : tc
            )
          );
          break;
        }
      }
    } catch (error) {
      console.error("Error running code:", error);
      setConsoleError(`Execution error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
      setRunningTestId(null);
    }
  };

  return (
    <>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="flex-grow-1 overflow-hidden d-flex">
        <Split
          className="split split-horizontal w-100 h-100"
          sizes={[40, 60]}
          minSize={300}
          gutterSize={8}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          {/* Left Panel - Problem Description */}
          <div className="h-100 overflow-auto p-3">
            <ProblemDescription problem={sampleProblem} />
          </div>

          {/* Right Panel - Code Editor & Test Cases */}
          <div className="h-100 d-flex flex-column overflow-hidden w-100">
            <Split
              className="split split-vertical h-100"
              sizes={[70, 30]}
              minSize={100}
              gutterSize={8}
              gutterAlign="center"
              snapOffset={30}
              dragInterval={1}
              direction="vertical"
              cursor="row-resize"
            >
              {/* Code Editor */}
              <div className="overflow-hidden h-100 p-2">
                <CodeEditor
                  initialCode={sampleProblem.starterCode[currentLanguage as keyof typeof sampleProblem.starterCode]}
                  language={currentLanguage}
                  onRun={handleRunCode}
                  theme={isDarkMode ? "vs-dark" : "vs-light"}
                  isRunning={isRunning}
                />
              </div>

              {/* Test Cases Panel */}
              <div className="overflow-auto h-100 p-2">
                <TestCasesPanel testCases={testCases} runningTestId={runningTestId} error={consoleError} />
              </div>
            </Split>
          </div>
        </Split>
      </div>
    </>
  );
}

export default App;
