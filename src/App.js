import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import JoinElite from './components/JoinElite';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/join-elite" element={<JoinElite />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
