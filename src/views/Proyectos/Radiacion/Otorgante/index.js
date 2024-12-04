import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { EXTERNAL_API_PATHS } from 'utils/constants'

import { municipios, departamentos } from './../Data/defaultValues'

import { message } from 'antd'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import Autocomplete from '@material-ui/lab/Autocomplete'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Operation from 'antd/lib/transfer/operation'
import CloseIcon from '@material-ui/icons/Close'

export default function Ortogante({ open, handleClose, value, radicacion1, setRadicacion1 }) {
  const [persona, setPersona] = React.useState([])
  const [tipodoc, setTipoDoc] = useState([])
  const [regimen, setRegimen] = useState([])
  const [organizaiones, setOrganizacions] = useState([])
  const [estados, setEstados] = useState([])
  const [responsabilidades, setResponsabilidades] = useState([])
  const [currency, setCurrency] = React.useState('')
  const [regi, setRegi] = useState(null)
  const [estado, setEstado] = React.useState(null)
  const [responsabilidad, setResponsabilidad] = React.useState(null)
  const [organi, setOrgani] = React.useState(null)
  const [cedula, setCedula] = React.useState('')
  const [pais, setPais] = React.useState('')
  const [departamento1, setDepartamento1] = useState('')
  const [municipio1, setMunicipio] = useState('')
  const [nombre, setNombre] = useState('')
  const [digito, setDigito] = useState(null)
  const [excedente, setExcedente] = useState(0)
  const [apellidos, setApellido] = useState(null)
  const [direccion, setDireccion] = useState('')
  const [actividad, setActividad] = useState('')
  const [email, setEmail] = useState('')
  const [lugar, setLugar] = useState([])
  const [telefono, setTelefono] = useState('')
  const [genero, setGenero] = useState(false)
  const [search, setSearch] = useState(false)

  const handleSelect = event => {
    setCurrency(event.target.value)
  }

  {
    /*
........######...########.########
.......##....##..##..........##...
.......##........##..........##...
.......##...####.######......##...
.......##....##..##..........##...
.......##....##..##..........##...
........######...########....##...
*/
  }
  const getData = async () => {
    axios.get(EXTERNAL_API_PATHS.persona+'?accion=PersonaxCargo&valor=otorgante').then(response => {
      let data = response.data
      let datas = data.map(item => ({
        id: item.id,
        nombre: item.nombres,
        apellidos: item.apellidos === null ? '' : item.apellidos,
        direccion: item.direccion === null ? 'No hay datos' : item.direccion,
        genero: item.genero,
        documento: item.numero_documento,
        telefono: item.telefono,
        estado_civil: item.id_estados_civiles,
        municipio: item.id_municipio,
        tipo_doc: item.tipo_documento,
        email: item.correo_electronico,
        lugar: item.lugar_expedicion_documento,
        regimen: item.id_tipos_regimen,
        organizacion: item.id_tipos_organizaciones,
        responsabilidad: item.id_tipos_responsabilidades,
        digito: item.digito,
        exento: item.exento,
        actividad: item.actividad,
      }))
      setPersona(datas)
    })
  }
  useEffect(() => {
    if (open) {
      getData()
      getTipoDocumento()
      getTipoRegimen()
      getTipoOrganizaciones()
      getEstados()
      getResponsabilidades()
    }
  }, [open])

  const getTipoDocumento = async () => {
    axios.get(EXTERNAL_API_PATHS.tipoDocIde).then(response => {
      let data = response.data
      let datas = data.map(item => ({
        id: item.id,
        name: item.name,
      }))
      setTipoDoc(datas)
    })
  }

  const getTipoRegimen = async () => {
    axios.get(EXTERNAL_API_PATHS.tipoRegimen).then(response => {
      let data = response.data
      let datas = data.map(item => ({
        id: item.id,
        name: item.name,
      }))
      setRegimen(datas)
    })
  }

  const getTipoOrganizaciones = async () => {
    axios.get(EXTERNAL_API_PATHS.tipoOrganizacion).then(response => {
      let data = response.data
      let datas = data.map(item => ({
        id: item.id,
        name: item.name,
      }))
      setOrganizacions(datas)
    })
  }

  const getEstados = async () => {
    axios.get(EXTERNAL_API_PATHS.estadoCivil).then(response => {
      let data = response.data
      let datas = data.map(item => ({
        id: item.id,
        name: item.name,
      }))
      setEstados(datas)
    })
  }

  const getResponsabilidades = async () => {
    axios.get(EXTERNAL_API_PATHS.tipoResponsabilidad).then(response => {
      let data = response.data
      let datas = data.map(item => ({
        id: item.id,
        name: item.name,
      }))
      setResponsabilidades(datas)
    })
  }
  {
    /*
  ..######..########.########
  .##....##.##..........##...
  .##.......##..........##...
  ..######..######......##...
  .......##.##..........##...
  .##....##.##..........##...
  ..######..########....##...
  */
  }
  const typeAlert = 'updatable'

  const setOtorgante = async () => {
    message.loading({ content: 'Actualizando otorgante...', typeAlert })

    let data = {
      tipo_documento: currency,
      numero_documento: cedula,
      digito: String(digito),
      nombres: nombre,
      apellidos: apellidos,
      direccion: direccion,
      actividad: actividad,
      telefono: String(telefono),
      correo_electronico: email,
      id_tipos_personas: 2,
      id_municipio: municipios.filter(mun => mun.name === municipio1)[0]?.id,
      id_tipos_organizaciones: organi,
      id_tipos_regimen: regi,
      id_estados_civiles: estado,
      genero: genero ? 'F' : 'M',
      exento: excedente,
      id_tipos_responsabilidades: responsabilidad,
    }
    let findPersona = persona.find(item => item.documento === parseInt(cedula))
    axios({
      method: search ? 'put' : 'post',
      url: search
        ? `${EXTERNAL_API_PATHS.persona}/${findPersona.id}`
        : `${EXTERNAL_API_PATHS.persona}`,
      data,
    })
      .then(response => {
        if (response.status === 201) {
          getData()
        }
        search
          ? message.success({ content: 'otorgante actualizado', typeAlert })
          : message.success({ content: 'otorgante agregado', typeAlert })
      })
      .catch(() => {
        search
          ? message.error({
              content: 'No se pudo actualizar el otorgante',
              typeAlert,
            })
          : message.error({
              content: 'No se pudo agregar el otorgante',
              typeAlert,
            })
      })
  }
  {
    /*
  .########.##.....##.##....##..######..####..#######..##....##.########..######.
  .##.......##.....##.###...##.##....##..##..##.....##.###...##.##.......##....##
  .##.......##.....##.####..##.##........##..##.....##.####..##.##.......##......
  .######...##.....##.##.##.##.##........##..##.....##.##.##.##.######....######.
  .##.......##.....##.##..####.##........##..##.....##.##..####.##.............##
  .##.......##.....##.##...###.##....##..##..##.....##.##...###.##.......##....##
  .##........#######..##....##..######..####..#######..##....##.########..######.
  */
  }
  const Limpiar = (all = true) => {
    all && setCedula('')
    setApellido('')
    setNombre('')
    setCurrency('')
    setEstado('')
    setGenero('')
    setEmail('')
    setDireccion('')
    setDepartamento1('')
    setMunicipio('')
    setLugar('')
    setTelefono('')
    setActividad('')
    setOrgani(null)
    setEstado(null)
    setRegi(null)
    setResponsabilidad(null)
    setExcedente(0)
    setDigito(null)
  }

  const cambio = () => {
    if (cedula.length === 0) {
      message.error('Ingrese un documento')
      return
    }
    let findPersona = persona.find(item => item.documento === parseInt(cedula))
    if (findPersona) {
      let lugar = municipios.filter(mun => mun.id === parseInt(findPersona.lugar))
      let muni = municipios.filter(mun => mun.id === parseInt(findPersona.municipio))
      setSearch(true)
      setCedula(findPersona.documento.toString())
      setApellido(findPersona.apellidos)
      setNombre(findPersona.nombre)
      setDigito(findPersona.digito)
      setCurrency(parseInt(findPersona.tipo_doc))
      setEstado(findPersona.estado_civil)
      if (findPersona.genero === null) {
        setGenero('')
      } else if (findPersona.genero === 'Femenino') {
        setGenero('F')
      } else {
        setGenero('M')
      }
      setEmail(findPersona.email)
      setDireccion(findPersona.direccion)
      setDepartamento1(muni[0].id_depto)
      setMunicipio(muni[0].name)
      setLugar(lugar[0])
      setTelefono(findPersona.telefono)
      setActividad(findPersona.actividad)
      setOrgani(findPersona.organizacion)
      setResponsabilidad(findPersona.responsabilidad)
      setRegi(findPersona.regimen)
      setDigito(findPersona.digito)
      setExcedente(findPersona.exento)
    } else {
      Limpiar()
      setSearch(false)
      message.error(`No se encontró el documento`, 3)
    }
  }

  const agregar = () => {
    let doc = tipodoc.filter(doc => doc.id === currency)[0]?.name
    let j = persona.filter(item => item.documento === parseInt(cedula))[0]?.id
    if (cedula.length === 0) {
      message.error('Seleccione un otorgante')
      return
    }
    let exist = radicacion1[value].otorgantes.find(item => item.id == j)
    if (radicacion1.length > 0 && !exist) {
      //let data = JSON.parse(localStorage.getItem('ortogante'))
      let data = [...radicacion1[value].otorgantes]
      data.push({
        id: j,
        porcentaje_participacion: '0',
        id_tipos_otorgantes: 12,
        tipo_documento: doc,
        nombres: nombre + ' ' + apellidos,
        numero_documento: cedula,
        direccion: direccion,
        lugar_expedicion_documento: lugar?.id,
        actividad: actividad,
        telefono: telefono,
        genero: genero ? 'F' : 'M',
        correo_electronico: email,
        id_tipos_personas: '2',
        id_municipio: municipios.filter(mun => mun.name === municipio1)[0]?.id.toString(),
        id_estados_civil: estado,
        id_tipos_organizaciones: organi,
        id_tipos_regimenes: regi,
        excento: excedente,
        id_tipos_responsabilidades: responsabilidad,
        digito: digito,
        id_personas: j,
      })
      let data1 = [...radicacion1]
      data1[value].otorgantes = data
      setRadicacion1(data1)
      Limpiar()
    } else {
      message.error('El otorgante ya fue agregado')
    }
  }

  {
    /*
    .##.....##.####..######..########....###...
    .##.....##..##..##....##....##......##.##..
    .##.....##..##..##..........##.....##...##.
    .##.....##..##...######.....##....##.....##
    ..##...##...##........##....##....#########
    ...##.##....##..##....##....##....##.....##
    ....###....####..######.....##....##.....##
    */
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Otorgante</DialogTitle>
        <DialogContent style={{ padding: '40px 40px 40px 40px' }}>
          <Grid spacing={2} container direction="row" justify="center" alignItems="center">
            <Grid item sm={10} xs={10}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={persona?.map(option => option?.documento.toString())}
                inputValue={cedula}
                closeIcon={<CloseIcon fontSize="small" onClick={() => Limpiar()} />}
                onInputChange={(event, newInputValue) => {
                  setCedula(newInputValue)
                  Limpiar(false)
                }}
                renderInput={params => (
                  <TextField {...params} autoFocus margin="normal" placeholder="Número del documento" type="number" />
                )}
              />
            </Grid>
            <Grid item sm={2} xs={2}>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                size="small"
                style={{ marginTop: '20px' }}
                onClick={cambio}
              >
                Buscar
              </Button>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                id="standard-select-currency"
                select
                label="Tipo de documento"
                value={currency}
                onChange={handleSelect}
                fullWidth
              >
                {tipodoc.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {(currency === 6 || currency === 9) && (
            <>
              <Grid spacing={2} container direction="row" justify="center" alignItems="center">
                <Grid item sm={6} xs={12}>
                  <TextField
                    margin="dense"
                    id="name"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    label="Razón social"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Regimen"
                    value={regi}
                    onChange={e => setRegi(e.target.value)}
                    fullWidth
                  >
                    {regimen?.map(option => (
                      <MenuItem key={option?.id} value={option?.id}>
                        {option?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Tipo de Organización"
                    value={organi}
                    onChange={e => setOrgani(e.target.value)}
                    fullWidth
                  >
                    {organizaiones?.map(option => (
                      <MenuItem key={option?.id} value={option?.id}>
                        {option?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    margin="dense"
                    id="name"
                    value={digito}
                    onChange={e => setDigito(e.target.value)}
                    label="Digito de verificación"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    margin="dense"
                    id="name"
                    value={excedente}
                    onChange={e => setExcedente(e.target.value)}
                    label="Exento"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Tipo de Responsabilidades"
                    value={responsabilidad}
                    onChange={e => setResponsabilidad(e.target.value)}
                    fullWidth
                  >
                    {responsabilidades.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </>
          )}
          {(currency === 7 || currency === 8 || currency === 4 || currency === 5) && (
            <>
              <Grid spacing={2} container direction="row" justify="center" alignItems="center">
                <Grid item sm={12} xs={12}>
                  <TextField
                    margin="dense"
                    id="name"
                    value={pais}
                    onChange={e => setPais(e.target.value)}
                    label="País"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    margin="dense"
                    id="name"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    label="Nombres"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    margin="dense"
                    id="name"
                    value={apellidos}
                    onChange={e => setApellido(e.target.value)}
                    label="Apellidos"
                    type="text"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid spacing={2} container direction="row" justify="center" alignItems="center">
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Estado civil"
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                    fullWidth
                  >
                    {estados?.map(option => (
                      <MenuItem key={option?.id} value={option?.id}>
                        {option?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Género"
                    value={genero}
                    onChange={e => setGenero(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="F">Femenino</MenuItem>
                    <MenuItem value="M">Masculino</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </>
          )}
          {currency <= 3 && (
            <>
              <Grid spacing={2} container direction="row" justify="center" alignItems="center">
                <Grid item sm={12} xs={12}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={municipios}
                    getOptionLabel={option => (option.name ? option.name : '')}
                    value={lugar}
                    onChange={(event, newValue) => {
                      setLugar(newValue)
                    }}
                    renderInput={params => <TextField {...params} margin="normal" placeholder="Lugar de expedición" />}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    margin="dense"
                    id="name"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    label="Nombres"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    margin="dense"
                    id="name"
                    value={apellidos}
                    onChange={e => setApellido(e.target.value)}
                    label="Apellidos"
                    type="text"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid spacing={2} container direction="row" justify="center" alignItems="center">
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Estado civil"
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                    fullWidth
                  >
                    {estados?.map(option => (
                      <MenuItem key={option?.id} value={option?.id}>
                        {option?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Género"
                    value={genero}
                    onChange={e => setGenero(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="F">Femenino</MenuItem>
                    <MenuItem value="M">Masculino</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </>
          )}
          <Grid spacing={2} container direction="row" justify="center" alignItems="center">
            <Grid item sm={4} xs={12}>
              <TextField
                margin="dense"
                id="name"
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
                label="Dirección"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                id="standard-select-currency"
                select
                label="Departamento"
                value={departamento1}
                onChange={e => setDepartamento1(e.target.value)}
                fullWidth
              >
                {departamentos.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                id="standard-select-currency"
                select
                label="Municipio"
                value={municipio1}
                onChange={e => setMunicipio(e.target.value)}
                fullWidth
              >
                {municipios
                  .filter(municipio => municipio.id_depto === Number(departamento1))
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(municipio => (
                    <MenuItem key={municipio.id} value={municipio.name}>
                      {municipio.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid spacing={2} container direction="row" justify="center" alignItems="center">
            <Grid item sm={4} xs={12}>
              <TextField
                margin="dense"
                id="name"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                label="Teléfono"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                margin="dense"
                id="name"
                name="actividad"
                value={actividad}
                onChange={e => setActividad(e.target.value)}
                label="Actividad Económica"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                margin="dense"
                id="name"
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="Correo electrónico"
                type="email"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid spacing={2} container direction="row" justify="center" alignItems="center">
            <Grid>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                size="small"
                style={{ marginTop: '20px' }}
                onClick={setOtorgante}
              >
                {search ? 'Actualizar otorgante' : 'Crear otorgante'}
              </Button>
            </Grid>
            <Grid>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                size="small"
                style={{ marginTop: '20px' }}
                onClick={agregar}
              >
                Añadir otorgante
              </Button>
            </Grid>
          </Grid>
          {/* </Paper> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
              Limpiar()
            }}
            color="secondary"
            variant="contained"
            size="small"
          >
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
