import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { object, string } from 'yup'

export const ScheduleAppointmentSchema = yupResolver(
  object().shape({
    object: object()
      .shape({
        currentMonth: string().required('Campo requerido'),
        date: string().required('Campo requerido'),
      })
      .required(),
    hour: string().required('Campo requerido'),
  })
)

export const defaultScheduleAppointment = {
  hour: null,
  object: {
    date: '2022-01-01',
    currentMonth: moment(new Date()).format('YYYY-MM'),
  },
}
