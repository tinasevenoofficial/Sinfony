import React, { createContext, useState, useContext } from 'react'
import validate from 'validate.js'
import rules from '../validators/rules'

const MethodContext = createContext({})

const MethodProvider = ({ method, amount, save, initialData, numRad, children }) => {
  const [data, setData] = useState({
    method,
    amount,
    numRad,
    form: initialData || {},
  })
  const [error, setError] = useState({})

  const validateForm = () => {
    console.log('method', method)
    const errors = validate(data.form, rules(method.name)) || {}
    if (Object.values(errors).length) {
      setError(s => ({ ...s, ...errors }))
      return true
    }
    return false
  }

  const setErrors = (attr, error) => {
    setError(s => ({ ...s, [attr]: error }))
  }

  const setAttr = (attr, value, add) => {
    setData(d => ({ ...d, form: { ...d.form, [attr]: add ? { ...d.form[attr], ...value } : value } }))
  }

  const sendData = () => {
    save({ ...data.form, method: data.method.id })
  }

  return (
    <MethodContext.Provider
      value={{
        method: data.method.name,
        data: data.form,
        errors: error,
        amount: data.amount,
        numRad: data.numRad,
        setErrors,
        setAttr,
        sendData,
        validateForm,
      }}
    >
      {children}
    </MethodContext.Provider>
  )
}

const useMethodContext = () => useContext(MethodContext)

export default MethodContext
export { MethodProvider, useMethodContext }
