import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { App } from '@kintone/rest-api-client/lib/client/types/app'
import { getAppFields, getApps, setConfig } from 'common'
import ControleSelecter, { Item } from './ControleSelecter'
import classes from './Form.module.css'
import { getItems } from './method'

export default function Form(props: Plugin.Config) {
  // useForm から必要な関数を取得。
  // デフォルトは保存済みのプラグイン設定を反映
  const { register, reset, control, handleSubmit } = useForm({
    defaultValues: props,
  })

  // 設定を保存するアプリのID (設定画面を開いているアプリ)
  const appId = useMemo(() => kintone.app.getId() as number, [])

  // コール履歴アプリのID（レコードを飛ばす先のアプリ）
  const toAppId = useWatch({ name: 'appId', control })

  // 描画フラグ
  const [isReady, setIsReady] = useState(false)

  // スペース内アプリ一覧データ
  const [spaceApps, setSpaceApps] = useState<App[]>([])

  // アプリ内フィールドデータ
  const [thisFields, setThisFields] = useState<any[]>([])

  // コール履歴アプリ内フィールドデータ
  const [toFields, setToFields] = useState<any[]>([])

  // アプリ一覧をItem[]化
  const appItems = useMemo((): Item[] => {
    if (!spaceApps.length) return []
    return spaceApps.map(app => {
      const item: Item = {
        key: app.appId,
        value: app.appId,
        label: `${app.name} [${app.appId}]`,
      }
      return item
    })
  }, [spaceApps])

  // MenuItemに使用するパラメータを設定。
  const items = useMemo(() => {
    const RECORD_LABEL = 'レコード番号'
    const RECORD_CODE = 'RECORD_NUMBER'
    const DEFAULT_ITEM = [
      {
        key: RECORD_LABEL,
        value: JSON.stringify({
          code: RECORD_LABEL,
          type: RECORD_CODE,
        }),
        label: `${RECORD_LABEL} [${RECORD_CODE}]`,
      },
    ]

    const thisUniqueItems = [...DEFAULT_ITEM, ...getItems(thisFields, true)]
    const thisDateItems = getItems(thisFields, false, 'DATE')
    const toUniqueItems = getItems(toFields, true)
    const toDateItems = getItems(toFields, false, ['DATE', 'SINGLE_LINE_TEXT'])
    const result = {
      unique: {
        this: thisUniqueItems,
        to: toUniqueItems,
      },
      date: {
        this: thisDateItems,
        to: toDateItems,
      },
    }
    console.log(result)

    return result
  }, [thisFields, toFields])

  // 保存ボタンを押した時の処理
  const onSubmit: SubmitHandler<Plugin.Config> = useCallback(data => {
    console.log(data)
    setConfig(data)
  }, [])

  // 初回描画時の処理
  useEffect(() => {
    async function firstEffect() {
      setSpaceApps(await getApps())
      setThisFields(await getAppFields(appId))
    }
    firstEffect()
  }, [])

  // コール履歴アプリIDが設定された際の描画処理
  useEffect(() => {
    if (toAppId === '') return
    async function secondEffect() {
      setToFields(await getAppFields(toAppId))
      setIsReady(false)
      setIsReady(true)
    }
    secondEffect()
  }, [toAppId])

  return (
    <>
      <Stack component='form' noValidate spacing={2} onSubmit={handleSubmit(onSubmit)}>
        {/* コール履歴アプリのIDを設定するSelect要素を配置 */}
        <ControleSelecter
          control={control}
          register={register}
          name='appId'
          items={appItems}
          id='history-app-id-label'
          label='コール履歴アプリ'
          desc='コール履歴保存先のアプリを選択してください。'
        />
        {isReady ? (
          <React.Fragment>
            {/* コールアプリ側のユニークキーが配置されているフィールドを選択する */}
            <ControleSelecter
              control={control}
              register={register}
              name='unique.this'
              items={items.unique.this}
              id='unique-key-label'
              label='ユニークキーフィールド'
              desc='ユニークな値が設定されているフィールドを選択してください。'
            />
            {/* コールアプリのユニークキーを保存する、コール履歴アプリ側のフィールド設定 */}
            <ControleSelecter
              control={control}
              register={register}
              name='unique.to'
              items={items.unique.to}
              id='unique-key-label'
              label='ユニークキーフィールド'
              desc='ユニークな値が設定されているフィールドを選択してください。'
            />
            {/* コール履歴アプリの日付参照フィールドを指定する */}
            <ControleSelecter
              control={control}
              register={register}
              name='date.to'
              items={items.date.to}
              id='date-field-label'
              label='日付フィールド'
            />
          </React.Fragment>
        ) : null}
      </Stack>
      <hr className={classes.footerLint} />
    </>
  )
}
