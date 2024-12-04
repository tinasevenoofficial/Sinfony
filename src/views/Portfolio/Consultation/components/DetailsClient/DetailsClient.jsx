import React, { useEffect } from 'react'

import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControlLabel from '@material-ui/core/FormControlLabel'


import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { number, string, object } from 'yup'

import { Dialog } from 'components'
import { useFetch } from 'hooks'
import Button from 'components/CustomButtons/Button'

//import themeInputSecondary from "views/StylesEnviroment/StylesEnviroment"
//Aplicar color info a los textfield traido desde el color de las variables de entorno
import { primaryColor, infoColor } from "assets/jss/material-dashboard-pro-react.js";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
// import useStyles from './DetailsClient.styles'

const themeInputInfo = createTheme({
  palette: {
    primary: {
      main: infoColor[0],
      light: infoColor[0],
      dark: infoColor[0],
    }
  },
});

const detailsClientSchema = object().shape({
  numero_documento: string().required(),
  tipo_documento: string().required(),
  correo_electronico: string().email().required(),
  telefono: number().required(),
  codigo: number().required(),
  nombres: string().required(),
  apellidos: string().required(),
  direccion: string().required(),
  activo: number(),
  reteiva: number().nullable(),
  retefuente: number().nullable(),
  reteica: number().nullable(),
})

const defaultForm = {
  numero_documento: '',
  tipo_documento: '',
  correo_electronico: '',
  telefono: '',
  codigo: '',
  nombres: '',
  apellidos: '',
  direccion: '',
  activo: 1,
  reteiva: null,
  retefuente: null,
  reteica: null,
}

const DetailsClient = ({ open, onClose, onSubmit, client }) => {
  // const classes = useStyles()

  const { data: types } = useFetch('/api/TiposDocumentosIdentificacion')

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(detailsClientSchema),
    defaultValue: { ...defaultForm },
  })

  console.log(errors)

  useEffect(() => {
    reset(client ? { ...client } : { ...defaultForm })
  }, [client])

  return (
    <Dialog
      fullWidth

      title="Definición clientes cartera"
      open={open}
      onClose={onClose}
      dialogTitleProps={{ color: 'primary' }}
      actions={
        <>
          <Button color="rose" onClick={onClose}>Cancel</Button>
          <Button form="client-detail" variant="contained" type="submit" color="rose">
            Guardar
          </Button>
        </>
      }
    >
      {/* Se agrega el ThemeProvider a todo el formulario para brindar el tema a los campos de textfield sobre el color de info(gris) que se encuentra en las variables de entorno */}
      <ThemeProvider theme={themeInputInfo}>
        <form id="client-detail" noValidate onSubmit={handleSubmit(data => onSubmit(data, client?.id_clientes))}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Codigo"
                name="codigo"
                inputProps={{ ...register('codigo') }}
                error={!!errors.codigo}
                helperText={errors.codigo?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="tipo_documento"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    required
                    label="Tipo de documento"
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    error={!!errors['tipo_documento']}
                    helperText={errors['tipo_documento']?.message}
                  >
                    {types &&
                      types.map(type => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Nit o CC"
                name="numero_documento"
                inputProps={{ ...register('numero_documento') }}
                error={!!errors['numero_documento']}
                helperText={errors['numero_documento']?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Nombres"
                name="nombres"
                inputProps={{ ...register('nombres') }}
                error={!!errors.nombres}
                helperText={errors.nombres?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Apellidos"
                name="apellidos"
                inputProps={{ ...register('apellidos') }}
                error={!!errors.apellidos}
                helperText={errors.apellidos?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Dirección"
                name="direccion"
                inputProps={{ ...register('direccion') }}
                error={!!errors.direccion}
                helperText={errors.direccion?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Teléfono"
                name="telefono"
                inputProps={{ ...register('telefono') }}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Email"
                name="correo_electronico"
                inputProps={{ ...register('correo_electronico') }}
                error={!!errors.correo_electronico}
                helperText={errors.correo_electronico?.message}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="reteica"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Reteica"
                    value={field.value === null ? 0 : field.value}
                    onChange={({ target }) => field.onChange(target.value)}
                    error={!!errors.reteica}
                    helperText={errors.reteica?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Checkbox
                            style={{
                              color: primaryColor[0]
                            }}
                            color="default"
                            checked={field.value !== null}
                            onChange={() => field.onChange(field.value !== null ? null : 0)}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="retefuente"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Retencion sev."
                    value={field.value === null ? 0 : field.value}
                    onChange={({ target }) => field.onChange(target.value)}
                    error={!!errors.reteica}
                    helperText={errors.reteica?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Checkbox
                            style={{
                              color: primaryColor[0]
                            }}
                            checked={field.value !== null}
                            onChange={() => field.onChange(field.value !== null ? null : 0)}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="reteiva"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Reteiva"
                    value={field.value === null ? 0 : field.value}
                    onChange={({ target }) => field.onChange(target.value)}
                    error={!!errors.reteica}
                    helperText={errors.reteica?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Checkbox
                            style={{
                              color: primaryColor[0]
                            }}
                            checked={field.value !== null}
                            onChange={() => field.onChange(field.value !== null ? null : 0)}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="activo"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox style={{ color: primaryColor[0] }} checked={field.value === 1} onChange={() => field.onChange(field.value ? 0 : 1)} />
                    }
                    label="Activo"
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </ThemeProvider>
    </Dialog>
  )
}

DetailsClient.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  client: PropTypes.object,
}

export default DetailsClient
