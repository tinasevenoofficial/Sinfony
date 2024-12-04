import { saveState, removeState } from 'helpers'
import * as actionTypes from '../actionsTypes/auth'

export const load = () => {
  return {
    type: actionTypes.LOAD,
  }
}

export const expired = () => {
  saveState('expired', true)

  return {
    type: actionTypes.EXPIRED,
  }
}

export const refresh = ({ token }) => {
  removeState('expired')
  saveState('token', token)

  return {
    type: actionTypes.REFRESH,
    token,
  }
}

export const update = ({ user }) => {
  saveState('user', user)

  return {
    type: actionTypes.UPDATE,
    user,
  }
}

export const logout = () => {
  removeState('token')
  removeState('user')
  removeState('expired')

  return {
    type: actionTypes.LOGOUT,
  }
}

export const login = ({ user, token }) => {
  saveState('token', token)
  saveState('user', user)

  return {
    type: actionTypes.LOGIN,
    user,
    token: token,
  }
}
