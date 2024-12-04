import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import routes from 'routes'

import styles from 'assets/jss/material-dashboard-pro-react/layouts/authStyle.js'

import register from 'assets/img/register.jpeg'
import login from 'assets/img/login.jpeg'
import lock from 'assets/img/lock.jpeg'
import error from 'assets/img/clint-mckoy.jpg'
import pricing from 'assets/img/bg-pricing.jpeg'
import LoginPage from 'views/Pages/LoginPage'
import RadicacionSeguimiento from 'views/Radicacion/RadicacionSeguimiento'
import RespuestaClienteFE from 'views/FacturacionElectronica/RespuestaClienteFE'
import Persona from "views/Persona/Otorgante";

import { Navbar } from './components'
import { Footer } from '../PrivateLayout/components'

const useStyles = makeStyles(styles)

export default function Pages(props) {
  const { ...rest } = props
  // ref for the wrapper div
  const wrapper = React.createRef()
  // styles
  const classes = useStyles()
  React.useEffect(() => {
    document.body.style.overflow = 'unset'
    // Specify how to clean up after this effect:
    return function cleanup() {}
  })
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/auth') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />
      } else {
        return null
      }
    })
  }
  const getBgImage = () => {
    if (window.location.pathname.indexOf('/auth/register-page') !== -1) {
      return register
    } else if (window.location.pathname.indexOf('/auth/login-page') !== -1) {
      return login
    } else if (window.location.pathname.indexOf('/auth/seguimiento') !== -1) {
      return login
    } else if (window.location.pathname.indexOf('/auth/respuestaCliente') !== -1) {
      return login
    } else if (window.location.pathname.indexOf('/auth/pricing-page') !== -1) {
      return pricing
    } else if (window.location.pathname.indexOf('/auth/lock-screen-page') !== -1) {
      return lock
    } else if (window.location.pathname.indexOf('/auth/error-page') !== -1) {
      return error
    }
  }

  const getActiveRoute = routes => {
    let activeRoute = 'Default Brand Text'
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].name
        }
      }
    }
    return activeRoute
  }
  return (
    <div>
      <Navbar brandText={getActiveRoute(routes)} {...rest} />
      <div className={classes.wrapper} ref={wrapper}>
        <div className={classes.fullPage} style={{ backgroundImage: 'url(' + getBgImage() + ')' }}>
          <Switch>
            <Route path="/auth/login-page" component={LoginPage} />
            <Route path="/auth/seguimiento/:idRadicacion" component={RadicacionSeguimiento} />
            <Route path="/auth/respuestaCliente/:idFacturacion/:token/:respuesta" component={RespuestaClienteFE} />
            <Route path="/auth/CreatePerson" component={Persona}/>
            {getRoutes(routes)}
            <Redirect from="/auth" to="/auth/login-page" />
          </Switch>
          <Footer white />
        </div>
      </div>
    </div>
  )
}
