/*eslint-disable*/
import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EXTERNAL_API_PATHS } from 'utils/constants'

// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import SubjectIcon from '@material-ui/icons/Subject';
import CardText from "components/Card/CardText.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import GenerarQr from "./GenerarQR";

//icon
import EditIcon from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';

import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";

import { primaryColor, infoColor } from "assets/jss/material-dashboard-pro-react.js";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const themeInputInfo = createTheme({
    palette: {
        primary: {
            main: infoColor[0],
            light: infoColor[0],
            dark: infoColor[0],
        },
        secondary: {
            main: primaryColor[0],
            light: primaryColor[0],
            dark: primaryColor[0],
        }
    },
});

//para message
const key = 'updatable';

export default function CrearRadicacionExpress() {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);

    const [numRadicacion, setNumRadicacion] = useState('');
    const [disabledNumRadi, setDisabledNumRadi] = useState(true);
    const [disabledInput, setDisabledInput] = useState(true);
    const [matricula, setMatricula] = useState('');
    const [numEscritura, setNumEscritura] = useState('');
    const [acto, setActo] = useState('');
    const [actoInformacion, setActoInformacion] = useState([{ nombre_acto: 'Cargando...' }])
    const [fechaEscritura, setFechaEscritura] = useState('');
    const [primerOtorgante, setPrimerOtorgante] = useState('');
    const [proyectoID, setProyectoID] = useState('');
    const [nombreProyecto, setNombreProyecto] = useState('')
    const [proyectoInformacion, setProyectoInformacion] = useState({ codigo: 0, proyecto: "Cargando...", token: "prueba", usuario_plataforma: null });
    const [segundoOtorgante, setSegundoOtorgante] = useState('');
    const [direccion, setDireccion] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [tokenRadi, setTokenRadi] = useState('');


    const [actos, setActos] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [editActo, setEditActo] = useState(false);
    const [editProyecto, setEditProyecto] = useState(false);
    const [editarOCrear, setEditarCrear] = useState(false);

    const [crearAEditar, setCrearAEditar] = useState(false);
    const [activeShrink, setActiveShrink] = useState({});

    const [open1, setOpen1] = React.useState(false);
    const [loading1, setLoading1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [loading2, setLoading2] = React.useState(false);
    const [showQr, setShowQr] = useState(false);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    //Obtener Actos y Proyecto al cargar vista

    //Laoding Actos
    useEffect(() => {
        let active = true;
        
        if (!loading1) {
            return undefined;
        }

        (async () => {
            const response = await axios.get(EXTERNAL_API_PATHS.actos)
            const subActos = await response.data
            if (active) {
                setActos([...subActos])
                let aux = []
                setActoInformacion([]);               
                if (!editarOCrear && acto.length > 0) {
                    console.log(actos)
                    let auxActo = acto.split('-')
                    auxActo.map((acto) => {
                        subActos.map((item) => {                            
                            if (item.nombre_acto === acto.trim()) {                               
                                aux.push(item)
                            }
                        })
                    })
                    setActoInformacion([...aux])                   
                } else {
                    setActoInformacion([])
                }
                setLoading1(false)
            }
        })();

        return () => {
            active = false;
        };
    }, [loading1]);

    //Loading Proyectos
    useEffect(() => {
        let active = true;

        if (!loading2) {
            return undefined;
        }

        (async () => {
            const response = await axios.get(EXTERNAL_API_PATHS.allprojects)
            const subProyectos = await response.data            
            if (active) {
                setProyectos([{ codigo: 9999, proyecto: "Sin proyecto", token: "null", usuario_plataforma: null }, ...subProyectos])
                subProyectos.map((item) => {
                    console.log("proyectoID" + proyectoID)
                    if (proyectoID) {
                        item.token === proyectoID ? setProyectoInformacion(item) : { codigo: 0, proyecto: "Cargando...", token: "prueba", usuario_plataforma: null }
                    } else {
                        setProyectoInformacion({ codigo: 9999, proyecto: "Sin proyecto", token: "null", usuario_plataforma: null })
                    }

                })                
            }
            setLoading2(false)
        })();

        return () => {
            active = false;
        };
    }, [loading2]);

    const activarEdicionProyecto = () => {
        setEditProyecto(true)
        setLoading2(true)
    }

    const activarEdicionActo = () => {
        setEditActo(true)
        setLoading1(true)
    }

    const onProyectoChange = (event, values) => {
        setProyectoInformacion(values)
    }

    const onActoschange = (event, values) => {
        setActoInformacion(values)
        console.log(values)
    }

    const realizarBusqueda = (e) => {
        message.loading({ content: 'Cargando...', key: key, duration: 20 });
        e.preventDefault();
        let numRadi = document.getElementById("Radicacion").value
        
        axios.get(EXTERNAL_API_PATHS.radicaciones2+"/"+numRadi)
            .then((response) => {
                let datos = response.data
                setEditarCrear(false);
                setEditActo(false)
                setEditProyecto(false)
                setActoInformacion([{ nombre_acto: 'Cargando...' }])
                setProyectoInformacion({ codigo: 0, proyecto: "Cargando...", token: "prueba", usuario_plataforma: null })
                setActo(datos.actos ? datos.actos : [])
                setDireccion(datos.direccion ? datos.direccion : '')
                setFechaEscritura(datos.fecha_escritura ? datos.fecha_escritura : '')
                setMatricula(datos.matricula ? datos.matricula : '')
                setNumEscritura(datos.num_escritura ? datos.num_escritura : '')
                setNumRadicacion(datos.num_radicacion)
                setPrimerOtorgante(datos.otorgante1 ? datos.otorgante1 : '')
                setSegundoOtorgante(datos.otorgante2 ? datos.otorgante2 : '')
                setProyectoID(datos.proyecto_id ? datos.proyecto_id : '')
                setNombreProyecto(datos.proyecto ? datos.proyecto : '')
                setIdUsuario(datos.usuario_plataforma ? datos.usuario_plataforma : '')
                setActiveShrink({ shrink: true })
                setDisabledNumRadi(true)
                setDisabledInput(false)
                setTokenRadi(datos.token)
                console.log(response)
                message.success({ content: `La radicación ${numRadi} ha cargado con exito`, key: key });
            })
            .catch(() => {
                setEditarCrear(true);
                setCrearAEditar(true)
                setActoInformacion([{ nombre_acto: 'Cargando...' }])
                setProyectoInformacion({ codigo: 0, proyecto: "Cargando...", token: "crear", usuario_plataforma: null })
                setEditActo(false)
                setEditProyecto(false)
                setActo([])
                setDireccion('')
                setFechaEscritura('')
                setMatricula('')
                setNumEscritura('')
                setNumRadicacion(numRadi)
                setPrimerOtorgante('')
                setSegundoOtorgante('')
                setProyectoID('')
                setNombreProyecto('')
                setIdUsuario('')
                setActiveShrink({})
                setDisabledNumRadi(true)
                setDisabledInput(false)
                setTokenRadi('')
                message.info({ content: `No se ha encontrado radicación con el número ${numRadi} puede proceder a crearla`, key: key, duration: 10 });
            })
    }

    const guardarModificar = () => {
        let key2 = 'update2'      
        if (actoInformacion.length >= 0) {          
            if (numRadicacion && proyectoInformacion && proyectoInformacion.proyecto != '') {
                console.log("pasa x2")
                if ((acto && (nombreProyecto || proyectoInformacion.proyecto === 'Sin proyecto' || (proyectoInformacion.proyecto != 'prueba' && !editarOCrear)))) {
                    //Configurar Actos para enviar
                    let primeraVez = false;
                    let proyectoCodigo;
                    let actoAux;
                    if (proyectoInformacion.proyecto === 'Cargando...' || proyectoInformacion.proyecto === 'Sin proyecto') {
                        proyectoCodigo = null;
                    } else {
                        proyectoCodigo = proyectoInformacion.codigo.toString();
                    }
                    if (actoInformacion.length > 0) {
                        if (actoInformacion[0].nombre_acto === 'Cargando...') {
                            actoAux = null;
                        } else {
                            actoInformacion.map((item) => {
                                if (!primeraVez) {
                                    primeraVez = true;
                                    actoAux = item.nombre_acto
                                } else {
                                    actoAux = actoAux + ' - ' + item.nombre_acto
                                }
                            })

                        }
                    } else {
                        actoAux = null;
                    }
                    
                    message.loading({ content: "Guardando...", key: key2, duration: 20 });
                    if (!editarOCrear) {
                        const formDataPut = {
                            num_escritura: numEscritura,
                            fecha_escritura: fechaEscritura,
                            token: encripta(numRadicacion),
                            proyecto_id: editProyecto ? proyectoCodigo : proyectoID.toString(),
                            direccion: direccion,
                            matricula: matricula,
                            actos: editActo ? actoAux : acto,
                            otorgante1: primerOtorgante,
                            otorgante2: segundoOtorgante,
                            usuario: idUsuario
                        };
                        setTokenRadi(encripta(numRadicacion))                        
                        axios
                            .put(EXTERNAL_API_PATHS.radicaciones2 +"/"+ numRadicacion, formDataPut)
                            .then((res) => {
                                console.log(res)
                                setShowQr(true)
                                message.success({ content: `Se ha actualizado con exito la radicación número ${numRadicacion}`, key: key2, duration: 5 });
                            })
                            .catch(() => {
                                message.error({ content: `No se pudo actualizar la radicación número ${numRadicacion}`, key: key2, duration: 5 });
                            });
                    }
                } else {                    
                    let proyectoCodigo;
                    let actoAux;
                    let primeraVez = false;                   
                    if (proyectoInformacion.proyecto === 'Cargando...' || proyectoInformacion.proyecto === 'Sin proyecto') {
                        proyectoCodigo = null;
                    } else {
                        proyectoCodigo = proyectoInformacion.codigo.toString();
                    }
                    if (actoInformacion.length > 0) {
                        if (actoInformacion[0].nombre_acto === 'Cargando...') {
                            actoAux = null;
                        } else {
                            actoInformacion.map((item) => {
                                if (!primeraVez) {
                                    primeraVez = true;
                                    actoAux = item.nombre_acto
                                } else {
                                    actoAux = actoAux + ' - ' + item.nombre_acto
                                }
                            })

                        }
                    } else {
                        actoAux = null;
                    }
                    
                    let headers = { Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin': true }
                    message.loading({ content: "Guardando...", key: key2, duration: 20 });
                    if (editarOCrear) {
                        const formDataPost = {
                            num_radicacion: numRadicacion,
                            num_escritura: numEscritura,
                            fecha_escritura: fechaEscritura,
                            token: encripta(numRadicacion),
                            codigoProyecto: proyectoCodigo,
                            direccion: direccion,
                            matricula: matricula,
                            actos: actoAux,
                            otorgante1: primerOtorgante,
                            otorgante2: segundoOtorgante,
                            usuario: idUsuario
                        };
                        setTokenRadi(encripta(numRadicacion))                        
                        axios
                            .post(EXTERNAL_API_PATHS.radi2Create, formDataPost)
                            .then((res) => {                               
                                setShowQr(true)
                                message.success({ content: `Se ha creado con exito la radicación número ${numRadicacion}`, key: key2 });
                            })
                            .catch(() => {
                                message.error({ content: `No se pudo crear la radicación número${numRadicacion}`, key: key2 });
                            });
                    }
                }

            } else {
                message.info("Es necesario llenar todos los campos");
            }

        } else {
            message.info("Es necesario llenar todos los campos");
        }


    }

    const salir = () => {
        setShowQr(false)
    }

    const encripta = (value) => {
        let clav = value.toString()
        let nclav = ''
        let nclavi = ''
        for (var i = 0; i < clav.length; i++) {
            let clavi = clav.substring(i, i + 1)
            switch (clavi) {
                case '1':
                    nclavi = "7"
                    break;
                case '2':
                    nclavi = "3"
                    break;
                case '3':
                    nclavi = "2"
                    break;
                case '4':
                    nclavi = "9"
                    break;
                case '5':
                    nclavi = "0"
                    break;
                case '6':
                    nclavi = "8"
                    break;
                case '7':
                    nclavi = "1"
                    break;
                case '8':
                    nclavi = "6"
                    break;
                case '9':
                    nclavi = "4"
                    break;
                case '0':
                    nclavi = "5"
                    break;
                default:
                    break;
            }
            nclav = nclav + nclavi
        }
        return nclav
    }

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary" text>
                            <CardText className={classes.cardText} color="primary">
                                <h4 className={classes.colorWhite}>  Radicación Express </h4>
                            </CardText>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={7}>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <div style={{ float: "right" }}>
                                        <form >
                                            <CustomInput
                                                id="Radicacion"
                                                labelText="RADICACIÓN"
                                                inputProps={{
                                                    type: "text"
                                                }}                                            
                                            />
                                            <Button
                                                justIcon
                                                color="rose"
                                                onClick={realizarBusqueda}
                                            >
                                                <Search />
                                            </Button>
                                        </form>
                                    </div>
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center" >
                                <GridItem xs={12} sm={12} md={10}>
                                    <Card style={{ backgroundColor: '#FAFAFA' }}>
                                        <CardBody>
                                            <GridContainer>
                                                <GridItem xs={6}>
                                                    <CustomInput
                                                        id="NroRadicación"
                                                        labelText="Nro. Radicación"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            required: true,
                                                        }}
                                                        inputProps={{
                                                            type: "text",
                                                            onChange: (e) => setNumRadicacion(e.target.value),
                                                            value: numRadicacion,
                                                            maxLength: 8,
                                                            disabled: disabledNumRadi,
                                                        }}
                                                        labelProps={{ ...activeShrink }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={6}>
                                                    <CustomInput
                                                        id="Matricula"
                                                        labelText="Matrícula"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            required: true,
                                                        }}
                                                        inputProps={{
                                                            type: "text",
                                                            onChange: (e) => setMatricula(e.target.value),
                                                            value: matricula,
                                                            maxLength: 100,
                                                            disabled: disabledInput,
                                                        }}
                                                        labelProps={{ ...activeShrink }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={6}>
                                                    <CustomInput
                                                        id="NroEscritura"
                                                        labelText="Nro. Escritura"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            required: true,
                                                        }}
                                                        inputProps={{
                                                            type: "text",
                                                            onChange: (e) => setNumEscritura(e.target.value),
                                                            maxLength: 8,
                                                            value: numEscritura,
                                                            disabled: disabledInput,
                                                        }}
                                                        labelProps={{ ...activeShrink }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={6}>
                                                    <CustomInput
                                                        id="primerOtorgante"
                                                        labelText="Primer otorgante"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            required: true,
                                                        }}
                                                        inputProps={{
                                                            type: "text",
                                                            onChange: (e) => setPrimerOtorgante(e.target.value),
                                                            value: primerOtorgante,
                                                            disabled: disabledInput,
                                                        }}
                                                        labelProps={
                                                            { ...activeShrink }
                                                        }
                                                    />
                                                </GridItem>
                                                <GridItem xs={6}>
                                                    <CustomInput
                                                        id="FechaEscritura"
                                                        labelText="Fecha Escritura"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            required: true,
                                                        }}
                                                        inputProps={{
                                                            type: "date",
                                                            onChange: (e) => setFechaEscritura(e.target.value),
                                                            value: fechaEscritura,
                                                            disabled: disabledInput,
                                                        }}
                                                        labelProps={
                                                            { shrink: true }
                                                        }
                                                    />
                                                </GridItem>
                                                <GridItem xs={6}>
                                                    <CustomInput
                                                        id="segundoOtorgante"
                                                        labelText="Segundo otorgante"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            required: true,
                                                        }}
                                                        inputProps={{
                                                            type: "text",
                                                            onChange: (e) => setSegundoOtorgante(e.target.value),
                                                            value: segundoOtorgante,
                                                            disabled: disabledInput,
                                                        }}
                                                        labelProps={{ ...activeShrink }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={6}>
                                                    <CustomInput
                                                        id="Direccion"
                                                        labelText="Dirección"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            required: true,
                                                        }}
                                                        inputProps={{
                                                            type: "text",
                                                            onChange: (e) => setDireccion(e.target.value),
                                                            value: direccion,
                                                            disabled: disabledInput,
                                                        }}
                                                        labelProps={{ ...activeShrink }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={6}>
                                                    <CustomInput
                                                        id="idUsuario"
                                                        labelText="Id Usuario"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            required: true,
                                                        }}
                                                        inputProps={{
                                                            type: "text",
                                                            onChange: (e) => setIdUsuario(e.target.value),
                                                            value: idUsuario,
                                                            maxLength: 12,
                                                            disabled: disabledInput,
                                                        }}
                                                        labelProps={{ ...activeShrink }}
                                                    />
                                                </GridItem>
                                                <ThemeProvider theme={themeInputInfo}>
                                                    <GridItem xs={11} style={{ marginTop: '10px' }}>
                                                        {!editProyecto &&
                                                            <CustomInput
                                                                id="proyectosVista"
                                                                labelText="Proyecto"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                    required: true,
                                                                }}
                                                                inputProps={{
                                                                    type: "text",
                                                                    onChange: (e) => setNombreProyecto(e.target.value),
                                                                    value: nombreProyecto,
                                                                    disabled: true
                                                                }}
                                                                labelProps={{ ...activeShrink }}
                                                            />
                                                        }
                                                        {editProyecto &&
                                                            <Autocomplete
                                                                id="proyectos"
                                                                style={{ width: '100%' }}
                                                                open={open2}
                                                                onOpen={() => {
                                                                    setOpen2(true);
                                                                }}
                                                                onClose={() => {
                                                                    setOpen2(false);
                                                                }}
                                                                value={proyectoInformacion}
                                                                onChange={onProyectoChange}
                                                                getOptionSelected={(option, value) => option.token === value.token}
                                                                getOptionLabel={(option) => option.proyecto}
                                                                options={proyectos}
                                                                loading={loading2}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Proyectos"
                                                                        InputProps={{
                                                                            ...params.InputProps,
                                                                            endAdornment: (
                                                                                <React.Fragment>
                                                                                    {loading2 ? <CircularProgress color="inherit" size={20} /> : null}
                                                                                    {params.InputProps.endAdornment}
                                                                                </React.Fragment>
                                                                            ),
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                        }
                                                    </GridItem>
                                                    <GridItem xs={1}>
                                                        <Button
                                                            justIcon
                                                            color="rose"
                                                            onClick={activarEdicionProyecto}
                                                            disabled={disabledInput}
                                                            style={{ marginTop: '20px' }}
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                    </GridItem>
                                                    <GridItem xs={11} style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                        {!editActo && <CustomInput
                                                            id="actosVista"
                                                            labelText="Actos"
                                                            formControlProps={{
                                                                fullWidth: true,
                                                                required: true,
                                                            }}
                                                            inputProps={{
                                                                type: "text",
                                                                onChange: (e) => setActo(e.target.value),
                                                                value: acto,
                                                                disabled: true
                                                            }}
                                                            labelProps={{ ...activeShrink }}
                                                        />
                                                        }
                                                        {editActo &&
                                                            <Autocomplete
                                                                multiple
                                                                id="actos"
                                                                style={{ width: '100%' }}
                                                                open={open1}
                                                                onOpen={() => {
                                                                    setOpen1(true);
                                                                }}
                                                                onClose={() => {
                                                                    setOpen1(false);
                                                                }}
                                                                value={actoInformacion}
                                                                onChange={onActoschange}
                                                                disableCloseOnSelect
                                                                getOptionLabel={(option) => option.nombre_acto}
                                                                options={actos}
                                                                loading={loading1}
                                                                renderOption={(option, { selected }) => (
                                                                    <React.Fragment>
                                                                        <Checkbox
                                                                            icon={icon}
                                                                            checkedIcon={checkedIcon}
                                                                            style={{ marginRight: 8 }}
                                                                            checked={selected}
                                                                        />
                                                                        {option.nombre_acto}
                                                                    </React.Fragment>
                                                                )}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Actos"
                                                                        InputProps={{
                                                                            ...params.InputProps,
                                                                            endAdornment: (
                                                                                <React.Fragment>
                                                                                    {loading1 ? <CircularProgress color="inherit" size={20} /> : null}
                                                                                    {params.InputProps.endAdornment}
                                                                                </React.Fragment>
                                                                            ),
                                                                        }}
                                                                    />
                                                                )}
                                                            />}
                                                    </GridItem>
                                                    <GridItem xs={1}>
                                                        <Button
                                                            justIcon
                                                            color="rose"
                                                            disabled={disabledInput}
                                                            onClick={activarEdicionActo}
                                                            style={{ marginTop: '30px' }}
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                    </GridItem>
                                                </ThemeProvider>
                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={7}>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <div style={{ float: "right" }}>
                                        <form >
                                            <Button
                                                color="rose"
                                                disabled={loading1 || loading2 || disabledInput}
                                                onClick={guardarModificar}
                                            >
                                                Guardar
                                            </Button>
                                        </form>
                                    </div>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            {showQr &&
                <GenerarQr
                    data={tokenRadi}
                    numero={numRadicacion}
                    showQr={showQr}
                    setShowQr={setShowQr}
                    salir={salir}
                />
            }
        </>
    );
}
