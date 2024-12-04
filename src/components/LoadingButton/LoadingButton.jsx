import React, { forwardRef } from 'react'

import { CircularProgress, Button } from '@material-ui/core'

import PropTypes from 'prop-types'
import classNames from 'classnames'

import useStyles from './LoadingButton.styles'

const LoadingButton = forwardRef(({ className, disabled, children, loading, ...props }, ref) => {
  const classes = useStyles()

  return (
    <Button
      ref={ref}
      className={classNames(className, {
        [classes.root]: true,
      })}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading && <CircularProgress size={20} className={classes.loading} />}
    </Button>
  )
})

LoadingButton.propTypes = {
  ...Button.propTypes,
  loading: PropTypes.bool,
}

LoadingButton.defaultProps = {
  loading: false,
}

export default LoadingButton
