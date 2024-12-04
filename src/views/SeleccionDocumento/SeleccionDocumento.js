/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

//modals forms
import AuteDocuPrivado from "./Modals/AuteDocuPrivado";
import CancelaHipo from "./Modals/CancelaHipo";
import CopiaRegisCiviDefu from "./Modals/CopiaRegisCiviDefu"
import CertificadoVigencia from "./Modals/CertificadoVigencia"
import CopiaLibroVarios from "./Modals/CopiaLibroVarios"
import CopiaRegisCivilMatriPropio from "./Modals/CopiaRegisCiviMatriPropio"
import CopiaRegisNaciMayorPropio from "./Modals/CopiaRegisNaciMayorPropio"
import CopiaRegisCivilMatriInteresado from "./Modals/CopiaRegisCiviMatriInteresado"
import CopiaRegisNaciMayorPadre from "./Modals/CopiaRegisNaciMayorPadre"
import CopiaRegisNaciMenorPadre from "./Modals/CopiaRegisNaciMenorPadre"
import LeasingViviendaUsada from "./Modals/LeasingViviendaUsada"
import CopiaRegisNaciMayorInteresado from "./Modals/CopiaRegisNaciMayorInteresado"
import CopiaRegisNaciMenorInteresado from "./Modals/CopiaRegisNaciMenorInteresado"
import LeasingViviendaNueva from "./Modals/LeasingViviendaNueva"

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const useStyles = makeStyles(styles);
const alignItem = { display: 'grid' }
const alignItem2 = { height: '100px', paddingTop: '10%', paddingBottom: '10%' }
export default function SeleccionDocumento() {
    const classes = useStyles();
    const [alert, setAlert] = React.useState(null);

    const basicAlert = () => {
        setAlert(
            <SweetAlert
                style={{ display: "block", marginTop: "-100px" }}
                title="Here's a message!"
                onConfirm={() => hideAlert()}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={classes.button + " " + classes.success}
            />
        );
    };

    return (
        <div>
            
            {alert}
            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                    <Card>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2}>Registro Escrituración Jaramillo Mora</h5>
                               <AuteDocuPrivado/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2}>Cancelación de Hipoteca</h5>
                                <CancelaHipo/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2}>Copia Registro Civil de Defunción</h5>
                                <CopiaRegisCiviDefu/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Certificado de Vigencia</h5>
                                <CertificadoVigencia/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Copia Libro de Varios</h5>
                                <CopiaLibroVarios/>                                
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Copia Registro Civil de Matrimonio (Propio)</h5>
                                <CopiaRegisCivilMatriPropio/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Copia Registro Civil de Matrimonio (Interesado)</h5>
                                <CopiaRegisCivilMatriInteresado/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Copia Registro de Nacimiento (Mayor de Edad/Propio)</h5>
                                <CopiaRegisNaciMayorPropio/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Copia Registro de Nacimiento (Menor de Edad/Padre o Madre)</h5>
                                <CopiaRegisNaciMenorPadre/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Copia Registro de Nacimiento (Mayor de Edad/Padre o Madre)</h5>
                                <CopiaRegisNaciMayorPadre/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Copia Registro de Nacimiento (Menor de Edad/Interesado)</h5>
                                <CopiaRegisNaciMenorInteresado/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Copia Registro de Nacimiento (Mayor de Edad/Interesado)</h5>
                                <CopiaRegisNaciMayorInteresado/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Leasing de vivienda usada</h5>
                                <LeasingViviendaUsada/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card style={{ heigh: '40%' }}>
                        <CardBody>
                            <div style={alignItem} className={classes.center}>
                                <span class="material-icons" style={{ fontSize: 60 }}>
                                    article
                                </span>
                                <h5 style={alignItem2} >Leasing de vivienda nueva</h5>
                                <LeasingViviendaNueva/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
