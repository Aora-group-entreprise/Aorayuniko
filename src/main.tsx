import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './yuniko.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
