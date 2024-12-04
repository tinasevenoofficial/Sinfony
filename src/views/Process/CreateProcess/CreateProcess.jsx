import React, { useMemo } from 'react'

import { Box, Step, StepButton, StepContent, Stepper } from '@material-ui/core'
import { Map } from '@material-ui/icons'

import { useInmutableFetch } from 'hooks'
import { useHistory, useParams } from 'react-router-dom'
import { Card, CardBody, CardHeader, CardIcon, Loading } from 'components'

import {
  ContactInformation,
  DocumentsValidation,
  ProcessValidation,
  ScheduleAppointment,
  SelectProcess,
  UploadFiles,
} from './components'
import { useStyles } from './CreateProcess.styles'

const steps = [
  'Información de Contacto',
  'Información del trámite',
  'Anexo de documentos',
  'Validación de solicitud',
  'Revisión de escritura',
  'Agendamiento para firma',
  'Trámite finalizado',
]

const CreateProcess = () => {
  const classes = useStyles()
  const history = useHistory()
  const { idTramite } = useParams()

  const { data, mutate, loading } = useInmutableFetch(idTramite ? `/api/SolicitudesTramites/${idTramite}` : null)

  const step = useMemo(() => data?.etapa || 0, [data])

  const successContactInformation = async newData => {
    try {
      history.push(`/admin/EstadoTramites/${newData.id}`)
      await mutate(
        before => ({
          ...before,
          ...newData,
          etapa: 1,
        }),
        false
      )
    } catch (error) {
      console.log(error)
    }
  }

  const successSelectProcess = async newData => {
    try {
      await mutate(
        before => ({
          ...before,
          ...newData,
          etapa: 2,
        }),
        false
      )
    } catch (error) {
      console.log(error)
    }
  }

  const successUploadFiles = async newData => {
    try {
      await mutate(
        before => ({
          ...before,
          ...newData,
          etapa: 3,
        }),
        false
      )
    } catch (error) {
      console.log(error)
    }
  }

  const successDocumentValidation = async newData => {
    try {
      await mutate(
        before => ({
          ...before,
          ...newData,
        }),
        false
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleStep = newStep => () => {
    mutate(before => ({ ...before, etapa: newStep }), false)
  }

  return (
    <Card>
      <CardHeader color="primary" icon>
        <CardIcon color="primary">
          <Map />
        </CardIcon>
        <h4 className={classes.cardIconTitle}>Etapas de Tramites!</h4>
      </CardHeader>

      <CardBody>
        {loading ? (
          <Loading />
        ) : (
          <Stepper activeStep={step} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton completed={index === steps.length - 1 && step === steps.length - 1}>{label}</StepButton>
                <StepContent>
                  <Box className={classes.content}>
                    {step === 0 && (
                      <ContactInformation nextStep={successContactInformation} data={data} id={idTramite} />
                    )}
                    {step === 1 && (
                      <SelectProcess
                        backStep={handleStep(0)}
                        nextStep={successSelectProcess}
                        id={idTramite}
                        data={data.id_tramite ? data : undefined}
                      />
                    )}
                    {step === 2 && (
                      <UploadFiles
                        backStep={handleStep(1)}
                        nextStep={successUploadFiles}
                        id={idTramite}
                        data={data.id_tramite ? data : undefined}
                      />
                    )}
                    {step === 3 && (
                      <ProcessValidation backStep={handleStep(2)} nextStep={handleStep(4)} id={idTramite} />
                    )}
                    {step === 4 && (
                      <DocumentsValidation
                        backStep={handleStep(3)}
                        nextStep={successDocumentValidation}
                        id={idTramite}
                      />
                    )}
                    {step === 5 && (
                      <ScheduleAppointment backStep={handleStep(4)} nextStep={handleStep(6)} id={idTramite} />
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        )}
      </CardBody>
    </Card>
  )
}

export default CreateProcess
