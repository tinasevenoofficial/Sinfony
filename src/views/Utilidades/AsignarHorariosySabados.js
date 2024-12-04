/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { message } from 'antd';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Table, Form, Spin, Alert } from "antd";

// @material-ui/icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import FormLabel from "@material-ui/core/FormLabel";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import CardText from "components/Card/CardText.js";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";

import { EXTERNAL_API_PATHS } from 'utils/constants'
import LinearProgress from '@material-ui/core/LinearProgress';

const title = "Listado de Proyectos";
const name = "Listado de Proyectos";
const key = "proyecto";

import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";

const { Option } = Select;

export default function AsignarHorariosySabados() {
    const auth = useSelector((state) => state.auth);
    const classes = useStyles();
    //dias habilitados
    const [checkedLunes, setCheckedLunes] = React.useState(false);
    const [checkedMartes, setCheckedMartes] = React.useState(false);
    const [checkedMiercoles, setCheckedMiercoles] = React.useState(false);
    const [checkedJueves, setCheckedJueves] = React.useState(false);
    const [checkedViernes, setCheckedViernes] = React.useState(false);
    const [checkedSabado, setCheckedSabado] = React.useState(false);
    const [checkedDomingo, setCheckedDomingo] = React.useState(false);
    //horas de salida y entrada
    const [horaEntradaLunes, setHoraEntradaLunes] = React.useState("");
    const [horaSalidaLunes, setHoraSalidaLunes] = React.useState("");
    const [horaEntradaMartes, setHoraEntradaMartes] = React.useState("");
    const [horaSalidaMartes, setHoraSalidaMartes] = React.useState("");
    const [horaEntradaMiercoles, setHoraEntradaMiercoles] = React.useState("");
    const [horaSalidaMiercoles, setHoraSalidaMiercoles] = React.useState("");
    const [horaEntradaJueves, setHoraEntradaJueves] = React.useState("");
    const [horaSalidaJueves, setHoraSalidaJueves] = React.useState("");
    const [horaEntradaViernes, setHoraEntradaViernes] = React.useState("");
    const [horaSalidaViernes, setHoraSalidaViernes] = React.useState("");
    const [horaEntradaSabado, setHoraEntradaSabado] = React.useState("");
    const [horaSalidaSabado, setHoraSalidaSabado] = React.useState("");
    const [horaEntradaDomingo, setHoraEntradaDomingo] = React.useState("");
    const [horaSalidaDomingo, setHoraSalidaDomingo] = React.useState("");
    //variables Extras
    const [contadorSabados, setContadorSabados] = React.useState(1);
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octobre", "Noviembre", "Deciembre"
    ];
    const defaultStateSabados = {
        dia: "",
    };
    const [rowsSabados, setRowsSabados] = useState([defaultStateSabados]);

    //petición sobre recibir los horarios de la notaria

    const getHorarios = () => {0
        let config = {
            method: 'get',
            url: process.env.REACT_APP_URL_API + "/api/Companies/11",
            headers: { Authorization: `Bearer ${auth.token}` },
        };
        axios(config)
            .then((response) => {
                message.success({ content: '¡Se ha cargado exitosamante los horarios!', key: key, duration: 3 });
                let horarios = response.data.horarios
                let sabadosDias = response.data.sabados
                setCheckedLunes(horarios.lunes.aplicaDia)
                setCheckedMartes(horarios.martes.aplicaDia)
                setCheckedMiercoles(horarios.miercoles.aplicaDia)
                setCheckedJueves(horarios.jueves.aplicaDia)
                setCheckedViernes(horarios.viernes.aplicaDia)
                setCheckedSabado(horarios.sabado.aplicaDia)
                setCheckedDomingo(horarios.domingo.aplicaDia)
                setHoraEntradaLunes(horarios.lunes.horaEntrada)
                setHoraSalidaLunes(horarios.lunes.horaSalida)
                setHoraEntradaMartes(horarios.martes.horaEntrada)
                setHoraSalidaMartes(horarios.martes.horaSalida)
                setHoraEntradaMiercoles(horarios.miercoles.horaEntrada)
                setHoraSalidaMiercoles(horarios.miercoles.horaSalida)
                setHoraEntradaJueves(horarios.jueves.horaEntrada)
                setHoraSalidaJueves(horarios.jueves.horaSalida)
                setHoraEntradaViernes(horarios.viernes.horaEntrada)
                setHoraSalidaViernes(horarios.viernes.horaSalida)
                setHoraEntradaSabado(horarios.sabado.horaEntrada)
                setHoraSalidaSabado(horarios.sabado.horaSalida)
                setHoraEntradaDomingo(horarios.domingo.horaEntrada)
                setHoraSalidaDomingo(horarios.domingo.horaSalida)
                console.log(response)
                setRowsSabados(sabadosDias)
                setContadorSabados(sabadosDias.length)
            })
            .catch((e) => {
                message.error({ content: 'No se pudo cargar los horarios, intentelo de nuevo', key: key, duration: 3 })
            })
    }


    useEffect(() => {
        getHorarios()
    }, [])

    //agregar petición para guardar los horarios
    const guardarHorarios = () => {
        let horarios = {
            horario: {
                horarios: {
                    lunes: {
                        horaEntrada: horaEntradaLunes,
                        horaSalida: horaSalidaLunes,
                        aplicaDia: checkedLunes
                    },
                    martes: {
                        horaEntrada: horaEntradaMartes,
                        horaSalida: horaSalidaMartes,
                        aplicaDia: checkedMartes
                    },
                    miercoles: {
                        horaEntrada: horaEntradaMiercoles,
                        horaSalida: horaSalidaMiercoles,
                        aplicaDia: checkedMiercoles
                    },
                    jueves: {
                        horaEntrada: horaEntradaJueves,
                        horaSalida: horaSalidaJueves,
                        aplicaDia: checkedJueves
                    },
                    viernes: {
                        horaEntrada: horaEntradaViernes,
                        horaSalida: horaSalidaViernes,
                        aplicaDia: checkedViernes
                    },
                    sabado: {
                        horaEntrada: horaEntradaSabado,
                        horaSalida: horaSalidaSabado,
                        aplicaDia: checkedSabado
                    },
                    domingo: {
                        horaEntrada: horaEntradaDomingo,
                        horaSalida: horaSalidaDomingo,
                        aplicaDia: checkedDomingo
                    }
                },
                sabados: rowsSabados
            }
        }

        console.log(horarios)

        //Petición

        let config = {
            method: 'put',
            url: process.env.REACT_APP_URL_API + "/api/Companies/11",
            headers: { Authorization: `Bearer ${auth.token}` },
            data: horarios,
        };
        axios(config)
            .then((response) => {
                message.success({ content: '¡Se ha guardado exitosamente el horario!', key: key, duration: 3 });

            })
            .catch((e) => {
                message.error({ content: 'No se ha podido guardar el horario', key: key, duration: 3 })
            })
    };



    const handleOnChangeSabados = (index, name, value) => {
        let sabado = value.getDate() + " de " + monthNames[value.getMonth()]
        console.log(index + "pos sabado")
        console.log(name + "name sabado")
        const copyRows = [...rowsSabados];
        copyRows[index] = {
            ...copyRows[index],
            [name]: sabado
        };
        setRowsSabados(copyRows);
    };

    const handleOnAddSabados = () => {
        console.log(contadorSabados);
        if (contadorSabados < 3) {
            setContadorSabados(contadorSabados + 1)
            setRowsSabados(rowsSabados.concat(defaultStateSabados));
        };
    }


    const handleOnRemoveSabados = index => {
        if (contadorSabados > 1) {
            setContadorSabados(contadorSabados - 1)
            const copyRows = [...rowsSabados];
            copyRows.splice(index, 1);
            setRowsSabados(copyRows);
        }
    };

    function RowSabados({ onChange, onRemove, dia }) {
        return (
            <div style={{ textAlign: 'center', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ width: '38%', marginRight: '10%' }}>
                    <Datetime
                        timeFormat={false}
                        value={dia}
                        inputProps={{
                            placeholder: "Elige el sabado",
                        }}
                        onChange={(e) => onChange("dia", e.toDate())}
                    />
                </div>
                <div>
                    <Button
                        className={classes.actionButton}
                        color="rose"
                        onClick={onRemove}
                        size="sm"
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary" text>
                            <CardText className={classes.cardText} color="primary">
                                <h4 className={classes.colorWhite}>Asignar horarios y sabados</h4>
                            </CardText>
                        </CardHeader>
                        <CardBody>
                            <form id="form">
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                                            <FormLabel className={classes.label}>
                                                <span className={classes.colorRose}>Recuerde que los  campos influyen en los que se muestran en la pagina de la notaria</span>
                                            </FormLabel>
                                        </div>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <FormLabel className={classes.label}>
                                                        Horarios
                                                    </FormLabel>
                                                </div>
                                            </GridItem>
                                            <div style={{ marginTop: '55px' }}></div>
                                            {/* Lunes */}
                                            <GridItem xs={12} sm={12} md={3}>
                                                <SnackbarContent
                                                    message={"Lunes"}
                                                    color="rose"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={1}>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    dateFormat={false}
                                                    value={horaEntradaLunes}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraEntradaLunes(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    inputProps={{ placeholder: "Hora de entrada" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaSalidaLunes}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraSalidaLunes(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de salida" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <div >
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={checkedLunes}
                                                                onChange={(event) =>
                                                                    setCheckedLunes(event.target.checked)
                                                                }
                                                                value="checkedLunes"
                                                                classes={{
                                                                    switchBase: classes.switchBase,
                                                                    checked: classes.switchChecked,
                                                                    thumb: classes.switchIcon,
                                                                    track: classes.switchBar,
                                                                }}
                                                            />
                                                        }
                                                        classes={{
                                                            label: classes.label,
                                                        }}
                                                        label="Aplica"
                                                    />
                                                </div>
                                            </GridItem>
                                            {/* Martes */}
                                            <GridItem xs={12} sm={12} md={3}>
                                                <SnackbarContent
                                                    message={"Martes"}
                                                    color="rose"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={1}>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaEntradaMartes}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraEntradaMartes(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de entrada" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaSalidaMartes}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraSalidaMartes(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de salida" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <div >
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={checkedMartes}
                                                                onChange={(event) =>
                                                                    setCheckedMartes(event.target.checked)
                                                                }
                                                                value="checkedMartes"
                                                                classes={{
                                                                    switchBase: classes.switchBase,
                                                                    checked: classes.switchChecked,
                                                                    thumb: classes.switchIcon,
                                                                    track: classes.switchBar,
                                                                }}
                                                            />
                                                        }
                                                        classes={{
                                                            label: classes.label,
                                                        }}
                                                        label="Aplica"
                                                    />
                                                </div>
                                            </GridItem>
                                            {/* Miercoles */}
                                            <GridItem xs={12} sm={12} md={3}>
                                                <SnackbarContent
                                                    message={"Miércoles"}
                                                    color="rose"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={1}>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaEntradaMiercoles}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraEntradaMiercoles(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de entrada" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaSalidaMiercoles}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraSalidaMiercoles(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de salida" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <div >
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={checkedMiercoles}
                                                                onChange={(event) =>
                                                                    setCheckedMiercoles(event.target.checked)
                                                                }
                                                                value="checkedB"
                                                                classes={{
                                                                    switchBase: classes.switchBase,
                                                                    checked: classes.switchChecked,
                                                                    thumb: classes.switchIcon,
                                                                    track: classes.switchBar,
                                                                }}
                                                            />
                                                        }
                                                        classes={{
                                                            label: classes.label,
                                                        }}
                                                        label="Aplica"
                                                    />
                                                </div>
                                            </GridItem>
                                            {/* Jueves */}
                                            <GridItem xs={12} sm={12} md={3}>
                                                <SnackbarContent
                                                    message={"Jueves"}
                                                    color="rose"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={1}>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaEntradaJueves}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraEntradaJueves(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de entrada" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaSalidaJueves}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraSalidaJueves(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de salida" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <div >
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={checkedJueves}
                                                                onChange={(event) =>
                                                                    setCheckedJueves(event.target.checked)
                                                                }
                                                                value="checkedB"
                                                                classes={{
                                                                    switchBase: classes.switchBase,
                                                                    checked: classes.switchChecked,
                                                                    thumb: classes.switchIcon,
                                                                    track: classes.switchBar,
                                                                }}
                                                            />
                                                        }
                                                        classes={{
                                                            label: classes.label,
                                                        }}
                                                        label="Aplica"
                                                    />
                                                </div>
                                            </GridItem>
                                            {/* Viernes */}
                                            <GridItem xs={12} sm={12} md={3}>
                                                <SnackbarContent
                                                    message={"Viernes"}
                                                    color="rose"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={1}>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaEntradaViernes}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraEntradaViernes(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de entrada" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaSalidaViernes}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraSalidaViernes(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de salida" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <div >
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={checkedViernes}
                                                                onChange={(event) =>
                                                                    setCheckedViernes(event.target.checked)
                                                                }
                                                                value="checkedB"
                                                                classes={{
                                                                    switchBase: classes.switchBase,
                                                                    checked: classes.switchChecked,
                                                                    thumb: classes.switchIcon,
                                                                    track: classes.switchBar,
                                                                }}
                                                            />
                                                        }
                                                        classes={{
                                                            label: classes.label,
                                                        }}
                                                        label="Aplica"
                                                    />
                                                </div>
                                            </GridItem>
                                            {/* Sabado */}
                                            <GridItem xs={12} sm={12} md={3}>
                                                <SnackbarContent
                                                    message={"Sabado"}
                                                    color="rose"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={1}>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaEntradaSabado}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraEntradaSabado(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de entrada" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaSalidaSabado}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraSalidaSabado(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de salida" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <div >
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={checkedSabado}
                                                                onChange={(event) =>
                                                                    setCheckedSabado(event.target.checked)
                                                                }
                                                                value="checkedB"
                                                                classes={{
                                                                    switchBase: classes.switchBase,
                                                                    checked: classes.switchChecked,
                                                                    thumb: classes.switchIcon,
                                                                    track: classes.switchBar,
                                                                }}
                                                            />
                                                        }
                                                        classes={{
                                                            label: classes.label,
                                                        }}
                                                        label="Aplica"
                                                    />
                                                </div>
                                            </GridItem>
                                            {/* Domingo */}
                                            <GridItem xs={12} sm={12} md={3}>
                                                <SnackbarContent
                                                    message={"Domingo"}
                                                    color="rose"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={1}>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaEntradaDomingo}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraEntradaDomingo(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de entrada" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <Datetime
                                                    value={horaSalidaDomingo}
                                                    timeFormat="HH:mm"
                                                    onChange={(date) =>
                                                        setHoraSalidaDomingo(date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                    }
                                                    dateFormat={false}
                                                    inputProps={{ placeholder: "Hora de salida" }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <div >
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={checkedDomingo}
                                                                onChange={(event) =>
                                                                    setCheckedDomingo(event.target.checked)
                                                                }
                                                                value="checkedB"
                                                                classes={{
                                                                    switchBase: classes.switchBase,
                                                                    checked: classes.switchChecked,
                                                                    thumb: classes.switchIcon,
                                                                    track: classes.switchBar,
                                                                }}
                                                            />
                                                        }
                                                        classes={{
                                                            label: classes.label,
                                                        }}
                                                        label="Aplica"
                                                    />
                                                </div>
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div style={{ textAlign: 'center' }}>
                                            <FormLabel className={classes.label}>
                                                Sabados por laborar
                                            </FormLabel>
                                        </div>
                                        <div style={{ marginTop: '27px' }}></div>
                                        {rowsSabados.map((rowSabado, index) => (
                                            <RowSabados
                                                {...rowSabado}
                                                onChange={(name, value) => handleOnChangeSabados(index, name, value)}
                                                onRemove={() => handleOnRemoveSabados(index)}
                                                key={index}
                                            />
                                        ))}
                                        <div style={{ marginTop: '10px' }}></div>
                                        <Button
                                            className={classes.center}
                                            color="rose"
                                            onClick={handleOnAddSabados}
                                            size="sm"
                                        >
                                            <AddIcon />
                                        </Button>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <div style={{ marginTop: '15px', width: '100%' }}>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <Button
                                                className={classes.center}
                                                color="primary"
                                                onClick={guardarHorarios}
                                                size="sm"
                                            >
                                                Guardar Horarios
                                            </Button>
                                        </GridItem>
                                    </div>
                                </GridContainer>
                            </form>
                        </CardBody>
                    </Card>
                </GridItem>
                <br></br>
            </GridContainer>
        </>
    );
}
