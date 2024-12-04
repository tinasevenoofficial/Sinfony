import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '_redux/actions'

export default function LogoutPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  return <></>
}
