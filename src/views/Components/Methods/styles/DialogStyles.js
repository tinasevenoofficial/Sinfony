import { makeStyles } from "@material-ui/core/styles";
import { primaryColor, roseColor } from "assets/jss/material-dashboard-pro-react.js";

const styles = makeStyles(() => ({
  relative: {
    position: "relative",
    "& .MuiDialog-paper": {
      overflowY: "visible",
    },
  },
  title: {
    position: "absolute",
    backgroundColor: primaryColor[0],
    padding: "10px 40px",
    top: "-20px",
    color: "white",
    marginLeft: "10px",
    textTransform: "uppercase",
    borderRadius: "3px",
  },
  title2: {
    position: "absolute",
    backgroundColor: primaryColor[0],
    padding: "10px 20px",
    top: "-20px",
    color: "white",
    marginLeft: "10px",
    textTransform: "uppercase",
    borderRadius: "3px",
  },
  containerButtons: {
    display: "flex",
    justifyContent: "center",
    padding: "15px 0px 30px",
  },
  button: {
    backgroundColor: roseColor[0],
    color: "white",
    margin: "0px 10px",
    transition: "all 0.5s ease-in-out",

    "&:hover": {
      backgroundColor: roseColor[2],
    },
  },
  info: {
    textAlign: "right",
    paddingTop: 15,
    minWidth: 500,
    "& p": {
      marginBottom: 5,
    },
  },
  value: {
    fontSize: 28,
    fontWeight: "400",
    textDecoration: "underline",
  },
  content: {
    maxHeight: 400,
    overflowY: "auto",
  },
}));

export default styles;
