import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from 'react';
import Board from './Board';

const App = () => {
  return (
    <>
      <h1>Memory Game</h1>
      <Board />
    </>
  );
};

export default App;
