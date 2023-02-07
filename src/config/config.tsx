import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container)
export const thisAppId = React.createContext(String(kintone.app.getId() as number))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
