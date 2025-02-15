import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface JudgeResponse {
    stdout: string | null;
    stderr: string | null;
    compile_output: string | null;
    message: string | null;
    status: {
        id: number;
        description: string;
    };
}

function App() {
    const [sourceCode, setSourceCode] = useState('');
    const [languageId, setLanguageId] = useState('71'); // Python
    const [stdin, setStdin] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async () => {
        if (!sourceCode.trim()) {
            setError('Please enter some code before submitting.');
            return;
        }

        setError('');
        setOutput('');
        setStatusMessage('Submitting code...');
        setIsLoading(true);

        try {
            const response = await axios.post<JudgeResponse>('http://localhost:3001/submit', {
                sourceCode: sourceCode.trim(),
                languageId: parseInt(languageId),
                stdin: stdin.trim()
            });

            const result = response.data;
            console.log('Submission result:', result);

            // Handle different status codes
            switch (result.status.id) {
                case 3: // Accepted
                    setOutput(result.stdout || 'Program executed successfully with no output');
                    break;
                case 4: // Wrong Answer
                    setError(`Wrong Answer: ${result.stdout || 'No output'}`);
                    break;
                case 5: // Time Limit Exceeded
                    setError('Time Limit Exceeded');
                    break;
                case 6: // Compilation Error
                    setError(`Compilation Error: ${result.compile_output}`);
                    break;
                default:
                    if (result.stderr) {
                        setError(`Runtime Error: ${result.stderr}`);
                    } else if (result.compile_output) {
                        setError(`Compilation Error: ${result.compile_output}`);
                    } else if (result.message) {
                        setError(`Error: ${result.message}`);
                    } else {
                        setError(`Submission Error: ${result.status.description}`);
                    }
            }
        } catch (error) {
            console.error('Error details:', error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error || error.message;
                const errorDetails = error.response?.data?.details;
                setError(`Submission Error: ${errorMessage}\n${JSON.stringify(errorDetails, null, 2)}`);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
            setStatusMessage('');
        }
    };

    return (
        <div className="App">
            <div className="code-editor">
                <h2>Python Code Editor</h2>
                <textarea
                    value={sourceCode}
                    onChange={(e) => setSourceCode(e.target.value)}
                    placeholder="Write your Python code here..."
                    className="code-input"
                    disabled={isLoading}
                />
                <div className="input-section">
                    <h3>Input (Optional)</h3>
                    <textarea
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        placeholder="Enter program input here..."
                        className="stdin-input"
                        disabled={isLoading}
                    />
                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="submit-button"
                >
                    {isLoading ? 'Running...' : 'Run Code'}
                </button>
                
                {statusMessage && (
                    <div className="status-message">
                        {statusMessage}
                    </div>
                )}
                
                {error && (
                    <div className="error-output">
                        <h3>Error</h3>
                        <pre>{error}</pre>
                    </div>
                )}
                
                {output && (
                    <div className="code-output">
                        <h3>Output</h3>
                        <pre>{output}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;