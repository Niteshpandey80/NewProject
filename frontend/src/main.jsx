import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './context/ContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
ContextProvider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ContextProvider>
     <App />
  </ContextProvider>
  </BrowserRouter>
)
