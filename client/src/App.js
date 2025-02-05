import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";

import Ugly from './pages/ugly';
import Home from './pages/home';
import UglyTwo from './pages/uglyTwo';

function App() {
  return (
    <Router className="App">
      <>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/ugly" element={<Ugly/>}/>
          <Route path="/uglyTwo" element={<UglyTwo/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
