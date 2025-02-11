import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import { googleLogout, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </GoogleOAuthProvider>

)
