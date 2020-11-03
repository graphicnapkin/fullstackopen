import { useState } from 'react'

export const useField = name => {
  const [value, setValue] = useState('')

  const onChange = ({ target: { value } }) => {
    setValue(value)
  }
  const clear = () => {
    setValue('')
  }

  return {
    name,
    value,
    onChange,
    clear
  }
}