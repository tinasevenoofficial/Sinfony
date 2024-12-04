import React from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'
import useStyles from './styles/DialogStyles'
import moment from 'moment'
import ReceiptIcon from '@material-ui/icons/Receipt'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import MoneyIcon from '@material-ui/icons/Money'
import DnsIcon from '@material-ui/icons/Dns'
import StyleIcon from '@material-ui/icons/Style'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import { Bono, Credito, Cheque, Datafono, Efectivo, Transferencia, Deposito, Multiple } from './AllModals'
import { MethodProvider } from '../../../context/MethodContext'

const icons = {
  BONO: <ReceiptIcon />,
  CHEQUE: <LocalAtmIcon />,
  CRÉDITO: <CreditCardIcon />,
  DATAFONO: <DnsIcon />,
  DEPÓSITO: <AccountBalanceWalletIcon />,
  EFECTIVO: <MoneyIcon />,
  'MÚLTIPLE MEDIO DE PAGO': <StyleIcon />,
  TRANSFERENCIA: <AccountBalanceIcon />,
}

const Method = props => {
  switch (props.view) {
    case 'BONO':
      return <Bono />
    case 'CHEQUE':
      return <Cheque />
    case 'CRÉDITO':
      return <Credito creditType={props.type} />
    case 'DATAFONO':
      return <Datafono />
    case 'EFECTIVO':
      return <Efectivo />
    case 'TRANSFERENCIA':
      return <Transferencia />
    case 'MÚLTIPLE MEDIO DE PAGO':
      return <Multiple />
    case 'DEPÓSITO':
      return <Deposito />
    default:
      console.log('Error: Dialog not found')
  }
}

const DialogCustom = props => {
  const { open, setOpen, method, value, onSave, setData, numRad, type } = props
  const classes = useStyles()

  return (
    <MethodProvider method={method} amount={value} save={onSave} numRad={numRad} initialData={setData}>
      <Dialog open={open} setOpen={setOpen} icon={icons[method.name]} title={method.name}>
        <div className={classes.info}>
          <p>{moment().format('Y-MM-DD, h:mm A')}</p>
          <p className={classes.value}>{value.toLocaleString('es-CO')}</p>
        </div>
        <div className={classes.content}>
          <Method view={method.name} type={type} />
        </div>
      </Dialog>
    </MethodProvider>
  )
}

DialogCustom.defaultProps = {
  numRad: null,
  type: null,
}

DialogCustom.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  method: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  numRad: PropTypes.number,
  type: PropTypes.string,
}

export default DialogCustom
