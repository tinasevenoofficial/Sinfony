/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation} from "react-router-dom";
import axios from 'axios';
import {useSelector} from "react-redux";
// react components used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';

import styles from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";



const useStyles = makeStyles(styles);

export default function Proyecto() {

  const [alert, setAlert] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = useState([]);

  const location = useLocation();
  const radicaciones = location.state;

  const auth = useSelector((state) =>   state.auth);

  const handleClick = index => {
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter(item => item !== index))
    } else {
      setSelectedIndex(array => [...array,index])
    }
  }

  let { idRadicacion } = useParams();


  return (
    <div style={{marginTop:'-60px'}}>
      
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <Heading
                    textAlign="center"
                    title="CONSULTA RADICACIÓN"
                    category={<h3>{idRadicacion}</h3>}
            />
            <CardBody>
                <div className="accordion my-3" id={"accordionExample"+radicaciones.num_radicacion} key={radicaciones.num_radicacion}>
                    <div className="card">
                        <div className="card-body">
                            <GridContainer
                            justify="space-between"
                            style={{ paddingLeft: "40px", paddingRight: "40px" }}
                            >
                                <GridItem xs={12} sm={12} md={6}>
                                    <p style={{margin:'0px'}}>
                                    <b>Numero Radicación:</b> {radicaciones.num_radicacion}
                                    </p>
                                    <p style={{margin:'0px'}}>
                                    <b>Otorgante 1:</b> {radicaciones.otorgante1}
                                    </p>
                                    <p style={{margin:'0px'}}>
                                    <b>Otorgante 2: </b>{radicaciones.otorgante2}
                                    </p>
                                    <p style={{margin:'0px'}}>
                                    <b>Acto: </b>{radicaciones.Acto}
                                    </p>
                                </GridItem>
                                <GridItem
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    style={{ borderLeft: " 1px #E1E2E1 solid" }}
                                >
                                    <p style={{margin:'0px'}}>
                                    <b>Numero Escritura: </b>{radicaciones.num_escritura}
                                    </p>
                                    <p style={{margin:'0px'}}>
                                    <b>Fecha Escritura: </b>{radicaciones.fecha_escritura}
                                    </p>
                                    <p style={{margin:'0px'}}>
                                    <b>Proyecto: </b>{radicaciones.proyecto}
                                    </p>
                                    <p style={{margin:'0px'}}>
                                    <b>Direccion: </b>{radicaciones.direccion}
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
                                            onClick={() => handleClick("collapseTwoTwo"+radicaciones.num_radicacion)}
                                            style={{backgroundColor:'#00acc1', color:'#FFF'}}
                                            class="btn btn-block text-center"
                                            data-toggle="collapse"
                                            data-target={"#collapseTwoTwo"+radicaciones.num_radicacion}
                                            aria-expanded="true"
                                            aria-controls="collapseTwoTwo"
                                        >
                                            Seguimiento
                                        </Button>
                                    </h2>
                                </div>
                                <Collapse in={selectedIndex.includes("collapseTwoTwo"+radicaciones.num_radicacion)}>
                                    <div
                                    id={"collapseTwoTwo"+radicaciones.num_radicacion}
                                    aria-labelledby="headingTwoTwo"
                                    data-parent="#accordionExample11"
                                    >
                                        <div className="card-body">
                                            <GridContainer justify="space-between">
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <Table
                                                        tableHead={
                                                            [
                                                            [ <p className="text-center">
                                                                <b>Fecha</b>
                                                                </p>
                                                            ],
                                                            [ <p className="text-center">
                                                                <b>Detalle</b>
                                                                </p>
                                                            ],
                                                            [ <p className="text-center">
                                                                    <b>Observación</b>
                                                                </p>
                                                            ]
                                                            ]
                                                        }
                                                        tableData={                                        
                                                            radicaciones.seguimiento.map((segui)=>[
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
                </div>    
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
