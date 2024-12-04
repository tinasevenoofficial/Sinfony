import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import Typography from '@material-ui/core/Typography'
import CurrencyInput from 'components/CustomInput/CurrencyInput'
import useStyles from './styles/CommonStyles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import { useMethodContext } from '../../../context/MethodContext'

const Efectivo = ({ multiple }) => {
  const { amount, setAttr } = useMethodContext()
  const classes = useStyles()

  useEffect(() => {
    setAttr('efectivo', amount)
  }, [amount])

  const handleChangeAmount = value => {
    setAttr('efectivo', { amount: value })
  }

  return (
    <GridContainer justify="center" alignItems="center" className={classes.container}>
      <GridItem xs={4}>
        <Typography align="right" className={classes.label}>
          Efectivo
        </Typography>
      </GridItem>
      <GridItem xs={4}>
        {multiple ? (
          <CurrencyInput
            label="Valor"
            onChange={handleChangeAmount}
            placeholder="Ingrese un valor"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        ) : (
          <Typography>{amount}</Typography>
        )}
      </GridItem>
    </GridContainer>
  )
}

Efectivo.defaultProps = {
  multiple: false,
}

Efectivo.propTypes = {
  multiple: PropTypes.bool,
}

export default Efectivo
