import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import { EXTERNAL_API_PATHS } from 'utils/constants'

import { municipios, departamentos } from './../Data/defaultValues'

import SearchIcon from '@material-ui/icons/Search'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import Autocomplete from '@material-ui/lab/Autocomplete'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import useStyles from './syles.js'
import CloseIcon from '@material-ui/icons/Close'

import CurrencyInput from 'components/CustomInput/CurrencyInput'

export default function Inmueble({ open, handleClose, radicacion1, setRadicacion1, value }) {
  const classes = useStyles()

  const [matricula, setMatricula] = React.useState([])
  const [inmueble, setInmueble] = React.useState([])
  const [currency, setCurrency] = React.useState('')
  const [matri, setMatri] = React.useState('')
  const [catastral, setCatastral] = React.useState('')
  const [departamento1, setDepartamento1] = useState('')
  const [municipio1, setMunicipio] = useState('')
  const [predial, setPredial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [area, setArea] = useState(0)
  const [avaluo, setAvaluo] = useState(0)
  const [linderos, setLinderos] = useState('')
  const [id, setId] = useState('')
  const [search, setSearch] = useState(false)

  const handleSelect = event => {
    setCurrency(event.target.value)
  }

  const getData = async () => {
    axios.get(EXTERNAL_API_PATHS.inmuebles).then(response => {
      let data = response.data
      let datas = data.map(item => ({
        key: item.id,
        matricula: item.matricula ? item.matricula : '0000',
        numero_predial: item.numero_predial ? item.numero_predial : '0',
        numero_catastral: item.numero_catastral,
        linderos: item.linderos ? item.linderos : 'No hay datos',
        area: item.area ? item.area : 0,
        direccion: item.direccion,
        id_tipo_inmueble: item.id_tipo_inmueble,
        id_municipio: item.id_municipio,
        avaluo: item.avaluo,
      }))
      setMatricula(datas)
    })
  }
  useEffect(() => {
    getData()
  }, [])

  const getTipoInmuebles = async () => {
    axios.get(EXTERNAL_API_PATHS.tipoInmueble).then(response => {
      let data = response.data
      setInmueble(data)
    })
  }
  useEffect(() => {
    getTipoInmuebles()
  }, [])

  const typeAlert = 'updatable'

  const setInmueblee = async () => {
    message.loading({ content: 'Actualizando inmueble...', typeAlert })

    axios({
      method: search ? 'put' : 'post',
      url: search
        ? `${EXTERNAL_API_PATHS.inmuebles}/${id}`
        : `${EXTERNAL_API_PATHS.inmuebles}`,
      data: {
        matricula: matri,
        direccion: direccion,
        numero_predial: predial,
        numero_catastral: catastral,
        linderos: linderos,
        area: area,
        id_tipo_inmueble: currency,
        id_municipio: municipio1,
        id_depto: departamento1,
        avaluo: avaluo,
      },
    })
      .then(response => {
        if (response.status === 201) {
          getData()
        }
        search
          ? message.success({ content: 'Inmueble actualizado', typeAlert })
          : message.success({ content: 'Inmueble agregado', typeAlert })
      })
      .catch(() => {
        search
          ? message.error({
              content: 'No se pudo actualizar el inmueble',
              typeAlert,
            })
          : message.error({
              content: 'No se pudo agregar el inmueble',
              typeAlert,
            })
      })
  }

  const Limpiar = (all = true) => {
    setId('')
    all && setMatri('')
    setCatastral('')
    setPredial('')
    setLinderos('')
    setArea('')
    setDireccion('')
    setCurrency('')
    setDepartamento1('')
    setMunicipio('')
    setAvaluo('')
  }

  const cambio = () => {
    if (matri.length === 0) {
      message.error('Ingrese un inmueble')
      return
    }
    const data = matricula.find(m => m.matricula === matri)
    if (data) {
      let muni = municipios.find(mun => mun.id === parseInt(data.id_municipio))
      setId(data.key)
      setSearch(true)
      setCatastral(data.numero_catastral)
      setPredial(data.numero_predial)
      setLinderos(data.linderos)
      setArea(data.area)
      setDireccion(data.direccion)
      setCurrency(data.id_tipo_inmueble)
      setDepartamento1(muni?.id_depto)
      setMunicipio(muni?.id)
      setAvaluo(data.avaluo)
    } else {
      Limpiar()
      setSearch(false)
      message.error(`No se encontró la matricula`, 3)
    }
  }

  const agregar = () => {
    let tipo = inmueble.filter(tip => tip.id === currency)[0]?.name
    let muni = municipios.filter(mun => mun.id === municipio1)[0]?.name
    let i = matricula.filter(item => item.matricula === matri)[0]?.key
    if (matri.length === 0) {
      message.error('Seleccione un inmueble')
      return
    }
    let exist = radicacion1[value].actosradiinmuebles.find(item => item.id == i)
    if (radicacion1.length > 0 && !exist) {
      let data = [...radicacion1[value].actosradiinmuebles]
      data.push({
        id: i,
        id_acto_radi_inmueble: radicacion1[value].actosradiinmuebles.id || '123456',
        matricula: matri.toString(),
        direccion: direccion,
        numero_predial: predial,
        numero_catastral: catastral,
        linderos: linderos,
        area: area,
        id_tipo_inmueble: tipo,
        id_municipio: muni,
        avaluo: avaluo,
        fecha_adquisicion: '',
        id_inmuebles: i,
      })
      let data1 = [...radicacion1]
      data1[value].actosradiinmuebles = data
      setRadicacion1(data1)
      Limpiar()
      message.success('El inmueble fue agregado')
    } else {
      message.error('El inmueble ya fue agregado')
    }
  }
  return (
    <div>
      {/*
        .####.##....##.##.....##.##.....##.########.########..##.......########..######.
        ..##..###...##.###...###.##.....##.##.......##.....##.##.......##.......##....##
        ..##..####..##.####.####.##.....##.##.......##.....##.##.......##.......##......
        ..##..##.##.##.##.###.##.##.....##.######...########..##.......######....######.
        ..##..##..####.##.....##.##.....##.##.......##.....##.##.......##.............##
        ..##..##...###.##.....##.##.....##.##.......##.....##.##.......##.......##....##
        .####.##....##.##.....##..#######..########.########..########.########..######.
        */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">INMUEBLE</DialogTitle>
        <DialogContent style={{ padding: '25px 25px 25px 25px' }}>
          <Grid spacing={2} container direction="row" justify="center" alignItems="center">
            <Grid item sm={10}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={matricula.map(option => option?.matricula.toString())}
                inputValue={matri}
                closeIcon={<CloseIcon fontSize="small" onClick={() => Limpiar()} />}
                onInputChange={(event, newInputValue) => {
                  setMatri(newInputValue)
                  Limpiar(false)
                }}
                renderInput={params => (
                  <TextField {...params} autoFocus margin="normal" placeholder="Número de la matrícula" />
                )}
              />
            </Grid>
            <Grid item sm={2}>
              <Button
                type="button"
                color="secondary"
                size="small"
                variant="contained"
                style={{ marginTop: '20px' }}
                onClick={cambio}
              >
                <SearchIcon />
              </Button>
            </Grid>
            <Grid item sm={12}>
              <TextField
                margin="dense"
                id="name"
                value={catastral}
                onChange={e => setCatastral(e.target.value)}
                label="Cédula Catastral"
                type="texto"
                fullWidth
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                margin="dense"
                id="name"
                value={predial}
                onChange={e => setPredial(e.target.value)}
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
                {inmueble.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={12}>
              <TextField
                margin="dense"
                id="name"
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
                label="Dirección"
                type="texto"
                fullWidth
              />
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
            <Grid item sm={6}>
              <TextField
                margin="dense"
                id="name"
                value={area}
                onChange={e => setArea(e.target.value)}
                label="Área"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item sm={6}>
              <CurrencyInput
                margin="dense"
                id="name"
                value={avaluo}
                onChange={setAvaluo}
                label="Avalúo"
                fullWidth
              />
            </Grid>
            <Grid item sm={12}>
              <label>Linderos</label>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={3}
                value={linderos}
                onChange={e => setLinderos(e.target.value)}
                placeholder="Linderos"
                fullWidth
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid>
              <Button
                type="button"
                color="secondary"
                size="small"
                variant="contained"
                style={{ marginTop: '20px' }}
                onClick={setInmueblee}
              >
                {search ? 'Actualizar inmueble' : 'Crear inmueble'}
              </Button>
            </Grid>
            <Grid>
              <Button
                type="button"
                color="secondary"
                size="small"
                variant="contained"
                style={{ marginTop: '20px' }}
                onClick={agregar}
              >
                Añadir inmueble
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" size="small" variant="contained">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
