import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { EXTERNAL_API_PATHS } from 'utils/constants'

import { municipios, departamentos } from './../Data/defaultValues'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import Autocomplete from '@material-ui/lab/Autocomplete'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import useStyles from './syles.js'

const estado = [
  {
    value: 1,
    label: 'Soltero/a',
  },
  {
    value: 1,
    label: 'Casado/a',
  },
  {
    value: 3,
    label: 'Divorciado/a',
  },
  {
    value: 4,
    label: 'Viudo/a',
  },
]

export default function Ortogante({ open, handleClose }) {
  const classes = useStyles()
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

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
  const [fem, setFem] = useState(false)
  const [mas, setMas] = useState(false)

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
    let config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    }
    axios
      .get(EXTERNAL_API_PATHS.persona+'?accion=PersonaxCargo&valor=otorgante', config)
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
          lugar: item.lugar_expedicion_documento,
          regimen: item.id_tipos_regimenes,
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
    getData()
  }, [])

  const getTipoDocumento = async () => {
    axios.get(EXTERNAL_API_PATHS.tipoDocIde).then(response => {
      let data = response.data
      console.log(response.data)
      let datas = data.map(item => ({
        id: item.id,
        name: item.name,
      }))
      setTipoDoc(datas)
    })
  }
  useEffect(() => {
    getTipoDocumento()
  }, [])

  const getTipoRegimen = async () => {
    let config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    }
    axios.get(EXTERNAL_API_PATHS.tipoRegimen).then(response => {
      let data = response.data
      console.log(response.data)
      let datas = data.map(item => ({
        id: item.id,
        name: item.name,
      }))
      setRegimen(datas)
    })
  }
  useEffect(() => {
    getTipoRegimen()
  }, [])

  const getTipoOrganizaciones = async () => {
    let config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    }
    axios.get(EXTERNAL_API_PATHS.tipoOrganizacion).then(response => {
      let data = response.data
      console.log(response.data)
      let datas = data.map(item => ({
        id: item.id,
        name: item.name,
      }))
      setOrganizacions(datas)
    })
  }
  useEffect(() => {
    getTipoOrganizaciones()
  }, [])

  const getEstados = async () => {

    axios.get(EXTERNAL_API_PATHS.estadoCivil).then(response => {
      let data = response.data
      console.log(response.data)
      let datas = data.map(item => ({
        id: item.id,
        name: item.name,
      }))
      setEstados(datas)
    })
  }
  useEffect(() => {
    getEstados()
  }, [])

  const getResponsabilidades = async () => {
    let config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    }
    axios.get(EXTERNAL_API_PATHS.tipoResponsabilidad).then(response => {
      let data = response.data
      console.log(response.data)
      let datas = data.map(item => ({
        id: item.id,
        name: item.name,
      }))
      setResponsabilidades(datas)
    })
  }
  useEffect(() => {
    getResponsabilidades()
  }, [])
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
  const setOtorgante = async () => {
    let data = {
      tipo_documento: currency,
      numero_documento: cedula,
      digito: digito,
      nombres: nombre,
      apellidos: apellidos,
      direccion: direccion,
      actividad: actividad,
      telefono: telefono,
      correo_electronico: email,
      id_tipos_personas: 2,
      id_municipio: municipios.filter(mun => mun.name === municipio1)[0]?.id,
      id_tipos_organizaciones: organi,
      id_tipos_regimen: regi,
      id_estados_civiles: estado,
      genero: fem ? 'F' : 'M',
      exento: excedente,
      id_tipos_responsabilidades: responsabilidad,
    }
    axios
      .post(EXTERNAL_API_PATHS.persona, data)
      .then(response => {
        if (response.status === 201) {
          Añadir()
          Limpiar()
          getData()
          console.log('EXITOOOO')
        }
      })
      .catch(e => {
        console.log(e)
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
        <DialogContent>
          <DialogContentText style={{ padding: '25px 25px 25px 25px' }}>
            <Grid spacing={2} container direction="row" justify="center" alignItems="center">
              <Grid item sm={10} xs={10}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={persona?.map(option => option?.documento.toString())}
                  inputValue={cedula}
                  onInputChange={(event, newInputValue) => {
                    setCedula(newInputValue)
                  }}
                  renderInput={params => (
                    <TextField {...params} margin="normal" placeholder="Número del documento" type="number" />
                  )}
                />
              </Grid>
              <Grid item sm={2} xs={2}>
                <Button
                  type="button"
                  color="secondary"
                  size="small"
                  variant="contained"
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      getOptionLabel={option => option.name}
                      value={lugar}
                      onChange={(event, newValue) => {
                        setLugar(newValue)
                      }}
                      renderInput={params => (
                        <TextField {...params} margin="normal" placeholder="Lugar de expedición" />
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      autoFocus
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
                      autoFocus
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
              </>
            )}
            <Grid spacing={2} container direction="row" justify="center" alignItems="center">
              <Grid item sm={4} xs={12}>
                <TextField
                  autoFocus
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
                  autoFocus
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
                  autoFocus
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
                  autoFocus
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
                  size="small"
                  variant="contained"
                  style={{ marginTop: '20px' }}
                  onClick={setOtorgante}
                >
                  Guardar
                </Button>
              </Grid>
              <Grid>
                <Button
                  type="button"
                  color="secondary"
                  size="small"
                  variant="contained"
                  style={{ marginTop: '20px' }}
                  onClick={Añadir}
                >
                  Añadir
                </Button>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
              Limpiar()
            }}
            color="secondary"
            size="small"
            variant="contained"
          >
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
