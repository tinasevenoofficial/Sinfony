/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from 'axios';
import { EXTERNAL_API_PATHS } from 'utils/constants'
import { useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { message } from 'antd';
// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button.js";

export default function RespuestaClienteFE() {

    let { idFacturacion, token, respuesta } = useParams();
    const [mensaje, setMensaje] = useState();
    const [justificacionRechazo, setJustificacionRechazo] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingJustificacion, setLoadingJustificacion] = useState(false);
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    //Mensajes
    const [mensajeAceptado, setMensajeAceptado] = useState
        (
            <div className="card-body">
                ¡Hemos recibido satisfactoriamente su respuesta! <CheckCircleIcon style={{ color: "green" }} />
            </div>
        );
    const [mensajeRechazado, setMensajeRechazado] = useState
        (
            <div className="card-body">
                ¡Hemos recibido satisfactoriamente su respuesta, muy pronto nos contactaremos con usted para conocer el motivo de su decisión! <CheckCircleIcon style={{ color: "green" }} />
            </div>
        );
    const [mensajeRepiteIntento, setMensajeRepiteIntento] = useState
        (
            <div className="card-body">
                ¡Ya hemos recibido una respuesta para esta factura! <WarningIcon style={{ color: "orange" }} />
            </div>
        );
    const [mensajeNoHayFactura, setMensajeNoHayFactura] = useState
        (
            <div className="card-body">
                ¡Lo sentimos, no se ha encontrado el número de factura en nuestra base de datos! <ErrorIcon style={{ color: "red" }} />
            </div>
        );
    const [mensajeTokenInvalido, setMensajeTokenInvalido] = useState
        (
            <div className="card-body">
                ¡Lo sentimos, el token no es valido! <ErrorIcon style={{ color: "red" }} />
            </div>
        );
    const [mensajeNoExiste, setMensajeNoExiste] = useState
        (
            <div className="card-body">
                ¡Hemos detectado un error en la información, por favor contáctenos en nuestras líneas de atención! <ErrorIcon style={{ color: "red" }} />
            </div>
        );

    const consultarFacturacion = async () => {
        setLoading(true);
        setLoadingJustificacion(true);
        let config = {
            method: 'put',
            url: `${EXTERNAL_API_PATHS.factura}${idFacturacion}`,
            data: {
                id: idFacturacion,
                token: token,
                respuesta: respuesta == 1 ? respuesta : justificacionRechazo,
            },
        };
        axios(config)
            .then((response) => {
                if (response.status === 200 && respuesta === '1') {
                    setMensaje(mensajeAceptado);
                } else if (response.status === 200 && respuesta === '0') {
                    setMensaje(mensajeRechazado)
                }
                setLoading(false)
            })
            .catch((e) => {
                if (e.response.data.code === 422 && e.response.data.message === 'no existe este documento.') {
                    setMensaje(mensajeNoHayFactura);
                } else if (e.response.data.code === 422 && e.response.data.message === 'ya existe una respuesta para este documento.') {
                    setMensaje(mensajeRepiteIntento);
                } else if (e.response.data.code === 422 && e.response.data.error.token) {
                    setMensaje(mensajeTokenInvalido)
                } else if (e.response.data.code === 404) {
                    setMensaje(mensajeNoExiste);
                }
                setLoading(false)
            })
    }

    useEffect(() => {
        if (respuesta == 1) {
            consultarFacturacion()
        }
    }, []);


    return (
        <div className={classes.container}>
            <GridContainer alignItems="center" justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <Heading
                            textAlign="center"
                            title={respuesta == 0 ? `Rechazar factura electrónica` : 'Aceptar factura electrónica'}
                        />
                        {respuesta == 1 && <CardBody>
                            <div style={{ alignItems: 'center', fontSize: 17, textAlign: "center", padding: '24px' }} className="card">
                                {loading ? <div><div><i className="fa fa-spinner fa-spin fa-5x"></i></div> <div style={{ paddingTop: '18px' }}>Estamos registrando su respuesta, espere un momento</div></div> : mensaje}
                            </div>
                        </CardBody>}

                        {respuesta == 0 && !loadingJustificacion && <CardBody>
                            <div style={{ alignItems: 'center', fontSize: 17, textAlign: "center", padding: '24px' }} className="card">
                                <p> Justifique  su respuesta </p>
                                <CustomInput
                                    margin="dense"
                                    id="justificacionRechazo"
                                    labelText="Escribe tu justificación aqui"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: (e) => setJustificacionRechazo(e.target.value),
                                        value: justificacionRechazo,
                                    }}
                                />
                                <Button
                                    style={{ float: "right" }}
                                    color="rose"
                                    onClick={() => consultarFacturacion(true)}
                                >
                                    <span> Guardar </span>
                                </Button>
                                {/* {loading ? <div><div><i className="fa fa-spinner fa-spin fa-5x"></i></div> <div style={{ paddingTop: '18px' }}>Estamos registrando tu respuesta, danos un momento</div></div> : mensaje} */}
                            </div>
                        </CardBody>}

                        {respuesta == 0 && loadingJustificacion && <CardBody>
                            <div style={{ alignItems: 'center', fontSize: 17, textAlign: "center", padding: '24px' }} className="card">
                                {loading ? <div><div><i className="fa fa-spinner fa-spin fa-5x"></i></div> <div style={{ paddingTop: '18px' }}>Estamos registrando tu respuesta, danos un momento</div></div> : mensaje}
                            </div>
                        </CardBody>}
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
