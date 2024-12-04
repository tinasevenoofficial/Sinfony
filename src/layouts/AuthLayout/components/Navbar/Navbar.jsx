import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/icons/Menu'
import Fingerprint from '@material-ui/icons/Fingerprint'
import { Home } from '@material-ui/icons'

import cx from 'classnames'
import { NavLink } from 'react-router-dom'

import Button from 'components/CustomButtons/Button'

import styles from 'assets/jss/material-dashboard-pro-react/components/authNavbarStyle.js'

import LogoDoble from 'components/Logos/LogoDoble'

import './nav.css'

const useStyles = makeStyles(styles)

export default function AuthNavbar() {
  const [open, setOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setOpen(!open)
  }
  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? true : false
  }
  const classes = useStyles()
  var list = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <NavLink to="/auth/login-page" className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute('/auth/login-page'),
          })}>
          <Home style={{ color: 'black' }} className={classes.listItemIcon} />
          <ListItemText
            primary={'NOTARÍA'}
            disableTypography={true}
            style={{ color: 'black' }}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={'/auth/login-page'}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute('/auth/login-page'),
          })}
        >
          <Fingerprint style={{ color: 'black' }} />
          <ListItemText
            primary={'INICIAR SESIÓN'}
            disableTypography={true}
            style={{ color: 'black' }}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
    </List>
  )
  return (
    <AppBar color="inherit" position="fixed">
      <Toolbar className={classes.container}>
        <Hidden>
          <div className={classes.flex}>
            <LogoDoble></LogoDoble>
          </div>
        </Hidden>

        <Hidden smDown className="navbar-items-position">
          {list}
        </Hidden>
        <Hidden mdUp>
          <Button
            className={classes.sidebarButton}
            style={{ backgroundColor: '#000000' }}
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={'right'}
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {list}
            </Drawer>
          </Hidden>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}
