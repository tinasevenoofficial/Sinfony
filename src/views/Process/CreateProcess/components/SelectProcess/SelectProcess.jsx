import React from 'react'

import { TextField, Grid, MenuItem, Button } from '@material-ui/core'

import axios from 'axios'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'

import { useBoolean, useInmutableFetch } from 'hooks'
import { LoadingButton } from 'components'
//import Formulario from 'views/Components/Digitacion/Formulario'

import { SelectProcessSchema, defaultSelectProcess } from './SelectProcess.schema'

const SelectProcess = ({ nextStep, backStep, id }) => {
  const { data } = useInmutableFetch(id ? `/api/SolicitudesTramites/${id}` : null)

  const values = { ...defaultSelectProcess }

  if (data.id_tramite) {
    values.id_tramite = data.id_tramite
  }

  const {
    control,
    // register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: SelectProcessSchema,
    defaultValues: { ...values },
  })

  // const id_tramite = watch('id_tramite')

  const [loading, handleLoading] = useBoolean(false)

  const { data: tramites } = useInmutableFetch('/api/tramites')

  const onSubmit = async form => {
    if (data.id_tramite) {
      nextStep({})
    } else {
      handleLoading(true)
      try {
        const { data } = await axios.post('/api/documentosAgiles', {
          id_plantilla: form.id_tramite,
          nombre_documento: id,
        })
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
        <Grid item xs={12}>
          <Controller
            name="id_tramite"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  select
                  required
                  label="Escoja Tramite"
                  error={!!errors.id_tramite}
                  helperText={errors.id_tramite?.message}
                  {...field}
                >
                  <MenuItem disabled>Escoja Tramite</MenuItem>
                  {(tramites || []).map(tramite => (
                    <MenuItem key={tramite.id} value={tramite.id}>
                      {`${tramite.id}. ${tramite.nombre_tramite}`}
                    </MenuItem>
                  ))}
                </TextField>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {/*tramites && <Formulario idDocu={3} />*/}
        </Grid>
        <Grid item>
          <Button disabled={loading} color="secondary" variant="contained" size="small" onClick={backStep}>
            Atras
          </Button>
        </Grid>
        <Grid item>
          <LoadingButton loading={loading} type="submit" color="secondary" variant="contained" size="small">
            Continuar
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

SelectProcess.propTypes = {
  id: PropTypes.string.isRequired,
  nextStep: PropTypes.func.isRequired,
  backStep: PropTypes.func.isRequired,
}

export default SelectProcess
