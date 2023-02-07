import { checkCallHistory, getConfig } from '../modules'
import type { KintoneRecordEvent } from '../types'

const config = getConfig(kintone.$PLUGIN_ID)
const { historyAppId } = config

kintone.events.on('app.record.detail.show', async (event: KintoneRecordEvent) => {})
kintone.events.on('app.record.edit.show', async (event: KintoneRecordEvent) => {
  return event
})
kintone.events.on('app.record.edit.submit.success', async event => {
  if (!historyAppId) return event

  await checkCallHistory(event.record, historyAppId)
})
