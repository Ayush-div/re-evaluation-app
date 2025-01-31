import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import { googleLogout, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>

)
