import React from 'react'

import cx from 'classnames'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Menu from '@material-ui/icons/Menu'
import ArrowBack from '@material-ui/icons/ArrowBack'
import AppBar from '@material-ui/core/AppBar'
import Hidden from '@material-ui/core/Hidden'
import Toolbar from '@material-ui/core/Toolbar'
import MoreVert from '@material-ui/icons/MoreVert'
import ViewList from '@material-ui/icons/ViewList'
import { makeStyles } from '@material-ui/core/styles'

import Button from 'components/CustomButtons/Button'
import styles from 'assets/jss/material-dashboard-pro-react/components/adminNavbarStyle'

const useStyles = makeStyles(styles)

export default function AdminNavbar(props) {
  const history = useHistory()
  const classes = useStyles()
  const { color, rtlActive, brandText } = props
  const appBarClasses = cx({
    [' ' + classes[color]]: color,
  })
  const sidebarMinimize =
    classes.sidebarMinimize +
    ' ' +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive,
    })
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button just round color="white" onClick={props.sidebarMinimize}>
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button justIcon round color="white" onClick={props.sidebarMinimize}>
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
            <Button
              className="ml-2"
              justIcon
              round
              color="white"
              onClick={() => {
                history.goBack()
              }}
            >
              <ArrowBack className={classes.sidebarMiniIcon} />
            </Button>
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title} color="transparent">
            {brandText || ''}
          </Button>
        </div>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
}
