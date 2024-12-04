import React, { useRef, useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles, styled } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Depositos from "views/Depositos/Depositos";

import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
import stylesForms from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import stylesTables from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import stylesButton from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.js";
import { useLocation } from "react-router-dom";

const useStylesForm = makeStyles(stylesForms);
const useStylesTables = makeStyles(stylesTables);
const useStylesButton = makeStyles(stylesButton)


export default function SelectDeposito() {

    const classes = useStyles();

    const location = useLocation();
    const numero_deposito = location.state?.numero_deposito;
    let editDepo;
    let text = 'Crear '
    if (numero_deposito !== undefined) {
        editDepo = true;
        text = 'Editar'
    }

    const [tipoDepo, setTipoDepo] = useState('');
    const selecTipoDepo = () => {

        setTipoDepo('Deposito');
    }

    const selecTipoAnti = () => {

        setTipoDepo('Anticipo');
    }

    return (

        <Card>
            <CardHeader color="primary" text>
                <CardText className={classes.cardText} color="primary">
                    <h4 className={classes.colorWhite}> {text + tipoDepo} </h4>
                </CardText>
            </CardHeader>
            <CardBody>
                {!editDepo && (<GridContainer justify='center' style={{ marginTop: '5px' }}>
                    <GridItem xs={6}>
                        <GridContainer justify="flex-end">
                            <Button
                                color='rose'
                                className={classes.marginRight}
                                onClick={selecTipoDepo}
                            >
                                <span>
                                    DEPOSITO
                                </span>
                            </Button>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={6}>
                        <GridContainer>
                            <Button
                                color='rose'
                                className={classes.marginRight}
                                onClick={selecTipoAnti}
                            >
                                <span>
                                    ANTICIPO
                                </span>
                            </Button>
                        </GridContainer>
                    </GridItem>
                </GridContainer>)}
                <Depositos tipoDeposito={tipoDepo} num_deposito={numero_deposito} />
            </CardBody>
        </Card>
    )

}