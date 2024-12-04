import React, { useMemo } from 'react'

import {
  TextField,
  Grid,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@material-ui/core'

import axios from 'axios'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { useBoolean, useFetch, useInmutableFetch } from 'hooks'
import { Loading, LoadingButton } from 'components'

import { DocumentsValidationSchema, defaultDocumentsValidation } from './DocumentsValidation.schema'

const DocumentsValidation = ({ nextStep, backStep, id }) => {
  const user = useSelector(state => state.auth.user)
  const { data } = useInmutableFetch(id ? `/api/SolicitudesTramites/${id}` : null)

  const documents = useMemo(
    () => JSON.parse(data.documentos_anexos).map(document => ({ name: document.url, href: 'assets/pdf/prueba.pdf' })),
    [data]
  )

  const { data: dataObservations, loading: loadingObservations, mutate } = useFetch(
    id ? `/api/SolicitudesTramites/comentariosRevisionView/${id}` : null
  )

  const observations = useMemo(() => {
    const datatemp = []
    if (dataObservations) {
      for (let index = 1; index <= Object.keys(dataObservations).length / 2; index++) {
        datatemp.push({ user: dataObservations['usuario' + index], comentario: dataObservations['comentario' + index] })
      }
    }
    return datatemp
  }, [dataObservations])

  console.log(observations)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: DocumentsValidationSchema,
    defaultValues: { ...defaultDocumentsValidation },
  })

  const [loading, handleLoading] = useBoolean(false)

  const onSubmit = async form => {
    handleLoading(true)
    try {
      if (form.comentarios) {
        const formData = {
          ...form,
          usuario: user.name,
        }
        // TODO: comentarios
        const { data } = await axios.put(`/api/SolicitudesTramites/comentariosRevision/${id}`, {
          respuesta: false,
          ...formData,
        })

        mutate(before => ({
          ...before,
          [`comentario${observations.length + 1}`]: formData.comentarios,
          [`usuario${observations.length + 1}`]: formData.usuario,
        }))
        nextStep(data)
      } else {
        // TODO: sin comentarios
        const { data } = await axios.put(`/api/SolicitudesTramites/comentariosRevision/${id}`, {
          respuesta: true,
          usuario: user.name,
        })
        nextStep({ ...data, etapa: 5 })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tuvimos un error, validate los datos y intente nuevamente',
      })
    }
    handleLoading(false)
  }

  const comentarios = watch('comentarios')

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loadingObservations ? (
            <Loading />
          ) : (
            <List>
              {observations.map(({ user, comentario }, idx) => {
                return (
                  <div key={idx}>
                    <ListItem alignItems="center">
                      <ListItemAvatar>
                        <Avatar alt={user}>{user[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={user} secondary={comentario} />
                    </ListItem>
                    {idx + 1 < observations.length && <Divider variant="inset" component="li" />}
                  </div>
                )
              })}
            </List>
          )}
        </Grid>
        <Grid container item xs={12} spacing={3}>
          {documents.map(({ name }) => (
            <Grid key={name} item xs="auto">
              <Box
                variant="outlined"
                display="flex"
                component={Paper}
                justifyContent="space-between"
                alignItems="center"
                p={1}
              >
                <Typography
                  variant="caption"
                  component="a"
                  style={{ textDecoration: 'none !important' }}
                  target="_blank"
                  href={require('assets/pdf/prueba.pdf')}
                >
                  {name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            fullWidth
            required
            rows={4}
            variant="filled"
            label="Comentarios"
            error={!!errors.comentarios}
            helperText={errors.comentarios?.message}
            inputProps={{
              ...register('comentarios'),
            }}
          />
        </Grid>

        <Grid item>
          <LoadingButton disabled={loading} color="secondary" variant="contained" size="small" onClick={backStep}>
            Atras
          </LoadingButton>
        </Grid>

        <Grid item>
          <LoadingButton
            loading={loading || loadingObservations}
            disabled={loading || !comentarios}
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
          >
            Enviar comentarios
          </LoadingButton>
        </Grid>

        <Grid item>
          <LoadingButton
            loading={loading || loadingObservations}
            disabled={loading || !!comentarios}
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
          >
            Aceptar documentos
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

DocumentsValidation.propTypes = {
  id: PropTypes.string.isRequired,
  nextStep: PropTypes.func.isRequired,
  backStep: PropTypes.func.isRequired,
}

export default DocumentsValidation
