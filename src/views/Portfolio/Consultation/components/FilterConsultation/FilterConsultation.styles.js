import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  filter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}))

export default useStyles
