import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const style = makeStyles((theme) => ({
  icon: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    color: "#fff",
    backgroundColor: green[500],
  },
  card: {
    // maxWidth: 345,
  },
}));
export default style;
