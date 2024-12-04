import { useSelector } from 'react-redux'
import { EXTERNAL_API_PATHS } from 'utils/constants'

const auth = useSelector(state => state.auth)

export const getPersonas = async () => {
  let config = {
    headers: { Authorization: `Bearer ${auth.token}` }
  }
  axios
    .get(
      EXTERNAL_API_PATHS.persona+
        '?accion=PersonaxCargo&valor=otorgante'
    )
    .then(response => {
      let data = response.data
      console.log(response.data)
      let datas = data.map(item => ({
        key: item.id,
        nombre: item.nombres,
        apellidos: item.apellidos,
        direccion: item.direccion === null ? 'No hay datos' : item.direccion,
        genero: item.genero,
        documento: item.numero_documento,
        telefono: item.telefono,
        estado_civil: item.id_estados_civiles,
        municipio: item.id_municipio,
        tipo_doc: item.tipo_documento,
        email: item.correo_electronico,
        lugar: item.lugar_expedicion_documento
      }))
      return (datas)
    })
}
