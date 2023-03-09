import { getConfig } from 'common'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './Form'

const config = getConfig(kintone.$PLUGIN_ID)
console.log(config)

const container = document.getElementById('config-root') as HTMLElement
const root = ReactDOM.createRoot(container)
root.render(<Form {...config} />)
