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
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
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
    
    const language = getLanguageById(newLanguageId);
    
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, getMonacoLanguage(newLanguageId));
      }
    }
  };

  const getMonacoLanguage = (languageId: string): string => {
    const lang = getLanguageById(languageId);
    switch (lang.name.toLowerCase()) {
      case 'python': return 'python';
      case 'c': return 'c';
      case 'java': return 'java';
      default: return 'plaintext';
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        background: theme === 'vs-dark' ? '#1e1e1e' : '#f5f5f5'
      }}>
        <select 
          style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
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
        <button 
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.6 : 1
          }}
          onClick={handleRun}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Editor
          height="100%"
          width="100%"
            language={getMonacoLanguage(selectedLanguageId)}
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
