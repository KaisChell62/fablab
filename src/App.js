import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LockerDashboard from './composants/LockerDashboard';
import LockerDetails from './composants/LockerDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LockerDashboard />} />
        <Route exact path="/details/:id" element={<LockerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
