import React from 'react'

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector(state => state.auth)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuth) {
          return children
        } else {
          return (
            <Redirect
              to={{
                pathname: '/auth/login-page',
                state: { from: location },
              }}
            />
          )
        }
      }}
    />
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default PrivateRoute
