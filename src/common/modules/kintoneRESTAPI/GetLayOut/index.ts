<<<<<<< HEAD:src/modules/kintoneRESTAPI/GetLayOut/index.ts
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

type FieldLayoutWith<
  T extends string,
  S = {
    width: string
  },
> = {
  type: T
  code: string
  size: S
}
>>>>>>> 76c5a3651d5be30dcad36ad189c828ccb58fe26f:src/common/modules/kintoneRESTAPI/GetLayOut/index.ts

export const getLayOut = async (appId: number | string) => {
  const result = []
  const client = await getKintoneRestAPIClient()
  const res = await client.app.getFormLayout({ app: appId })
  const layout = res.layout
<<<<<<< HEAD:src/modules/kintoneRESTAPI/GetLayOut/index.ts

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
=======
  // layout.forEach((row:Row<FieldLayoutWith>) => {
  //   row.fields
  // })
  // const layout = res.layout
  // const result: Record<string, any> = {}
  // for (let field in layout) {
  //   const obj = layout[field]
  //   if (!DELETE_TYPES.includes(obj.type)) result[field] = { type: obj.type }
  // }
  // return result
>>>>>>> 76c5a3651d5be30dcad36ad189c828ccb58fe26f:src/common/modules/kintoneRESTAPI/GetLayOut/index.ts
}
