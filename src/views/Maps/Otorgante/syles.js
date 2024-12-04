import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
    paper: {
        maxWidth: 1000,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
      },
  }));

  export default useStyles;