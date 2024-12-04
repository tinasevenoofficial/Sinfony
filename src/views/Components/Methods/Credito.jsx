import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Select } from 'antd'
import useStyles from './styles/CommonStyles'
import { useEffect } from 'react'
import axios from 'axios'
import { EXTERNAL_API_PATHS } from 'utils/constants'
import { useMethodContext } from '../../../context/MethodContext'
import Danger from 'components/Typography/Danger.js'
import CurrencyInput from 'components/CustomInput/CurrencyInput'

const { Option } = Select

const Credito = ({ creditType, multiple }) => {
  const classes = useStyles()
  const [selected, setSelected] = useState()
  const [loading, setLoading] = useState(true)
  const [deudores, setDeudores] = useState([])
  const { setAttr, errors } = useMethodContext()

  function handleSelect(id) {
    const sel = deudores.find(d => d.numero_documento === id)
    if (multiple) {
      setAttr('credito', { deudor: id }, 1)
      setAttr('credito', { tipo_credito: creditType }, 1)
    } else {
      setAttr('deudor', id)
      setAttr('tipo_credito', creditType)
    }
    setSelected(sel)
  }

  const handleChangeAmount = value => {
    setAttr('credito', { amount: value }, 1)
  }

  useEffect(() => {
    axios.get(EXTERNAL_API_PATHS.cliente).then(res => {
      setDeudores(
        Object.values(
          res.data.reduce(
            (acc, curr) =>
              acc[curr.numero_documento]
                ? acc
                : {
                    ...acc,
                    [curr.numero_documento]: curr,
                  },
            {}
          )
        )
      )
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
        <GridContainer justify="flex-start" alignItems="center" className={classes.container}>
          <GridItem xs={8}>
            <Select
              showSearch
              dropdownStyle={{ zIndex: 2000 }}
              style={{ width: '100%' }}
              placeholder="Seleccione Deudor"
              optionFilterProp="children"
              onChange={handleSelect}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {deudores?.map(deudor => (
                <Option value={deudor.numero_documento}>{`${
                  deudor.numero_documento
                } - ${deudor.nombre.toUpperCase()}`}</Option>
              ))}
            </Select>
            {errors && <Danger>{errors.deudor}</Danger>}
          </GridItem>
          <GridItem xs={12}>
            <Typography variant="h6">
              <b>{selected?.nombre}</b>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography className={classes.label}>{selected?.numero_documento || selected?.documento_nit}</Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography className={classes.label}>{selected?.direccion}</Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography className={classes.label}>{selected?.telefono}</Typography>
          </GridItem>
          {multiple ? (
            <GridItem xs={12} className={classes.currencyInput}>
              <CurrencyInput
                label="Valor"
                onChange={handleChangeAmount}
                placeholder="Ingrese un valor"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </GridItem>
          ) : null}
        </GridContainer>
      )}
    </>
  )
}

Credito.defaultProps = {
  creditType: 'escrituras',
  multiple: false,
}
Credito.propTypes = {
  creditType: PropTypes.string,
  multiple: PropTypes.bool,
}

export default Credito
