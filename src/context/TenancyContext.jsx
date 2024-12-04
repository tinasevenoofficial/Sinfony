import React, { useEffect } from 'react'
import axios from 'axios'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import { EXTERNAL_API_PATHS } from 'utils/constants'
import { loadState, saveState } from 'helpers/localStorage'
import { useBoolean } from 'hooks'
import { createContext, useContext, useState } from 'react'
import getTheme from 'theme/palette'
import overrides from 'theme/overrides'
import { useMemo } from 'react'

let notaria = window.location.hostname.indexOf("www") >= 0 ? window.location.hostname.split(".")[1] : window.location.hostname.split(".")[0];  //notaria = 'Notaria10bga'
notaria = notaria=='localhost'?'notariadev':notaria;

const defaultTenancy = {
  name: notaria,
  REACT_APP_URL_API: process.env.REACT_APP_URL_API,
  REACT_APP_TOKEN_API: process.env.REACT_APP_TOKEN_API,
}

export const TenancyContext = createContext(defaultTenancy)


const TenancyContextProvider = ({ children }) => {
  const [app, setApp] = useState(loadState('app') || defaultTenancy)
  const [loading, setLoading] = useBoolean(true)

  const loadApp = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${EXTERNAL_API_PATHS.start}${notaria}`)
      const app = { ...data}
      saveState('app', app)
      setApp(app)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadApp()
  }, [])


  const theme = useMemo(() => createTheme({
    theme: getTheme(app.name),
    overrides,
  }), [app])

  return (
    <TenancyContext.Provider
      value={{
        loadApp,
        loading,
        ...app,
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </TenancyContext.Provider>
  )
}

export const useTenancyContext = () => useContext(TenancyContext)
export default TenancyContextProvider
