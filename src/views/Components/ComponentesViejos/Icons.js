/*eslint-disable*/
import React, { useState, useEffect } from "react";
import XMLParser from 'react-xml-parser';
import axios from 'axios';
import clsx from 'clsx';
import {useSelector} from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import Heading from "components/Heading/Heading.js";

import styles from "assets/jss/material-dashboard-pro-react/views/iconsStyle";

const useStyles = makeStyles(styles);
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

export default function Icons() {
  const auth = useSelector((state) =>   state.auth);


  //style loading button
  const classes2 = useStyles2();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes2.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  //Variables y funcionamiento
  const [count, setCount] = useState(0);
  const [archivo, setArchivo] = useState(null);
  const [nombrePlantilla, setNombrePlantilla] = useState('')
  let [getPlantilla, setGetPlantilla] = useState([]);
  let [varJson, setVarJson] = useState([]);
  const [datos, setDatos] = useState([]);
  const [xml, setXml] = useState([])
  let [archivoJson, setArchivoJson] = useState([]);
  let [reloadPage, setReloadPage] = useState(false);
  const formData = new FormData();

  useEffect(() => {
    let varTempJson = [...varJson];
    datos.map((linea) => {
      let html = [];
      linea.hijos.forEach((item, index) => {
        let found = item.texto.match(/(Z{3})\w*:\w*:\w*(Z{3})/gm)
        if (Array.isArray(found)) {
          console.log(found);
          found.forEach(element => {
            let foundit = false;
            console.log("TEXTO CLAVE: " + element.slice(3, -3))
            varTempJson.map((name, ind) => {
              console.log(element.slice(3, -3).split(':')[1])
              if (element.slice(3, -3).split(':')[1] === name.nombre) {
                foundit = true;
              }
            });
            if (!foundit) {
              varTempJson = [...varTempJson, { tipo: element.slice(3, -3).split(':')[0], nombre: element.slice(3, -3).split(':')[1], orden: element.slice(3, -3).split(':')[2], valor: "" }];
            }
          });
        }
      });
      return html;
    })
    setVarJson([...varTempJson]);
    console.log(varJson);
    setArchivoJson([...varTempJson]);
    console.log(archivoJson);
    console.log('entroo');
  }, [datos])

  useEffect(() => {
    formData.append(
      'nombre_plantilla',
      document.getElementById("nombrePlantilla").value
    );
    formData.append(
      'variables',
      JSON.stringify(archivoJson),
    );
    formData.append(
      'archivo',
      archivo,
    );
    // console.log("Archivo a enviar");
    // console.log(formData.get('archivo'));
    //Axios
    let config = {
      method: 'post',
      url:process.env.REACT_APP_URL_API+"/api/PlantillaAgiles",
      headers: { Authorization: `Bearer ${auth.token}` },
      data: formData,
    };
    axios(config)
      .then((response) => {
        console.log(response);
        setReloadPage(true);
        setSuccess(true);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [archivoJson])

  const loaddata = (dataxml) => {
    let arraydata = dataxml.map((item, indexP) => {
      //console.log(item)
      let align = "";
      let hijos = [];
      let linea = "";
      let estilos = {
        "letra": "",
        "negrilla": false,
        "italica": false,
        "size": ""
      }
      let cambia = false;
      let estilosTemp = { ...estilos };
      item.children.forEach((element, index) => {
        //console.log(element)
        if (element.name === "w:pPr") {
          element.children.forEach((estilo) => {
            if (estilo.name === "w:jc") {
              align = estilo.attributes["w:val"];
            }
          })
        }
        if (element.name === "w:r") {
          //console.log("linea#"+index)
          element.children.forEach((text) => {
            if (text.name === "w:rPr") {
              let negrillaVerify = false;
              let italicaVerify = false;
              text.children.forEach(format => {
                switch (format.name) {
                  case "w:rFonts":
                    estilos.letra = format.attributes["w:ascii"];
                    if (estilos.letra !== estilosTemp.letra) {
                      cambia = true;
                      //console.log("entraletra")
                    }
                    break;
                  case "w:b":
                    estilos.negrilla = true;
                    negrillaVerify = true;
                    if (estilos.negrilla !== estilosTemp.negrilla) {
                      cambia = true;
                      //console.log("entranegrilla")
                    }
                    break;
                  case "w:i":
                    estilos.italica = true;
                    italicaVerify = true;
                    if (estilos.italica !== estilosTemp.italica) {
                      cambia = true;
                      //console.log("entraitalica")
                    }
                    break;
                  case "w:sz":
                    estilos.size = format.attributes["w:val"];
                    if (estilos.size !== estilosTemp.size) {
                      cambia = true;
                      //console.log("entratamano")
                    }
                    break;
                  case "w:szCs":
                    estilos.size = format.attributes["w:val"];
                    if (estilos.size !== estilosTemp.size) {
                      cambia = true;
                      //console.log("entratamano")
                    }
                    break;
                  default: break;
                }
              })
              if (!negrillaVerify) {
                if (estilosTemp.negrilla) {
                  cambia = true;
                  //console.log("entranegrilla2")
                  estilos.negrilla = false;
                }
              }
              if (!italicaVerify) {
                if (estilosTemp.italica) {
                  cambia = true;
                  //console.log("entraitalica2")
                  estilos.italica = false;
                }
              }
            } else {
              if (cambia) {
                //console.log("si cambia")
                if (index === 1) {
                  //console.log("es la primera")
                  estilosTemp = { ...estilos };
                  linea = text.value.trim();
                  if (item.children.length === 2) {
                    //console.log("solo tiene una linea wr")
                    hijos.push({
                      "letra": estilosTemp.letra,
                      "negrilla": estilosTemp.negrilla,
                      "italica": estilosTemp.italica,
                      "size": estilosTemp.size,
                      "texto": linea
                    })
                    estilos = {
                      "letra": "",
                      "negrilla": false,
                      "italica": false,
                      "size": ""
                    }
                    linea = "";
                  }
                } else {
                  //console.log("se inserta linea")                                        
                  hijos.push({
                    "letra": estilosTemp.letra,
                    "negrilla": estilosTemp.negrilla,
                    "italica": estilosTemp.italica,
                    "size": estilosTemp.size,
                    "texto": " " + linea
                  })
                  linea = text.value.trim();
                  estilosTemp = { ...estilos };
                }
                cambia = false;
              } else {
                linea = linea.trim() + text.value.trim();
                //console.log("concatena:"+linea);
                if ((item.children.length - 1) === index) {
                  hijos.push({
                    "letra": estilosTemp.letra,
                    "negrilla": estilosTemp.negrilla,
                    "italica": estilosTemp.italica,
                    "size": estilosTemp.size,
                    "texto": linea
                  })
                }
              }
            }
          })
        }
      });
      hijos.push({
        "letra": estilosTemp.letra,
        "negrilla": estilosTemp.negrilla,
        "italica": estilosTemp.italica,
        "size": estilosTemp.size,
        "texto": linea
      })
      return { align, hijos }
      /*  return <p key={index+linea}>{linea}</p>; */
    })
    setDatos(arraydata);
    console.log("YEISON")
    console.log(arraydata);
  }

  useEffect(() => {
    console.log("Entra");
    var data = JSON.stringify({
      "orden": "id",
    })
    //Axios
    let config = {
      method: 'get',
      url:process.env.REACT_APP_URL_API+"/api/PlantillaAgiles/Order",
      headers: { Authorization: `Bearer ${auth.token}`, 'Content-Type': 'aplication/json' },
      params: {
        orden: 'id',
      }
    };
    const fechData = async () => {
      const result = await axios(config);
      setGetPlantilla(result.data.data)
      console.log(result)
    }
    fechData();
  }, [reloadPage]);

  const onFileUpload = () => {
    // Create an object of formData 
    if (archivo) {
      setSuccess(false);
      setLoading(true);
      const reader = new FileReader();
      reader.readAsText(archivo);
      reader.onloadend = (evt) => {
        const readerData = evt.target.result;
        const xml = new XMLParser().parseFromString(readerData);
        console.log(archivo)
        const dataxml = xml.getElementsByTagName('w:p');
        loaddata(dataxml);
        console.log("dataxml");
      }
    } else {
      alert("No se ha subido ningún archivo");
    };
  };

  const onFileChange = event => {
    // Update the state 
    setArchivo(event.target.files[0]);
  };

  const fileData = () => {
    if (archivo) {
      return (
        <div>
          <h6>Detalles del Archivo:</h6>
          <p>Nombre: {archivo.name}</p>
          <p>Tipo: {archivo.type}</p>
          <p>
            Ultima modificación:{" "}
            {archivo.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          Elige un archivo antes de presionar guardar
        </div>
      );
    }
  };

  const classes = useStyles();

  return (
    <div style={{ marginTop: '-60px' }}>
      <Heading
        textAlign="center"
        title="CARGAR PLANTILLA"
        category={<span>Cargue la plantilla que desee configurar</span>}
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <VerticalSplitIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle} style={{ color: "black" }}>
                Formulario
              </h4>
            </CardHeader>
            <CardBody>
              <form id="formulario">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} style={{ textAlign: 'start' }}>
                    <FormLabel>
                      Nombre de la plantilla
                    </FormLabel>
                    <div style={{ marginTop: "-10px" }}>
                      <CustomInput
                        id="nombrePlantilla"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => setNombrePlantilla(e),
                        }}
                      />
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem>
                    <div style={{ marginTop: "0px" }}>
                      <Button
                        variant="contained"
                        component="label"

                      >
                        SUBIR ARCHIVO
                        <input
                          type="file"
                          accept=".xml"
                          style={{ display: "none" }}
                          onChange={(e) => onFileChange(e)}
                        />
                      </Button>
                    </div>
                  </GridItem>
                  <GridItem xs={1} sm={1} md={7}>
                    <FormLabel>
                      {fileData()}
                    </FormLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer>

                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      className={buttonClassname}
                      color="info"
                      disabled={loading}
                      component="label"
                      onClick={() => onFileUpload()}>
                      {success ? <CheckIcon style={{ fontSize: 30, marginRight: '0px' }} /> : <SaveIcon style={{ fontSize: 30, marginRight: '0px' }} />}</Button>
                    <div style={{ marginTop: '5px' }}>
                      {loading && <CircularProgress className={classes2.progress} size={40} color="primary" />}
                      {success ? <Alert severity="success">El archivo se ha subido exitosamente</Alert> : <p></p>}
                    </div>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {count >= 0 && (
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <FormatListNumberedIcon />
                </CardIcon>
                <h4 className={classes.cardIconTitle} style={{ color: "black" }}>
                  Listado de Plantillas
              </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <table className="table">
                      <thead className="text-center">
                        <tr>
                          <th scope="col">
                            ID
                          </th>
                          <th scope="col">
                            Nombre Plantilla
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {getPlantilla.map((item, i) => [
                          <tr>
                            <td key={item.id}>{item.id}</td>
                            <td >{item.nombre_plantilla}</td>
                          </tr>
                        ])}
                      </tbody>
                    </table>
                  </GridItem>

                </GridContainer>

              </CardBody>
            </Card>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
}
