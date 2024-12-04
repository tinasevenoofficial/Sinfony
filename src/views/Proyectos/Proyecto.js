/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
// react components used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardText from "components/Card/CardText.js";
import Table from "components/Table/Table.js";
import Collapse from '@material-ui/core/Collapse';
import Button from "components/CustomButtons/Button.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CustomInput from "components/CustomInput/CustomInput.js";

import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
import { primaryColor, infoColor } from "assets/jss/material-dashboard-pro-react.js";

import { events as calendarEvents } from "variables/general.js";

import { Spin, message } from 'antd';

const localizer = momentLocalizer(moment);


export default function Proyecto() {

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = React.useState(null);
  const [radicaciones, setRadicaciones] = React.useState([]);
  const [open, setOpen] = useState();
  const [openSegui, setOpensegui] = useState();
  const [selectedIndex, setSelectedIndex] = useState([])
  const [titleProyect, setTitleProyect] = useState();
  const [filtro, setFiltro] = useState("");
  const [valorFiltro, setValorFiltro] = useState("");

  const auth = useSelector((state) => state.auth);

  const handleClick = index => {
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter(item => item !== index))
    } else {
      setSelectedIndex(array => [...array, index])
    }
  }

  let { idProyecto } = useParams();

  const radicacionesFilter = () => {

    let config = {
      headers: { 'Authorization': `Bearer ${auth.token}` }
    };
    setLoading(true)
    setSelectedIndex([])
    axios.get("/api/radiProy?proyecto_id=" + idProyecto + "&filtro=" + filtro + "&valor_filtro=" + valorFiltro,config)
      .then((response) => {
        3
        setLoading(false);
        if (response.status === 200) {
          setRadicaciones(response.data);

        } else {
          console.log(response);
        }
      })
      .catch((e) => {
        setLoading(false)
        console.log(e);
        window.alert('no se pudo ejecutar la solicitud')
      })
  }

  const consultarRadicaciones = async () => { 
    let config = { headers: { Authorization: `Bearer ${auth.token}` } };
    setLoading(true)
    axios.get("/api/radiProy?proyecto_id=" + idProyecto,config)
      .then((response) => {
        setLoading(false)
        setTitleProyect(response.data[0].proyecto)
        let list_radi = [];
        if (response.status === 200) {
          setRadicaciones(response.data)

        } else {
          console.log(response);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }

  React.useEffect(() => {

    consultarRadicaciones();
  }, []);

  return (
    // <div style={{ marginTop: '-60px' }}>
    <div>
      {/* <Heading
        textAlign="center"
        title={titleProyect}
        category={<span>Proyecto </span>}
      /> */}
      {alert}
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" text>
              <CardText className={classes.cardText} color="primary">
                <h4 className={classes.colorWhite}> Proyecto: {titleProyect} </h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-4" style={{marginTop: '6px'}}>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      fullWidth
                      displayEmpty
                      defaultValue=""
                      onChange={(event) => {
                        setFiltro(event.target.value);
                      }}

                    >
                      <MenuItem
                        disabled
                        value=""
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        Seleccione Filtro
                      </MenuItem>
                      <MenuItem
                        value="num_escritura"
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        #Escritura
                      </MenuItem>
                      <MenuItem
                        value="otorgante2"
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        Otorgante 2
                      </MenuItem>
                      <MenuItem
                        value="direccion"
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        Dirección
                      </MenuItem>
                      <MenuItem
                        value="matricula"
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        Matrícula
                      </MenuItem>
                    </Select>
                    {/* <select
                      className="custom-select my-1 mr-sm-2"
                      id="selectPref"
                    >
                      <option defaultValue>Busqueda por...</option>
                      <option value="num_escritura">#Escritura</option>
                      <option value="otorgante2">Otorgante 2</option>
                      <option value="direccion ">Dirección</option>
                      <option value="matricula">Matrícula</option>
                    </select> */}
                  </div>
                  <div className="col-4" style={{marginTop: '-22px'}}>
                    <CustomInput
                      margin="dense"
                      id="valorFiltro"
                      labelText="VALOR DEL FILTRO"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        onChange: (e) => setValorFiltro(e.target.value),
                        value: valorFiltro,
                      }}
                    />
                    {/* <input
                      id="value filter"
                      type="text"
                      className="form-control"
                      placeholder="Valor"
                    ></input> */}
                  </div>
                  <div className="col-1">
                    <Button
                      className={classes.center}
                      color="rose"
                      onClick={() => radicacionesFilter()}
                    >
                      Filtrar
                    </Button>
                  </div>
                  <div className="col-2">
                    <Button
                      className={classes.center}
                      color="rose"
                      onClick={() => consultarRadicaciones()}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </form>
              <Spin spinning={loading}>
                {radicaciones.map((radicacion) => {
                  return (
                    <div className="accordion my-3" id={"accordionExample" + radicacion.num_radicacion} key={radicacion.num_radicacion}>
                      <div className="card">
                        <div className=" " id="headingOne">
                          <h2 className="mb-0">
                            <Button
                              onClick={() => handleClick(radicacion.num_radicacion)}
                              class="btn btn-block text-center"
                              style={{ backgroundColor: primaryColor[1], color: '#FFF' }}
                              data-toggle="collapse"
                              data-target={"#collapseOne" + radicacion.num_radicacion}
                              aria-expanded={open}
                              aria-controls={"collapseOne" + radicacion.num_radicacion}
                            >
                              <span className="mx-3">Radicación: {radicacion.num_radicacion}</span>
                              <span className="mx-3">Dirección: {radicacion.direccion}</span>
                              <span className="mx-3">Otorgante: {radicacion.otorgante2}</span>
                            </Button>
                          </h2>
                        </div>
                        <Collapse in={selectedIndex.includes(radicacion.num_radicacion)}>
                          <div
                            id={"collapseOne" + radicacion.num_radicacion}
                            aria-labelledby="headingOne"
                            data-parent={"#accordionExample" + radicacion.num_radicacion}
                          >
                            <div className="card-body">
                              <GridContainer
                                justify="space-between"
                                style={{ paddingLeft: "40px", paddingRight: "40px" }}
                              >
                                <GridItem xs={12} sm={12} md={6}>
                                  <p style={{ margin: '0px' }}>
                                    <b>No. Radicación:</b> {radicacion.num_radicacion}
                                  </p>
                                  <p style={{ margin: '0px' }}>
                                    <b>Fecha Escritura:</b> {radicacion.fecha_escritura}
                                  </p>
                                  <p style={{ margin: '0px' }}>
                                    <b>Otorgante 1: </b>{radicacion.otorgante1}
                                  </p>
                                  <p style={{ margin: '0px' }}>
                                    <b>Dirección: </b>{radicacion.direccion}
                                  </p>
                                </GridItem>
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  style={{ borderLeft: " 1px #E1E2E1 solid" }}
                                >
                                  <p style={{ margin: '0px' }}>
                                    <b>No. Matrícula: </b>{radicacion.matricula}
                                  </p>
                                  <p style={{ margin: '0px' }}>
                                    <b>No. Escritura: </b>{radicacion.num_escritura}
                                  </p>
                                  <p style={{ margin: '0px' }}>
                                    <b>Otorgante 2: </b>{radicacion.otorgante2}
                                  </p>
                                </GridItem>
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  style={{
                                    borderTop: " 1px #E1E2E1 solid",
                                    marginTop: "10px"
                                  }}
                                >
                                  <p style={{ margin: '0px' }} className="text-center mt-3">
                                    <b>Acto:</b> {radicacion.actos}
                                  </p>
                                </GridItem>
                              </GridContainer>
                            </div>
                            {/* ###################### */}
                            <div className="accordion" id="accordionExample11">
                              <div className="card">
                                <div className="" id="headingTwoTwo">
                                  <h2 className="mb-0">
                                    <Button
                                      onClick={() => handleClick("collapseTwoTwo" + radicacion.num_radicacion)}
                                      style={{ backgroundColor: infoColor[0], color: '#FFF' }}
                                      class="btn btn-block text-center"
                                      data-toggle="collapse"
                                      data-target={"#collapseTwoTwo" + radicacion.num_radicacion}
                                      aria-expanded="true"
                                      aria-controls="collapseTwoTwo"
                                    >
                                      Seguimiento
                                    </Button>
                                  </h2>
                                </div>
                                <Collapse in={selectedIndex.includes("collapseTwoTwo" + radicacion.num_radicacion)}>
                                  <div
                                    id={"collapseTwoTwo" + radicacion.num_radicacion}
                                    aria-labelledby="headingTwoTwo"
                                    data-parent="#accordionExample11"
                                  >
                                    <div className="card-body">
                                      <GridContainer justify="space-between">
                                        <GridItem xs={12} sm={12} md={12}>
                                          <Table
                                            tableHead={
                                              [
                                                [<p className="text-center">
                                                  <b>Fecha</b>
                                                </p>
                                                ],
                                                [<p className="text-center">
                                                  <b>Detalle</b>
                                                </p>
                                                ],
                                                [<p className="text-center">
                                                  <b>Observación</b>
                                                </p>
                                                ]
                                              ]
                                            }
                                            tableData={
                                              radicacion.seguimiento.map((segui) => [
                                                <p className="text-center">
                                                  <b>{segui.fecha}</b>
                                                </p>,
                                                <p className="text-center">
                                                  <b>{segui.detalle}</b>
                                                </p>,
                                                <p className="text-center">
                                                  <b>{segui.observacion}</b>
                                                </p>
                                              ])
                                            }
                                          />
                                        </GridItem>
                                      </GridContainer>
                                    </div>
                                  </div>
                                </Collapse>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  )
                })}
              </Spin>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
