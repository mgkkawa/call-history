import { Row } from '@kintone/rest-api-client/lib/KintoneFields/types/layout'
import { getKintoneRestAPIClient } from 'common'

export const DELETE_KEYS = [
  '$id',
  '$revision',
  '作成日時',
  '作成者',
  '更新日時',
  '更新者',
  'カテゴリー',
  'ステータス',
  'レコード番号',
  '作業者',
]

export async function getForm(appId: string | number) {
  const client = await getKintoneRestAPIClient()
  const formFieldsRequest = await client.app.getFormFields({ app: appId })
  const formFields = formFieldsRequest.properties
  const returnFields = { ...formFields }
  DELETE_KEYS.forEach((key: string) => delete returnFields[key])
  return returnFields
}

export async function getLayout(appId: string | number) {
  const client = await getKintoneRestAPIClient()
  const formLayoutRequest = await client.app.getFormLayout({ app: appId })
  const formLayout = formLayoutRequest.layout
  const returnLayout = formLayout
    .flatMap(row => {
      row = row as Row<any>
      return row.fields.map(field => field)
    })
    .filter(row => Boolean(row))
  return returnLayout
}

export async function getAppFields(appId: string | number) {
  const fields = await getForm(appId)
  console.log(fields)
  const layout = await getLayout(appId)
  console.log(layout)
  const appFields = layout
    .map(field => {
      if (!('code' in field)) return null
      const { code } = field
      return fields[code]
    })
    .filter(field => Boolean(field))
  return appFields
}
