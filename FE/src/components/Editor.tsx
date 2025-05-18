import React from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';

interface EditorProps {
  path: string;
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

const Editor: React.FC<EditorProps> = ({ 
  path, 
  language, 
  value, 
  onChange
}) => {
  const getLanguage = () => {
    if (!path) return 'javascript';
    
    const extension = path.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'jsx':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'tsx':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'javascript';
    }
  };

  return (
    <div className="h-full w-full relative">
      {!path ? (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-900">
          <p className="text-dark-400">Select a file to view its content</p>
        </div>
      ) : (
        <MonacoEditor
          height="100%"
          language={getLanguage()}
          value={value}
          onChange={onChange}
          theme="vs-dark"
          options={{
            fontFamily: 'SF Mono, Menlo, Monaco, Consolas, monospace',
            fontSize: 14,
            lineHeight: 1.5,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            readOnly: true,
          }}
        />
      )}
    </div>
  );
};

export default Editor;