import './App.css';
import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";

import Ugly from './pages/ugly';
import Home from './pages/home';
import UglyTwo from './pages/uglyTwo';


import 'leaflet/dist/leaflet.css';
import MapComponent from './components/mapComponent.jsx';

function App() {



  return (
    <div style={{ height: '100vh' }}>  {/* container has height */}
    <MapComponent />
    </div>
  );
}

export default App;
