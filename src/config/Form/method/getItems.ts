import { Item } from '../ControleSelecter'

type ItemFields = {
  unique?: boolean
  code: string
  type: string
  label: string
}

function getFieldItem(field: ItemFields) {
  return {
    key: field.code,
    value: JSON.stringify({ code: field.code, type: field.type }),
    label: `${field.label} [${field.code}]`,
  }
}

export function getItems(fields: ItemFields[], isUnique: boolean = false, type: string | string[] = []): Item[] {
  if (!fields.length) return []
  fields = isUnique ? fields.filter(field => field.unique) : fields
  type = typeof type === 'string' ? [type] : [...type]
  fields = type.length ? fields.filter(field => type.includes(field.type)) : fields
  return fields.map(field => getFieldItem(field))
}
