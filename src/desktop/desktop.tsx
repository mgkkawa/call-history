<<<<<<< HEAD
import { checkCallHistory, getConfig } from '../modules'
import type { KintoneRecordEvent } from '../types'
=======
import { checkCallHistory, getConfig } from 'common'
>>>>>>> 76c5a3651d5be30dcad36ad189c828ccb58fe26f

const config = getConfig(kintone.$PLUGIN_ID)
const { historyAppId } = config

<<<<<<< HEAD
kintone.events.on('app.record.detail.show', async (event: KintoneRecordEvent) => {})
kintone.events.on('app.record.edit.show', async (event: KintoneRecordEvent) => {
  return event
})
kintone.events.on('app.record.edit.submit.success', async event => {
  if (!historyAppId) return event

=======
kintone.events.on('app.record.edit.submit.success', async event => {
  if (!historyAppId) return event
>>>>>>> 76c5a3651d5be30dcad36ad189c828ccb58fe26f
  await checkCallHistory(event.record, historyAppId)
})
