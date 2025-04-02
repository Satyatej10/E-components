import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Components from './pages/Components';

function App() {
  return (
    <Router>
      <div className="flex bg-gray-900 text-white min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<Components />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;