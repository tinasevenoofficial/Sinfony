import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import useStyles from './styles/CommonStyles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import CurrencyInput from 'components/CustomInput/CurrencyInput'
import { useMethodContext } from '../../../context/MethodContext'
import Danger from 'components/Typography/Danger.js'

const Cheque = ({ multiple }) => {
  const classes = useStyles()
  const { setAttr, errors } = useMethodContext()

  const handleChange = e => {
    multiple
      ? setAttr('cheque', { numero: parseInt(e.target.value, 10) }, 1)
      : setAttr('cheque', parseInt(e.target.value, 10))
  }

  const handleChangeAmount = value => {
    setAttr('cheque', { amount: value }, 1)
  }

  return (
    <GridContainer justify="flex-start" alignItems="center" className={classes.container}>
      <GridItem xs={6} sm={6} md={6}>
        <Typography className={classes.label}>Numero Cheque</Typography>
      </GridItem>
      <GridItem xs={6} sm={6} md={6}>
        <CustomInput
          id="numCheque"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            maxLength: 10,
            autoComplete: 'off',
            onChange: handleChange,
          }}
        />
        {errors && <Danger>{errors.cheque}</Danger>}
      </GridItem>
      {multiple ? (
        <>
          <GridItem xs={6}>
            <Typography className={classes.label}>Valor</Typography>
          </GridItem>
          <GridItem xs={6}>
            <CurrencyInput onChange={handleChangeAmount} placeholder="Ingrese un valor" fullWidth />
            {errors && <Danger>{errors.cheque_amount}</Danger>}
          </GridItem>
        </>
      ) : null}
    </GridContainer>
  )
}

Cheque.defaultProps = {
  multiple: false,
}

Cheque.propTypes = {
  multiple: PropTypes.bool,
}

export default Cheque
