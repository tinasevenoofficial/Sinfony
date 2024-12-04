import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#ECECEC',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  containerChart: {
    backgroundColor: '#f3f3f3',
    margin: '0',
  },
  cell: {
    borderBottom: 0,
  },
  cellTotal: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}))

export default useStyles
