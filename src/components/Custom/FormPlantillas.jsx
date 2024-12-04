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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// core component
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import GridItem from "components/Grid/GridItem.js";
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
  const { title, createItem, loading, proyectos } = props;
  const [values, setValues] = useState({
    name: "",
    file: null,
    fileName: "",
    proyecto: null
  });
  const [valuesState, setValuesState] = useState();
  const [errors, setErrors] = useState({
    name: null,
    file: null,
    proyecto: null
  });

  let fileRef = useRef();
  let ProyectoRef = useRef(null);

  const classes = useStyles();

  const validateInput = (input, name) => {
    if (input.length > 0) {
      setErrors((state) => ({ ...state, [name]: null }));
    } else {
      setErrors((state) => ({ ...state, [name]: validations.BLANK }));
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

  const getProyecto = (id) => {
    return proyectos.find((dep) => {
      return dep.codigo === id;
    });
  };
  const updateValues = (e) => {
    const { id, name, value: val } = e.target;
    if (name) {
      setValues((state) => ({
        ...state,
        [name]: getProyecto(val).codigo,
      }));
    } else {
      setValues((state) => ({ ...state, [id]: val }));
    }
  };
  
  const updateValuesState = (input, error) => {
    setValuesState((state) => ({ ...state, [input]: error }));
  };
  const add = (e) => {
    e.preventDefault();
    console.log(values.proyecto)
    validateInput(values.name, "name");
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
              
              <GridItem xs={12} sm={6} md={4} lg={4}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      displayEmpty
                      defaultValue=""
                      onChange={(event) => {
                        if (event.target.value !== "") {
                          updateValuesState("proyecto", "success");
                        } else {
                          updateValuesState("proyecto", "error");
                        }
                        updateValues(event);
                      }}
                      inputProps={{
                        name: "proyecto",
                        inputRef: ProyectoRef,
                      }}
                    >
                      <MenuItem
                        disabled
                        value=""
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        Seleccione Proyecto
                      </MenuItem>
                      {proyectos?.map(({ codigo, proyecto }) => (
                        <MenuItem
                          key={codigo}
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value={codigo}
                        >
                          {proyecto}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </GridItem>
              <Grid item xs={12} sm={6} md={4} lg={4}>
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
                  accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFile}
                  ref={fileRef}
                  hidden
                />
              </Grid>
              
              <Grid item sm={3} md={2} lg={2}>
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
