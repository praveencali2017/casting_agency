import Dashboard from './components/Dashboard';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
// Main App Components
function App() {
  return (
    <div className="App container-fluid">
      <div className="jumbotron">
        <h1>Casting Agency</h1>
        <p>Single place to view movies, actors and assign actors to the movies!!!!!</p>
      </div>
      <Dashboard/>
      <ToastContainer/>
    </div>
  );
}
const appStyles={
  appTheme:{
    color:'white'
  }
}
export default App;