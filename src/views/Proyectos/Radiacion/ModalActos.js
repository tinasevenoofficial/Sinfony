import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { EXTERNAL_API_PATHS } from 'utils/constants'

// @material-ui

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import styles from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle.js'
const useStyles = makeStyles(styles)

export default function ModalActos({ open, handleClose, radicacion1, setRadicacion1, tabs, setTabs }) {
  const auth = useSelector(state => state.auth)

  const [acto, setActo] = React.useState([])
  const [actos, setActos] = useState([])
  const classes = useStyles()

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

  const getActos = async () => {
    axios.get(EXTERNAL_API_PATHS.actos).then(response => {
      let data = response.data
      let datas = data.map(item => ({
        id: item.id,
        name: item.nombre_acto,
      }))
      setActos(datas)
    })
  }
  useEffect(() => {
    getActos()
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
  const crearActo = async () => {
    let plantilla = [...tabs]
    let radi = [...radicacion1]
    acto.map(item => {
      plantilla.push({
        tabName: item.name,
      })
      radi.push({
        orden: 0,
        cuantia: '',
        derechos: '',
        retencion_fuente: '',
        actos_codigo_acto: item.id.toString(),
        exento: '',
        otorgantes: [],
        actosradiinmuebles: [],
      })
    })
    setTabs(plantilla)
    setRadicacion1(radi)
    handleClose()
    Limpiar()
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
    setActo([])
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
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Actos</DialogTitle>
        <DialogContent style={{ padding: '25px 25px 25px 25px' }}>
          <Grid spacing={2} container direction="row" justify="center" alignItems="center">
            <Grid item sm={10} xs={10}>
              <Autocomplete
                id="tags-outlined"
                multiple
                filterSelectedOptions
                options={actos}
                getOptionLabel={option => option.name}
                value={acto}
                onChange={(event, newValue) => {
                  setActo(newValue)
                }}
                renderInput={params => <TextField {...params} margin="normal" placeholder="Actos" type="text" />}
              />
            </Grid>
            <Grid item sm={2} xs={2}>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                size="small"
                style={{ marginTop: '20px' }}
                onClick={() => {
                  crearActo()
                }}
              >
                Crear
              </Button>
            </Grid>
          </Grid>
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
