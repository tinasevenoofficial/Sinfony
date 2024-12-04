import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'
import cx from 'classnames'
import { SWRConfig } from 'swr'
import { useSelector } from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Redirect, Route, Switch } from 'react-router-dom'

import routes from 'routes'
import Proyecto from 'views/Proyectos/Proyecto'
import Radicacion from 'views/Radicacion/Radicacion'
import ChangePassword from 'views/Pages/ChangePassword'
// import EstadoTramites from 'views/Maps/EstadoTramites'
import radicacionDetalle from 'views/Radicacion/MisRadicaciones/RadicacionDetalle'
import styles from 'assets/jss/material-dashboard-pro-react/layouts/adminStyle'

import { CreateProcess } from 'views/Process'
import { Footer, Sidebar, Navbar, Refresh } from './components'

const useStyles = makeStyles(styles)

const PrivateLayout = ({ ...rest }) => {
  // const history = useHistory()
  const classes = useStyles()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [miniActive, setMiniActive] = useState(false)

  const mainPanelClasses = cx(classes.mainPanel, {
    [classes.mainPanelSidebarMini]: miniActive,
    [classes.mainPanelWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
  })

  const auth = useSelector(state => state.auth)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps'
  }
  const getActiveRoute = routes => {
    let activeRoute = ''
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

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/admin' && auth.user.permisos.includes(prop.permisos)) {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />
      } else {
        return null
      }
    })
  }

  const sidebarMinimize = () => {
    setMiniActive(!miniActive)
  }

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fetcher: async url => {
          try {
            const res = await axios.get(url)
            return res.data
          } catch (err) {
            throw err.response.data
          }
        },
      }}
    >
      <div className={classes.wrapper}>
        <Refresh />
        <Sidebar
          routes={routes}
          logoText={'Creative Tim'}
          logo={require('assets/img/logo-white.svg')}
          image={require('assets/img/sidebar-2.jpg')}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={miniActive}
          usuario={auth.user}
          {...rest}
        />
        <PerfectScrollbar className={mainPanelClasses}>
          <Navbar
            sidebarMinimize={sidebarMinimize.bind(this)}
            miniActive={miniActive}
            brandText={getActiveRoute(routes)}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>
                <Switch>
                  <Route name="Proyecto" path="/admin/proyecto/:idProyecto" component={Proyecto} />
                  <Route name="Mis Radicaciones" path="/admin/misRadicaciones/:idRadicacion" component={radicacionDetalle}/>
                  <Route path="/admin/EstadoTramites/:idTramite" component={CreateProcess} />
                  <Route name="Cambiar contraseña" path="/admin/change-pwd" component={ChangePassword} />
                  <Route name="Radicaciones" path="/admin/radicacion/:id?/:step?" component={Radicacion} />
                  {getRoutes(routes)}
                  <Redirect from="/admin" to="/admin/dashboard" />
                </Switch>
              </div>
            </div>
          ) : (
            <div className={classes.map}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </div>
          )}
          {getRoute() ? <Footer fluid /> : null}
        </PerfectScrollbar>
      </div>
    </SWRConfig>
  )
}

export default PrivateLayout
