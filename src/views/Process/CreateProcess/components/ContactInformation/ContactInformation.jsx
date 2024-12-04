import React from 'react'

import { TextField, Grid } from '@material-ui/core'

import axios from 'axios'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import { useBoolean } from 'hooks'
import { LoadingButton } from 'components'

import { ContactInformationSchema, defaultContactInformation } from './ContactInformation.schema'

const ContactInformation = ({ nextStep, data = {}, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: ContactInformationSchema,
    defaultValues: { ...defaultContactInformation, ...data },
  })

  const [loading, handleLoading] = useBoolean(false)

  const onSubmit = async form => {
    if (id) {
      nextStep(form)
    } else {
      handleLoading(true)
      try {
        const { data } = await axios.post('/api/SolicitudesTramites', { ...form, etapa: 1 })
        nextStep(data)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Tuvimos un error, validate los datos y intente nuevamente',
        })
      }
      handleLoading(false)
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            required
            disabled={!!id}
            label="Nombres"
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
            inputProps={{
              ...register('nombre'),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            required
            disabled={!!id}
            label="Apellidos"
            error={!!errors.apellidos}
            helperText={errors.apellidos?.message}
            inputProps={{ ...register('apellidos') }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            required
            disabled={!!id}
            label="Correo Electronico"
            type="email"
            error={!!errors.correo_electronico}
            helperText={errors.correo_electronico?.message}
            inputProps={{ ...register('correo_electronico') }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            required
            disabled={!!id}
            label="Telefono ó Celular"
            error={!!errors.telefono}
            helperText={errors.telefono?.message}
            inputProps={{ ...register('telefono') }}
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            required
            disabled={!!id}
            label="Dirección"
            error={!!errors.direccion}
            helperText={errors.direccion?.message}
            inputProps={{ ...register('direccion') }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <LoadingButton loading={loading} variant="contained" size="small" type="submit" color="secondary">
            Continuar
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

ContactInformation.propTypes = {
  id: PropTypes.string,
  nextStep: PropTypes.func.isRequired,
  data: PropTypes.shape({
    nombre: PropTypes.string,
    apellidos: PropTypes.string,
    correo_electronico: PropTypes.string,
    telefono: PropTypes.number,
    direccion: PropTypes.string,
  }),
}

export default ContactInformation
