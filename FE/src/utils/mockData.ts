export const mockGenerateFiles = (prompt: string) => {
  const generatedSteps = [
    'Analyzing website requirements from prompt',
    'Planning component structure',
    'Creating HTML markup',
    'Implementing responsive design',
    'Adding Tailwind CSS styles',
    'Building React components',
    'Implementing animations',
    'Adding user interactions',
    'Optimizing performance',
    'Running final checks'
  ];
  
  // Generate sample files based on the prompt
  const pageTitle = prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt;
  
  const generatedFiles = [
    {
      path: 'index.html',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="A beautiful website created with AI">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`
    },
    {
      path: 'src/App.tsx',
      content: `import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Contact } from './components/Contact';

const App: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Features />
        <Contact />
      </motion.div>
    </Layout>
  );
};

export default App;`
    },
    {
      path: 'src/components/Hero.tsx',
      content: `import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 to-dark-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
            Welcome to Your New Website
          </h1>
          <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
            A beautiful, responsive website created just for you using the power of AI
          </p>
          <button className="btn btn-primary inline-flex items-center">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};`
    },
    {
      path: 'src/components/Features.tsx',
      content: `import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Beautiful Design',
    description: 'Modern and elegant design that looks great on any device'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance for the best user experience'
  },
  {
    icon: Shield,
    title: 'Secure',
    description: 'Built with security best practices in mind'
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass-panel p-6"
            >
              <feature.icon className="h-8 w-8 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-dark-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};`
    },
    {
      path: 'src/components/Contact.tsx',
      content: `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section className="py-20 bg-dark-950">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="input w-full"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input w-full"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                className="input w-full min-h-32"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};`
    },
    {
      path: 'src/components/Layout.tsx',
      content: `import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-dark-950"
    >
      {children}
    </motion.div>
  );
};`
    }
  ];
  
  return { generatedFiles, generatedSteps };
};