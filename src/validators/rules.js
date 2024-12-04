import Bono from './Bono'
import Cheque from './Cheque'
import Credito from './Credito'
import Datafono from './Datafono'
// import Efectivo from "./Efectivo";
import Transferencia from './Transferencia'
import Multiple from './Multiple'
import Deposito from './Deposito'

const rules = method => {
  switch (method) {
    case 'BONO':
      return Bono
    case 'CHEQUE':
      return Cheque
    case 'CRÉDITO':
      return Credito
    case 'DATAFONO':
      return Datafono
    // case "EFECTIVO":
    //   return Efectivo;
    case 'TRANSFERENCIA':
      return Transferencia
    case 'MÚLTIPLE MEDIO DE PAGO':
      return Multiple
    case 'DEPÓSITO':
      return Deposito
    default:
      console.log('Error: Rules not found')
  }
}
export default rules
