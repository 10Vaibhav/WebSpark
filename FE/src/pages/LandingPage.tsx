import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, FileCode, Sparkles } from 'lucide-react';
import Logo from '../components/Logo';

const LandingPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);

    // Simulate processing time
    setTimeout(() => {
      // Store the prompt in sessionStorage to use it in the workspace
      sessionStorage.setItem('userPrompt', prompt);
      navigate('/workspace');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <Logo />
        <nav>
          <a
            href="https://github.com/10Vaibhav"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <Code className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
            Create Beautiful Websites with AI
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-dark-300">
            Describe your idea, and we'll generate the code for you
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="glass-panel p-6 mb-6">
              <div className="relative">
                <textarea
                  className="input min-h-32 resize-none"
                  placeholder="Describe the website you want to create..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
                <div className="absolute top-3 right-3">
                  <Sparkles className="h-5 w-5 text-primary-400" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="btn btn-primary min-w-40 relative overflow-hidden group"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <FileCode className="mr-2 h-5 w-5" />
                  Generate Website
                </span>
              )}
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ mixBlendMode: 'overlay' }}
                initial={false}
                animate={{ opacity: isLoading ? 0.5 : 0 }}
              />
            </button>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
        >
          {features.map((feature, index) => (
            <div key={index} className="glass-panel p-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-dark-300">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </main>

      <footer className="container mx-auto py-6 px-4 text-center text-dark-400 border-t border-dark-800">
        <p>© 2025 WebCraft. Built with modern web technologies.</p>
      </footer>
    </div>
  );
};

const features = [
  {
    title: 'AI-Powered Generation',
    description: 'Describe your website and watch as AI transforms your ideas into code.',
    icon: Sparkles,
  },
  {
    title: 'Modern Tech Stack',
    description: 'Generate websites with the latest technologies like React, Next.js, and more.',
    icon: Code,
  },
  {
    title: 'Instant Preview',
    description: 'See your website come to life immediately with a live preview.',
    icon: FileCode,
  },
];

export default LandingPage;