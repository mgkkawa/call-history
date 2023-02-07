import { getKintoneRestAPIClient } from '../'
import { DELETE_TYPES } from '../kintoneEnviroments'

export const getLayOut = async (appId: number | string) => {
  const result = []
  const client = await getKintoneRestAPIClient()
  const res = await client.app.getFormLayout({ app: appId })
  const layout = res.layout

  for (let row of layout) {
    if (row.type === 'ROW') {
      const fields = row.fields
      for (let field of fields) {
        if (DELETE_TYPES.includes(field.type)) continue
        result.push(field)
      }
    } else if (row.type === 'GROUP') {
      const layout_ = row.layout
      for (let row_ of layout_) {
        for (let field_ of row_.fields) {
          if (DELETE_TYPES.includes(field_.type)) continue
          result.push(field_)
        }
      }
    }
  }

  return result
}
