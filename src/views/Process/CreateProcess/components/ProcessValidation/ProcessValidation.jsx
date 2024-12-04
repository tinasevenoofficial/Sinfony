import React from 'react'

import { Button, Grid } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import PropTypes from 'prop-types'

import { useInmutableFetch } from 'hooks'

const ProcessValidation = ({ nextStep, backStep, id }) => {
  const { data } = useInmutableFetch(`/api/SolicitudesTramites/${id}`)

  console.log(data.etapa)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {data.respuesta_solicitud ? (
          <Grid item xs={12}>
            <Alert severity="success">Solicitud y Documentos validados.</Alert>
          </Grid>
        ) : (
          <Alert severity="warning">
            Estamos procesando su solicitud y validando sus documentos, por favor este atento a nuestras notificaciones,
            si desea mayor información contactenos.
          </Alert>
        )}
      </Grid>

      <Grid item>
        <Button color="secondary" variant="contained" size="small" onClick={backStep}>
          Atras
        </Button>
      </Grid>
      <Grid item>
        <Button
          disabled={data.etapa < 4}
          onClick={data.etapa < 4 ? undefined : nextStep}
          color="secondary"
          variant="contained"
          size="small"
        >
          Continuar
        </Button>
      </Grid>
    </Grid>
  )
}

ProcessValidation.propTypes = {
  id: PropTypes.string.isRequired,
  nextStep: PropTypes.func.isRequired,
  backStep: PropTypes.func.isRequired,
}

export default ProcessValidation
