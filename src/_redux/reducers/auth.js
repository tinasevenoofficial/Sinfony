import { loadState } from 'helpers'

import * as actionTypes from '../actionsTypes/auth'
import { updateObject } from '../utility'

const initialState = {}

const load = state => {
  try {
    const token = loadState('token')

    return updateObject(state, {
      token: loadState('token'),
      user: loadState('user'),
      expired: loadState('expired'),
      isAuth: !!token,
    })
  } catch (error) {
    return state
  }

}

const update = (state, { user }) => {
  return updateObject(state, {
    user: {
      ...state.user,
      ...user,
    },
  })
}

const login = (state, { token, user }) => {
  return updateObject(state, {
    token,
    user,
    isAuth: !!token,
    expired: undefined,
  })
}

const refresh = (state, { token }) => {
  return updateObject(state, {
    token,
    isAuth: !!token,
    expired: undefined,
  })
}

const logout = state => {
  return updateObject(state, {
    token: undefined,
    user: undefined,
    isAuth: false,
  })
}

const expired = state => {
  return updateObject(state, {
    expired: true,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return login(state, action)
    case actionTypes.LOGOUT:
      return logout(state)
    case actionTypes.EXPIRED:
      return expired(state)
    case actionTypes.UPDATE:
      return update(state, action)
    case actionTypes.LOAD:
      return load(state)
    case actionTypes.REFRESH:
      return refresh(state, action)

    default:
      return state
  }
}

export default reducer
