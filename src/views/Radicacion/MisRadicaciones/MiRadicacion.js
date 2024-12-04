/*eslint-disable*/
import React, { useState, useEffect } from "react";

import axios from 'axios';
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useCRUD, useBoolean, useFetch } from 'hooks'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CustomInput from "components/CustomInput/CustomInput.js";

import useStyles from "../../../assets/jss/material-dashboard-pro-react/views/common";

import { Spin, message } from 'antd';


/* const useStyles = makeStyles(styles); */

export default function Proyecto() {
  const classes = useStyles();
  const [filtro, setFiltro] = useState("");
  const [valorFiltro, setValorFiltro] = useState("");
  const { data: radicaciones, loading } = useFetch(valorFiltro && filtro ? `/api/radiProy?filtro=${filtro}&valor_filtro=${valorFiltro}` : '/api/seguiradi')

  return (
    <div >
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" text>
              <CardText className={classes.cardText} color="primary">
                <h4 className={classes.colorWhite}>Ver Mis Radicaciones</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-4" style={{ marginTop: '6px' }}>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      fullWidth
                      displayEmpty
                      value={filtro}
                      onChange={(event) => {
                        setFiltro(event.target.value);
                      }}

                    >
                      <MenuItem
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
                  </div>
                  <div className="col-4" style={{ marginTop: '-22px' }}>
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
                  </div>
                  <div className="col-1">
                    <Button
                      className={classes.center}
                      color="rose"
                      onClick={() => {
                        setFiltro("")
                        setValorFiltro("")
                      }}
                    >
                      Limpiar
                    </Button>
                  </div>
                </div>
              </form>
              <Spin spinning={loading}>
                {(radicaciones || []).map((radicacion) => {
                  return (
                    <div className="accordion my-3" id={"accordionExample" + radicacion.num_radicacion} key={radicacion.num_radicacion}>
                      <div className="card">
                        <div className=" " id="headingOne">
                          <h2 className="mb-0">
                            <Link
                              class="btn btn-success btn-block text-center"
                              to={{
                                pathname: "/admin/misRadicaciones/" + radicacion.num_radicacion,
                                state: {
                                  num_radicacion: radicacion.num_radicacion,
                                  otorgante1: radicacion.otorgante1,
                                  otorgante2: radicacion.otorgante2,
                                  Acto: radicacion.actos,
                                  num_escritura: radicacion.num_escritura,
                                  fecha_escritura: radicacion.fecha_escritura,
                                  proyecto: radicacion.proyecto_id,
                                  direccion: radicacion.direccion,
                                  seguimiento: radicacion.seguimiento,
                                },
                              }}
                            >
                              <span className="mx-3">Radicación: {radicacion.num_radicacion}</span>
                              <span className="mx-3">Dirección: {radicacion.direccion}</span>
                              <span className="mx-3">Otorgante: {radicacion.otorgante2}</span>
                            </Link>
                          </h2>
                        </div>
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
