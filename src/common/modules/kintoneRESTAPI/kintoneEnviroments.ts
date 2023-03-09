export const DELETE_FIELDS = [
  '$id',
  '$revision',
  'レコード番号',
  'カテゴリー',
  'ステータス',
  '作成日時',
  '作成者',
  '作業者',
  '更新日時',
  '更新者',
]

export const DELETE_TYPES = [
  'CATEGORY',
  'STATUS',
  'RECORD_NUMBER',
  'CREATED_TIME',
  'CREATOR',
  'STATUS_ASSIGNEE',
  'UPDATED_TIME',
  'MODIFIER',
  'LABEL',
  'SPACER',
  'HR',
  'REFERENCE_TABLE',
  'GROUP',
]

type KintoneField = { type: string; value: any; disabled?: boolean; error?: string }

type CallRecord = {
  record: Record<string, KintoneField>
}
