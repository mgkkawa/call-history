import React, { useEffect, useState } from 'react'
import { ConfigProps } from '../modules'
import { AppsSelect, FormSubmitRow, SettingsForm } from './components'

const PLUGIN_ID = kintone.$PLUGIN_ID

const FormRow = () => {
  return <div style={{ marginTop: 20 }} />
}

const App = () => {
  const [config, setConfig] = useState<ConfigProps>(kintone.plugin.app.getConfig(PLUGIN_ID))
  const [appId, setAppId] = useState<number | string>(config.historyAppId ? config.historyAppId : '')
  const [isSettings, setIsSettings] = useState<boolean>(config.isSettings ?? false)

  // config画面描画時設定
  useEffect(() => {}, [])

  // appIdが更新されると
  useEffect(() => {
    config.historyAppId = appId
    setConfig(config)
  }, [appId])

  return (
    <>
      <h3>コール履歴アプリ設定</h3>
      <p style={{ marginTop: 10 }}>各種設定をお願いします。</p>
      <FormRow />
      <AppsSelect setFunction={setAppId} value={appId} />
      <FormRow />
      <SettingsForm setFunction={setIsSettings} checked={isSettings} />
      <FormRow />
      <FormSubmitRow config={config} />
    </>
  )
}

export default App
