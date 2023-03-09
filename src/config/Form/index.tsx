import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { App } from '@kintone/rest-api-client/lib/client/types/app'
import { getAppFields, getApps, getConfig, setConfig } from 'common'

export default function Form(props: PluginConfig) {
  // useForm から必要な関数を取得。
  const { register, reset, control, handleSubmit } = useForm({
    defaultValues: props,
  })

  // 設定を保存するアプリのID (設定画面を開いているアプリ)
  const appId = useMemo(() => kintone.app.getId() as number, [])

  // コール履歴アプリのID（レコードを飛ばす先のアプリ）
  const historyAppId = useWatch({ name: 'historyAppId', control })

  // 描画フラグ
  const [isReady, setIsReady] = useState(false)

  // スペース内アプリ一覧データ
  const [spaceApps, setSpaceApps] = useState<App[]>([])

  // アプリ内フィールドデータ
  const [thisFields, setThisFields] = useState<any[]>([])

  // コール履歴アプリ内フィールドデータ
  const [toFields, setToFields] = useState<any[]>([])

  // 保存ボタンを推した時の処理
  const onSubmit: SubmitHandler<PluginConfig> = useCallback(data => {
    console.log(data)
    setConfig(data)
  }, [])

  // 設定の検証ルールを設定
  const validationRules = {
    historyAppId: {
      required: 'コール履歴アプリの設定は必須です。',
    },
  }

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
    if (historyAppId === '') return
    async function secondEffect() {
      setToFields(await getAppFields(historyAppId))
      setIsReady(false)
      setIsReady(true)
    }
    secondEffect()
  }, [historyAppId])

  return (
    <Stack component='form' noValidate spacing={2} onSubmit={handleSubmit(onSubmit)}>
      {/* コール履歴アプリのIDを設定するSelect要素を配置 */}
      <Controller
        name='historyAppId'
        control={control}
        render={({ field, fieldState }) => (
          <FormControl error={fieldState.invalid}>
            <InputLabel id='history-app-id-label'>コール履歴アプリ</InputLabel>
            <Select labelId='history-app-id-label' label='コール履歴アプリ' {...register('historyAppId')} {...field}>
              {spaceApps.map(app => (
                <MenuItem key={app.appId} value={app.appId}>{`${app.name} [${app.appId}]`}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        )}
      />
      {isReady ? (
        <React.Fragment>
          {/* コールアプリ側のユニークキーを配置するコール履歴アプリ側のフィールドを指定する */}
          <Controller
            name='uniqueKey'
            control={control}
            render={({ field, fieldState }) => (
              <FormControl error={fieldState.invalid}>
                <InputLabel id='unique-key-label'>ユニークキーフィールド</InputLabel>
                <Select labelId='unique-key-label' label='ユニークキーフィールド' {...register('uniqueKey')} {...field}>
                  {thisFields.map(toField =>
                    toField.unique ? (
                      <MenuItem
                        key={toField.code}
                        value={toField.code}>{`${toField.label}  [${toField.code}]`}</MenuItem>
                    ) : null,
                  )}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />
          {/* コール履歴アプリの日付参照フィールドを指定する */}
          <Controller
            name='dateField'
            control={control}
            render={({ field, fieldState }) => (
              <FormControl error={fieldState.invalid}>
                <InputLabel id='date-field-label'>日付フィールド</InputLabel>
                <Select labelId='date-field-label' label='日付フィールド' {...register('dateField')} {...field}>
                  {toFields.map(toField =>
                    toField.type === 'DATE' ? (
                      <MenuItem
                        key={toField.code}
                        value={toField.code}>{`${toField.label}  [${toField.code}]`}</MenuItem>
                    ) : null,
                  )}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </React.Fragment>
      ) : null}
    </Stack>
  )
}
