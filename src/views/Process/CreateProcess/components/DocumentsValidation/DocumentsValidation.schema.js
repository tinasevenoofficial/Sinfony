import { yupResolver } from '@hookform/resolvers/yup'
import { string, object } from 'yup'

export const DocumentsValidationSchema = yupResolver(
  object().shape({
    comentarios: string(),
  })
)

export const defaultDocumentsValidation = {
  comentarios: '',
}
