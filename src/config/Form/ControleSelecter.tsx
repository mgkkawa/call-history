import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { Control, Controller, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

type Item = {
  key: string
  value: string
  label: string
}

type ControleSelecterProps = {
  control: Control<FieldValues, any>
  register: UseFormRegister<PluginConfig>
  name: PluginConfigKey
  items: Item[]
  id?: string
  label?: string
  rules?: RegisterOptions<FieldValues, string>
}

export default function ControleSelecter({ control, register, name, rules, items, id, label }: ControleSelecterProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules ? rules : undefined}
      render={({ field, fieldState }) => (
        <FormControl error={fieldState.invalid}>
          <InputLabel id={id ? id : ''}>{label ? label : ''}</InputLabel>
          <Select labelId={id ? id : ''} label={label ? label : ''} {...register(name)} {...field}>
            {items.map(item => (
              <MenuItem key={item.key} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
