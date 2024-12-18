import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import useStyles from './styles/CommonStyles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import FormControl from '@material-ui/core/FormControl'
import CircularProgress from '@material-ui/core/CircularProgress'
import CustomInput from 'components/CustomInput/CustomInput.js'
import axios from 'axios'
import { EXTERNAL_API_PATHS } from 'utils/constants'
import useStylesForm from '../../../assets/jss/material-dashboard-pro-react/views/common'
import { useMethodContext } from '../../../context/MethodContext'
import Danger from 'components/Typography/Danger.js'
import CurrencyInput from 'components/CustomInput/CurrencyInput'

const Transferencia = ({ multiple }) => {
  const classes = useStyles()
  const classesForm = useStylesForm()
  const [loading, setLoading] = useState(true)
  const [bancos, setBancos] = useState(null)
  const { setAttr, errors } = useMethodContext()

  const handleChange = e => {
    multiple ? setAttr('datafono', { [e.target.name]: e.target.value }, 1) : setAttr(e.target.name, e.target.value)
  }

  const handleChangeAmount = value => {
    setAttr('transferencia', { amount: value }, 1)
  }

  useEffect(() => {
    axios.get(EXTERNAL_API_PATHS['banco']).then(res => {
      setBancos(res.data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <GridContainer justify="center" alignItems="center" className={classes.container}>
          <GridItem xs={6} sm={6} md={6}>
            <Typography className={classes.label} align="right">
              Banco
            </Typography>
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <FormControl fullWidth className={classesForm.selectFormControl}>
              <Select
                MenuProps={{
                  className: classesForm.selectMenu,
                }}
                classes={{
                  select: classesForm.select,
                }}
                displayEmpty
                defaultValue=""
                // onChange={}
                inputProps={{
                  name: 'banco',
                  onChange: handleChange,
                }}
              >
                <MenuItem
                  disabled
                  value=""
                  classes={{
                    root: classesForm.selectMenuItem,
                  }}
                >
                  Seleccione Banco
                </MenuItem>
                {bancos?.map(({ detalle, id }) => (
                  <MenuItem
                    key={id}
                    classes={{
                      root: classesForm.selectMenuItem,
                      selected: classesForm.selectMenuItemSelected,
                    }}
                    value={id}
                  >
                    {detalle.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
              {errors && <Danger>{errors.banco}</Danger>}
            </FormControl>
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <Typography className={classes.label} align="right">
              Número Transferencia
            </Typography>
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              id="numTransferencia"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'numero_transferencia',
                type: 'text',
                maxLength: 10,
                autoComplete: 'off',
                onChange: handleChange,
              }}
            />
            {errors && <Danger>{errors.numero_transferencia}</Danger>}
          </GridItem>
          {multiple ? (
            <>
              <GridItem xs={6} sm={6} md={6}>
                <Typography className={classes.label} align="right">
                  Valor
                </Typography>
              </GridItem>
              <GridItem xs={6} className={classes.currencyInput}>
                <CurrencyInput
                  label="Valor"
                  onChange={handleChangeAmount}
                  placeholder="Ingrese un valor"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </GridItem>
            </>
          ) : null}
        </GridContainer>
      )}
    </>
  )
}

Transferencia.defaultProps = {
  multiple: false,
}

Transferencia.propTypes = {
  multiple: PropTypes.bool,
}
export default Transferencia
