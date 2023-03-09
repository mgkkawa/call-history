import { getConfig } from 'common'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './Form'

const container = document.getElementById('config-root') as HTMLElement
const root = ReactDOM.createRoot(container)
root.render(<Form {...getConfig(kintone.$PLUGIN_ID)} />)
