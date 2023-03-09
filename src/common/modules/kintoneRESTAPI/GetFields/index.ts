<<<<<<< HEAD:src/modules/kintoneRESTAPI/GetFields/index.ts
import { getKintoneRestAPIClient } from '../'
import { DELETE_TYPES } from '../kintoneEnviroments'
=======
import { getKintoneRestAPIClient } from 'common'

const DELETE_TYPES = [
  'CATEGORY',
  'STATUS',
  'RECORD_NUMBER',
  'CREATED_TIME',
  'CREATOR',
  'STATUS_ASSIGNEE',
  'UPDATED_TIME',
  'MODIFIER',
]
>>>>>>> 76c5a3651d5be30dcad36ad189c828ccb58fe26f:src/common/modules/kintoneRESTAPI/GetFields/index.ts

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
