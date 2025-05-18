import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface SidebarProps {
  steps: string[];
  currentStepIndex: number;
  isGenerating: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ steps, currentStepIndex, isGenerating }) => {
  return (
    <aside className="w-80 border-r border-dark-800 bg-dark-900 overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-dark-800">
        <h2 className="text-lg font-semibold">Generation Steps</h2>
        <p className="text-sm text-dark-300">Progress of your website creation</p>
      </div>
      
      <div className="flex-grow p-4">
        <ul className="space-y-3">
          {steps.map((step, index) => (
            <StepItem
              key={index}
              step={step}
              status={
                index === currentStepIndex && isGenerating
                  ? 'in-progress'
                  : index < currentStepIndex
                  ? 'completed'
                  : 'pending'
              }
            />
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-dark-800">
        <button className="btn btn-secondary w-full">
          Regenerate
        </button>
      </div>
    </aside>
  );
};

interface StepItemProps {
  step: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const StepItem: React.FC<StepItemProps> = ({ step, status }) => {
  return (
    <li className="flex items-start gap-3 p-3 rounded-lg">
      <div className="mt-0.5 flex-shrink-0">
        {status === 'completed' ? (
          <CheckCircle2 className="h-5 w-5 text-success-500" />
        ) : status === 'in-progress' ? (
          <div className="animate-spin">
            <Loader2 className="h-5 w-5 text-primary-500" />
          </div>
        ) : (
          <Circle className="h-5 w-5 text-dark-500" />
        )}
      </div>
      <div>
        <p className={`text-sm font-medium ${
          status === 'completed' ? 'text-dark-50' : 
          status === 'in-progress' ? 'text-primary-400' : 
          'text-dark-400'
        }`}>
          {step}
        </p>
      </div>
    </li>
  );
};

export default Sidebar;