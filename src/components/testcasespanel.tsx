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
    <div className="test-case-panel" style={{ backgroundColor: '#222', color: '#fff', padding: '10px', borderRadius: '8px' }}>
      <ul className="nav nav-tabs" style={{ borderBottom: '1px solid #555' }}>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'test-cases' ? 'active' : ''}`}
            onClick={() => setActiveTab('test-cases')}
            style={{
              backgroundColor: activeTab === 'test-cases' ? '#444' : 'transparent',
              color: '#fff',
              borderRadius: '5px 5px 0 0'
            }}
          >
            Test Cases
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'console' ? 'active' : ''}`}
            onClick={() => setActiveTab('console')}
            style={{
              backgroundColor: activeTab === 'console' ? '#444' : 'transparent',
              color: '#fff',
              borderRadius: '5px 5px 0 0'
            }}
          >
            Console
          </button>
        </li>
      </ul>
      <div className="test-case-content p-2">
        {activeTab === 'test-cases' ? (
          <div className="d-flex flex-column gap-2">
            {testCases.map((testCase) => (
              <div key={testCase.id} className="card" style={{ backgroundColor: '#333', color: '#fff', border: '1px solid #555' }}>
                <div className="card-body py-2">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0" style={{ fontSize: '16px' }}>Test Case {testCase.id}</h6>
                    <div>
                      {testCase.status === 'passed' && (
                        <span className="passed d-flex align-items-center" style={{ color: '#4caf50' }}>
                          <i className="bi bi-check-circle me-1"></i> Passed
                        </span>
                      )}
                      {testCase.status === 'failed' && (
                        <span className="failed d-flex align-items-center" style={{ color: '#e74c3c' }}>
                          <i className="bi bi-x-circle me-1"></i> Failed
                        </span>
                      )}
                      {testCase.status === 'running' && (
                        <span className="text-primary d-flex align-items-center" style={{ color: '#f1c40f' }}>
                          <div className="spinner-border spinner-border-sm me-1" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Running
                        </span>
                      )}
                      {testCase.status === 'pending' && (
                        <span className="pending" style={{ color: '#888' }}>
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
                      <strong>Your Output:</strong> 
                      <pre className="d-inline mb-0" style={{ backgroundColor: '#444', padding: '4px 6px', borderRadius: '5px' }}>
                        {testCase.userOutput}
                      </pre>
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
                <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '14px', backgroundColor: '#444', padding: '6px', borderRadius: '5px' }}>{error}</pre>
              </div>
            ) : (
              testCases.some(tc => tc.userOutput) ? (
                <div>
                  <h6 style={{ fontSize: '16px' }}>Execution Results:</h6>
                  {testCases.map(tc => tc.userOutput && (
                    <div key={tc.id} className="mb-2">
                      <div className="small text-muted mb-1" style={{ color: '#bbb' }}>Test Case {tc.id} Output:</div>
                      <pre className="p-2 rounded" style={{ backgroundColor: '#444', padding: '6px', borderRadius: '5px', whiteSpace: 'pre-wrap', fontSize: '14px' }}>{tc.userOutput}</pre>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted" style={{ color: '#bbb' }}>
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
