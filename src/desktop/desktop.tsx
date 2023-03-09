import { getConfig } from 'common'

const config = getConfig(kintone.$PLUGIN_ID)
const { appId, unique, date, setFields } = config

kintone.events.on('app.record.edit.submit.success', async event => {
  if (!appId) return event

  const { record } = event

  const uniqueKey = record[unique.this].value
  const dateField = record[date.this].value
})
