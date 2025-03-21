import { useState } from 'react';
import { TestCase } from '../types';

interface TestCasesPanelProps {
  testCases: TestCase[];
  runningTestId: number | null;
  error: string | null;
}

const TestCasesPanel = ({ testCases, runningTestId, error }: TestCasesPanelProps) => {
  const [activeTab, setActiveTab] = useState<'test-cases' | 'console'>('test-cases');

  return (
    <div className="test-case-panel">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'test-cases' ? 'active' : ''}`}
            onClick={() => setActiveTab('test-cases')}
          >
            Test Cases
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'console' ? 'active' : ''}`}
            onClick={() => setActiveTab('console')}
          >
            Console
          </button>
        </li>
      </ul>
      <div className="test-case-content p-2">
        {activeTab === 'test-cases' ? (
          <div className="d-flex flex-column gap-2">
            {testCases.map((testCase) => (
              <div
                key={testCase.id}
                className="card"
              >
                <div className="card-body py-2">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Test Case {testCase.id}</h6>
                    <div>
                      {testCase.status === 'passed' && (
                        <span className="passed d-flex align-items-center">
                          <i className="bi bi-check-circle me-1"></i> Passed
                        </span>
                      )}
                      {testCase.status === 'failed' && (
                        <span className="failed d-flex align-items-center">
                          <i className="bi bi-x-circle me-1"></i> Failed
                        </span>
                      )}
                      {testCase.status === 'running' && (
                        <span className="text-primary d-flex align-items-center">
                          <div className="spinner-border spinner-border-sm me-1" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Running
                        </span>
                      )}
                      {testCase.status === 'pending' && (
                        <span className="pending">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="small mb-1">
                    <strong>Input:</strong> {testCase.input}
                  </div>
                  <div className="small mb-1">
                    <strong>Expected:</strong> {testCase.expectedOutput}
                  </div>
                  {testCase.userOutput && (
                    <div className="small mb-0">
                      <strong>Your Output:</strong> <pre className="d-inline mb-0">{testCase.userOutput}</pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2 font-monospace small">
            {error ? (
              <div className="alert alert-danger mb-0">
                <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{error}</pre>
              </div>
            ) : (
              testCases.some(tc => tc.userOutput) ? (
                <div>
                  <h6>Execution Results:</h6>
                  {testCases.map(tc => tc.userOutput && (
                    <div key={tc.id} className="mb-2">
                      <div className="small text-muted mb-1">Test Case {tc.id} Output:</div>
                      <pre className="bg-light p-2 rounded" style={{ whiteSpace: 'pre-wrap' }}>{tc.userOutput}</pre>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted">
                  &gt; Console output will appear here after running your code
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCasesPanel;