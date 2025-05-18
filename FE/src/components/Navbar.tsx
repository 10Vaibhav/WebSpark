import React from 'react';
import { motion } from 'framer-motion';
import { Code, Eye } from 'lucide-react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';


interface NavbarProps {
  activeTab: 'code' | 'preview';
  setActiveTab: (tab: 'code' | 'preview') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  return (
    <header className="border-b border-dark-800 bg-dark-900">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Logo />
        
        <div className="flex space-x-1 bg-dark-800 p-1 rounded-lg">
          <TabButton 
            isActive={activeTab === 'code'} 
            onClick={() => setActiveTab('code')}
            icon={<Code className="mr-2 h-4 w-4" />}
            label="Code"
          />
          <TabButton 
            isActive={activeTab === 'preview'} 
            onClick={() => setActiveTab('preview')}
            icon={<Eye className="mr-2 h-4 w-4" />}
            label="Preview"
          />
        </div>
        
        <div>
          <button
          className="btn btn-primary"
          onClick={()=> {
            navigate("/")
          }}
          >
            Back To Home
          </button>
        </div>
      </div>
    </header>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? 'text-white' : 'text-dark-300 hover:text-white'
      }`}
    >
      <span className="flex items-center">
        {icon}
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-dark-700 rounded-md"
          style={{ zIndex: -1 }}
          transition={{ type: 'spring', duration: 0.5 }}
        />
      )}
    </button>
  );
};

export default Navbar;