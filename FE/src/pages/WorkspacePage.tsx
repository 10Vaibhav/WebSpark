import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '../components/Editor';
import Sidebar from '../components/Sidebar';
import FileExplorer from '../components/FileExplorer';
import Navbar from '../components/Navbar';
import PreviewPanel from '../components/PreviewPanel';
import { mockGenerateFiles } from '../utils/mockData';
import { useProjectStore } from '../store/projectStore';

const WorkspacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { files, setFiles, steps, setSteps } = useProjectStore();
  const [isGenerating, setIsGenerating] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const userPrompt = sessionStorage.getItem('userPrompt') || 'A modern web application';
    
    setIsGenerating(true);
    
    // Simulate file generation with more realistic timing
    setTimeout(() => {
      const { generatedFiles, generatedSteps } = mockGenerateFiles(userPrompt);
      setFiles(generatedFiles);
      setSteps(generatedSteps);
      setSelectedFile(generatedFiles[0]?.path);
    }, 2000);
    
    // Simulate step-by-step execution with varying intervals
    const stepIntervals = [300, 250, 400, 350, 200, 300, 250, 300, 250, 200];
    let currentStep = 0;
    
    const executeNextStep = () => {
      if (currentStep < stepIntervals.length) {
        setTimeout(() => {
          setCurrentStepIndex(currentStep);
          currentStep++;
          if (currentStep === stepIntervals.length) {
            setIsGenerating(false);
          } else {
            executeNextStep();
          }
        }, stepIntervals[currentStep]);
      }
    };
    
    executeNextStep();
    
    return () => {
      // Cleanup timeouts if component unmounts
      setIsGenerating(false);
    };
  }, [setFiles, setSteps]);

  const selectedFileContent = files.find(f => f.path === selectedFile)?.content || '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-grow flex overflow-hidden">
        <Sidebar 
          steps={steps} 
          currentStepIndex={currentStepIndex} 
          isGenerating={isGenerating} 
        />

        <main className="flex-grow flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'code' ? (
              <motion.div
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-grow flex overflow-hidden"
              >
                <FileExplorer 
                  files={files}
                  selectedFile={selectedFile}
                  onSelectFile={setSelectedFile}
                  isLoading={isGenerating}
                />
                
                <div className="flex-grow overflow-hidden">
                  <Editor
                    path={selectedFile || ''}
                    language={selectedFile?.split('.').pop() || 'javascript'}
                    value={selectedFileContent}
                    onChange={() => {}}
                    isLoading={isGenerating}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-grow"
              >
                <PreviewPanel files={files} isLoading={isGenerating} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default WorkspacePage