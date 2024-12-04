import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { municipios, departamentos } from './Data/defaultValues'

import SearchIcon from '@material-ui/icons/Search'

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

const currencies = [
  {
    value: 'PS',
    label: 'Pasaporte',
  },
  {
    value: 'CC',
    label: 'Cédula de ciudadania',
  },
  {
    value: 'nit',
    label: 'NIT',
  },
]

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

export default function Otorgante() {
  const classes = useStyles()
  const auth = useSelector(state => state.auth)

  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)
  const [persona, setPersona] = React.useState([])
  const [currency, setCurrency] = React.useState('')
  const [estados, setEstados] = React.useState('')
  const [cedula, setCedula] = React.useState('')
  const [cedula1, setCedula1] = React.useState('')
  const [departamento1, setDepartamento1] = useState('')
  const [municipio1, setMunicipio] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellido] = useState('')
  const [direccion, setDireccion] = useState('')
  const [actividad, setActividad] = useState('')
  const [email, setEmail] = useState('')
  const [lugar, setLugar] = useState([])
  const [telefono, setTelefono] = useState('')
  const [fem, setFem] = useState(false)
  const [mas, setMas] = useState(false)
  const [otro, setOtro] = useState('')
  const [state, setState] = React.useState({
    // fem: false,
    // mas: false,
    // nombre: '',
    // apellidos: '',
    // direccion: '',
    // telefono:'',
    // actividad: '',
    // email:'',
  })

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const handleSelect = event => {
    setCurrency(event.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setCedula1('')
    setApellido('')
    setNombre('')
    setCurrency('')
    setEstados('')
    setFem(false)
    setMas(false)
    setOtro('')
    setEmail('')
    setDireccion('')
    setDepartamento1('')
    setMunicipio('')
    setLugar('')
    setTelefono('')
    setActividad('')
  }

  const handleClickOpen1 = () => {
    setOpen1(true)
  }

  const handleClose1 = () => {
    setOpen1(false)
  }

  console.log(municipio1)

  const cambio = () => {
    persona.map(item => {
      if (item.documento === cedula) {
        let lugar = municipios.filter(mun => mun.id === parseInt(item.lugar))
        let muni = municipios.filter(mun => mun.id === parseInt(item.municipio))

        console.log(item.documento)
        setCedula1(item.documento)
        setApellido(item.apellidos)
        setNombre(item.nombre)
        setCurrency(item.tipo_doc)
        setEstados(item.estado_civil)
        if (item.genero === null) {
          setFem(false)
          setMas(false)
          setOtro('---')
        } else if (item.genero === 'Femenino') {
          setFem(true)
        } else {
          setMas(true)
        }
        setEmail(item.email)
        setDireccion(item.direccion)
        setDepartamento1(muni[0].id_depto)
        setMunicipio(muni[0].name)
        setLugar(lugar[0])
        setTelefono(item.telefono)
        setActividad('Ing. Sistemas')
        console.log(muni[0].name)
      }
    })
  }

  const getData = async () => {
    let config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    }
    axios
      .get(process.env.REACT_APP_URL_API + '/api/persona?accion=PersonaxCargo&valor=otorgante', config)
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
          estado_civil: item.id_estados_civil === null ? 'SOL' : item.direccion,
          municipio: item.id_municipio,
          tipo_doc: item.tipo_documento,
          email: item.email,
          lugar: item.lugar_expedicion_documento,
        }))
        setPersona(datas)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const setOtorgante = async () => {
    let config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    }

    axios
      .post(
        process.env.REACT_APP_URL_API + '/api/persona',
        {
          tipo_documento: currency,
          numero_documento: cedula1,
          nombres: nombre,
          apellidos: apellidos,
          direccion: direccion,
          lugar_expedicion_documento: lugar.id.toString(),
          actividad: actividad,
          telefono: telefono,
          genero: fem ? 'F' : 'M',
          correo_electronico: email,
          id_tipos_personas: '2',
          id_municipio: municipios.filter(mun => mun.name === municipio1)[0]?.id.toString(),
          id_estados_civil: estados.toString(),
        },
        config
      )
      .then(response => {
        if (response.status === 200) {
          console.log('EXITOOOO')
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div>
      <Button variant="outlined" color="secondary" variant="contained" size="small" onClick={handleClickOpen}>
        Registro del otorgante
      </Button>
      <Button variant="outlined" color="secondary" variant="contained" size="small" onClick={handleClickOpen1}>
        Inmuebles
      </Button>
      {/*
        .####.##....##.##.....##.##.....##.########.########..##.......########..######.
        ..##..###...##.###...###.##.....##.##.......##.....##.##.......##.......##....##
        ..##..####..##.####.####.##.....##.##.......##.....##.##.......##.......##......
        ..##..##.##.##.##.###.##.##.....##.######...########..##.......######....######.
        ..##..##..####.##.....##.##.....##.##.......##.....##.##.......##.............##
        ..##..##...###.##.....##.##.....##.##.......##.....##.##.......##.......##....##
        .####.##....##.##.....##..#######..########.########..########.########..######.
        */}
      <Dialog open={open1} onClose={handleClose1} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">INMUEBLE</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ padding: '25px 25px 25px 25px' }}>
            <Grid spacing={2} container direction="row" justify="center" alignItems="center">
              <Grid item sm={10}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={persona.map(option => option.documento)}
                  inputValue={cedula}
                  onInputChange={(event, newInputValue) => {
                    setCedula(newInputValue)
                  }}
                  renderInput={params => <TextField {...params} margin="normal" placeholder="Número de la matrícula" />}
                />
              </Grid>
              <Grid item sm={2}>
                <Button
                  type="button"
                  color="secondary"
                  variant="contained"
                  size="small"
                  size="small"
                  style={{ marginTop: '20px' }}
                  onClick={cambio}
                >
                  <SearchIcon />
                </Button>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  id="standard-secondary"
                  select
                  label="Cédula Catastral"
                  value={currency}
                  onChange={handleSelect}
                  fullWidth
                >
                  {currencies.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  label="Número Predial"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  id="standard-secondary"
                  select
                  label="Tipo de inmueble"
                  value={currency}
                  onChange={handleSelect}
                  fullWidth
                >
                  {currencies.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={6}>
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
              <Grid item sm={6}>
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
                      <MenuItem key={municipio.id} value={municipio.id}>
                        {municipio.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid>
                <Button type="button" color="secondary" variant="contained" size="small" style={{ marginTop: '20px' }}>
                  Añadir
                </Button>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="secondary" variant="contained" size="small">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
      {/* /*
            ..#######..########..#######..########...######......###....##....##.########.########
            .##.....##....##....##.....##.##.....##.##....##....##.##...###...##....##....##......
            .##.....##....##....##.....##.##.....##.##.........##...##..####..##....##....##......
            .##.....##....##....##.....##.########..##...####.##.....##.##.##.##....##....######..
            .##.....##....##....##.....##.##...##...##....##..#########.##..####....##....##......
            .##.....##....##....##.....##.##....##..##....##..##.....##.##...###....##....##......
            ..#######.....##.....#######..##.....##..######...##.....##.##....##....##....######## */}
      */
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Otorgante</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ padding: '25px 25px 25px 25px' }}>
            <Grid spacing={2} container direction="row" justify="center" alignItems="center">
              <Grid item sm={4}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={persona.map(option => option.documento)}
                  inputValue={cedula}
                  onInputChange={(event, newInputValue) => {
                    setCedula(newInputValue)
                  }}
                  renderInput={params => (
                    <TextField {...params} margin="normal" variant="outlined" placeholder="Número del documento" />
                  )}
                />
              </Grid>
              <Grid item sm={2}>
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
              <Grid item sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={cedula1}
                  onChange={e => setCedula1(e.target.value)}
                  label="Número del documento"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Tipo de documento"
                  value={currency}
                  onChange={handleSelect}
                  fullWidth
                >
                  {currencies.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={6}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={municipios}
                  getOptionLabel={option => option.name}
                  value={lugar}
                  onChange={(event, newValue) => {
                    setLugar(newValue)
                  }}
                  renderInput={params => <TextField {...params} margin="normal" placeholder="Lugar de expedición" />}
                />
              </Grid>
            </Grid>
            <Grid spacing={2} container direction="row" justify="center" alignItems="center">
              <Grid item sm={6}>
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
              <Grid item sm={6}>
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
              <Grid item sm={6}>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Estado civil"
                  value={estados}
                  onChange={e => setEstados(e.target.value)}
                  fullWidth
                >
                  {estado.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={6}>
                <FormGroup row>
                  <FormLabel component="legend">Género:</FormLabel>
                  <FormControlLabel
                    control={<Checkbox checked={fem} onChange={e => setFem(e.target.checked)} name="fem" />}
                    label="Femenino"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={mas} onChange={e => setMas(e.taget.checked)} name="mas" />}
                    label="Masculino"
                  />
                  <FormControlLabel
                    control={
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Otro"
                        type="text"
                        name="otro"
                        value={otro}
                        onChange={e => setOtro(e.target.value)}
                        style={{ marginLeft: '5px', width: '166px' }}
                      />
                    }
                    style={{ marginTop: '-40px' }}
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <Grid spacing={2} container direction="row" justify="center" alignItems="center">
              <Grid item sm={4}>
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
              <Grid item sm={4}>
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
              <Grid item sm={4}>
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
              <Grid item sm={4}>
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
              <Grid item sm={4}>
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
              <Grid item sm={4}>
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
                  variant="contained"
                  size="small"
                  style={{ marginTop: '20px' }}
                  onClick={setOtorgante}
                >
                  Guardar
                </Button>
              </Grid>
              <Grid>
                <Button type="button" color="secondary" variant="contained" size="small" style={{ marginTop: '20px' }}>
                  Añadir
                </Button>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained" size="small">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
