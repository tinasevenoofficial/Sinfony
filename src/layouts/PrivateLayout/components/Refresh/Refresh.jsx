import React, { useEffect } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'

import { logout, refresh } from '_redux/actions'

const Refresh = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const onRefresh = () => {
    return axios.post('/api/user/refreshToken', { refresh_token: auth.token.refresh_token }).catch(() => {
      Swal.fire({
        showCancelButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        icon: 'error',
        title: 'Tuvismo un error',
        confirmButtonText: 'Iniciar sesion',
        text: 'No pudimos rescatar su sesion, intente iniciar nuevamente',
      }).then(() => {
        dispatch(logout())
      })
    })
  }

  useEffect(() => {
    if (auth.expired)
      Swal.fire({
        showCancelButton: false,
        showDenyButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        icon: 'error',
        title: 'Su sesion ha expirado',
        confirmButtonText: 'Restaurar sesion',
        denyButtonText: `Cerrar sesion`,
        text: 'Su sesion ha expirado, por favor restaurela',
        showLoaderOnConfirm: true,
        preConfirm: onRefresh,
      }).then(result => {
        console.log(result)
        if (result.isConfirmed && !result.value.data.error) {
          dispatch(refresh({ token: result.value.data }))
          Swal.fire({
            showCancelButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            icon: 'success',
            title: 'Exito',
            text: 'Ya puedes continuar con tus tareas',
          })
        } else {
          Swal.fire({
            showCancelButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            icon: 'error',
            title: 'Tuvismo un error',
            confirmButtonText: 'Iniciar sesion',
            text: 'No pudimos rescatar su sesion, intente iniciar nuevamente',
          }).then(() => {
            dispatch(logout())
          })
        }
      })
  }, [auth])

  return <div />
}

export default Refresh
