import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: ({ disabled }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  }),
  label: ({ disabled }) => ({
    width: '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
  }),
  paperContent: {
    borderWidth: 1,
    borderStyle: 'dashed',
    width: '100%',
    paddingBottom: '15%',
    paddingTop: '15%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#6a6a6a',
    color: '#6a6a6a',
  },
  paperContentOver: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  paperContentError: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
  helperText: {
    marginTop: 6,
  },
  helperTextError: {
    color: theme.palette.error.main,
  },
}))

export default useStyles
