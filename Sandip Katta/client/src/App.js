import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import CampusCode from './pages/CampusCode';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CampusCode />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
