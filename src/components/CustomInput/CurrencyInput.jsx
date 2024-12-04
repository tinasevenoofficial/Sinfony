import React from 'react'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default function CurrencyInput(props) {
  const { defaultValue, onChange, ...other } = props
  const [value, setValue] = React.useState(defaultValue)

  const handleChange = event => {
    setValue(event.target.value)
    if (onChange) {
      onChange(event.target.value)
    }
  }

  return (
    <TextField
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      {...other}
    />
  )
}

CurrencyInput.defaultProps = {
  label: 'Valor',
  name: 'currency',
  id: 'currency',
  defaultValue: '',
}

CurrencyInput.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  defaultValue: PropTypes.string,
}
