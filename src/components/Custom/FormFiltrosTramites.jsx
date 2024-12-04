import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import PropTypes from "prop-types";
// @material-ui/core components
import { Table, Form, Spin, Alert } from "antd";

// @material-ui/icons
import SearchIcon from '@material-ui/icons/Search';
import Check from "@material-ui/icons/Check";
import FindReplaceIcon from '@material-ui/icons/FindReplace';

// core components
import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import EditableCell from "../../components/Custom/EditableCell";
import { columns } from "../../utils/columnFacturacion";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { EXTERNAL_API_PATHS } from 'utils/constants'
import { FILTER_DAYS } from "utils/constants";
import useTable from "../../hooks/useTable";
import Checkbox from "@material-ui/core/Checkbox";

import { primaryColor } from "assets/jss/material-dashboard-pro-react.js";

import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
import { Datafono } from "views/Components/Methods/AllModals";


const key = "facturacion";



const  FormFiltrosTramites = (props) => {

    const { title, createItem,searchItem, loading } = props;

    const auth = useSelector((state) => state.auth);
    const searchInput = useRef();
    const classes = useStyles();
    const [datosFacturas, setDatosFacturas] = useState();
    const [fechaInicialInput, setFechaInicialInput] = useState();
    const [fechaFinalInput, setFechaFinalInput] = useState();
    const [fechaInicialDefinida, setFechaInicialDefinida] = useState();
    const [fechaFinalDefinida, setFechaFinalDefinida] = useState();
    const [terceroSeleccionado, setTerceroSeleccionado] = useState('');
    const [fechaControlado, setFechaControlado] = useState(1);
    const [estadoDianSeleccionado, setEstadoDianSeleccionado] = useState('vacio');
    const [prefijos, setPrefijos] = useState([]);
    const [prefijoSeleccionado, setPrefijoSeleccionado] = useState('vacio');
    const [enableFechaPersonalizada, setEnableFechaPersonalizada] = useState(true);
    const [updateTable, setUpdateTable] = useState('');
    const [respuestaCliente, setRespuestaCliente] = useState('vacio');
    const [messageKey, setMessageKey] = useState("update")


    let config = { headers: { Authorization: `Bearer ${auth.token}` } };

    const activarFechaPersonalizada = () => {
        setEnableFechaPersonalizada(!enableFechaPersonalizada);
    }

    const OnChangeFecha = (id) => {
        setFechaControlado(id)
        setFechaInicialDefinida();
        setFechaFinalDefinida();
        const dataForm = FILTER_DAYS.filter((filter) => filter.id === id)[0];
        if (dataForm.fechaFin && dataForm.fechaInicio) {
            setFechaInicialDefinida(dataForm.fechaInicio);
            setFechaFinalDefinida(dataForm.fechaFin);
        } else if (!dataForm.fechaFin && dataForm.fechaInicio) {
            setFechaInicialDefinida(dataForm.fechaInicio);
        }
    }

    //trae información sobre las facturas
   /* useEffect(() => {
        axios.get(EXTERNAL_API_PATHS[key], config).then((res) => {
            updateData(res.data);
        });
    }, []);*/

    //consulta traer información de filtros (Prefijos)
    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_API + '/api/documentsFiltros', config).then((res) => {
            setPrefijos(res.data.prefijos)
        });
    }, []);

    /*useEffect(() => {
        setUpdateTable(false)
        updateData(datosFacturas);
    }, [updateTable]);*/


    const aplicarFiltros = () => {
        var filtrar = true;
        message.loading({ content: `Cargando...`, key: messageKey });
        const formDataFiltros = {
            prefix: prefijoSeleccionado,
            tercero: terceroSeleccionado ? terceroSeleccionado : "vacio",
            estado_dian: estadoDianSeleccionado,
            respuesta: respuestaCliente
        };
        //Establecer que fecha enviar si viene desde personalizada o input FILTER_DAYS  
        if (!enableFechaPersonalizada) {
            if (fechaInicialInput && fechaFinalInput) {
                formDataFiltros.fechaInicio = fechaInicialInput;
                formDataFiltros.fechaFin = fechaFinalInput;
            } else {
                message.error({ content: `Es necesario digitar los dos campos sobre la fecha personalizada`, key: messageKey });
                filtrar = false;
            }
        } else if (enableFechaPersonalizada) {
            if (fechaInicialDefinida && fechaFinalDefinida) {
                formDataFiltros.fechaInicio = fechaInicialDefinida;
                formDataFiltros.fechaFin = fechaFinalDefinida;
            } else if (fechaInicialDefinida && !fechaFinalDefinida) {
                formDataFiltros.fechaInicio = fechaInicialDefinida;
            }
        }
        if (filtrar) {
            searchItem('OrdenEscrituracion',formDataFiltros.fechaInicio,formDataFiltros.fechaFin)
        }
    };

    const limpiarFiltros = () => {
        setFechaInicialDefinida();
        setFechaFinalDefinida();
        setFechaFinalInput('');
        setFechaInicialInput('');
        setTerceroSeleccionado('');
        setFechaControlado(1);
        setEstadoDianSeleccionado('vacio');
        setPrefijoSeleccionado(() => 'vacio');
        message.loading({ content: `Cargando...`, key: messageKey });
        axios
            .get(process.env.REACT_APP_URL_API + '/api/documents', { headers: { Authorization: `Bearer ${auth.token}` } })
            .then((res) => {
                setDatosFacturas(res.data)
                setUpdateTable(true)
                message.success({ content: `Se han limpiado los filtros`, key: messageKey });
            })
            .catch(() => {
                message.error({ content: `No se han podido limpiar los filtros`, key: messageKey });
            });
    }

    return (
        <Card>
            <CardHeader color="primary" text>
                <CardText className={classes.cardText} color="primary">
                    <h4 className={classes.colorWhite}>{title}</h4>
                </CardText>
            </CardHeader>
            <CardBody>
                {/*<GridContainer alignItems="center">
                    <GridItem xs={12} sm={12} md={1}>
                        <FormLabel className={classes.label}>
                            Prefijo
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                displayEmpty
                                defaultValue={prefijoSeleccionado}
                                value={prefijoSeleccionado}
                                onChange={(event) => {
                                    setPrefijoSeleccionado(event.target.value);
                                }}
                                inputProps={{
                                    name: "Prefijos",
                                }}
                            >
                                {prefijos.map(({ prefix }) => (
                                    <MenuItem
                                        key={prefix}
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value={prefix === '' ? "vacio" : prefix}
                                    >
                                        {prefix === '' ? "Sin prefijo" : prefix}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <FormLabel className={classes.label}>
                            Terceros
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            margin="dense"
                            id="tercero"
                            labelText="Tercero"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                type: "text",
                                onChange: (e) => setTerceroSeleccionado(e.target.value),
                                value: terceroSeleccionado,
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <FormLabel className={classes.label}>
                            Estado DIAN:
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                displayEmpty
                                defaultValue={estadoDianSeleccionado}
                                value={estadoDianSeleccionado}
                                onChange={(event) => {
                                    setEstadoDianSeleccionado(event.target.value);
                                }}
                                inputProps={{
                                    name: "Estado",
                                }}
                            >
                                <MenuItem
                                    key="0"
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value="vacio"
                                >
                                    Todos
                                </MenuItem>
                                <MenuItem
                                    key="1"
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value="0"
                                >
                                    No enviado
                                </MenuItem>
                                <MenuItem
                                    key="2"
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value="1"
                                >
                                    Enviado
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </GridItem>
                </GridContainer>*/}
                <GridContainer alignItems="center">
                    <GridItem xs={12} sm={12} md={1}>
                        <FormLabel className={classes.label}>
                            Fecha
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={2}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                displayEmpty
                                defaultValue={fechaControlado}
                                value={fechaControlado}
                                onChange={(e) => {
                                    OnChangeFecha(e.target.value);
                                }}
                                inputProps={{
                                    name: "date",
                                    disabled: !enableFechaPersonalizada,
                                }}
                            >
                                <MenuItem
                                    disabled
                                    value=""
                                    classes={{
                                        root: classes.selectMenuItem,
                                    }}
                                >
                                    Seleccione un filtro
                                </MenuItem>
                                {FILTER_DAYS.map(({ name, id }) => (
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
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <div className={classes.checkboxAndRadio}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        style={{
                                            color: primaryColor[0]
                                        }}
                                        tabIndex={-1}
                                        onClick={() => activarFechaPersonalizada()}
                                    />
                                }
                                classes={{
                                    label: classes.label,
                                    root: classes.labelRoot,
                                }}
                                label="Rango personalizado"
                            />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}>
                        <FormLabel className={classes.label}>
                            Desde
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <CustomInput
                            margin="dense"
                            id="fechaInicial"
                            classes={{ marginTop: '-15px' }}
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                type: "date",
                                onChange: (e) => setFechaInicialInput(e.target.value),
                                value: fechaInicialInput,
                                disabled: enableFechaPersonalizada,
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}>
                        <FormLabel className={classes.label}>
                            Hasta
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <CustomInput
                            margin="dense"
                            id="fechaFinal"
                            classes={{ marginTop: '-15px' }}
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                type: "date",
                                onChange: (e) => setFechaFinalInput(e.target.value),
                                value: fechaFinalInput,
                                disabled: enableFechaPersonalizada,
                            }}
                        />
                    </GridItem>
                </GridContainer>
                {/*<GridContainer alignItems="center">
                    <GridItem xs={12} sm={12} md={2}>
                        <FormLabel className={classes.label}>
                            Respuesta Cliente
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                displayEmpty
                                defaultValue={respuestaCliente}
                                value={respuestaCliente}
                                onChange={(event) => {
                                    setRespuestaCliente(event.target.value);
                                }}
                                inputProps={{
                                    name: "Estado",
                                }}
                            >
                                <MenuItem
                                    key="0"
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value="vacio"
                                >
                                    Sin respuesta
                                </MenuItem>
                                <MenuItem
                                    key="1"
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value="Rechazado"
                                >
                                    Rechazado
                                </MenuItem>
                                <MenuItem
                                    key="2"
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value="Aceptado"
                                >
                                    Aceptado
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </GridItem>
                </GridContainer>*/}
                <GridContainer alignItems="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <Button
                            style={{ float: "right" }}
                            color="rose"
                            onClick={() => aplicarFiltros(true)}
                        >
                            <span>Aplicar Filtros</span>   <SearchIcon />
                        </Button>
                        {/*<Button
                            style={{ float: "right" }}
                            color="rose"
                            onClick={() => limpiarFiltros()}
                        >
                            <span>Limpiar Filtros</span>   <FindReplaceIcon />
            </Button>*/}
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );
}

FormFiltrosTramites.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createItem: PropTypes.func.isRequired,
    searchItem: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  export default FormFiltrosTramites;