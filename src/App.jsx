import React, { useEffect } from 'react'

import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import MomentUtils from '@date-io/moment'
import { createBrowserHistory } from 'history'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router-dom'

import { Loading } from 'components'
import TenancyContextProvider from 'context/TenancyContext'
import { AuthLayout, AuthRoute, PrivateLayout, PrivateRoute } from 'layouts'
import { load } from '_redux/actions'
import store from '_redux/store'

import 'config/axios'

import 'assets/scss/material-dashboard-pro-react.scss?v=1.9.0'
import 'react-perfect-scrollbar/dist/css/styles.css'

const history = createBrowserHistory()

const App = () => {
  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TenancyContextProvider>
          <Router history={history}>
            <Component />
          </Router>
        </TenancyContextProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  )
}

const Component = () => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(load())
  }, [])

  return (
    <Switch>
      {isAuth === undefined ? (
        <Loading />
      ) : (
        <>
          <AuthRoute path="/auth">
            <AuthLayout />
          </AuthRoute>
          <PrivateRoute path="/admin">
            <PrivateLayout />
          </PrivateRoute>
          <Route exact path="/">
            <Redirect exact from="/" to="/auth/login-page" />
          </Route>
        </>
      )}
    </Switch>
  )
}

export default App
