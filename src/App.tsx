import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [sourceCode, setSourceCode] = useState('');
    const [languageId, setLanguageId] = useState('71'); // Python (3.8.1)
    const [stdin, setStdin] = useState(''); // Sample input
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError(''); // Clear previous errors
        setOutput(''); // Clear previous output
        try {
            console.log('Submitting code...');
            const response = await axios.post('http://localhost:3001/submit', {
                sourceCode,
                languageId,
                stdin
            });
            console.log('Code submitted successfully:', response.data);
            setOutput(response.data.stdout || response.data.stderr || JSON.stringify(response.data));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error submitting code:', error.response ? error.response.data : error.message);
                setError(error.response ? error.response.data.error : 'Failed to submit the code. Please try again.');
            } else {
                console.error('Error submitting code:', error);
                setError('Failed to submit the code. Please try again.');
            }
        }
    };

    return (
        <div className="App">
            <div className="left-panel">
                <h2>Problem Statement</h2>
                <p>Write a Python program that prints "Hello, World!".</p>
                <p>Sample Input:</p>
                <textarea value={stdin} onChange={(e) => setStdin(e.target.value)}></textarea>
                <p>Sample Output:</p>
                <pre>Hello, World!</pre>
            </div>
            <div className="right-panel">
                <div className="code-editor">
                    <h2>Code Editor</h2>
                    <textarea
                        value={sourceCode}
                        onChange={(e) => setSourceCode(e.target.value)}
                        placeholder="Write your code here..."
                    ></textarea>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                <div className="test-results">
                    <h2>Test Results</h2>
                    {error && <p className="error">{error}</p>}
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
}

export default App;