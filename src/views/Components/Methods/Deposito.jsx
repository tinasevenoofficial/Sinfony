import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
// @material-ui/core components
import Grid from '@material-ui/core/Grid'
import useStyles from './styles/CommonStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { EXTERNAL_API_PATHS } from 'utils/constants'
import { useMethodContext } from '../../../context/MethodContext'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

// @antd
import { Table, Popconfirm, Spin } from 'antd'

const filter = createFilterOptions()

const Deposito = ({ multiple }) => {
  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(false)
  const [depositos, setDepositos] = useState([])
  const [descargue, setDescargue] = useState('')
  const [error, setError] = useState({
    deposito: null,
    descargue: null,
    valor: null,
  })
  const [notFound, setNotFound] = useState(null)
  const [value, setValue] = useState()
  const [selecteds, setSelecteds] = useState([])

  const { setAttr, errors, setErrors, amount, numRad } = useMethodContext()

  useEffect(() => {
    axios.get(`${EXTERNAL_API_PATHS.deposito}?numero_radicacion=${numRad}`).then(response => {
      setDepositos(s => [...s, ...response.data])
      setLoading(false)
    })
    setDescargue(amount)
  }, [])

  const handleChange = event => {
    if (parseFloat(event.target.value) > amount) {
      setError(s => ({ ...s, descargue: `Max. ${amount}` }))
    } else {
      setError(s => ({ ...s, descargue: null }))
    }
    setDescargue(event.target.value)
  }

  const clearValues = () => {
    setValue(null)
    setDescargue('')
    setError({ deposito: null, descargue: null, valor: null })
  }

  const addDeposito = () => {
    let maxValue = 0
    if (value) {
      maxValue = 'anticipo' in value ? value.anticipo : value.notaria
      setError(s => ({ ...s, deposito: null }))
    } else {
      setError(s => ({
        ...s,
        deposito: `Seleccione un deposito`,
        descargue: null,
      }))
    }
    if (parseFloat(descargue) <= 0) {
      setError(s => ({ ...s, descargue: `Min. 1` }))
    } else if (maxValue <= 0) {
      setError(s => ({ ...s, valor: `Deposito sin fondos` }))
    } else if (parseFloat(descargue) > parseFloat(maxValue)) {
      setError(s => ({
        ...s,
        descargue: `Max. ${maxValue.toLocaleString('es-CO')}`,
        valor: null,
      }))
    } else {
      if (selecteds.findIndex(s => s.numero_deposito === value.numero_deposito) < 0) {
        let newDepositos = [...selecteds, { ...value, descargue }]
        const total = newDepositos.reduce((acc, cur) => acc + cur.descargue, 0)
        if (total <= amount) {
          setSelecteds(newDepositos)
          if (multiple) {
            setAttr('deposito', { total: total }, 1)
            setAttr('deposito', { depositos: newDepositos }, 1)
          } else {
            setAttr('total', total)
            setAttr('depositos', newDepositos)
          }

          clearValues()
          setErrors('depositos', null)
        } else {
          setErrors('depositos', [`El valor maximo es ${amount}`])
        }
      } else {
        setError(s => ({ ...s, deposito: `Ya está agregado` }))
      }
    }
  }

  const deleteDeposito = numero_deposito => {
    setSelecteds(s => s.filter(item => item.numero_deposito !== numero_deposito))
  }

  const columns = [
    {
      title: 'Deposito',
      dataIndex: 'numero_deposito',
      width: '30%',
    },
    {
      title: 'Valor',
      dataIndex: 'notaria',
      render: (_, record) => `$${parseFloat(record.notaria).toLocaleString('es-CO')}`,
    },
    {
      title: 'Descargue',
      dataIndex: 'descargue',
      render: (_, record) => `$${parseFloat(record.descargue).toLocaleString('es-CO')}`,
    },
    {
      title: 'Acciones',
      dataIndex: 'operation',
      // eslint-disable-next-line react/display-name
      render: (_, record) => (
        <Popconfirm
          title="Desea eliminar?"
          overlayStyle={{ zIndex: 1301 }}
          onConfirm={() => deleteDeposito(record.numero_deposito)}
          cancelText="Cancelar"
          okText="Si"
        >
          <DeleteForeverIcon className={classes.icon} />
        </Popconfirm>
      ),
    },
  ]

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Spin size="small" spinning={search}>
          <Grid container justifyContent="center">
            <Grid item xs={4}>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setValue({
                      numero_deposito: newValue,
                    })
                    setNotFound(null)
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setSearch(true)
                    axios
                      .get(`${EXTERNAL_API_PATHS.deposito}?numero_deposito=${newValue.inputValue}`)
                      .then(response => {
                        setValue({ ...response.data[0], anticipo: true })
                        setSearch(false)
                        setNotFound(false)
                      })
                      .catch(() => {
                        setValue({ numero_deposito: null })
                        setNotFound(newValue.inputValue)
                        setSearch(false)
                      })
                    setValue({
                      numero_deposito: newValue.inputValue,
                    })
                  } else {
                    setValue(newValue)
                    setNotFound(null)
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params)

                  // Suggest the creation of a new value
                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue,
                      numero_deposito: `Buscar "${params.inputValue}"`,
                    })
                  }

                  return filtered
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="deposito"
                options={depositos}
                getOptionLabel={option => {
                  if (typeof option === 'string') {
                    return option
                  }
                  if (option.inputValue) {
                    return option.inputValue
                  }
                  return String(option.numero_deposito)
                }}
                renderOption={option => String(option.numero_deposito)}
                getOptionDisabled={option => selecteds.map(s => s.numero_deposito).includes(option.numero_deposito)}
                freeSolo
                fullWidth
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Deposito"
                    placeholder="Buscar"
                    error={!!error?.deposito}
                    helperText={error?.deposito}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="valor"
                label="Valor"
                value={parseFloat(value?.otros || value?.notaria || 0).toLocaleString('es-CO')}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                InputLabelProps={{ shrink: true }}
                error={!!error?.valor}
                helperText={error?.valor}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="descargue"
                label="Descargue"
                value={descargue}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                error={!!error?.descargue}
                helperText={error?.descargue}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button className={classes.buttonCenter} onClick={addDeposito} disabled={search}>
            Agregar
          </Button>
          <Table rowClassName={() => 'editable-row'} bordered dataSource={selecteds} columns={columns} />

          {errors && errors?.depositos && <Alert severity="error">{errors.depositos.join(', ')}</Alert>}
          {errors && errors?.total && <Alert severity="error">{errors.total.join(', ')}</Alert>}
          {notFound && <Alert severity="warning">{`No se encontró el deposito ${notFound}!`}</Alert>}
        </Spin>
      )}
    </>
  )
}

Deposito.defaultProps = {
  multiple: false,
}

Deposito.propTypes = {
  multiple: PropTypes.bool,
}
export default Deposito
