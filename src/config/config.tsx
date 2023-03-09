<<<<<<< HEAD
=======
import { getConfig } from 'common'
>>>>>>> 76c5a3651d5be30dcad36ad189c828ccb58fe26f
import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './Form'

<<<<<<< HEAD
export const thisAppId = React.createContext(String(kintone.app.getId() as number))
const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
=======
const container = document.getElementById('config-root') as HTMLElement
const root = ReactDOM.createRoot(container)
root.render(<Form {...getConfig(kintone.$PLUGIN_ID)} />)
>>>>>>> 76c5a3651d5be30dcad36ad189c828ccb58fe26f
