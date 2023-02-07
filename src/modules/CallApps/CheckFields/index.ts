import { getFields } from '../../kintoneRESTAPI'

export const checkAppFields = async (appId: number | string) => {
  const fields = await getFields(appId)
  const result: Record<string, any> = {}

  for (let field of fields) {
    result[field.code] = { type: field.type }
  }

  return result
}
