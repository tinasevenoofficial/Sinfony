import React from 'react'

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector(state => state.auth)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuth) {
          return (
            <Redirect
              to={{
                pathname: '/admin/dashboard',
                state: { from: location },
              }}
            />
          )
        } else {
          return children
        }
      }}
    />
  )
}

AuthRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default AuthRoute
