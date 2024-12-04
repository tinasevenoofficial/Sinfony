import { makeStyles } from '@material-ui/core/styles'

import { cardTitle } from 'assets/jss/material-dashboard-pro-react'

export const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(0, 2),
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: theme.spacing(3),
    marginBottom: 0,
  },
}))
