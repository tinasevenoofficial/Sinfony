import React, { useState, useEffect } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'

// material-ui components
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Button from '@material-ui/core/Button'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import IconButton from '@material-ui/core/IconButton'
// core components
import Card from 'components/Card/Card.js'
import CardBody from 'components/Card/CardBody.js'
import CardHeader from 'components/Card/CardHeader.js'
import CurrencyInput from 'components/CustomInput/CurrencyInput'
// import GridContainer from "components/Grid/GridContainer.js";

import GridItem from 'components/Grid/GridItem.js'
// import Button from 'components/CustomButtons/Button.js'

import styles from 'assets/jss/material-dashboard-pro-react/components/customTabsStyleRadi.js'
import { InmuebleTable } from 'views/Proyectos/Radiacion/DatosColumnas/data'
import { EditableTable } from 'views/Proyectos/Radiacion/DatosColumnas/data'

const useStyles = makeStyles(styles)

export default function CustomTabsOrtorgantes(props) {
  const classes = useStyles()
  const [valueCuantia, setValueCuantia] = useState(0)
  const {
    plainTabs,
    tabs,
    setTabs,
    title,
    rtlActive,
    radicacion1,
    setRadicacion1,
    handleClick1,
    handleClick,
    value,
    setValue,
    tipo,
  } = props

  const handleChange = (event, newvalue) => {
    setValue(newvalue)
  }

  const Delete = value => {
    const newData = [...radicacion1]
    const Tab = [...tabs]
    newData.splice(value, 1)
    Tab.splice(value, 1)
    setRadicacion1(newData)
    setTabs(Tab)
  }

  const setCuantia = newValue => {
    const newData = [...radicacion1]
    newData[value].cuantia = parseInt(newValue)
    setValueCuantia(newValue)
    setRadicacion1(newData)
  }

  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive,
  })

  useEffect(() => {
    setValueCuantia(radicacion1[value].cuantia || 0)
  }, [value])

  return (
    <Card plain={plainTabs}>
      <CardHeader plain={plainTabs}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop, key) => {
            var icon = {}
            icon = {
              icon: (
                <IconButton
                  aria-label="delete"
                  style={{ color: 'white', marginRight: '15px' }}
                  size="small"
                  onClick={() => Delete(value)}
                >
                  <ClearIcon fontSize="inherit" />
                </IconButton>
              ),
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper,
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            )
          })}
        </Tabs>
      </CardHeader>
      {tabs.length > 0 && (
        <CardBody>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item style={{ padding: 'inherit !important' }} xs={12} sm={6} md={6} lg={6}>
              <GridItem xs={12} sm={12} md={12} lg={12} style={{ padding: 'inherit !important' }}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Grid item style={{ padding: '0px 0px !important;' }}>
                    <Button variant="contained" color="secondary" onClick={handleClick1}>
                      <AddIcon />
                    </Button>
                    <span> Añadir Inmueble</span>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="upload picture" color="secondary">
                      <FindInPageIcon style={{ fontSize: '33px', color: 'inherit' }} />
                    </IconButton>
                    <span>Documentos requeridos</span>
                  </Grid>
                </Grid>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <Button variant="contained" color="secondary" onClick={handleClick}>
                  <AddIcon />
                </Button>
                <span> Añadir Otorgante</span>
              </GridItem>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InmuebleTable
                radicacion1={radicacion1.length > 0 && radicacion1}
                setRadicacion1={setRadicacion1}
                value={value}
              />
              <br></br>
            </Grid>
            <br></br>
          </Grid>
          <Grid container justify="center">
            <Grid xs={4}>
              <CurrencyInput
                label="Cuantía"
                className="mt-4 mb-4"
                onChange={setCuantia}
                placeholder="Ingrese un valor"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid xs={12}>
              <EditableTable
                tipo={tipo}
                radicacion1={radicacion1.length > 0 && radicacion1}
                setRadicacion1={setRadicacion1}
                value={value}
              />
              {/* <EditableTable /> */}
            </Grid>
          </Grid>
        </CardBody>
      )}
    </Card>
  )
}

CustomTabsOrtorgantes.propTypes = {
  // the default opened tab - index starts at 0
  value: PropTypes.number,
  // function for changing the value
  // note, if you pass this function,
  // the default function that changes the tabs will no longer work,
  // so you need to create the changing functionality as well
  // changeValue: PropTypes.func,
  headerColor: PropTypes.oneOf(['warning', 'success', 'danger', 'info', 'primary', 'rose']),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired,
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool,
  inmuebles: PropTypes.array,
  otorgantes: PropTypes.array,
}
