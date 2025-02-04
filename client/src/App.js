import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";

import Ugly from './pages/ugly';
import Home from './pages/home';

function App() {
  return (
    <Router className="App">
      <>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/ugly" element={<Ugly/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
