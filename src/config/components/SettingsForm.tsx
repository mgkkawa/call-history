import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'

type ThisProps = {
  checked: boolean
  setFunction: Function
}

// isChecked がうまく繁栄されない？
const SettingsForm = ({ checked, setFunction }: ThisProps) => {
  const switchHandler = ({ target }: React.BaseSyntheticEvent) => {
    setIsChecked(target.checked)
    setFunction(target.checked)
  }
  const [isChecked, setIsChecked] = useState<boolean>(checked)

  useEffect(() => {
    console.log(checked, isChecked)

    return () => {}
  }, [isChecked])

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch defaultChecked={isChecked} />}
        label='フィールドの詳細を設定する。'
        onChange={switchHandler}
      />
      {isChecked ? <div>{isChecked}</div> : <></>}
    </FormGroup>
  )
}

export default SettingsForm
