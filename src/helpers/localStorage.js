/* eslint-disable no-console */
import Cookies from 'js-cookie'

export const loadState = key => {
  if (typeof window !== 'undefined') {
    try {
      const value = localStorage.getItem(key)
      if (value === null) return undefined

      return JSON.parse(value)
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  return undefined
}

export const saveState = (key, state, haveCookie) => {
  if (typeof window !== 'undefined') {
    try {
      if (state === undefined || state === null) {
        localStorage.removeItem(key)
        if (haveCookie) Cookies.remove(key)
      } else {
        const serialState = JSON.stringify(state)
        localStorage.setItem(key, serialState)
        if (haveCookie) Cookies.set(key, state, { sameSite: 'None', secure: true })
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  return undefined
}

export const removeState = (key, haveCookie) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key)
      if (haveCookie) Cookies.remove(key)
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  return undefined
}
