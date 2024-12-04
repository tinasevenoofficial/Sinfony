/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from 'axios';
import clsx from 'clsx';
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import FormLabel from "@material-ui/core/FormLabel";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardFooter from "components/Card/CardFooter";

import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: '#FFFFFF',
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: '#FFFFFF',
    position: 'absolute',
  },
  progress: {
    marginTop: '10px',
  },
}));

export default function CrearDocumentoAgil({ history }) {
  const auth = useSelector((state) => state.auth);

  let [getPlantilla, setGetPlantilla] = useState([]);
  const [simpleSelect, setSimpleSelect] = React.useState("");
  const [newID, setNewID] = React.useState(0);

  const classes = useStyles();
  const classes2 = useStyles2();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSimple = event => {
    setSimpleSelect(event.target.value);
  };

  //post
  const upDocument = () => {

    if (simpleSelect && document.getElementById("nombreDocumento").value != '') {
      setSuccess(false);
      setLoading(true);
      const formData = new FormData();
      formData.append(
        'id_plantilla',
        simpleSelect,
      );
      formData.append(
        'nombre_documento',
        document.getElementById("nombreDocumento").value
      );
      //Axios
      let config = {
        method: 'post',
        url: process.env.REACT_APP_URL_API + "/api/documentosAgiles",
        headers: { Authorization: `Bearer ${auth.token}` },
        data: formData,
      };
      axios(config)
        .then((response) => {
          history.push({ pathname: '/admin/Formulario', state: { idDocu: response.data.id } });
          setSuccess(true);
          setLoading(false);
          //console.log(response.data.id);
        })
        .catch((e) => {
          console.log(e);
        })
    } else {
      alert('Faltan campos por llenar');
    }

  }

  //get
  useEffect(() => {
    //console.log("Entra");
    //Axios
    let config = {
      method: 'get',
      url: process.env.REACT_APP_URL_API + "/api/PlantillaAgiles/Order",
      headers: { Authorization: `Bearer ${auth.token}` },
      data: "",
    };
    const fechData = async () => {
      const result = await axios(config);

      setGetPlantilla(result.data);
    }
    fechData();
  }, []);

  return (
    <div>
      <GridContainer >
        <GridItem xs={12} sm={12} md={11} style={{ margin: 'auto' }}>
          <Card>
            <CardHeader color="primary" text>
              <CardText className={classes.cardText} color="primary">
                <h4 className={classes.colorWhite}> Formulario </h4>
              </CardText>
            </CardHeader>
            <CardBody >
              <form id="formulario">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <FormLabel style={{ marginTop: '10px', float: 'left' }}>
                      Nombre del documento
                    </FormLabel>
                    <div style={{ marginTop: "-10px" }}>
                      <CustomInput

                        id="nombreDocumento"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text"
                        }}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <div style={{ marginTop: '35px' }}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="simple-select"
                          className={classes.selectLabel}
                        >
                          Seleccione plantilla
                        </InputLabel>
                        <Select
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          value={simpleSelect}
                          onChange={handleSimple}
                          inputProps={{
                            name: "simpleSelect",
                            id: "simple-select"
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Escoger...
                          </MenuItem>
                          {getPlantilla.map((item, i) => [
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value={item.id}
                            >
                              {item.nombre_plantilla}
                            </MenuItem>
                          ])}

                        </Select>
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={2}
                    style={{ textAlign: 'right', marginTop: '38px' }}
                  >
                    <Button
                      variant="contained"
                      component="label"
                      color="rose"
                      onClick={() => upDocument()}
                    >
                      Guardar
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
            <CardFooter>
              <GridContainer >
                <GridItem xs={12}
                  sm={12}
                  md={12}>
                  <div style={{ textAlign: 'center' }}>
                    {loading && <CircularProgress className={classes2.progress} size={40} color="primary" />}
                  </div>
                </GridItem>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div >
  );
}
