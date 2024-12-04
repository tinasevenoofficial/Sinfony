import React, { useState } from 'react'

import { Paper, Typography } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'

import clsx from 'classnames'
import PropTypes from 'prop-types'

import useStyles from './InputFile.styles'

const InputFile = ({ onChange, error, helperText, disabled, accept }) => {
  const classes = useStyles({ disabled })
  const [over, setOver] = useState(false)

  const onDragEnter = e => {
    if (!disabled) {
      setOver(true)
      e.preventDefault()
    }
  }

  const onDragLeave = e => {
    if (!disabled) {
      setOver(false)
      e.preventDefault()
    }
  }

  const onDragOver = e => {
    if (!disabled) {
      setOver(true)
      e.preventDefault()
    }
  }

  const onDrop = e => {
    if (!disabled) {
      setOver(false)
      e.preventDefault()
      handleMedia(e)
    }
  }

  const handleMedia = e => {
    let files = Array.from(e.target.files || e.dataTransfer.files)
    onChange(e, files)
  }

  return (
    <>
      <Paper className={classes.paper} variant="outlined">
        <label
          htmlFor="input"
          className={classes.label}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <div
            className={clsx(classes.paperContent, {
              [classes.paperContentError]: error,
              [classes.paperContentOver]: over,
            })}
          >
            <CloudUpload className="mb-3" />
            <span>
              {over ? (
                <span className="font-weight-bold">Arrastra aquí </span>
              ) : (
                <>
                  <span className="font-weight-bold">Elija sus archivos </span>
                  <span>o arrastra aquí</span>
                </>
              )}
            </span>
          </div>
        </label>
        {
          <input
            multiple
            type="file"
            id="input"
            accept={accept}
            style={{ display: 'none' }}
            onChange={handleMedia}
            disabled={disabled}
          />
        }
      </Paper>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        className={clsx(classes.helperText, {
          [classes.helperTextError]: error,
        })}
      >
        {helperText}
      </Typography>
    </>
  )
}

InputFile.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  accept: PropTypes.string,
}

InputFile.defaultProps = {
  error: false,
  disabled: false,
}

export default InputFile
