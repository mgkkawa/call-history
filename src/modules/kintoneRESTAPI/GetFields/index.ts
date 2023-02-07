import { getKintoneRestAPIClient } from '../'
import { DELETE_TYPES } from '../kintoneEnviroments'

export const getFields = async (appId: number | string) => {
  const client = await getKintoneRestAPIClient()
  const res = await client.app.getFormFields({ app: appId })
  const properties = res.properties
  const result = []
  for (let field in properties) {
    const obj = properties[field]
    if (!DELETE_TYPES.includes(obj.type)) result.push(obj)
  }
  return result
}
