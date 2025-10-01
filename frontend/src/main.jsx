import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Render appen inni <div id="root"></div> fra index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
