import { useCallback, useState } from 'react'

const defaultOptions = { key: 'id' }

const useCRUD = (initialState = [], { key } = defaultOptions) => {
  const [fields, reset] = useState(initialState)

  const update = useCallback((id, data) => {
    reset(beforeData => {
      const copy = [...beforeData]
      const index = copy.findIndex(item => item[key] === id)
      if (index !== -1) copy[index] = { ...copy[index], ...data }
      return copy
    })
  }, [])

  const append = useCallback(data => {
    reset(beforeData => {
      const copy = [...beforeData, data]
      return copy
    })
  }, [])

  const remove = useCallback(id => {
    reset(beforeData => {
      const copy = [...beforeData]
      const index = copy.findIndex(item => item[key] === id)
      copy.splice(index, 1)
      return copy
    })
  }, [])

  const replace = useCallback(list => {
    reset(list)
  }, [])

  return { fields, reset, append, update, remove, replace }
}

export default useCRUD
