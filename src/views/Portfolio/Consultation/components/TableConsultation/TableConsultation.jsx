/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'

import { Switch } from 'antd'
import PropTypes from 'prop-types'

import { useSWR } from 'hooks'
import { VirtualTable } from 'components'
import Button from 'components/CustomButtons/Button'
import FormatearNum from "components/ComponenteFormatearNumero/Formatear_numeros"
import Checkbox from "@material-ui/core/Checkbox";

import useStyles from './TableConsultation.styles'

import {  primaryColor } from "assets/jss/material-dashboard-pro-react.js";


const TableConsultation = ({ client, loading }) => {
  const classes = useStyles()
  console.log("loading" + loading)
  const data = client ? client.facturas : []

  const [arrayFacturas, setArraFacturas] = useState([])

  const handleArrayFacturas = (value) => {
    arrayFacturas.push({ factura: value })
  }

  const columns = [
    {
      title: 'Prefijo',
      dataIndex: 'prefijo',
      key: 'prefijo',
    },
    {
      title: 'Factura',
      dataIndex: 'numero_factura',
      key: 'numero_factura',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha_factura',
      key: 'fecha_factura',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (_, record) => (
        <>
          {FormatearNum(record.valor)}
        </>
      )
    },
    {
      title: 'Abonos',
      dataIndex: 'valor_pago',
      key: 'valor_pago',
      // render: (_, record) => (
      //   <>
      //     {FormatearNum(record.valor_pago)}
      //   </>
      // )
    },
    {
      title: 'Escritura',
      dataIndex: 'num_escritura',
      key: 'num_escritura',
    },
    {
      title: 'Acto',
      dataIndex: 'nombre_acto',
      key: 'nombre_acto',
    },
    {
      title: 'De',
      dataIndex: 'De',
      key: 'De',
    },
    {
      title: 'A',
      dataIndex: 'A',
      key: 'A',
    },
    {
      title: 'Cuenta',
      dataIndex: 'cuenta',
      key: 'cuenta',
    },
    {
      title: 'CxC',
      dataIndex: 'CxC',
      key: 'activo',
      render: (_, record) => (
        <>
          <Checkbox
            style ={{
              color: primaryColor[0],
            }}
            tabIndex={-1}
            onClick={() => handleArrayFacturas(record.numero_factura)}
            classes={{
              checked: classes.checked,
              root: classes.checkRoot,
            }}
          />
        </>
      ),
    },
  ]

  return (
    <>
      <VirtualTable dataSource={data} size="small" bordered loading={loading} columns={columns} pagination={false} />
      <Grid className={classes.buttonGroup} container spacing={3} justify="flex-end">
        <Grid item>
          <Button color="rose">Registrales</Button>
        </Grid>
        <Grid item>
          <Button color="rose">Exportar</Button>
        </Grid>
        <Grid item>
          <Button color="rose">Cuenta</Button>
        </Grid>
      </Grid>
    </>
  )
}

TableConsultation.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
}

export default TableConsultation
