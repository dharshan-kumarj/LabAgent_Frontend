import { useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { SUPPORTED_LANGUAGES, getLanguageById } from '../config/languages';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  onRun: (code: string, language: string) => void;
  theme: 'vs-light' | 'vs-dark';
  isRunning: boolean;
}

const CodeEditor = ({ initialCode, language, onRun, theme, isRunning }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [selectedLanguageId, setSelectedLanguageId] = useState(
    SUPPORTED_LANGUAGES.find(lang => lang.name.toLowerCase() === language.toLowerCase())?.id || '71'
  );
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null); // Add this to store the Monaco instance

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco; // Store the Monaco instance
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleRun = () => {
    const language = getLanguageById(selectedLanguageId).name;
    onRun(code, language);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguageId = e.target.value;
    setSelectedLanguageId(newLanguageId);
    
    // Get the language object
    const language = getLanguageById(newLanguageId);
    
    // Update editor language - use monacoRef instead of the global monaco
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, getMonacoLanguage(newLanguageId));
      }
    }
  };

  // Map the language ID to Monaco editor language
  const getMonacoLanguage = (languageId: string): string => {
    const lang = getLanguageById(languageId);
    switch (lang.name.toLowerCase()) {
      case 'python':
        return 'python';
      case 'c':
        return 'c';
      case 'java':
        return 'java';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="code-editor-container">
      <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
        <div>
          <select 
            className="form-select form-select-sm" 
            style={{ width: '140px' }}
            value={selectedLanguageId}
            onChange={handleLanguageChange}
            disabled={isRunning}
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button 
          className="btn btn-primary btn-sm d-flex align-items-center gap-1"
          onClick={handleRun}
          disabled={isRunning}
        >
          <i className="bi bi-play-fill"></i>
          <span>{isRunning ? 'Running...' : 'Run'}</span>
        </button>
      </div>
      <div className="editor-wrapper">
        <Editor
          height="100%"
          defaultLanguage={getMonacoLanguage(selectedLanguageId)}
          defaultValue={initialCode}
          theme={theme}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;