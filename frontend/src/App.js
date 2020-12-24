import './App.css';
import Dashboard from './components/Dashboard';
import React, { useEffect, useState } from 'react';
// Main App Components
const APP_TITLE = "Prav's Casting Agency";
function App() {
  useEffect(_=>{
    document.title = APP_TITLE 
  }, []);

  return (
    <div className="App">
      <Dashboard/>
    </div>
  );
}

export default App;
