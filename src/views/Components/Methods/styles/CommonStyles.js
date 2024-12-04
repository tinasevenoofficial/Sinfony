import { makeStyles } from '@material-ui/core/styles'
import { grayColor } from 'assets/jss/material-dashboard-pro-react.js'

const styles = makeStyles(() => ({
  containerFlex: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',

    '& p': {
      marginRight: '10px',
    },
  },
  label: {
    color: grayColor[3],
  },

  container: {
    marginTop: 20,
    maxWidth: 430,
    marginLeft: 'auto',
    marginRight: 'auto',

    '& .MuiFormControl-root': {
      paddingTop: 0,
      margin: 0,
    },

    '& > .ant-tabs-dropdown': {
      zIndex: '2000',
    },
  },

  containerFull: {
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 430,
    marginLeft: 'auto',
    marginRight: 'auto',

    '& .MuiFormControl-root': {
      paddingTop: 0,
      margin: 0,
    },
  },

  bono: {
    marginTop: 20,
    maxWidth: 430,
  },
  button: {
    backgroundColor: '#e91e63',
    color: 'white',
    margin: '0px 10px',
    transition: 'all 0.5s ease-in-out',

    '&:hover': {
      backgroundColor: '#bd104b',
    },
  },
  buttonCenter: {
    backgroundColor: '#e91e63',
    margin: '20px auto',
    display: 'block',
    color: 'white',
    transition: 'all 0.5s ease-in-out',

    '&:hover': {
      backgroundColor: '#bd104b',
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  icon: {
    cursor: 'pointer',
  },
  currencyInput: {
    paddingTop: '10px !important',
  },
}))

export default styles
