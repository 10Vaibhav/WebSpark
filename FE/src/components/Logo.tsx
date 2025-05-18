import React from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
      <div className="h-8 w-8 rounded bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
        <Code2 className="h-5 w-5 text-white" />
      </div>
      <span>WebSpark</span>
    </Link>
  );
};

export default Logo;