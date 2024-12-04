import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles(() => ({
  noPadding: {
    paddingTop: 0,
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#e91e63",
    fontSize: 20,
    margin: 5,
    cursor: "pointer",
    zIndex: 99,
  },
}));
export default style;
