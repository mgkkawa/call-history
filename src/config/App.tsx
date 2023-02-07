import { Button, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ConfigProps } from '../modules'
import { AppsSelect, FieldsSelect } from './components'
import { thisAppId } from './config'

const PLUGIN_ID = kintone.$PLUGIN_ID
const checkFields = ['historyAppId', 'editMode', 'editCheckField', 'editCheckValue']

const App = () => {
  const [config, setConfig] = useState<ConfigProps>(kintone.plugin.app.getConfig(PLUGIN_ID))
  const [appId, setAppId] = useState<number | string>(config.historyAppId ? config.historyAppId : '')
  const [field, setField] = useState<string>(config.editCheckField ? config.editCheckField : '')
  const [value, setValue] = useState<string>(config.editCheckValue ? config.editCheckValue : '')

  // config画面描画時設定
  useEffect(() => {
    if (config.historyAppId) setAppId(config.historyAppId)
    setConfig(config)
  }, [])

  // appIdが更新されると
  useEffect(() => {
    config.historyAppId = appId
    config.editCheckField = field
    config.editCheckValue = value
    setConfig(config)
  }, [appId, field, value])

  return (
    <>
      <h2>コール履歴アプリの設定。</h2>
      <AppsSelect setFunction={setAppId} value={appId} />
      <FieldsSelect setFunction={setField} value={field} appId={useContext(thisAppId)}></FieldsSelect>
      <div style={{ marginTop: 20 }}>
        <TextField
          size='small'
          id='editField'
          label='編集チェック用フィールド'
          variant='outlined'
          value={field}
          onChange={e => setField(e.target.value)}
        />
        <TextField
          size='small'
          id='editField'
          label='編集チェック用フィールドの値'
          variant='outlined'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <Button variant='outlined' style={{ marginRight: 25, minWidth: 150 }} size='large'>
          キャンセル
        </Button>
        <Button
          variant='contained'
          style={{ minWidth: 150 }}
          size='large'
          onClick={() => {
            kintone.plugin.app.setConfig(config)
          }}>
          保存
        </Button>
      </div>
    </>
  )
}

export default App
