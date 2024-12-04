import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import styles from 'assets/jss/material-dashboard-pro-react/components/footerStyle.js'

const useStyles = makeStyles(styles)

const Footer = ({ fluid, white, rtlActive = false }) => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <div
        className={cx({
          [classes.container]: !fluid,
          [classes.containerFluid]: fluid,
          [classes.whiteColor]: white,
        })}
      >
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://sinfony.com.co"
                className={cx({
                  [classes.block]: true,
                  [classes.whiteColor]: white,
                })}
              >
                {rtlActive ? 'الصفحة الرئيسية' : 'Sinfony'}
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a
            href="https://sinfony.com.co"
            className={cx({
              ...classes.a,
              [classes.whiteColor]: white,
            })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {rtlActive ? 'توقيت الإبداعية' : 'SINFONY'}
          </a>
          {rtlActive ? ', مصنوعة مع الحب لشبكة الإنترنت أفضل' : ', todos los derechos reservados'}
        </p>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool,
}

export default Footer
