import { makeStyles } from "@material-ui/core/styles";
import {
  cardTitle,
  roseColor,
  dangerColor,
} from "assets/jss/material-dashboard-pro-react.js";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

const style = makeStyles((theme) => ({
  ...customCheckboxRadioSwitch,
  ...customSelectStyle,
  actionButton: {
    margin: "0 0 0 5px",
    padding: "5px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px",
    },
  },
  danger: {
    color: dangerColor[0] + "!important",
  },
  icon: {
    verticalAlign: "middle",
    width: "17px",
    height: "17px",
    top: "-1px",
    position: "relative",
  },
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#fbfbfb",
  },
  titleModal: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  text: {
    margin: 5,
  },
  cardTitle: {
    ...cardTitle,
    color: "white",
  },
  colorRose: {
    color: roseColor[0],
    marginRight: 5,
  },
  center: {
    display: "block",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      marginTop: 15,
    },
  },
  cardText: {
    padding: "0px 35px 0px 35px",
  },
  colorWhite: {
    color: "white",
  },
  table: {
    "& .ant-table": {
      borderRadius: 6,
      boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%) !important",
      "& .ant-table-container": {
        border: 0,
      },
    },
    "& .ant-pagination-item , .ant-pagination-item-active > a": {
      borderColor: roseColor[0],
      color: roseColor[0],
    },
    "& .ant-pagination-item:hover > a , .ant-pagination-item-link:hover ": {
      color: roseColor[0],
    },
  },
  formStyle: {
    "& .MuiFormControl-root": {
      [theme.breakpoints.down("sm")]: {
        paddingTop: 0,
        margin: 0,
      },
    },
  },
  label: {
    "& label": {
      marginBottom: "0px !important",
    },
  },
}));
export default style;
