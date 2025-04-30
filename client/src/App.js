import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [serverStatus, setServerStatus] = useState('Checking...');

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get('/api/health');
        setServerStatus(response.data.message);
      } catch (error) {
        setServerStatus('Error connecting to server');
        console.error('Server connection failed:', error);
      }
    };

    checkServerStatus();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Stack Application</h1>
        <p>
          Server Status: <code>{serverStatus}</code>
        </p>
        <p>This is a MERN application with CI/CD pipeline using Jenkins</p>
      </header>
    </div>
  );
}

export default App; 