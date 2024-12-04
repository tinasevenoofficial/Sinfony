/*eslint-disable*/
import React from "react";
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
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";

import styles from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";

import { events as calendarEvents } from "variables/general.js";

const localizer = momentLocalizer(moment);

const useStyles = makeStyles(styles);

export default function Calendar() {

  return (
    <div style={{marginTop:'-60px'}}>
      <Heading
        
        textAlign="center"
        title="BOSQUES DEL VENADO 01"
        category={<span>Proyecto </span>}
      />
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <form>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-4">
                    <select
                      className="custom-select my-1 mr-sm-2"
                      id="selectPref"
                    >
                      <option defaultValue>Busqueda por...</option>
                      <option value="1">#Escritura</option>
                      <option value="2">Otorgante 2</option>
                      <option value="3">Dirección</option>
                      <option value="3">Matrícula</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Valor"
                    ></input>
                  </div>
                  <div className="col-1">
                    <button type="button" className="btn btn-primary">
                      Filtrar
                    </button>
                  </div>
                  <div className="col-2">
                    <button type="button" className="btn btn-secondary ">
                      cancelar
                    </button>
                  </div>
                </div>
              </form>
              <div className="accordion my-3" id="accordionExample">
                <div className="card">
                  <div className=" " id="headingOne">
                    <h2 className="mb-0">
                      <button
                      
                        className="btn btn-success btn-block text-center"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <span className="mx-3">Radicación: 30757</span>
                        <span className="mx-3">Dirección:</span>
                        <span className="mx-3">
                          Otorgante: Juan Gabriel Buenahora Angarita
                        </span>
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse "
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <GridContainer
                        justify="space-between"
                        style={{ paddingLeft: "40px", paddingRight: "40px" }}
                      >
                        <GridItem xs={12} sm={12} md={6}>
                          <p style={{margin:'0px'}}>
                            <b>No. Radicación:</b> 30757
                          </p>
                          <p style={{margin:'0px'}}>
                            <b>Fecha Escritura:</b>
                          </p>
                          <p style={{margin:'0px'}}>
                            <b>Otorgante 1: </b>MUISCA CONSTRUCCIONES SAS
                          </p>
                          <p style={{margin:'0px'}}>
                            <b>Dirección: </b>
                          </p>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={6}
                          style={{ borderLeft: " 1px #E1E2E1 solid" }}
                        >
                          <p style={{margin:'0px'}}>
                            <b>No. Matrícula:</b>
                          </p>
                          <p style={{margin:'0px'}}>
                            <b>No. Escritura:</b>
                          </p>
                          <p style={{margin:'0px'}}>
                            <b>Otorgante 2: </b>JUAN GABRIEL BUENAHORA ANGARITA
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
                          <p className="text-center mt-3" style={{margin:'0px'}}>
                            <b>Acto:</b> CANCELACIÓN PARCIAL DE HIPOTECA -
                            COMPRAVENTA DE APARTAMENTO - CONDICIÓN RESOLUTORIA
                            EXPRESA
                          </p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    {/* ###################### */}
                    <div class="accordion" id="accordionExample11">
                      <div class="card">
                        <div class="" id="headingTwoTwo">
                          <h2 class="mb-0">
                            <button
                            style={{backgroundColor:'#00acc1', color:'#FFF'}}
                              class="btn btn-block text-center"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseTwoTwo"
                              aria-expanded="true"
                              aria-controls="collapseTwoTwo"
                            >
                              Seguimiento
                            </button>
                          </h2>
                        </div>

                        <div
                          id="collapseTwoTwo"
                          class="collapse "
                          aria-labelledby="headingTwoTwo"
                          data-parent="#accordionExample11"
                        >
                          <div class="card-body">
                            <GridContainer justify="space-between">
                              <GridItem xs={12} sm={12} md={12}>
                                <Table
                                  tableData={[
                                    [
                                      <p className="text-center">
                                        <b>FECHA</b>
                                      </p>,
                                      <p className="text-center">
                                        <b>DETALLES</b>
                                      </p>,
                                      <p className="text-center">
                                        <b>OBSERVACIONES</b>
                                      </p>
                                    ],
                                    [
                                      <p className="text-center">
                                        20-Ago-2020
                                      </p>,
                                      <p className="text-center">
                                        Terminación del seguimiento
                                      </p>,
                                      <p className="text-center">
                                        Terminación del seguimiento
                                      </p>
                                    ]
                                  ]}
                                />
                              </GridItem>
                            </GridContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ##########################3 */}
              <div className="accordion my-3" id="accordionExample2">
                <div className="card">
                  <div className=" " id="heading2">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-success btn-block text-center"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapse2"
                        aria-expanded="true"
                        aria-controls="collapse2"
                      >
                        <span className="mx-3">Radicación: 30811</span>
                        <span className="mx-3">Dirección:</span>
                        <span className="mx-3">
                          Otorgante: Mayerly Ramirez Bustamente y Otro
                        </span>
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapse2"
                    className="collapse "
                    aria-labelledby="heading2"
                    data-parent="#accordionExample2"
                  >
                    <div className="card-body">
                      <GridContainer
                        justify="space-between"
                        style={{ paddingLeft: "40px", paddingRight: "40px" }}
                      >
                        <GridItem xs={12} sm={12} md={6}>
                          <p style={{margin:'0px'}}>
                            <b>No. Radicación:</b> 30811
                          </p>
                          <p style={{margin:'0px'}}>
                            <b>Fecha Escritura:</b>
                          </p>
                          <p style={{margin:'0px'}}>
                            <b>Otorgante 1: </b>MUISCA CONSTRUCCIONES SAS
                          </p>
                          <p style={{margin:'0px'}}>
                            <b>Dirección: </b>
                          </p>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={6}
                          style={{ borderLeft: " 1px #E1E2E1 solid" }}
                        >
                          <p style={{margin:'0px'}}>
                            <b>No. Matrícula:</b>
                          </p>
                          <p style={{margin:'0px'}}>
                            <b>No. Escritura:</b>
                          </p>
                          <p style={{margin:'0px'}}>
                            <b>Otorgante 2: </b>MAYERLY RAMIREZ BUSTAMANTE Y OTRO
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
                          <p style={{margin:'0px'}} className="text-center mt-3">
                            <b>Acto:</b> CANCELACIÓN PARCIAL DE HIPOTECA - COMPRAVENTA DE APARTAMENTO - CONDICIÓN RESOLUTORIA EXPRESA - AFECTACIÓN DE VIVIENDA FAMILIAR - HIPOTECA SISTEMA E
                          </p>
                        </GridItem>
                      </GridContainer>
                    </div>
                    {/* ###################### */}
                    <div class="accordion" id="accordionExample22">
                      <div class="card">
                        <div class="" id="heading22">
                          <h2 class="mb-0">
                            <button
                            style={{backgroundColor:'#00acc1', color:'#FFF'}}
                              class="btn  btn-block text-center"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapse22"
                              aria-expanded="true"
                              aria-controls="collapse22"
                            >
                              Seguimiento
                            </button>
                          </h2>
                        </div>

                        <div
                          id="collapse22"
                          class="collapse"
                          aria-labelledby="heading22"
                          data-parent="#accordionExample22"
                        >
                          <div class="card-body">
                            <GridContainer justify="space-between">
                              <GridItem xs={12} sm={12} md={12}>
                                <Table
                                  tableData={[
                                    [
                                      <p className="text-center">
                                        <b>FECHA</b>
                                      </p>,
                                      <p className="text-center">
                                        <b>DETALLES</b>
                                      </p>,
                                      <p className="text-center">
                                        <b>OBSERVACIONES</b>
                                      </p>
                                    ],
                                    [
                                      <p className="text-center">
                                        20-Ago-2020
                                      </p>,
                                      <p className="text-center">
                                        Terminación del seguimiento
                                      </p>,
                                      <p className="text-center">
                                        Terminación del seguimiento
                                      </p>
                                    ]
                                  ]}
                                />
                              </GridItem>
                            </GridContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
