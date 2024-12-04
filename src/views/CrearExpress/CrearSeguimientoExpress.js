/*eslint-disable*/
import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EXTERNAL_API_PATHS } from 'utils/constants'

// core components
import { Popconfirm, Table, Input, Form, Space, Switch, Tooltip, Button as ButtonAnt } from "antd";
import EditableCell from "../../components/Custom/EditableCell";
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import SubjectIcon from '@material-ui/icons/Subject';
import Search from '@material-ui/icons/Search';
import CardText from "components/Card/CardText.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "components/CustomButtons/Button.js";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Close from "@material-ui/icons/Close";
import DialogEliminarSeguimiento from "./DialogEliminarSeguimiento";
//import { columns } from "../../utils/columnRadicacionExpress";
import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
import { roseColor, infoColor } from "assets/jss/material-dashboard-pro-react.js";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { isValueObject } from "immutable";

const StyledLinearProgress = withStyles({
    barColorPrimary: {
        backgroundColor: roseColor[0]
    }
})(LinearProgress);

const themeInputInfo = createTheme({
    palette: {
        primary: {
            main: infoColor[0],
            light: infoColor[0],
            dark: infoColor[0],
        }
    },
});


export default function CrearSeguimientoExpress() {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const [numRadicacion, setNumRadicacion] = useState('');
    const [numEscritura, setNumEscritura] = useState('');
    const [actos, setActos] = useState([]);
    const [fechaEscritura, setFechaEscritura] = useState('');
    const [numProyecto, setNumProyecto] = useState('');
    const [proyecto, setProyecto] = useState('');
    const [direccion, setDireccion] = useState('');
    const [estadoEscrituras, setEstadosEscrituras] = useState([]);
    const [paso, setPaso] = useState('');
    const [updateTable, setUpdateTable] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [open1, setOpen1] = React.useState(false);
    const [openModalElimiSegui, setOpenModalElimiSegui] = React.useState(false);
    const [IdEliminarSegui, setIdEliminarSegui] = React.useState();
    const [eliminarPermiso, setEliminarPermiso] = React.useState(false);
    const [datosEliminarSegui, setDatosEliminarSegui] = React.useState({});
    const [seguimiento, setSeguimiento] = React.useState([]);
    const loading1 = open1 && estadoEscrituras.length === 0;
    const [loadingDatos, setLoadingDatos] = useState('');
    const key = "update";
    let config = { headers: { Authorization: `Bearer ${auth.token}` } };

    const handleCloseModalElimiSegui = () => {
        setOpenModalElimiSegui(false);
    };

    const handleClickOpenModalElimiSegui = (e) => {
        setOpenModalElimiSegui(true);
        console.log(e)
        setIdEliminarSegui(e.id);
        setDatosEliminarSegui(e)
    };

    useEffect(() => {
        let active = true;
        if (!loading1) {
            return undefined;
        }

        (async () => {
            const response = await axios.get(EXTERNAL_API_PATHS.EstadoEscritura)
            const subEscritura = await response.data
            console.log(subEscritura)
            if (active) {
                setEstadosEscrituras(subEscritura)
            }
        })();

        return () => {
            active = false;
        };
    }, [loading1]);

    const eliminarSeguimiento = (value) => {
        console.log("se elimina el seguimiento con id" + value)
        
        axios.delete(EXTERNAL_API_PATHS.seguiRadi2+"/"+value)
            .then((res) => {
                console.log(res)
                setUpdateTable(true)
                message.success({ content: `El seguimiento se ha eliminado con exito`, key: key });
            }).catch((error) => {
                console.log(error)
                message.error({ content: `No se ha podido eliminar el seguimiento`, key: key });
            })
    }

    const columns = [
        {
            title: "Fecha",
            dataIndex: "fecha",
            width: "20%",
            visible: true,
            // defaultSortOrder: "ascend",
        },
        {
            title: "Detalle",
            dataIndex: "detalle",
            width: "20%",
            visible: true,
        },
        {
            title: "Observación",
            dataIndex: "observacion",
            width: "40%",
            visible: true,
        },
        {
            title: "Usuario",
            dataIndex: "usuario",
            width: "17%",
            visible: true,
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            width: "3%",
            visible: eliminarPermiso,
            render: (_, record) => {
                return <div>
                    <Popconfirm
                        title="Seguro deseas eliminar?"
                        onConfirm={() => eliminarSeguimiento(record.id)}
                    >
                        <Button
                            color="danger"
                            className={classes.actionButton}
                        >
                            <Close className={classes.icon} />
                        </Button>
                    </Popconfirm>
                </div>
            },
        },
    ];

    console.log(columns.filter(columnas => {return columnas.visible != false} ))
    const realizarBusqueda = (e) => {
        message.loading({ content: 'Cargando...', key: key, duration: 20 });
        setLoadingDatos(true)
        e.preventDefault();
        let numRadi = document.getElementById("Radicacion").value

        axios.get(EXTERNAL_API_PATHS.radicaciones2+"/"+numRadi)
            .then((response) => {
                setLoadingDatos(false)
                let datos = response.data
                setActos(datos.actos)
                setDireccion(datos.direccion)
                setFechaEscritura(datos.fecha_escritura)
                setNumEscritura(datos.num_escritura)
                setNumRadicacion(datos.num_radicacion)
                setNumProyecto(datos.proyecto_id)
                setProyecto(datos.proyecto)
                setSeguimiento(datos.seguimientos)
                setEliminarPermiso(datos.eliminar)
                message.success({ content: `La radicación ${numRadicacion} ha cargado con exito`, key: key });
                console.log(response)
            })
            .catch(() => {
                setLoadingDatos(false)
                message.error({ content: `No se ha encontrado radicación con el número ${numRadi}`, key: key });
            })
    }

    useEffect(() => {
        axios.get(EXTERNAL_API_PATHS.radicaciones2+"/" + numRadicacion).then((response) => {
            setUpdateTable(false)
            setSeguimiento(response.data.seguimientos)
        });
    }, [updateTable]);

    const onTagChange = (event, values) => {
        setPaso(values.name)
        console.log(values)
    }

    const crearRadiSeguimiento = (e) => {
        if (fechaHora && paso && numRadicacion) {
            let headers = { Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin': true }
            const formData = {
                paso: paso,
                fecha: fechaHora,
                observacion: observaciones,
                num_radicacion: numRadicacion
            };
            message.loading({ content: "Guardando...", key: key });
            axios
                .post(EXTERNAL_API_PATHS.seguiradiCreate, formData)
                .then((res) => {
                    setUpdateTable(true)
                    setPaso('')
                    setFechaHora('')
                    setObservaciones('')
                    message.success({ content: `Se ha creado con exito el paso para la radicación ${numRadicacion}`, key: key });
                })
                .catch(() => {
                    message.error({ content: `No se pudo crear el paso para radicación ${numRadicacion}`, key: key });
                });
        } else {
            message.info("Es necesario llenar todos los campos");
        }
    }

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                    <CardHeader color="primary" text>
                            <CardText className={classes.cardText} color="primary">
                                <h4 className={classes.colorWhite}>  Seguimiento Radicación Express  </h4>
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
                                                style
                                            // onPressEnter={realizarBusqueda}
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
                                    <Card style={{ backgroundColor: '#ECECEC' }}>
                                        <CardBody color="mi">
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={5}>
                                                    <GridContainer style={{ marginTop: '29px' }}>
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
                                                            <b style={{ float: "right", fontSize: '15px' }}>Proyecto</b>
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={6}>
                                                            { }
                                                            <b style={{ fontSize: '15px' }}>{proyecto ? proyecto : <span style={{ color: '#9A9A9A' }} >- - - - - - - - - -</span>}</b>
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={6}>
                                                            <b style={{ float: "right", fontSize: '15px' }}>Cód. Proyecto</b>
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={6}>
                                                            <b style={{ fontSize: '15px' }}>{numProyecto === '' ? <span style={{ color: '#9A9A9A' }} >- - - - - - - - - -</span> : numProyecto}</b>
                                                        </GridItem>
                                                    </GridContainer>
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={7}>
                                                    <Card style={{ backgroundColor: '#F3F3F3' }}>
                                                        <CardBody>
                                                            <b style={{ fontSize: '15px' }}>Inmueble</b>
                                                            <GridContainer>
                                                                <GridItem xs={3}>
                                                                    <u style={{ fontSize: '12px' }}>Dirección</u>
                                                                </GridItem>
                                                                <GridItem xs={7}>
                                                                    <p>{direccion === '' ? <span style={{ color: '#9A9A9A' }} >- - - - - - - - - -</span> : direccion}</p>
                                                                </GridItem>
                                                            </GridContainer>
                                                        </CardBody>
                                                    </Card>
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer justify="center">
                                                <GridItem xs={10}>
                                                    <p><b style={{ fontSize: '17px' }}>Actos</b></p>
                                                    {actos ? <p>{actos}</p> : <p style={{ color: '#9A9A9A' }} >- - - - - - - - - -</p>}
                                                </GridItem>
                                            </GridContainer>
                                            <StyledLinearProgress variant="determinate" value={100} />
                                        </CardBody>
                                        <GridContainer justify="center">
                                            <GridItem xs={10}>
                                                {/* <p><b style={{ fontSize: '17px' }}>Seguimiento</b></p>
                                                <table style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse', width: '100%' }}>
                                                    <tr>
                                                        <th style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}>Fecha</th>
                                                        <th style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}>Detalle</th>
                                                        <th style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}>Observación</th>
                                                        <th style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}>Usuario</th>
                                                        <th style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}>Eliminar</th>
                                                    </tr>
                                                    {seguimiento.length != 0 ? seguimiento.map((item) => {
                                                        return (<tr>
                                                            <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p>{item.fecha}</p></td>
                                                            <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p>{item.detalle}</p></td>
                                                            <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p>{item.observacion}</p></td>
                                                            <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p>{item.usuario}</p></td>
                                                            <th style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><Button size="sm" color="rose" onClick={() => handleClickOpenModalElimiSegui(item)} >
                                                                <CloseIcon></CloseIcon>
                                                            </Button></th>
                                                        </tr>)
                                                    }) : <tr>
                                                        <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p style={{ color: '#9A9A9A' }} >- - - - - - - - - -</p></td>
                                                        <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p style={{ color: '#9A9A9A' }} >- - - - - - - - - -</p></td>
                                                        <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p style={{ color: '#9A9A9A' }} >- - - - - - - - - -</p></td>
                                                        <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p style={{ color: '#9A9A9A' }} >- - - - - - - - - -</p></td>
                                                    </tr>}
                                                </table> */}
                                                {console.log(classes)}
                                                <Form component={false}>
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
                                                        dataSource={seguimiento}
                                                        columns={columns.filter(columnas => {return columnas.visible != false} )}
                                                        loading={loadingDatos}
                                                        rowClassName="editable-row"
                                                        pagination={{
                                                            pageSize: 10,
                                                        }}
                                                    />
                                                </Form>
                                            </GridItem>
                                        </GridContainer>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                            <ThemeProvider theme={themeInputInfo}>
                                <GridContainer justify="center" direction="row">
                                    <GridItem xs={12} sm={12} md={2}>
                                        <FormLabel style={{ fontSize: '15px', marginTop: '15px' }}>
                                            Procedimiento
                                        </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <Autocomplete
                                            id="estadoEscritura"
                                            style={{ width: '100%' }}
                                            open={open1}
                                            onOpen={() => {
                                                setOpen1(true);
                                            }}
                                            onClose={() => {
                                                setOpen1(false);
                                            }}
                                            getOptionSelected={(option, value) => option.name === value.name}
                                            getOptionLabel={(option) => option.name}
                                            options={estadoEscrituras}
                                            onChange={onTagChange}
                                            loading={loading1}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
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
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={2}>
                                        <FormLabel style={{ fontSize: '15px', marginTop: '20px' }}>
                                            Fecha y Hora
                                        </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: '10px' }}>
                                        <TextField
                                            id="fechaHora"
                                            type="datetime-local"
                                            style={{ width: '100%' }}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                onChange: (e) => setFechaHora(e.target.value),
                                                value: fechaHora,
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={2}>
                                        <FormLabel style={{ fontSize: '15px', marginTop: '21px' }}>
                                            Observaciones
                                        </FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: '10px' }}>
                                        <TextField
                                            id="Observaciones"
                                            multiline
                                            style={{ width: '100%' }}
                                            rows={2}
                                            variant="outlined"
                                            inputProps={{
                                                onChange: (e) => setObservaciones(e.target.value),
                                                value: observaciones,
                                                maxLength: 150,
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </ThemeProvider>
                            <br></br>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={7}>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <div style={{ float: "right" }}>
                                        <form >
                                            <Button
                                                color="rose"
                                                onClick={crearRadiSeguimiento}
                                            >
                                                Añadir Seguimiento
                                            </Button>
                                        </form>
                                    </div>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <DialogEliminarSeguimiento
                open={openModalElimiSegui}
                onClose={handleCloseModalElimiSegui}
                eliminarSeguimiento={eliminarSeguimiento}
                datosEliminarSegui={datosEliminarSegui}
            />
        </>
    );
}
