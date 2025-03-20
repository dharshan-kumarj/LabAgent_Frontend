import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface JudgeResponse {
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

interface Language {
    id: string;
    name: string;
    fileExtension: string;
    defaultTemplate: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
    {
        id: '71',
        name: 'Python',
        fileExtension: '.py',
        defaultTemplate: 'print("hi")\n'
    },
    {
        id: '48',
        name: 'C',
        fileExtension: '.c',
        defaultTemplate: 
`#include <stdio.h>

int main() {
    // Write your C code here
    return 0;
}`,
    },
    {
        id: '62',
        name: 'Java',
        fileExtension: '.java',
        defaultTemplate:
`public class Main {
    public static void main(String[] args) {
        // Write your Java code here
    }
}`,
    }
];

function App() {
    const [sourceCode, setSourceCode] = useState(SUPPORTED_LANGUAGES[0].defaultTemplate);
    const [languageId, setLanguageId] = useState(SUPPORTED_LANGUAGES[0].id);
    const [stdin, setStdin] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLang = SUPPORTED_LANGUAGES.find(lang => lang.id === e.target.value);
        if (selectedLang) {
            setLanguageId(selectedLang.id);
            // Only set the template if the current code is empty or matches another template
            if (!sourceCode.trim() || SUPPORTED_LANGUAGES.some(lang => sourceCode === lang.defaultTemplate)) {
                setSourceCode(selectedLang.defaultTemplate);
            }
        }
    };

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
                source_code: sourceCode.trim(),
                language_id: parseInt(languageId),
                stdin: stdin.trim()
            });

            const result = response.data.result;
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

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={`App container-fluid ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <header className="d-flex justify-content-between p-3 bg-dark text-white">
                <button onClick={toggleFullScreen} className="btn btn-primary">
                    {document.fullscreenElement ? 'Exit Full Screen' : 'Full Screen'}
                </button>
                <button onClick={toggleDarkMode} className="btn btn-secondary">
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>
            <div className="code-editor container">
                <h2>Code Editor</h2>
                <div className="language-selector mb-3">
                    <label htmlFor="language-select" className="form-label">Select Language: </label>
                    <select
                        id="language-select"
                        value={languageId}
                        onChange={handleLanguageChange}
                        disabled={isLoading}
                        className="form-select"
                    >
                        {SUPPORTED_LANGUAGES.map(lang => (
                            <option key={lang.id} value={lang.id}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
                <textarea
                    value={sourceCode}
                    onChange={(e) => setSourceCode(e.target.value)}
                    placeholder={`Write your ${SUPPORTED_LANGUAGES.find(lang => lang.id === languageId)?.name} code here...`}
                    className="code-input form-control mb-3"
                    disabled={isLoading}
                    rows={10}
                />
                <div className="input-section">
                    <h3>Input (Optional)</h3>
                    <textarea
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        placeholder="Enter program input here..."
                        className="stdin-input form-control mb-3"
                        disabled={isLoading}
                        rows={5}
                    />
                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="btn btn-success mb-3"
                >
                    {isLoading ? 'Running...' : 'Run Code'}
                </button>
                
                {statusMessage && (
                    <div className="alert alert-info">
                        {statusMessage}
                    </div>
                )}
                
                {error && (
                    <div className="error-output alert alert-danger">
                        <h3>Error</h3>
                        <pre>{error}</pre>
                    </div>
                )}
                
                {output && (
                    <div className="code-output alert alert-success">
                        <h3>Output</h3>
                        <pre>{output}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;