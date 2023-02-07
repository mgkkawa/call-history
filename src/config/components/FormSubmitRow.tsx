import { Button } from '@mui/material'
import React from 'react'

const FormSubmitRow = ({ config }: { config: any }) => {
  return (
    <div style={{ marginTop: 30 }}>
      <Button
        variant='outlined'
        style={{ marginRight: 25, minWidth: 150 }}
        size='large'
        onClick={() => {
          window.location.href = '../../' + kintone.app.getId() + '/plugin/'
        }}>
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
  )
}

export default FormSubmitRow
