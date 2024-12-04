import { useState, useCallback } from 'react'

const useBoolean = (initialState = false) => {
  const [value, setValue] = useState(initialState)

  const toggleValue = useCallback(() => {
    setValue(beforeValue => !beforeValue)
  }, [])

  return [value, setValue, toggleValue]
}

export default useBoolean
