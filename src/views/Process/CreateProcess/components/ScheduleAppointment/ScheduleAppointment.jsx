import { Button, Grid } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { DatePicker, TimePicker } from '@material-ui/pickers'
import axios from 'axios'
import { useBoolean, useInmutableFetch } from 'hooks'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { defaultScheduleAppointment, ScheduleAppointmentSchema } from './ScheduleAppointment.schema'

const ScheduleAppointment = ({ nextStep, backStep, id }) => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: ScheduleAppointmentSchema,
    defaultValues: { ...defaultScheduleAppointment },
  })

  const { date: selectedDate, currentMonth } = watch('object')

  const { data } = useInmutableFetch(`/api/SolicitudesTramites/${id}`)
  const { data: availableDates } = useInmutableFetch(
    `api/horariosTramites?fecha_dispoonibilidad_mes=${moment(currentMonth).format('YYYY-MM')}`
  )
  const { data: availableHours } = useInmutableFetch(
    `api/horariosTramites?horas_disponibles_dia=${moment(selectedDate).format('YYYY-MM-DD')}`
  )

  console.log(availableDates, availableHours)

  const [loading, handleLoading] = useBoolean(false)

  const onSubmit = async form => {
    console.log(form.hour)
    handleLoading(true)
    try {
      const { data } = await axios.put(`/api/ActualizarhorariosTramites`, {
        id_tramite: id,
        fecha: `${form.object.date} ${moment(form.hour).format('HH:mm:ss')}`,
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

  return !data.fecha_citacion ? (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="object"
            control={control}
            render={({ field }) => (
              <DatePicker
                fullWidth
                format="YYYY/MM/DD"
                value={field.value.date}
                onChange={value => {
                  field.onChange({ ...field.value, date: value.format('YYYY-MM-DD') })
                }}
                onMonthChange={value => {
                  field.onChange({ ...field.value, currentMonth: value.format('YYYY-MM') })
                }}
                label="Seleccione la fecha"
                showTodayButton
                error={!!errors.date}
                helperText={errors.date?.message}
                shouldDisableDate={date => {
                  return !(availableDates && availableDates.some(item => date.isSame(item)))
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="hour"
            control={control}
            render={({ field }) => (
              <TimePicker
                fullWidth
                minutesStep={60}
                value={field.value}
                onChange={value => {
                  const newValue = value.startOf('hour')
                  if (!(availableHours && availableHours.includes(newValue.format('HH-mm-ss')))) {
                    setError('hour', { type: 'manual', message: 'No disponible' })
                  } else {
                    clearErrors('hour')
                  }
                  field.onChange(newValue)
                }}
                label="Seleccione la fecha"
                error={!!errors.hour}
                helperText={errors.hour?.message}
                views={['hours']}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Button disabled={loading} color="secondary" variant="contained" size="small" onClick={backStep}>
            Atras
          </Button>
        </Grid>

        <Grid item>
          <Button disabled={loading} type="submit" color="secondary" variant="contained" size="small">
            Agendar cita
          </Button>
        </Grid>
      </Grid>
    </form>
  ) : (
    <Alert severity="info">{`Tiene una cita programada el ${data.fecha_citacion}`}</Alert>
  )
}

ScheduleAppointment.propTypes = {
  id: PropTypes.string.isRequired,
  nextStep: PropTypes.func.isRequired,
  backStep: PropTypes.func.isRequired,
}

export default ScheduleAppointment
