import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Attachment from "@material-ui/icons/Attachment";

// core components
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem  from "components/Grid/GridItem.js";
import FormLabel from "@material-ui/core/FormLabel";
import CustomInput from "components/CustomInput/CustomInput.js";
import stylesButton from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody";
import { FormControl } from "@material-ui/core";

import stylesForm from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle"
const useStyles = makeStyles(stylesForm);

// const useStyles = makeStyles(theme => ({
//     root: { color: 'black', fontSize: '18px' },
// }));

const useStylesButton = makeStyles(stylesButton)

export default function OpenModal({data}) {
    
    const classes = useStyles();

    const [Data, setData] = useState(data);
    const [open, setOpen] = useState(false);

    const HandleOpen = () => {
        setOpen(true);
    }


    // const WriteContent = (data) => {

    //     if (open){
    //         document.getElementById("numDepo").innerHTML = 
    //         document.getElementById("notaria").innerHTML = data.notaria
    //     }
    // }

    const HandleClose = () => {
        setOpen(false);
    }

    // useEffect(() => {
    //     alert('efect')
        
    // }, [open])

    return (
        <>
            <Button  
                onClick={HandleOpen} 
                justIcon
                color="rose"
                className="lassesButton.marginRight">
                <span class="material-icons">
                    list
                </span>
            </Button>
            <Dialog open={open} onClose={HandleClose} aria-labelledby="form-dialog-title" maxWidth={'sm'} fullWidth={true}>
            <DialogContent>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <span class="material-icons">
                            format_list_numbered
                        </span>
                    </CardIcon>
                    <h4 className="cardIconTitle">DETALLE DEPÓSITO</h4>
                </CardHeader>
            </DialogContent>
            <DialogContent>
                <CardBody>
                    <form>
                        <GridContainer justify="center">
                            <GridItem  sm={4} md={4}>
                                <FormLabel style={{marginTop:'35px'}}>
                                    <p><b>Número Depósito</b></p>
                                </FormLabel>
                            </GridItem >
                            <GridItem  sm={3} md={3}>
                                <CustomInput
                                    // style={{padding:'200px'}}
                                    id='NumDepo'
                                    formControlProps={{
                                    }}
                                    inputProps={{
                                        type: 'text',
                                        value: Data.numero_deposito,
                                        disabled: true
                                    }}
                                />
                            </GridItem >
                        </GridContainer>
                    </form>
                    <form>
                        <GridContainer justify="center" >
                            <GridItem  sm={4} md={4}>
                                <FormLabel style={{marginTop:'35px'}}>
                                    <p><b>Gastos Notariales</b></p>
                                </FormLabel>
                            </GridItem >
                            <GridItem  sm={3} md={3}>
                                <CustomInput
                                    // style={{padding:'200px'}}
                                    id='gasNot'
                                    formControlProps={{
                                    }}
                                    inputProps={{
                                    type: 'text',
                                    value: Data.notaria,
                                    }}
                                />
                            </GridItem >
                        </GridContainer>
                    </form>
                    <form>
                        <GridContainer justify="center" >
                            <GridItem  sm={4} md={4}>
                                <FormLabel style={{marginTop:'35px'}}>
                                    <p><b>Boleta</b></p>
                                </FormLabel>
                            </GridItem >
                            <GridItem  sm={3} md={3}>
                                <CustomInput
                                    // style={{padding:'200px'}}
                                    id='bole'
                                    formControlProps={{
                                    }}
                                    inputProps={{
                                    type: 'text',
                                    value: Data.boleta,
                                    }}
                                />
                            </GridItem >
                        </GridContainer>
                    </form>
                    <form>
                        <GridContainer justify="center" >
                            <GridItem  sm={4} md={4}>
                                <FormLabel style={{marginTop:'35px'}}>
                                    <p><b>Registro</b></p>
                                </FormLabel>
                            </GridItem >
                            <GridItem  sm={3} md={3}>
                                <CustomInput
                                    // style={{padding:'200px'}}
                                    id='regis'
                                    formControlProps={{
                                    }}
                                    inputProps={{
                                    type: 'text',
                                    value: Data.registro,
                                    }}
                                />
                            </GridItem >
                        </GridContainer>
                    </form>   
                    <form>
                        <GridContainer justify="center" >
                            <GridItem  sm={4} md={4}>
                                <FormLabel style={{marginTop:'35px'}}>
                                    <p><b>Método de Pago</b></p>
                                </FormLabel>
                            </GridItem >
                            <GridItem  sm={3} md={3}>
                                <CustomInput
                                    // style={{padding:'200px'}}
                                    id='MethodPag'
                                    formControlProps={{
                                    }}
                                    inputProps={{
                                    type: 'text',
                                    value: Data.method_data?.name,
                                    }}
                                />
                            </GridItem >
                        </GridContainer>
                    </form>  
                    <form>
                        <GridContainer justify="center" >
                            <GridItem   sm={4} md={4}>
                                <FormLabel style={{marginTop:'35px'}}>
                                    <p><b>Observaciones</b></p>
                                </FormLabel>
                            </GridItem >
                            <GridItem  sm={3} md={3}>
                                <CustomInput
                                    // style={{padding:'200px'}}
                                    id='Obser'
                                    formControlProps={{
                                    }}
                                    inputProps={{
                                    type: 'text',
                                    value: Data.observaciones,
                                    }}
                                    fullWidth={true}
                                />
                            </GridItem >
                        </GridContainer>
                    </form>            
                </CardBody>
                <Button color="rose" size="sm" onClick={HandleClose} style={{ float: 'right' }}>
                    Cerrar
                </Button>
            </DialogContent>
            </Dialog>
        </>
    );
}



