/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { message } from 'antd'
import { useForm, useFieldArray } from 'react-hook-form'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import MuiButton from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// material ui icons
import SendIcon from '@material-ui/icons/Send'
import AddIcon from '@material-ui/icons/Add'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'

// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardText from 'components/Card/CardText.js'
import CardBody from 'components/Card/CardBody.js'
import FacturaCard from './FacturaCard'
import { EXTERNAL_API_PATHS, REQUIRED_METHODS } from '../../utils/constants'

// style for this view
import styles from 'assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js'
import useStylesLocal from './styles/FacturaStyles'

const useStyles = makeStyles(styles)

const defaultValues = {
  otorgante: null,
  method: null,
  requiredMethod: false,
  total: '',
  percent: 100,
  observation: '',
  method_data: {},
  is_send: false,
  id_factura: null,
}

export default function FacturarEscrituras({ id, numRad, nextStep }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isExist, setIsExist] = useState(false)
  const [total, setTotal] = useState({
    buyers: 0,
    sellers: 0,
  })
  const classes = useStyles()
  const classesLocal = useStylesLocal()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm({ reValidateMode: 'onChange' })
  const { fields: fieldsBuyers, append: addBuyers, remove: delBuyers } = useFieldArray({ control, name: 'compradores' })
  const { fields: fieldsSellers, append: addSellers, remove: delSellers } = useFieldArray({
    control,
    name: 'vendedores',
  })

  const add = type => {
    switch (type) {
      case 'seller':
        if (!isLimit('seller')) {
          addSellers(defaultValues)
        }
        break
      case 'buyer':
        if (!isLimit('buyer')) {
          addBuyers(defaultValues)
        }
        break
      default:
        break
    }
  }

  const isLimit = type => {
    let limit = true
    if (type === 'seller') {
      limit = data && fieldsSellers.length >= data.otorgantes_vendedor.length ? true : false
    } else {
      limit = data && fieldsBuyers.length >= data.otorgantes_comprador.length ? true : false
    }
    return limit
  }

  const getTotal = () => {
    if (data) {
      setTotal(() => ({
        sellers: fieldsBuyers.length > 0 ? data.total_vendedor : data.total,
        buyers: fieldsSellers.length > 0 ? data.total_comprador : data.total,
      }))
    }
  }

  useEffect(() => {
    getTotal()
  }, [fieldsSellers, fieldsBuyers])

  const validationsForm = df => {
    let valid = true
    if (df.vendedores.length > 0 || df.compradores.length > 0) {
      const percentBuyers = df.compradores.reduce((acc, { percent }) => acc + parseInt(percent), 0)
      const percentSellers = df.vendedores.reduce((acc, { percent }) => acc + parseInt(percent), 0)
      let msgSellers = false
      let msgBuyers = false
      df.vendedores.map(({ method, method_data }, id) => {
        let req = REQUIRED_METHODS.includes(method)
        if ((!method_data && req) || (req && Object.keys(method_data).length === 0)) {
          msgSellers = true
          valid = false
        }
      })
      df.compradores.map(({ method, method_data }, id) => {
        let req = REQUIRED_METHODS.includes(method)
        if ((!method_data && req) || (req && Object.keys(method_data).length === 0)) {
          msgBuyers = true
          valid = false
        }
      })
      if (msgSellers || msgBuyers) {
        message.error('Debe completar los metodos de pago requeridos', 4)
      }
      if (percentSellers !== 100 && df.vendedores.length > 0) {
        message.error('Las facturas de vendedores deben cubrir el 100%', 4)
        df.vendedores.map((_, i) => {
          setError(`vendedores.${i}.percent`, { type: 'manual', message: 'Revise el porcentaje' })
        })
        valid = false
      }
      if (percentBuyers !== 100 && df.compradores.length > 0) {
        message.error('Las facturas de compradores deben cubrir el 100%', 4)
        df.compradores.map((_, i) => {
          setError(`compradores.${i}.percent`, { type: 'manual', message: 'Revise el porcentaje' })
        })
        valid = false
      }
    } else {
      message.error('No hay facturas para archivar', 4)
      valid = false
    }
    return valid
  }

  const toArray = dataObject => {
    return dataObject.map(f => {
      if (f.method_data) {
        return {
          ...f,
          method_data: [f.method_data],
        }
      } else {
        return f
      }
    })
  }

  const onSubmit = data => {
    if (validationsForm(data)) {
      message.loading('Enviando...', 3)
      const dataCompradores = toArray(data.compradores)
      const dataVendedores = toArray(data.vendedores)
      const formData = { vendedores: dataVendedores, compradores: dataCompradores, num_radicacion: id }
      axios({
        method: isExist ? 'put' : 'post',
        url: isExist ? `${EXTERNAL_API_PATHS.facturaLiq}/${id}` : EXTERNAL_API_PATHS.facturaLiq,
        data: formData,
      })
        .then(res => {
          message.success('Facturas guardadas', 3)
          nextStep()
        })
        .catch(error => {
          message.error('Error al guardar facturas', 3)
        })
    }
  }
  const transformData = arrayData => {
    return arrayData.map(factura => {
      return {
        otorgante: factura.otorgante,
        id_factura: factura.id,
        respuesta: factura.respuesta,
        method: factura?.metodo_pago,
        requiredMethod: false,
        total: '',
        percent: factura.porcentaje_participacion,
        observation: factura.observaciones,
        method_data: factura.method_data,
        is_send: !!factura.numero_factura,
      }
    })
  }

  useEffect(() => {
    const source = axios.CancelToken.source()
    if (numRad && id) {
      axios.get(`${EXTERNAL_API_PATHS.facturaRadi}${numRad}`, { cancelToken: source.token }).then(res => {
        let total = res.data.total_comprador + res.data.total_vendedor
        setData(() => ({
          ...res.data,
          total,
        }))
        setTotal({ buyers: res.data.total_comprador, sellers: res.data.total_vendedor })
      })
      axios
        .get(`${EXTERNAL_API_PATHS.facturaLiq}/${id}`, { cancelToken: source.token })
        .then(res => {
          setIsExist(res.data.compradores.length > 0 || res.data.vendedores.length > 0)
          res.data.compradores.length > 0 && addBuyers(transformData(res.data.compradores))
          res.data.vendedores.length > 0 && addSellers(transformData(res.data.vendedores))
          setLoading(false)
        })
        .catch(_ => setLoading(false))
    }
    return () => {
      source.cancel('Cancel')
    }
  }, [])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <div className={classesLocal.cardText}>
                <PlaylistAddCheckIcon className={classesLocal.icon} />
                <h4 className={classes.cardTitle}>Facturar Escritura</h4>
              </div>
            </CardText>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classesLocal.contentVendedor}>
                <fieldset className={classesLocal.fieldset}>
                  <span className={classesLocal.legend}>VENDEDORES</span>
                  {fieldsSellers?.map((fact, idf) => (
                    <FacturaCard
                      id={idf}
                      numRad={numRad}
                      key={fact.id}
                      type="vendedores"
                      onClose={() => delSellers(idf)}
                      otorgantes={data?.otorgantes_vendedor}
                      total={total?.sellers}
                      register={register}
                      errors={errors.vendedores && errors.vendedores[idf]}
                      watch={watch}
                      setValue={setValue}
                      lenParent={fieldsSellers.length}
                      control={control}
                    />
                  ))}
                  {data && fieldsSellers ? (
                    <Tooltip title="Agregar factura" placement="right">
                      <Button
                        justIcon
                        round
                        color="rose"
                        className={classesLocal.buttonAdd}
                        onClick={() => add('seller')}
                      >
                        <AddIcon className={classes.icons} />
                      </Button>
                    </Tooltip>
                  ) : (
                    <CircularProgress color="secondary" className="d-block mx-auto" />
                  )}
                </fieldset>
              </div>
              <div className={classesLocal.contentComprador}>
                <fieldset className={classesLocal.fieldset}>
                  <span className={classesLocal.legend}>COMPRADORES</span>
                  {fieldsBuyers?.map((fact, id) => (
                    <FacturaCard
                      key={fact.id}
                      id={id}
                      numRad={numRad}
                      type="compradores"
                      onClose={() => delBuyers(id)}
                      otorgantes={data?.otorgantes_comprador}
                      total={total?.buyers}
                      register={register}
                      errors={errors.compradores && errors.compradores[id]}
                      watch={watch}
                      setValue={setValue}
                      lenParent={fieldsBuyers.length}
                      control={control}
                    />
                  ))}
                  {data && fieldsBuyers ? (
                    <Tooltip title="Agregar factura" placement="right">
                      <Button
                        justIcon
                        round
                        color="rose"
                        className={classesLocal.buttonAdd}
                        onClick={() => add('buyer')}
                      >
                        <AddIcon className={classes.icons} />
                      </Button>
                    </Tooltip>
                  ) : (
                    <CircularProgress color="secondary" className="d-block mx-auto" />
                  )}
                </fieldset>
              </div>
              <MuiButton type="submit" color="secondary" size="small" variant="contained" className="mt-3">
                <SendIcon /> Archivar
              </MuiButton>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

FacturarEscrituras.propTypes = {
  id: PropTypes.string.isRequired,
  nextStep: PropTypes.func,
}
