import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as atatus from 'atatus-spa';

atatus.config('9ec039446b0541188b6baeb9051973e3').install();
atatus.notify(new Error('Test Atatus Setup'));


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
