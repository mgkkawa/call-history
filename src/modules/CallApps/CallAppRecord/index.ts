import { getFields } from '../../kintoneRESTAPI/GetFields'

type KintoneFields = Record<string, { type: string; value: any }>

class CallAppRecord {
  constructor(record: any) {}
}

export const callAppRecord = async (record: Record<string, KintoneFields>, appId: number | string) => {
  const fields: Record<string, KintoneFields> = await getFields(appId)
  for (let field in fields) {
    const obj = fields[field]
    console.log(field, field in record)
    if (field in record) obj.value = record[field].value
  }
  console.log(fields)
}
