import React from 'react'

import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

import useStyles from './FilterConsultation.styles'
import { infoColor } from "assets/jss/material-dashboard-pro-react.js";
// import themeInputSecondary  from "views/StylesEnviroment/StylesEnviroment"

const themeInputSecondary = createTheme({
  palette: {
      primary: {
          main: infoColor[0],
          light: infoColor[0],
          dark: infoColor[0],
      }
  },
});

const FilterConsultation = ({ clients, loading, selected, handleSelected }) => {
  const classes = useStyles()
  return (
    <Box className={classes.filter}>
      <Typography variant="body2">Cliente: </Typography>
      <ThemeProvider theme={themeInputSecondary}>
        <TextField disabled={loading} fullWidth select onChange={handleSelected} value={selected}>
          <MenuItem value="all">TODOS</MenuItem>
          {clients.map(({ nombres, id_clientes }) => (
            <MenuItem key={id_clientes} value={id_clientes}>
              {nombres}
            </MenuItem>
          ))}
        </TextField>
      </ThemeProvider>
    </Box>
  )
}

FilterConsultation.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSelected: PropTypes.func,
}

export default FilterConsultation
