import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles(theme => ({
  noPadding: {
    paddingTop: 0,
  },
  cardText: {
    display: 'flex',
  },
  icon: {
    marginRight: 15,
  },
  contentComprador: {
    position: 'relative',
  },
  contentVendedor: {
    position: 'relative',
    marginTop: 15,
  },
  fieldset: {
    border: '1px solid',
    borderRadius: 8,
    borderColor: theme.palette.secondary.main,
    padding: 12,
    marginBottom: 30,
  },
  legend: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: 14,
    borderRadius: 3,
    color: '#fff',
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
    position: 'absolute',
    top: -15,
  },
  buttonAdd: {
    position: 'relative',
    outline: 'none !important',
    marginTop: 10,
    bottom: 0,
    left: 0,
  },
}))
export default style
