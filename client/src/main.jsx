import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { UserProgressProvider } from './context/UserProgressContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProgressProvider>
          <App />
        </UserProgressProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
