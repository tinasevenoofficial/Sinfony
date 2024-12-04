/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { message } from 'antd';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Table, Form, Spin, Alert } from "antd";

// @material-ui/icons
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import Search from '@material-ui/icons/Search';

// core components
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import EditableCell from "../../components/Custom/EditableCell";
import { columns } from "../../utils/columnProyectos";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardText from "components/Card/CardText.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Permisos from "./Permisos";
import Persona from "views/Persona/Otorgante";
import { EXTERNAL_API_PATHS } from 'utils/constants'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import useTable from "../../hooks/useTable";
import LinearProgress from '@material-ui/core/LinearProgress';

const title = "Listado de Proyectos";
const name = "Listado de Proyectos";
const key = "proyecto";

import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";

const { Option } = Select;

export default function AdminProjects() {

    const auth = useSelector((state) => state.auth);
    const searchInput = useRef();
    const classes = useStyles();
    const [personas, setPersonas] = useState([]);
    const [datosProyectos, setDatosProyectos] = useState();
    const [persona, setPersona] = useState();
    const [personaEdit, setPersonaEdit] = useState();
    const [modal, setModal] = useState({
        visible: false,
        id: "",
    });
    const [modalRadicacion, setModalRadicacion] = useState({
        visible: false,
        id: "",
    });
    const [loadPermit, setLoadPermit] = useState("hide");
    const [newPerson, setNewPerson] = useState('');
    const [codigoProyecto, setCodigoProyecto] = useState('');
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [openModalPerson, setOpenModalPerson] = useState(false);
    const [disabledInput, setDisabledInput] = useState(true);
    const [openModalRadicacion, setOpenModalRadicacion] = useState(false);
    const [updateTable, setUpdateTable] = useState('');
    const [messageKey, setMessageKey] = useState("update")

    //variables modal radicación
    const [numRadicacion, setNumRadicacion] = useState('');
    const [numEscritura, setNumEscritura] = useState('');
    const [actos, setActos] = useState([]);
    const [fechaEscritura, setFechaEscritura] = useState('');
    const [direccion, setDireccion] = useState('');
    const [primerOtorgante, setPrimerOtorgante] = useState('');
    const [segundoOtorgante, setSegundoOtorgante] = useState('');
    const [matricula, setMatricula] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    let config = { headers: { Authorization: `Bearer ${auth.token}` } };

    const realizarBusquedaProyecto = (e) => {
        message.loading({ content: 'Cargando...', key: messageKey, duration: 10 });
        e.preventDefault();
        let numRadi = document.getElementById("Radicacion").value
        let configRadicacion = {
            method: 'get',
            headers: { Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin': true },
            url: process.env.REACT_APP_URL_API + '/api/radi2/' + numRadi
        };
        axios(configRadicacion)
            .then((response) => {
                if (response.status === 200) {
                    if (!response.data.proyecto_id) {
                        let datos = response.data
                        setActos(datos.actos)
                        setDireccion(datos.direccion ? datos.direccion : '')
                        setFechaEscritura(datos.fecha_escritura ? datos.fecha_escritura : '')
                        setNumEscritura(datos.num_escritura ? datos.num_escritura : '')
                        setNumRadicacion(datos.num_radicacion ? datos.num_radicacion : '')
                        setPrimerOtorgante(datos.otorgante1 ? datos.otorgante1 : '')
                        setSegundoOtorgante(datos.otorgante2 ? datos.otorgante2 : '')
                        setMatricula(datos.matricula ? datos.matricula : '')
                        setIdUsuario(datos.usuario_plataforma ? datos.usuario_plataforma : '')
                        setDisabledInput(false)
                        message.destroy(messageKey)
                        // message.success({ content: `La radicación No. ${numRadi} no cuenta con proyecto, puede añadirlo`, key: messageKey });
                        console.log(response.data);
                    } else {
                        message.info({ content: `La radicación No. ${numRadi} ya cuenta con un proyecto`, key: messageKey });
                    }
                } else {
                    message.error({ content: `No se ha encontrado radicación con el No. ${numRadi}`, key: messageKey });
                    console.log(response.data);
                }
            })
            .catch((e) => {
                message.error({ content: `No se ha encontrado radicación con el número ${numRadi}`, key: messageKey });
                console.log("error")
                console.log(e)
            })
    }

    const añadirProyectoARadicacion = () => {
        message.loading({ content: 'Cargando...', key: messageKey, duration: 10 });
        const formDataPut = {
            num_escritura: numEscritura,    
            fecha_escritura: fechaEscritura,
            token: encripta(numRadicacion),
            codigoProyecto: modalRadicacion.proyecto_id,
            direccion: direccion,
            matricula: matricula,
            actos: actos,
            otorgante1: primerOtorgante,
            otorgante2: segundoOtorgante,
            usuario: idUsuario
        };
        console.log("añadirProyecto")
        console.log(formDataPut)
        let headers = { Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin': true }
        axios
            .put(process.env.REACT_APP_URL_API + '/api/radi2/' + numRadicacion, formDataPut, { headers: headers })
            .then((res) => {
                console.log(res)
                message.success({ content: `Se ha añadido con exito la radicación número ${numRadicacion} al proyecto ${modalRadicacion.proyecto}`, key: messageKey });
            })
            .catch((error) => {
                console.log(error)
                message.error({ content: `No se pudo añadir la radicación número ${numRadicacion} al proyecto `, key: messageKey });
            });
    }

    const showModal = (record) => {
        setPersonaEdit(record.usuario_plataforma)
        setModal((mod) => ({
            ...mod,
            visible: true,
            proyecto: record.proyecto,
            id: record.id,
            idRol: record.id_rol,
        }));
        console.log(record)
        console.log(personas)
    };

    const showModalRadicacion = (record) => {
        setModalRadicacion((mod) => ({
            ...mod,
            visible: true,
            proyecto: record.proyecto,
            proyecto_id: record.id,
        }));
        console.log("record")
        console.log(record)
    };

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

    const handleCancel = () => {
        setModal((mod) => ({ ...mod, visible: false }));
    };

    const handleCancelRadicacion = () => {
        setModalRadicacion((mod) => ({ ...mod, visible: false }));
    };

    const {
        formEdit,
        formCreate,
        permisos,
        data,
        loading,
        onEdit,
        onDelete,
        updateOnEdit,
        updateData,
        createItem,
        editItemProyecto,
        delItemProyecto,
        saveProyecto,
        isEditingProyecto,
        cancel,
        onFinishFailed,
        updateNameItem,
    } = useTable({ key });

    const personaList = async () => {
        axios.get(EXTERNAL_API_PATHS['persona'], config)
            .then((response) => {
                setPersonas(response.data);
                console.log("response.data")
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const actualizarPersona = (val) => {
        message.loading({ content: 'Actualizando...', key: messageKey, duration: 20 });
        let data = {
            usuario_plataforma: personaEdit
        }
        console.log(data);
        axios.put(EXTERNAL_API_PATHS['proyecto'] + '/' + modal.id, data, config)
            .then((response) => {
                message.success({ content: `Se ha actualizado exitosamente la persona del proyecto ${modal.proyecto}`, key: messageKey });
                setUpdateTable(true)
                console.log(response)
            })
            .catch((e) => {
                message.error({ content: `No se pudo actualizar la persoa del ${modal.proyecto}`, key: messageKey });
                console.log(e);
            })
    };

    const setStatePermit = (val) => {
        setLoadPermit(val);
    };


    useEffect(() => {
        personaList();
    }, [])

    useEffect(() => {
        personaList();
    }, [newPerson])

    useEffect(() => {
        axios.get(EXTERNAL_API_PATHS[key], config).then((res) => {
            setUpdateTable(false)
            updateData(res.data);
        });
    }, [updateTable]);

    useEffect(() => {
        let auxProyectos = [];
        data.map((item) => {
            auxProyectos.push({ id: item.codigo, proyecto: item.proyecto, token: item.token, nombre_persona: item.nombres + " " + item.apellidos, usuario_plataforma: item.usuario_plataforma, estado: item.estado })
        })
        setDatosProyectos([...auxProyectos])
    }, [data])

    const crearProyecto = () => {
        message.loading({ content: 'Cargando...', key: messageKey, duration: 20 });
        console.log(codigoProyecto)
        console.log(nombreProyecto)
        console.log(persona)
        if (persona && nombreProyecto && codigoProyecto) {
            let jsonData = {
                codigo: codigoProyecto,
                nombre: nombreProyecto,
                usuario: persona.toString(),
                token: encripta(codigoProyecto),
                activo: 0,
            }
            console.log(jsonData)
            axios.post(EXTERNAL_API_PATHS[key], jsonData, config)
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        message.success({ content: `Se ha creado exitosamente el proyecto ${nombreProyecto}`, key: messageKey });
                        console.log(response.data);
                    } else {
                        message.error({ content: `No se pudo crear el proyecto ${nombreProyecto}`, key: messageKey });
                        console.log(response.data);
                    }
                    setUpdateTable(true)
                })
                .catch((e) => {
                    message.error({ content: `No se pudo crear el proyecto ${nombreProyecto}`, key: messageKey });
                    console.log(e)
                })
        } else {
            message.error({ content: `Es necesario llenar todos los campos`, key: messageKey });
        }
    };

    // Funciones para select
    const onChangePersona = (value) => {
        console.log("value")
        console.log(value)
        setPersona(value)
    }

    function onChangePersonaEdit(value) {
        setPersonaEdit(value)
    }

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary" text>
                            <CardText className={classes.cardText} color="primary">
                                <h4 className={classes.colorWhite}>Crear Proyecto</h4>
                            </CardText>
                        </CardHeader>
                        <CardBody>
                            <form id="form">
                                <GridContainer alignItems="center">
                                    <GridItem xs={12} sm={12} md={2}>
                                        <FormLabel className={classes.label}>
                                            <span className={classes.colorRose}>*</span> Persona
                                        </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu,
                                                }}
                                                classes={{
                                                    select: classes.select,
                                                }}
                                                displayEmpty
                                                defaultValue=""
                                                onChange={(event) => {
                                                    onChangePersona(event.target.value);
                                                }}
                                                inputProps={{
                                                    name: "Personas",
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    value=""
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                    }}
                                                >
                                                    Seleccione persona
                                                </MenuItem>
                                                {personas.map(({ nombres, apellidos, numero_documento }) => (
                                                    <MenuItem
                                                        key={numero_documento}
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected,
                                                        }}
                                                        value={numero_documento}
                                                    >
                                                        {apellidos ? nombres + " " + apellidos : nombres}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <Button
                                            className={classes.center}
                                            color="rose"
                                            onClick={() => setOpenModalPerson(true)}
                                            size="sm"
                                        >
                                            <AddIcon /> <PersonIcon />
                                        </Button>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <FormLabel className={classes.label}>
                                            <span className={classes.colorRose}>*</span> Código
                                        </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <CustomInput
                                                margin="dense"
                                                id="codigoProyecto"
                                                classes={{ marginTop: '-15px' }}
                                                labelText="Código Proyecto"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    onChange: (e) => setCodigoProyecto(e.target.value),
                                                    value: codigoProyecto,
                                                }}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer alignItems="center">
                                    <GridItem xs={12} sm={12} md={2}>
                                        <FormLabel className={classes.label}>
                                            <span className={classes.colorRose}>*</span> Nombre
                                        </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            margin="dense"
                                            id="nombreProyecto"
                                            classes={{ marginTop: '-15px' }}
                                            labelText="Nombre Proyecto"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: (e) => setNombreProyecto(e.target.value),
                                                value: nombreProyecto,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer alignItems="center">
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Button
                                            className={classes.center}
                                            color="rose"
                                            onClick={crearProyecto}
                                        >
                                            crear proyecto
                                        </Button>
                                    </GridItem>
                                </GridContainer>
                            </form>
                        </CardBody>
                    </Card>
                </GridItem>
                <br></br>
            </GridContainer>
            <Form form={formEdit} component={false}>
                <Table
                    className={classes.table}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    size="small"
                    bordered
                    scroll={{ x: 500 }}
                    dataSource={datosProyectos}
                    columns={columns(
                        cancel,
                        isEditingProyecto,
                        updateOnEdit,
                        saveProyecto,
                        delItemProyecto,
                        editItemProyecto,
                        onEdit,
                        onDelete,
                        name,
                        searchInput,
                        classes,
                        showModal,
                        showModalRadicacion,
                    )}
                    loading={loading}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                        pageSize: 5,
                    }}
                />
            </Form>
            <Dialog
                open={modalRadicacion.visible}
                keepMounted
                onClose={handleCancelRadicacion}
                aria-labelledby="permits-title"
                aria-describedby="permits-description"
            >
                <DialogTitle id="permits-title">
                    <div className={classes.titleModal}>
                        <VerifiedUserIcon />
                        <p className={classes.text}> Añadir radicación a {modalRadicacion.proyecto}</p>
                    </div>
                </DialogTitle>
                <DialogContent id="permits-description">
                    <FormControl fullWidth className={classes.selectFormControl}>
                        <Card style={{ backgroundColor: '#ECECEC' }}>
                            <CardBody color="mi">
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div style={{ float: "right" }}>
                                            <form >
                                                <CustomInput
                                                    id="Radicacion"
                                                    labelText="RADICACIÓN"
                                                    inputProps={{
                                                        type: "text"
                                                    }}
                                                    style
                                                />
                                                <Button
                                                    justIcon
                                                    color="primary"
                                                    onClick={realizarBusquedaProyecto}
                                                >
                                                    <Search />
                                                </Button>
                                            </form>
                                        </div>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <GridContainer style={{ marginTop: '29px' }}>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <b style={{ float: "right", fontSize: '15px' }}>No. Radicación</b>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <b style={{ fontSize: '15px' }}>{numRadicacion === '' ? <span style={{ color: '#9A9A9A' }} >- - - - - - - - - - </span> : numRadicacion}</b>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <b style={{ float: "right", fontSize: '15px' }}>Escritura</b>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <b style={{ fontSize: '15px' }}>{numEscritura === '' ? <span style={{ color: '#9A9A9A' }} >- - - - - - - - - - </span> : numEscritura}</b>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <b style={{ float: "right", fontSize: '15px' }}>Fecha</b>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <b style={{ fontSize: '15px' }}>{fechaEscritura === '' ? <span style={{ color: '#9A9A9A' }} >- - - - - - - - - -</span> : fechaEscritura}</b>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <b style={{ float: "right", fontSize: '15px' }}>1. Otorgante</b>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                { }
                                                <b style={{ fontSize: '15px' }}>{primerOtorgante === '' ? <span style={{ color: '#9A9A9A' }} >- - - - - - - - - -</span> : primerOtorgante}</b>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <b style={{ float: "right", fontSize: '15px' }}>2. Otorgante</b>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <b style={{ fontSize: '15px' }}>{segundoOtorgante === '' ? <span style={{ color: '#9A9A9A' }} >- - - - - - - - - -</span> : segundoOtorgante}</b>
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card style={{ backgroundColor: '#F3F3F3' }}>
                                            <CardBody>
                                                <b style={{ fontSize: '15px' }}>Inmueble</b>
                                                <GridContainer>
                                                    <GridItem xs={6}>
                                                        <u style={{ fontSize: '12px' }}>Dirección</u>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                        <p>{direccion === '' ? <span style={{ color: '#9A9A9A' }} >- - - - - - - - - -</span> : direccion}</p>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                        <u style={{ fontSize: '12px' }}>Matricula</u>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                        <p>{matricula === '' ? <span style={{ color: '#9A9A9A' }} >- - - - - - - - - -</span> : matricula}</p>
                                                    </GridItem>
                                                </GridContainer>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                </GridContainer>
                                <LinearProgress style={{ marginTop: '-13px' }} variant="determinate" color="secondary" value={100} />
                                <br></br>
                                <GridContainer justify="center">
                                    <GridItem xs={10}>
                                        <p><b style={{ fontSize: '17px' }}>Actos</b></p>
                                        {actos != '' ? <p>{actos}</p> : <p style={{ color: '#9A9A9A' }} >- - - - - - - - - -</p>}
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Spin style={{ marginRight: 100 }} spinning={loadPermit === "load"}>
                        {loadPermit !== "hide" && loadPermit !== "load" ? (
                            <Alert
                                message={
                                    loadPermit === "error"
                                        ? "No se actualizo correctamente"
                                        : "Actualizado correctamente"
                                }
                                type={loadPermit}
                            />
                        ) : (
                            false
                        )}
                    </Spin>
                    <Button disabled={disabledInput} onClick={añadirProyectoARadicacion} color="primary" simple>
                        Añadir Proyecto
                    </Button>
                    <Button onClick={handleCancelRadicacion} color="danger" simple>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={modal.visible}
                keepMounted
                onClose={handleCancel}
                aria-labelledby="permits-title"
                aria-describedby="permits-description"
            >
                <DialogTitle id="permits-title">
                    <div className={classes.titleModal}>
                        <VerifiedUserIcon />
                        <p className={classes.text}> Cambiar persona de proyecto {modal.proyecto}</p>
                    </div>
                </DialogTitle>
                <DialogContent id="permits-description">
                    <FormControl fullWidth className={classes.selectFormControl}>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu,
                            }}
                            classes={{
                                select: classes.select,
                            }}
                            displayEmpty
                            defaultValue=""
                            onChange={(event) => {
                                onChangePersonaEdit(event.target.value);
                            }}
                            inputProps={{
                                name: "personaEdit",
                                value: personaEdit || 0
                            }}
                        >
                            <MenuItem
                                disabled
                                value=""
                                classes={{
                                    root: classes.selectMenuItem,
                                }}
                            >
                                Seleccione persona
                            </MenuItem>
                            {personas.map(({ nombres, apellidos, numero_documento }) => (
                                <MenuItem
                                    key={numero_documento}
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value={numero_documento}
                                >
                                    {apellidos ? nombres + " " + apellidos : nombres}
                                </MenuItem>
                            ))}
                        </Select>
                        {/* <Select
                            MenuProps={{
                                className: classes.selectMenu,
                            }}
                            classes={{
                                select: classes.select,
                            }}
                            displayEmpty
                            defaultValue=""
                            onChange={(event) => {
                                onChangeRolEdit(event.target.value);
                            }}
                            inputProps={{
                                name: "roles",
                                value: rolEdit || 0
                            }}
                        >
                            <MenuItem
                                disabled
                                value=""
                                classes={{
                                    root: classes.selectMenuItem,
                                }}
                            >
                                Seleccione persona
                            </MenuItem>
                            {console.log(modal.idRol)}
                            {roles.map(({ name, id }) => (
                                <MenuItem
                                    key={id}
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value={id}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select> */}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Spin style={{ marginRight: 100 }} spinning={loadPermit === "load"}>
                        {loadPermit !== "hide" && loadPermit !== "load" ? (
                            <Alert
                                message={
                                    loadPermit === "error"
                                        ? "No se actualizo correctamente"
                                        : "Actualizado correctamente"
                                }
                                type={loadPermit}
                            />
                        ) : (
                            false
                        )}
                    </Spin>
                    <Button onClick={actualizarPersona} color="primary" simple>
                        Actualizar
                    </Button>
                    <Button onClick={handleCancel} color="danger" simple>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Persona
                open={openModalPerson}
                title='Usuario'
                handleClose={setOpenModalPerson}
                addPerson={setNewPerson}
                integrado={true}
            />
        </>
    );
}
