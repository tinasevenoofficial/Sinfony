import { yupResolver } from '@hookform/resolvers/yup'
import { string, object } from 'yup'

export const SelectProcessSchema = yupResolver(
  object().shape({
    id_tramite: string().required('Campo requerido'),
  })
)

export const defaultSelectProcess = {
  id_tramite: '',
}
