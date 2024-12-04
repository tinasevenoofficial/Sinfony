import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  loading: {
    color: 'inherit',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,

    '& > svg': {
      display: 'block',
      width: 'auto',
      height: 'auto',
      marginRight: 0,
    },
  },
  root: {
    position: 'relative',
  },
}))

export default useStyles
