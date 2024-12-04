import { yupResolver } from '@hookform/resolvers/yup'
import { array, object, mixed } from 'yup'

export const UploadFilesSchema = yupResolver(
  object().shape({
    documentoPrivado: array()
      .max(3, 'Solo puede subir 3 archivos como máximo, si desea más puede crear un archivo .zip/.rar')
      .min(
        1,
        'Debe seleccionar por lo menos un archivo con los siguientes formatos: Imagen (jpg, jpeg, gif, png), Texto (xls, xlsx, doc, docx, pdf), compresión de archivos (zip, rar). Si desea subir mas de 3 archivos debera crear un .zip/.rar y subirlo'
      )
      .of(mixed()),
    // TO DO: Validar formato de los documentos
    // .test({
    //   name: 'wrong-extension',
    //   test: checkIfFilesAreCorrectType,
    //   message: 'Formato incorrect',
    //   exclusive: false
    // }),
  })
)

// const checkIfFilesAreCorrectType = files => {
//   if (files && files.lenght <= 3)
//     return files.every(file => {
//       if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) return false
//       return true
//     })
//   return false
// }

export const defaultUploadFiles = {
  documentoPrivado: [],
}
