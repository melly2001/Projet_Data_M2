import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormRange from 'react-bootstrap/esm/FormRange';
import 'bootstrap/dist/css/bootstrap.min.css';
import Figure from 'react-plotly.js';
import Plot from 'react-plotly.js';
import PortFolioBuilder from './components/PortfolioBuilder';
import logo_optifin from './assets/optifin.png';

// React app root function
function App() {
  
  return (
    <div className="App">
      <header className='header_accueil text-light d-flex flex-row align-items-center'>
        {/* <h5 className="p-4">
          Analyse de portefeuille
        </h5> */}
        <img src={logo_optifin} alt="Logo Foliobench" className="logo_optifin"/>
      </header>
      <PortFolioBuilder/>
    </div>
  );
}

export default App;
