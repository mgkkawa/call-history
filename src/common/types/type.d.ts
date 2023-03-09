// module.css の型宣言
// https://qiita.com/paranishian/items/bb02c91ec1004430e701
// この記事コピペしただけ。

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare namespace Plugin {
  type Field = {
    code: string
    label: string
    type: string
  }

  type Fields = {
    this: string
    to: string
  }

  type Config = {
    appId: string | number
    date: Fields
    unique: Fields
    setFields: Fields[]
  }

  type Key = 'appId' | 'date' | 'unique' | 'setFields'
  type Key2 = 'date.this' | 'date.to' | 'unique.this' | 'unique.to'
}
declare namespace kintone {
  type Field = {
    type: string
    value: any
    disabled?: boolean
    error?: string | null
  }

  type EventRecord = Record<string, Field>

  type Event = {
    type: string
    appId: number
    record: EventRecord
    recordId: number
  }
}
