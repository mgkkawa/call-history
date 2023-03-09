import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React from 'react'
import { Control, Controller, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import classes from './ControleSelecter.module.css'

export type Item = {
  key: string
  value: string
  label: string
}

type ControleSelecterProps = {
  control: Control<Plugin.Config, any>
  register: UseFormRegister<Plugin.Config>
  name: Plugin.Key | Plugin.Key2
  items: Item[]
  id?: string
  label?: string
  rules?: RegisterOptions<FieldValues, string>
  desc?: string
}

export default function ControleSelecter({
  control,
  register,
  name,
  rules,
  items,
  id,
  label,
  desc,
}: ControleSelecterProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules ? rules : undefined}
      render={({ field, fieldState }) => (
        <FormControl className={classes.selecter} error={fieldState.invalid}>
          <InputLabel id={id ? id : ''}>{label ? label : ''}</InputLabel>
          <Select labelId={id ? id : ''} label={label ? label : ''} {...register(name)} {...field}>
            {items.map(item => (
              <MenuItem key={item.key} value={JSON.stringify(item.value)}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {desc ? (
              <Stack direction='row'>
                <div>{desc}</div>
                <div>{fieldState.error?.message}</div>
              </Stack>
            ) : (
              <>{fieldState.error?.message}</>
            )}
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}
