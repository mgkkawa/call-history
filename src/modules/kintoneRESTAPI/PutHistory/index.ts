import { getKintoneRestAPIClient } from '../GetKintoneAPIClient'

type RecordForParameter = {
  [fieldCode: string]: {
    value: unknown
  }
}

type UpdateKey = {
  field: string
  value: string | number
}

type PutHistoryParams =
  | {
      app: number | string
      id: number | string
      record?: RecordForParameter
      revision?: number | string
    }
  | {
      app: number | string
      updateKey: UpdateKey
      record?: RecordForParameter
      revision?: number | string
    }

export const putHistory = async (params: PutHistoryParams, token?: string) => {
  const client = await getKintoneRestAPIClient(token)
  const res = await client.record.updateRecord(params)
  console.log(res)
}
