import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
// ant design
import { message } from 'antd';

import { EXTERNAL_API_PATHS } from 'utils/constants'

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

import { primaryColor, infoColor } from 'assets/jss/material-dashboard-pro-react.js'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

const themeInputInfo = createTheme({
  palette: {
    primary: {
      main: infoColor[0],
      light: infoColor[0],
      dark: infoColor[0],
    },
    secondary: {
      main: primaryColor[0],
      light: primaryColor[0],
      dark: primaryColor[0],
    },
  },
})

export default function Persona({ addPerson, open, handleClose, title, integrado }) {


  const auth = useSelector(state => state.auth)

  const [lisTipoDoc, setLisTipoDoc] = React.useState([])
  const [regimen, setRegimen] = useState([])
  const [organizaiones, setOrganizacions] = useState([])
  const [estados, setEstados] = useState([])
  const [responsabilidades, setResponsabilidades] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [municipiosExpedicion, setMunicipiosExpedicion] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [tipoDoc, setTipoDoc] = useState('')
  const [regi, setRegi] = useState('')
  const [estado, setEstado] = React.useState('')
  const [responsabilidad, setResponsabilidad] = React.useState('')
  const [organi, setOrgani] = React.useState('')
  const [cedula, setCedula] = React.useState('')
  const [pais, setPais] = React.useState('')
  const [departamento, setDepartamento] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [nombre, setNombre] = useState('')
  const [digito, setDigito] = useState('')
  const [excedente, setExcedente] = useState(0)
  const [apellidos, setApellido] = useState('')
  const [direccion, setDireccion] = useState('')
  const [actividad, setActividad] = useState('')
  const [email, setEmail] = useState('')
  const [lugar, setLugar] = useState({ name: '' })
  const [telefono, setTelefono] = useState('')
  const [fem, setFem] = useState(false)
  const [mas, setMas] = useState(false)
  const [encontrado, setEncontrado] = useState(null)
  const [openModal, setOpenModal] = useState(open)


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

  useEffect(() => {
    const consultar = async () => {
      getTipoDocumento()
      getTipoRegimen()
      getTipoOrganizaciones()
      getEstados()
      getResponsabilidades()
      getMunicipios()
      getDepartamentos()
    }
    consultar()
  }, [])

  useEffect(() => {
    setOpenModal(open);
  }, [open])

  const getTipoDocumento = async () => {
    axios.get(EXTERNAL_API_PATHS['tipoDocIde']).then(res => {
      setLisTipoDoc(res.data)
    })
  }
  const getTipoRegimen = async () => {
    axios.get(EXTERNAL_API_PATHS['tipoRegimen']).then(res => {
      setRegimen(res.data)
    })
  }
  const getTipoOrganizaciones = async () => {
    axios.get(EXTERNAL_API_PATHS['tipoOrganizacion']).then(res => {
      setOrganizacions(res.data)
    })
  }
  const getEstados = async () => {
    axios.get(EXTERNAL_API_PATHS['estadoCivil']).then(res => {
      setEstados(res.data)
    })
  }
  const getResponsabilidades = async () => {
    axios.get(EXTERNAL_API_PATHS['tipoResponsabilidad']).then(res => {
      setResponsabilidades(res.data)
    })
  }
  const getMunicipios = async () => {
    axios.get(EXTERNAL_API_PATHS['municipio']).then(res => {
      setMunicipios(res.data)
      setMunicipiosExpedicion(res.data.map(item => ({ id: item.id, name: item.name })))
    })
  }
  const getDepartamentos = async () => {
    axios.get(EXTERNAL_API_PATHS['departamento']).then(res => {
      setDepartamentos(res.data)
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
  const setPersona = async () => {
    let data = {
      tipo_documento: tipoDoc,
      numero_documento: cedula.toString(),
      digito: digito,
      nombres: nombre,
      apellidos: apellidos,
      direccion: direccion,
      actividad: actividad,
      telefono: telefono.toString(),
      correo_electronico: email,
      id_tipos_personas: 2,
      id_municipio: municipios.filter(mun => mun.name === municipio)[0]?.id,
      id_tipos_organizaciones: organi,
      id_tipos_regimen: regi,
      id_estados_civiles: estado,
      genero: fem ? 'F' : 'M',
      exento: excedente,
      id_tipos_responsabilidades: responsabilidad,
      lugar_expedicion_documento: lugar.id,
    }

    if (encontrado) {
      axios
        .put(EXTERNAL_API_PATHS['persona'] + '/' + encontrado, data)
        .then(res => {
          if (res.status === 200) {
            addPersonInternal(res.data)
          }
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      axios
        .post(EXTERNAL_API_PATHS['persona'], data)
        .then(res => {
          if (res.status === 201) {
            addPersonInternal(res.data)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
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
  const Limpiar = () => {
    setCedula('')
    setApellido('')
    setNombre('')
    setTipoDoc('')
    setEstado('')
    setFem(false)
    setMas(false)
    setEmail('')
    setDireccion('')
    setDepartamento('')
    setMunicipio('')
    setLugar({ name: '' })
    setTelefono('')
    setActividad('')
    setOrgani(null)
    setEstado(null)
    setRegi(null)
    setResponsabilidad(null)
    setExcedente(0)
    setDigito(null)
  }

  const buscar = () => {
    axios
      .get(EXTERNAL_API_PATHS['persona'] + '?accion=PersonaxNombres&numero_documento=' + cedula)
      .then(res => {
        if (res.data.length > 1) {
          alert('existe una persona duplicada')
          return
        }
        if (res.data.length == 0) {
          alert('Documento no encontrado, regístrelo')
          return
        }

        res.data.map(item => {
          if (res.data.length == 1) {
            setEncontrado(item.id)
          }

          let muni = municipios.filter(mun => mun.id == item.id_municipio)
          let muni2 = municipios.filter(mun2 => mun2.id == item.lugar_expedicion_documento)
          if (item.id_municipio) setDepartamento(muni[0].department_id)
          if (item.lugar_expedicion_documento) setLugar({ id: muni2[0].id, name: muni2[0].name })

          if (item.genero === null) {
            setFem(false)
            setMas(false)
          } else if (item.genero === 'F') {
            setFem(true)
          } else {
            setMas(true)
          }
          setCedula(item.numero_documento)
          setApellido(item.apellidos)
          setNombre(item.nombres)
          setDigito(item.digito)
          setTipoDoc(item.tipo_documento)
          setEstado(item.id_estados_civiles)
          setEmail(item.correo_electronico)
          setDireccion(item.direccion)
          setMunicipio(item.id_municipio)
          setTelefono(item.telefono)
          setActividad(item.actividad)
          setOrgani(item.id_tipos_organizaciones)
          setResponsabilidad(item.id_tipos_responsabilidades)
          setRegi(item.id_tipos_regimen)
          setDigito(item.digito)
          setExcedente(item.exento)
        })
      })
  }


  const handleCloseInternal = () => {
    if(integrado){
      handleClose(false)
    }else{
      setOpenModal(false);
    }
    
  };

  const addPersonInternal = (data) => {
    if(integrado){
      addPerson(data)
    }else{
      message.success({ content: "Cliente Creado", key: 'createPerson', duration: 3 });
      Limpiar()
    }
    
  };
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
    <>
      <Dialog open={openModal} onClose={handleCloseInternal} maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <ThemeProvider theme={themeInputInfo}>
          <DialogContent>
            <Grid spacing={2} container direction="row" justify="center" alignItems="center">
              <Grid item sm={6} xs={12}>
                <TextField
                  id="standard-select-tipoDoc"
                  select
                  label="Tipo de documento"
                  value={tipoDoc}
                  onChange={event => setTipoDoc(event.target.value)}
                  fullWidth
                >
                  {Array.isArray(lisTipoDoc) &&
                    lisTipoDoc.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12} md={6}>
                <TextField
                  autoFocus
                  margin="normal"
                  placeholder="Número del documento"
                  type="text"
                  onChange={event => setCedula(event.target.value)}
                  fullWidth
                />
              </Grid>
              {integrado == true && (
              <Grid item sm={2} xs={2}>
                <Button
                  type="button"
                  color="secondary"
                  variant="contained"
                  size="small"
                  style={{ marginTop: '20px' }}
                  onClick={buscar}
                >
                  Buscar
                </Button>
              </Grid>
              )}
            </Grid>
            {(tipoDoc === 6 || tipoDoc === 9) && (
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
                      id="standard-select-tipoDoc"
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
                      id="standard-select-tipoDoc"
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
                  {integrado == true && (<>
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
                      id="standard-select-tipoDoc"
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
                  </>)}
                </Grid>
              </>
            )}
            {(tipoDoc === 7 || tipoDoc === 8 || tipoDoc === 4 || tipoDoc === 5) && (
              <>
                <Grid spacing={2} container direction="row" justify="center">
                  
                </Grid>
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
                {integrado == true && (
                <Grid spacing={2} container direction="row" justify="center" alignItems="center">
                  <Grid item sm={6} xs={12}>
                    <TextField
                      id="standard-select-tipoDoc"
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
                    <FormGroup row>
                      <FormLabel component="legend">Género:</FormLabel>
                      <FormControlLabel
                        control={<Checkbox checked={fem} onChange={e => setFem(e.target.checked)} name="fem" />}
                        label="Femenino"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={mas} onChange={e => setMas(e.target.checked)} name="mas" />}
                        label="Masculino"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
                )}
              </>
            )}
            {tipoDoc <= 3 && (
              <>
                <Grid spacing={2} container direction="row" justify="center" alignItems="center">
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
                {integrado == true && (
                <Grid spacing={2} container direction="row" justify="center" alignItems="center">
                  <Grid item sm={6} xs={12}>
                    <TextField
                      id="standard-select-tipoDoc"
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
                    <FormGroup row>
                      <FormLabel component="legend">Género:</FormLabel>
                      <FormControlLabel
                        control={<Checkbox checked={fem} onChange={e => setFem(e.target.checked)} name="fem" />}
                        label="Femenino"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={mas} onChange={e => setMas(e.target.checked)} name="mas" />}
                        label="Masculino"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
                )}
              </>
            )}
            <Grid spacing={2} container direction="row" justify="center" alignItems="center">
            <Grid item sm={6} xs={12}>
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
                  <Grid item sm={6} xs={12}>
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
              <Grid item sm={6} xs={12}>
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
              <Grid item sm={3} xs={12}>
                <TextField
                  id="standard-select-tipoDoc"
                  select
                  label="Departamento"
                  value={departamento}
                  onChange={e => setDepartamento(e.target.value)}
                  fullWidth
                >
                  {departamentos.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={3} xs={12}>
                <TextField
                  id="standard-select-tipoDoc"
                  value={municipio}
                  select
                  label="Municipio"
                  onChange={e => setMunicipio(e.target.value)}
                  fullWidth
                >
                  {municipios
                    .filter(muni => muni.department_id === departamento)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(muni => (
                      <MenuItem key={muni.id} value={muni.id}>
                        {muni.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            </Grid>
            {integrado == true && (
            <Grid spacing={2} container direction="row" justify="center" alignItems="center">
              <Grid item sm={6} xs={12}>
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
              <Grid item sm={6} xs={12}>
                <Autocomplete
                  id="size-small-standard"
                  size="small"
                  options={municipiosExpedicion}
                  getOptionLabel={option => (option.name ? option.name : '')}
                  value={lugar}
                  onChange={(event, value) => setLugar(value)}
                  renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Lugar de Expedición"
                    placeholder="Seleccione"
                    fullWidth
                  />
                  )}
                />
              </Grid>
            </Grid>
            )}
            <Grid spacing={2} container direction="row" justify="center" alignItems="center">
              <Grid>
                <Button
                  type="button"
                  color="secondary"
                  variant="contained"
                  size="small"
                  style={{ marginTop: '20px' }}
                  onClick={setPersona}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </ThemeProvider>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseInternal()
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
    </>
  )
}

Persona.defaultProps = {
  addPerson: () => {}, // Función vacía como valor por defecto
  open: true, // Valor por defecto para open
  handleClose: () => {}, // Función vacía como valor por defecto
  title: 'Factura Electrónica', // Título por defecto
  integrado: false
};