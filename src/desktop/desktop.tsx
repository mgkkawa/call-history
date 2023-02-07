import { callAppRecord, checkCallHistory, editCheck, getConfig } from '../modules'
import type { KintoneRecordEvent } from '../types'

const config = getConfig(kintone.$PLUGIN_ID)
const { historyAppId, editCheckField, editCheckValue } = config

kintone.events.on('app.record.detail.show', async (event: KintoneRecordEvent) => {})
kintone.events.on('app.record.edit.show', async (event: KintoneRecordEvent) => {
  if (!editCheckField && !editCheckValue) return
  const isEdit = await editCheck(event, config)
  event.record.編集ステータス.value = isEdit ? 1 : ''
  return event
})
kintone.events.on('app.record.edit.submit.success', async event => {
  if (!historyAppId) return event
  if (event.record.編集ステータス.value) return event

  await checkCallHistory(event.record, historyAppId)
})
