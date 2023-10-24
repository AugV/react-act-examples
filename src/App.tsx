import React from 'react';
import logo from './logo.svg';
import './App.css';
import Timers from './timers/Timers';
import TimersLoop from './timersLoop/TimersLoop';
import RenderAct from './renderAct/RenderAct';
import NoAwait from './noAwait/NoAwait';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Timers />
      <TimersLoop />
      <RenderAct />
      <NoAwait />
    </div>
  );
}

export default App;
