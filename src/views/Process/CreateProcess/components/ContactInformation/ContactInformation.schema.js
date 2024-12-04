import { yupResolver } from '@hookform/resolvers/yup'
import { number, string, object } from 'yup'

export const ContactInformationSchema = yupResolver(
  object().shape({
    nombre: string().required('Campo requerido'),
    apellidos: string().required('Campo requerido'),
    correo_electronico: string().email('Correo no valido').required('Campo requerido'),
    telefono: string().required('Campo requerido'),
    direccion: string().required('Campo requerido'),
  })
)

export const defaultContactInformation = {
  nombre: '',
  apellidos: '',
  correo_electronico: '',
  telefono: '',
  direccion: '',
}
