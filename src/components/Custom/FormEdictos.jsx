import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
// @material-ui iconsStyle
import AttachFileIcon from "@material-ui/icons/AttachFile";
// @material-ui/core components
import { message } from "antd";

// import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

// core component
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import { validations } from "validators/messages";

//Styles
import { primaryColor, infoColor } from "assets/jss/material-dashboard-pro-react.js";
import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const themeInputInfo = createTheme({
  palette: {
      primary: {
          main: infoColor[0],
          light: infoColor[0],
          dark: infoColor[0],
      },
      secondary: {
          main: primaryColor[0],
          light: primaryColor[0],
          dark: primaryColor[0],
      }
  },
});

const FormItem = (props) => {
  const { title, createItem, loading } = props;
  const [values, setValues] = useState({
    title: "",
    name: "",
    expiration: moment().add(1, "days"),
    startDate: moment(),
    file: null,
    fileName: "",
  });
  const [errors, setErrors] = useState({
    title: null,
    name: null,
    expiration: null,
    startDate: null,
    file: null,
  });

  let fileRef = useRef();

  const classes = useStyles();

  const validateInput = (input, name) => {
    if (input.length > 0) {
      setErrors((state) => ({ ...state, [name]: null }));
    } else {
      setErrors((state) => ({ ...state, [name]: validations.BLANK }));
    }
  };

  const validateDate = (expiration, name) => {
    if (!moment(expiration).isValid()) {
      setErrors((state) => ({
        ...state,
        [name]: validations.INVALID_DATE,
      }));
    } else {
      setErrors((state) => ({
        ...state,
        [name]: null,
      }));
    }
  };

  const validateFile = (file) => {
    if (!file) {
      setErrors((state) => ({
        ...state,
        file: validations.BLANK,
      }));
    } else {
      setErrors((state) => ({
        ...state,
        file: null,
      }));
    }
  };

  const updateInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setValues((state) => ({ ...state, [inputName]: inputValue }));
    validateInput(inputValue, inputName);
  };

  const handleFile = (e) => {
    let file = e.target.files[0];
    if (file) {
      validateFile(file);
      setValues((s) => ({
        ...s,
        file: file,
        fileName: file.name,
      }));
    }
  };

  const updateDate = (date, name) => {
    validateDate(date, name);
    setValues((state) => ({
      ...state,
      [name]: moment(date).format("YYYY-MM-DD"),
    }));
  };

  const add = (e) => {
    e.preventDefault();
    validateInput(values.title, "title");
    validateInput(values.name, "name");
    validateDate(values.expiration, "expiration");
    validateDate(values.startDate, "startDate");
    validateFile(values.file);
    if (
      Object.values(values).every((value) => value !== null && value !== "")
    ) {
      createItem(values, setValues);
    } else {
      message.error("Revise la informacion requerida", 1);
      return;
    }
  };

  return (
    <Card>
      <CardHeader color="primary" text>
        <CardText className={classes.cardText} color="primary">
          <h4 className={classes.colorWhite}>{title}</h4>
        </CardText>
      </CardHeader>
      <CardBody>
        <ThemeProvider theme={themeInputInfo}>
          <form onSubmit={add}>
            <Grid container justify="center" alignItems="center" spacing={2}>

              <Grid item xs={12} sm={6} md={4} lg={6}>
                <TextField
                  required
                  name="title"
                  label="Titulo"
                  placeholder="Ejemplo: Edicto 10"
                  value={values.title}
                  onChange={updateInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.title}
                  helperText={errors.title}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <TextField
                  required
                  name="name"
                  label="Nombre del cliente"
                  placeholder="Nombre"
                  value={values.name}
                  onChange={updateInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    id="startDate"
                    label="Fecha inicio"
                    format="YYYY-MM-DD"
                    value={values.startDate}
                    onChange={(d) => updateDate(d, "startDate")}
                    required
                    KeyboardButtonProps={{
                      "aria-label": "Cambiar fecha",
                    }}
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    id="expiration"
                    label="Expiración"
                    format="YYYY-MM-DD"
                    minDate={new Date()}
                    value={values.expiration}
                    onChange={(d) => updateDate(d, "expiration")}
                    required
                    KeyboardButtonProps={{
                      "aria-label": "Cambiar fecha",
                    }}
                    error={!!errors.expiration}
                    helperText={errors.expiration}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <TextField
                  // label="Documento"
                  disabled
                  id="document"
                  placeholder="Seleccione un archivo"
                  value={values.fileName}
                  error={!!errors.file}
                  helperText={errors.file}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <label className={classes.label} htmlFor="upload-file">
                        <IconButton
                          color="primary"
                          aria-label="Subir archivo"
                          component="span"
                        >
                          <AttachFileIcon />
                        </IconButton>
                      </label>
                    ),
                  }}
                />
                <input
                  id="upload-file"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFile}
                  ref={fileRef}
                  hidden
                />
              </Grid>
              <Grid item sm={3} md={2}>
                <Button
                  type="submit"
                  disabled={loading}
                  color="rose"
                  size="sm"
                  fullWidth
                >
                  Añadir
                </Button>
              </Grid>
            </Grid>
          </form>
        </ThemeProvider>
      </CardBody>
    </Card>
  );
};

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createItem: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FormItem;
