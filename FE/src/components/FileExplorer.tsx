import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, FolderOpen, File, ChevronRight, ChevronDown } from 'lucide-react';
import { FileType } from '../types';

interface FileExplorerProps {
  files: FileType[];
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ 
  files, 
  selectedFile, 
  onSelectFile
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/']));
  
  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };
  
  // Build folder structure
  const folderStructure: Record<string, string[]> = { '/': [] };
  
  files.forEach(file => {
    const parts = file.path.split('/');
    let currentPath = '';
    
    parts.forEach((part, index) => {
      const parentPath = currentPath || '/';
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      
      if (index < parts.length - 1) {
        if (!folderStructure[currentPath]) {
          folderStructure[currentPath] = [];
          if (!folderStructure[parentPath]?.includes(currentPath)) {
            folderStructure[parentPath] = [...(folderStructure[parentPath] || []), currentPath];
          }
        }
      } else {
        if (!folderStructure[parentPath]?.includes(file.path)) {
          folderStructure[parentPath] = [...(folderStructure[parentPath] || []), file.path];
        }
      }
    });
  });
  
  const renderFileTree = (folderPath: string, level = 0) => {
    const children = folderStructure[folderPath] || [];
    
    return (
      <ul className={level === 0 ? "" : "ml-4"}>
        {children.map((path) => {
          const isFolder = folderStructure[path] !== undefined;
          const isExpanded = expandedFolders.has(path);
          const name = path.split('/').pop() || path;
          
          return (
            <li key={path} className="my-1">
              <div 
                className={`flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-dark-800 ${
                  !isFolder && selectedFile === path ? 'bg-dark-800 text-primary-400' : ''
                }`}
                onClick={() => isFolder ? toggleFolder(path) : onSelectFile(path)}
              >
                {isFolder ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFolder(path);
                      }}
                      className="mr-1 h-4 w-4 flex items-center justify-center"
                    >
                      {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </button>
                    {isExpanded ? 
                      <FolderOpen className="h-4 w-4 mr-2 text-primary-400" /> : 
                      <Folder className="h-4 w-4 mr-2 text-dark-400" />
                    }
                  </>
                ) : (
                  <File className="h-4 w-4 mr-2 ml-4 text-dark-400" />
                )}
                <span className="text-sm truncate">{name}</span>
              </div>
              
              {isFolder && isExpanded && renderFileTree(path, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="w-64 border-r border-dark-800 overflow-y-auto">
      <div className="p-3 border-b border-dark-800">
        <h3 className="font-medium flex items-center">
          <Folder className="h-4 w-4 mr-2 text-dark-400" />
          Project Files
        </h3>
      </div>
      
      <div className="p-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {renderFileTree('/')}
        </motion.div>
      </div>
    </div>
  );
};

export default FileExplorer;

