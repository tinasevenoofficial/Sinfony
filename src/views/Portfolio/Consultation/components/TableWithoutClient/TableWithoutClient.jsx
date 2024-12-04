import React from 'react'

import Close from '@material-ui/icons/Close'
import Visibility from '@material-ui/icons/Visibility'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'

import { Popconfirm } from 'antd'
import PropTypes from 'prop-types'

import { VirtualTable } from 'components'
import Button from 'components/CustomButtons/Button'
import commonUseStyles from 'assets/jss/material-dashboard-pro-react/views/common'
import FormatearNum from "components/ComponenteFormatearNumero/Formatear_numeros"

import useStyles from './TableWithoutClient.styles'

const TableWithoutClient = ({ clients, loading, onDelete, onOpen }) => {
  const common = commonUseStyles()
  const classes = useStyles()

  const columns = [
    {
      title: 'Nit o CC',
      dataIndex: 'numero_documento',
    },
    {
      title: 'Cliente',
      dataIndex: 'nombre_completo',
    },
    {
      title: 'Depositos',
      dataIndex: 'deposito',
      render: (_, record) => (
        <>
          {FormatearNum(record.depositos)}
        </>
      )
    },
    {
      title: 'Varios',
      dataIndex: 'vario',
      render: (_, record) => (
        <>
          {FormatearNum(record.varios)}
        </>
      )
    },
    {
      title: 'Escrituras',
      dataIndex: 'escritura',
      render: (_, record) => (
        <>
          {FormatearNum(record.escrituras)}
        </>
      )
    },
    {
      title: 'Total',
      dataIndex: 'preciototal',
      render: (_, record) => (
        <>
          {FormatearNum(record.total)}
        </>
      )
    },
    {
      title: 'Acciones',
      dataIndex: 'address',
      render: (_, record) => (
        <>
          <Tooltip title="Ver">
            <Button color="info" className={common.actionButton} onClick={() => onOpen(record.id_clientes)}>
              <Visibility className={common.icon} />
            </Button>
          </Tooltip>
          <Popconfirm title="Seguro deseas eliminar?" onConfirm={() => onDelete(record.id_clientes)}>
            <Button color="danger" className={common.actionButton}>
              <Close className={common.icon} />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  return (
    <>
      <VirtualTable dataSource={clients} size="small" bordered loading={loading} columns={columns} pagination={false} />
      <Grid className={classes.buttonGroup} container spacing={3} justify="flex-end">
        <Grid item>
          <Button color="rose" onClick={() => onOpen()}>
            Agregar cliente
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

TableWithoutClient.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
}

export default TableWithoutClient
