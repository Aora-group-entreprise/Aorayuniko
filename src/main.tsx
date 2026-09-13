import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './yuniko.css'
import './yuniko-responsive.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
