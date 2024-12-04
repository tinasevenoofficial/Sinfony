import React from 'react'

import { Grid, Button, Paper, IconButton, Box, Typography } from '@material-ui/core'

import { Delete } from '@material-ui/icons'

import axios from 'axios'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'

import { useBoolean, useInmutableFetch } from 'hooks'
import { LoadingButton, InputFile } from 'components'
// import Formulario from 'views/Components/Digitacion/Formulario'

import { UploadFilesSchema, defaultUploadFiles } from './UploadFiles.schema'

const UploadFiles = ({ id }) => {
  //const { data } = useInmutableFetch(id ? `/api/SolicitudesTramites/${id}` : null)

  const values = { ...defaultUploadFiles }

  //const disabled = !!data.documentos_anexos

  /*if (data.documentos_anexos) {
    console.log(Object.values(JSON.parse(data.documentos_anexos)))
    values.documentos = Object.values(JSON.parse(data.documentos_anexos))
      .filter(item => typeof item === 'string')
      .map(document => ({ name: document }))
  }*/

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: UploadFilesSchema,
    defaultValues: { ...values },
  })

  const documentos = watch('documentos')

  const [loading, handleLoading] = useBoolean(false)

  const onSubmit = async form => {
   
      const formData = new FormData()

      form.documentos.forEach(document => {
        formData.append('documentos[]', document)
      })

      handleLoading(true)
      try {
        const { data } = await axios.post(`/api/SolicitudesTramites/estadoTres/${id}`, formData)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Tuvimos un error, validate los datos y intente nuevamente',
        })
      }
      handleLoading(false)
    
  }

  const deleteDocument = idx => {
    const newDocuments = [...documentos]
    newDocuments.splice(idx, 1)
    reset({ documentos: newDocuments })
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="documentos"
            control={control}
            render={({ field }) => {
              return (
                <InputFile
                  //disabled={disabled}
                  onChange={(e, files) => {
                    field.onChange({ target: { name: field.name, value: [...documentos, ...files] } })
                  }}
                  error={!!errors.documentos}
                  helperText={
                    errors.documentos
                      ? errors.documentos.message
                      : `Formatos válidos: Imagen (jpg, jpeg, gif, png), Texto (xls, xlsx, doc, docx, pdf), compresión de archivos (zip, rar). 3 archivos máximo, para más documentos subirlos en un .zip/.rar`
                  }
                />
              )
            }}
          />
        </Grid>

        <Grid container item xs={12} spacing={3}>
          {documentos.map(({ name }, idx) => (
            <Grid key={name} item xs="auto">
              <Box
                variant="outlined"
                display="flex"
                component={Paper}
                justifyContent="space-between"
                alignItems="center"
                p={1.5}
              >
                <Typography variant="caption">{name}</Typography>
                <IconButton
                  style={{ marginLeft: 8 }}
                  size="small"
                  color="secondary"
                  //disabled={disabled}
                  onClick={() => deleteDocument(idx)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid item>
          <Button disabled={loading} color="secondary" variant="contained" size="small" >
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

UploadFiles.propTypes = {
}

export default UploadFiles
