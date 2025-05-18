import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WorkspacePage from './pages/WorkspacePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/workspace" element={<WorkspacePage />} />
    </Routes>
  );
}

export default App;