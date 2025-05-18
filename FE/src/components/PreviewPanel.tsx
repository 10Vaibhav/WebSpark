import React, { useEffect, useState } from 'react';
import { FileType } from '../types';

interface PreviewPanelProps {
  files: FileType[];
  isLoading: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ files }) => {
  const [previewHtml, setPreviewHtml] = useState('');
  
  useEffect(() => {
    if (files.length === 0) return;
    
    // Find React components and create a composite preview
    const appFile = files.find(file => file.path === 'src/App.tsx');
    const componentFiles = files.filter(file => 
      file.path.startsWith('src/components/') && file.path.endsWith('.tsx')
    );
    
    // Create a preview HTML that includes React setup
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://unpkg.com/framer-motion@10"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          ${files.find(f => f.path === 'src/index.css')?.content || ''}
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${componentFiles.map(f => f.content).join('\n')}
          ${appFile?.content || ''}
          
          ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
              <App />
            </React.StrictMode>
          );
        </script>
      </body>
      </html>
    `;
    
    setPreviewHtml(html);
  }, [files]);

  return (
    <div className="h-full w-full bg-white">
      {previewHtml ? (
        <iframe
          srcDoc={previewHtml}
          title="Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-900">
          <p className="text-dark-400">No preview available</p>
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;