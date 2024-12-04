import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import axios from "axios";
import { EXTERNAL_API_PATHS } from 'utils/constants'

import Otorgante from "./Otorgante";
import Inmueble from "./Inmueble";

import { message } from "antd";
// const originData = [];

// Estilos de la plantilla
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import CardText from "components/Card/CardText.js";
import CircularProgress from "@material-ui/core/CircularProgress";

// @material-ui
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Button2 from "@material-ui/core/Button";

// @material-ui ICONS
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import ModalActos from "./ModalActos";
import CustomTabsOrtorgantes from "components/CustomTabs/CustomTabsOrtorgantes";
import useStyles from "../../../assets/jss/material-dashboard-pro-react/views/common";
import { Spin } from "antd";

function Dashboard({ idRad, nextStep, OnChangeId }) {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user.id);
  const fecha = new Date();
  let año = fecha.getFullYear();
  let mes =
    fecha.getMonth() < 9
      ? "0" + (fecha.getMonth() + 1).toString()
      : "" + (fecha.getMonth() + 1);
  let dia =
    fecha.getDate() < 9
      ? "0" + (fecha.getDate() + 1)
      : "" + (fecha.getDate() + 1);
  let hora =
    fecha.getHours() < 10 ? "0" + fecha.getHours() : "" + fecha.getHours();
  let minutos =
    fecha.getMinutes() < 10
      ? "0" + fecha.getMinutes()
      : +"" + fecha.getMinutes();
  let segundos =
    fecha.getSeconds() < 10
      ? "0" + fecha.getSeconds()
      : +"" + fecha.getSeconds();
  const fecha1 =
    año + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;

  const [radicacion1, setRadicacion1] = useState([]);
  const [id, setId] = useState([]);
  // const [idRadicacion, setIdRadicacion] = useState(idRad);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar1, setMostrar1] = useState(true);
  // const [idRad, setidRad] = useState(idRad);
  // const [datos, setDatos] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [acto, setActos] = useState([]);

  const [digitador, setDigitador] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [contacto, setContacto] = useState([]);
  const [observaciones, setObservaciones] = useState("");
  const [revisor, setRevisor] = useState([]);
  const [escritura, setEscritura] = useState("");
  const [estados, setEstados] = useState([]);
  const [liquidador, setLiquidador] = useState([]);
  const [tipo, setTipo] = useState([]);

  const [digitador1, setDigitador1] = useState([]);
  const [contacto1, setContacto1] = useState([]);
  const [revisor1, setRevisor1] = useState([]);
  const [liquidador1, setLiquidador1] = useState([]);
  const [estados1, setEstados1] = useState([]);
  const [ready, setReady] = useState(false);

  const [value, setValue] = useState(0);

  useEffect(() => {
    getDatosFiltro();
  }, []);

  useEffect(() => {
    if (idRad && ready) {
      getRadicacion();
    }
  }, [ready]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const modalAddActo = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const getDatosFiltro = async () => {
    axios
      .get(EXTERNAL_API_PATHS.filtrosRadicacion)
      .then((response) => {
        let data = response.data;
        // setDatos(data);
        setDigitador1(data.digitadores);
        setRevisor1(data.revisor);
        setContacto1(data.personas);
        setLiquidador1(data.liquidadores);
        setEstados1(data.estados_escrituras);
        setTipo(data.tipos_otorgantes);
        setActos(data.actos);
        setReady(true);
      });
  };

  const getRadicacion = async () => {
    axios
      .get(`${EXTERNAL_API_PATHS.radicacionXNumero}?numero_radicacion=${idRad}`)
      .then((response) => {
        setMostrar(true);
        setMostrar1(false);
        setId(response.data.id);
        let plantilla = [];
        response.data.actosradi.map((item) => {
          acto.map((ite) => {
            if (item.actos_codigo_acto === ite.id) {
              plantilla.push({
                tabName: ite.nombre_acto,
              });
            }
          });
        });
        setTabs(plantilla);
        // let datos = [...response.data.actosradi];
        setRadicacion1([...response.data.actosradi]);
        setLiquidador(
          liquidador1.filter((item) => {
            return response.data.liquidador === item.id;
          })[0]
        );
        setDigitador(
          digitador1.filter((item) => {
            return response.data.digitador === item.id;
          })[0]
        );
        setRevisor(
          revisor1.filter((item) => {
            return response.data.revisor === item.id;
          })[0]
        );
        setObservaciones(response.data.observacion);
        setEstados(
          estados1.filter((item) => {
            return response.data.id_estados_escrituras === item.id;
          })[0]
        );
        setContacto(
          contacto1.filter((item) => {
            return response.data.contacto === item.id;
          })[0]
        );
        setEscritura(response.data.num_escritura);
      });
  };

  const setRadicacion = () => {
    axios
      .post(EXTERNAL_API_PATHS.radicaciones, {
        contacto: contacto.id,
        fecha_escritura: fecha1,
        num_escritura: escritura,
        observacion: observaciones,
        radicador: user,
        digitador: digitador.id,
        revisor: revisor.id,
        liquidador: liquidador.id,
        id_estados_escrituras: estados.id,
        actosradi: radicacion1,
        reparto: true,
        id_proyectos: null,
        activo: false,
      })
      .then((response) => {
        if (response.status === 201) {
          message.success("Se envio la información exitosamente");
          // setIdRadicacion(response.data.numero_radicacion);
          OnChangeId(
            response.data.numero_radicacion,
            response.data.id_radicacion
          );
          setMostrar(true);
          // setDisabled([2, 3]);
        }
      })
      .catch(() => {
        message.error("Error: No se envio la información");
      });
  };

  const UpRadicacion = () => {
    axios
      .put(EXTERNAL_API_PATHS.radicaciones + `/${id}`, {
        numero_radicacion: idRad,
        contacto: contacto?.id,
        fecha_escritura: fecha1,
        num_escritura: escritura,
        observacion: observaciones,
        radicador: user,
        digitador: digitador?.id,
        revisor: revisor?.id,
        liquidador: liquidador?.id,
        id_estados_escrituras: estados?.id,
        actosradi: radicacion1,
        reparto: true,
        id_proyectos: null,
        activo: false,
      })
      .then((response) => {
        if (response.status === 200) {
          // Limpiar();
          message.success("La información se actualizo correctamente");
        }
      })
      .catch(() => {
        message.error("Error: No se envio la información");
      });
  };

  // const Limpiar = () => {
  //   setMostrar(false);
  //   setTabs([]);
  //   setRadicacion1([]);
  //   setDigitador([]);
  //   setTabs([]);
  //   setContacto([]);
  //   setObservaciones("");
  //   setRevisor([]);
  //   setEscritura("");
  //   setEstados([]);
  //   setLiquidador([]);
  // };

  return (
    <>
      {/* 
      .##.....##.########....###....########..########.########.
      .##.....##.##.........##.##...##.....##.##.......##.....##
      .##.....##.##........##...##..##.....##.##.......##.....##
      .#########.######...##.....##.##.....##.######...########.
      .##.....##.##.......#########.##.....##.##.......##...##..
      .##.....##.##.......##.....##.##.....##.##.......##....##.
      .##.....##.########.##.....##.########..########.##.....##
      */}
      <GridContainer>
        <GridItem xs={12} lg={12}>
          <Card>
            <CardHeader color="primary" text>
              <CardText className={classes.cardText} color="primary">
                <h4 className={classes.colorWhite}>
                  Radicar Escritura {idRad && `No. ${idRad}`}
                </h4>
              </CardText>
              {/* <p className={classes.cardCategory}></p> */}
              <div className="row mt-5 justify-content-center">
                {/* {!idRad && (
                      <>
                        <div className="col-sm-2 col-xs-12 text-left">
                          <FormLabel className={classes.labelHorizontal}>
                            Radicación No.
                          </FormLabel>
                        </div>
                        <div
                          className="col-sm-2 col-xs-12 text-left"
                          style={{ marginTop: "-35px" }}
                        >
                          <CustomInput
                            id="radicacion"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "text",
                              value: idRad,
                              onChange: (e) => setidRad(e.target.value),
                            }}
                          />
                          <div className="col-sm-1 col-xs-12 text-left">
                            <IconButton
                              onClick={getRadicacion}
                              component="span"
                              color="primary"
                              style={{
                                marginTop: "-95px",
                                marginLeft: "115px",
                              }}
                            >
                              <SearchIcon />
                            </IconButton>
                          </div>
                          <div className="col-sm-1 col-xs-12 text-left">
                            <IconButton
                              onClick={Limpiar}
                              component="span"
                              color="primary"
                              style={{
                                marginTop: "-135px",
                                marginLeft: "165px",
                              }}
                            >
                              <ClearIcon />
                            </IconButton>
                          </div>
                        </div>
                      </>
                    )} */}
                <div className="col-sm-1 col-xs-12 text-left">
                  <FormLabel className={classes.labelHorizontal}>
                    Fecha
                  </FormLabel>
                </div>
                <div
                  className="col-sm-2 col-xs-12 text-right"
                  style={{ marginTop: "-35px" }}
                >
                  <CustomInput
                    id="fecharad"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: fecha1,
                    }}
                  />
                </div>
                <div
                  className="col-sm-3 col-xs-12 text-left"
                  style={{ marginTop: "-10px" }}
                >
                  <Button2
                    variant="contained"
                    color="secondary"
                    onClick={modalAddActo}
                    size="small"
                  >
                    Agregar Acto
                  </Button2>
                </div>
              </div>
              <br></br>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      {/*
      .########....###....########..##..........###...
      ....##......##.##...##.....##.##.........##.##..
      ....##.....##...##..##.....##.##........##...##.
      ....##....##.....##.########..##.......##.....##
      ....##....#########.##.....##.##.......#########
      ....##....##.....##.##.....##.##.......##.....##
      ....##....##.....##.########..########.##.....##
      */}
      {mostrar1 && idRad && (
        <CircularProgress color="secondary" className="d-block mx-auto" />
      )}
      {/* TODO Revisar condicional */}
      {(radicacion1.length > 0 || tabs.length > 0) && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <Card style={{ marginTop: "-14px" }}>
              <CardBody>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {radicacion1.length > 0 && (
                      <CustomTabsOrtorgantes
                        headerColor="primary"
                        tabs={tabs}
                        setTabs={setTabs}
                        tipo={tipo}
                        radicacion1={radicacion1}
                        setRadicacion1={setRadicacion1}
                        handleClick1={handleClick1}
                        handleClick={handleClick}
                        value={value}
                        setValue={setValue}
                        style={{ with: "100%" }}
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{ paddingLeft: "20px", paddingRight: "20px" }}
                >
                  <Grid item xs={12} sm={12}>
                    <h4 className={classes.cardIconTitle}>Datos generales</h4>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      style={{ marginRight: "20px" }}
                      options={digitador1}
                      getOptionLabel={(option) =>
                        option.nombres
                          ? option.nombres + " " + option.apellidos
                          : ""
                      }
                      id="auto-select"
                      autoSelect
                      value={digitador}
                      onChange={(event, newValue) => {
                        setDigitador(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          autoFocus
                          label="Digitador"
                          margin="normal"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      style={{ marginRight: "20px" }}
                      options={revisor1}
                      getOptionLabel={(option) =>
                        option.nombres
                          ? option.nombres + " " + option.apellidos
                          : ""
                      }
                      id="auto-select"
                      autoSelect
                      value={revisor}
                      onChange={(event, newValue) => {
                        setRevisor(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Revisor"
                          margin="normal"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      style={{ marginRight: "20px" }}
                      options={contacto1}
                      getOptionLabel={(option) =>
                        option.nombres
                          ? option.nombres + " " + option.apellidos
                          : ""
                      }
                      id="auto-select"
                      autoSelect
                      value={contacto}
                      onChange={(event, newValue) => {
                        setContacto(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Contacto"
                          margin="normal"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      style={{ marginRight: "20px" }}
                      options={liquidador1}
                      getOptionLabel={(option) =>
                        option.nombres
                          ? option.nombres + " " + option.apellidos
                          : ""
                      }
                      id="auto-select"
                      autoSelect
                      value={liquidador}
                      onChange={(event, newValue) => {
                        setLiquidador(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Liquidador"
                          margin="normal"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <label>Observaciones</label>
                    <TextareaAutosize
                      aria-label="minimum height"
                      rowsMin={3}
                      value={observaciones}
                      onChange={(e) => setObservaciones(e.target.value)}
                      fullWidth
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ textAlign: "right" }}>
                    <Button variant="contained" color="primary">
                      Imprimir
                    </Button>
                    {mostrar ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={UpRadicacion}
                        >
                          Actualizar
                        </Button>
                        <a href="#top">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={nextStep}
                          >
                            Liquidar
                          </Button>
                        </a>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={setRadicacion}
                      >
                        Guardar
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}

      <Otorgante
        open={open}
        radicacion1={radicacion1}
        setRadicacion1={setRadicacion1}
        handleClose={handleClose}
        value={value}
      />
      <Inmueble
        open={open1}
        handleClose={handleClose1}
        radicacion1={radicacion1}
        setRadicacion1={setRadicacion1}
        value={value}
      />
      <ModalActos
        open={open2}
        handleClose={handleClose2}
        radicacion1={radicacion1}
        setRadicacion1={setRadicacion1}
        tabs={tabs}
        setTabs={setTabs}
        handleClick1={handleClick1}
        handleClick={handleClick}
      />
    </>
  );
}

Dashboard.defaultProps = {
  idRad: undefined,
  nextStep: null,
};

Dashboard.propTypes = {
  idRad: PropTypes.number,
  nextStep: PropTypes.func,
  OnChangeId: PropTypes.func.isRequired,
};

export default Dashboard;
