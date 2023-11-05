import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.css';
import './css/app.css';
import { Toaster } from 'sonner';

import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster richColors />
    <BrowserRouter>
      <PrimeReactProvider>
        <AuthProvider>
        <App />
        </AuthProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
