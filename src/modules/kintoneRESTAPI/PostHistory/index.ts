import { getKintoneRestAPIClient } from '../GetKintoneAPIClient'

type AddRecordParams = {
  app: number | string
  record: any
}

export const postHistory = async (params: AddRecordParams, token?: string) => {
  const client = await getKintoneRestAPIClient(token)
  const res = await client.record.addRecord(params)
  console.log(res)
}
