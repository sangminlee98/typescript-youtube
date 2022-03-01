import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';

export type ActiveMenu = 'home' | 'explore' | 'subscribe';
function App() {
  const [horizon, setHorizon] = useState(false);
  return (
    <div>
      <Header setHorizon={setHorizon}/>
      <Main horizon={horizon} setHorizon={setHorizon}/>  
    </div>
  );
}

export default App;
