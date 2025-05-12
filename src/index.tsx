import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import Navbar from './Navbar';


const rootElement = document.getElementById('root')!; 

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Navbar/>
    <App />
    
    
    
  </React.StrictMode>
);