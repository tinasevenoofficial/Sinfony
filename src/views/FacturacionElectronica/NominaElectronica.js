/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { message } from 'antd';
// @material-ui/core components
import { Table, Form } from "antd";

// @material-ui/icons
import SearchIcon from '@material-ui/icons/Search';
import Check from "@material-ui/icons/Check";
import FindReplaceIcon from '@material-ui/icons/FindReplace';

// core components
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


const title = "Listado de Proyectos";
const name = "Listado de Facturas";
const key = "facturacion";

import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";

export default function NominaElectronica() {

    const auth = useSelector((state) => state.auth);
    const searchInput = useRef();
    const classes = useStyles();
    const [datosFacturas, setDatosFacturas] = useState();
    const [fechaInicialInput, setFechaInicialInput] = useState();
    const [fechaFinalInput, setFechaFinalInput] = useState();
    const [fechaInicialDefinida, setFechaInicialDefinida] = useState();
    const [fechaFinalDefinida, setFechaFinalDefinida] = useState();
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');
    const [fechaControlado, setFechaControlado] = useState(1);
    const [estadoDianSeleccionado, setEstadoDianSeleccionado] = useState('vacio');
    const [prefijos, setPrefijos] = useState([]);
    const [prefijoSeleccionado, setPrefijoSeleccionado] = useState('vacio');
    const [enableFechaPersonalizada, setEnableFechaPersonalizada] = useState(true);
    const [updateTable, setUpdateTable] = useState('');
    const [messageKey, setMessageKey] = useState("update")

    const {
        formEdit,
        data,
        loading,
        onEdit,
        onDelete,
        updateOnEdit,
        updateData,
        editItemProyecto,
        delItemProyecto,
        saveProyecto,
        isEditingProyecto,
        cancel,
    } = useTable({ key });

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
    useEffect(() => {
        axios.get(EXTERNAL_API_PATHS[key]).then((res) => {
            updateData(res.data);
        });
    }, []);

    //consulta traer información de filtros (Prefijos)
    useEffect(() => {
        axios.get(EXTERNAL_API_PATHS.documentsFiltros).then((res) => {
            setPrefijos(res.data.prefijos)
        });
    }, []);

    useEffect(() => {
        setUpdateTable(false)
        updateData(datosFacturas);
    }, [updateTable]);


    const aplicarFiltros = () => {
        var filtrar = true;
        message.loading({ content: `Cargando...`, key: messageKey });
        const formDataFiltros = {
            prefix: prefijoSeleccionado,
            tercero: empleadoSeleccionado ? empleadoSeleccionado : "vacio",
            estado_dian: estadoDianSeleccionado,
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
            axios
                .get(process.env.REACT_APP_URL_API + '/api/documents', { headers: { Authorization: `Bearer ${auth.token}` }, params: formDataFiltros })
                .then((res) => {
                    setDatosFacturas(res.data)
                    setUpdateTable(true)
                    message.success({ content: `Se han aplicado correctamente los filtros`, key: messageKey });
                })
                .catch(() => {
                    message.error({ content: `No se han podido aplicar los filtros`, key: messageKey });
                });
        }
    };

    const limpiarFiltros = () => {
        setFechaInicialDefinida();
        setFechaFinalDefinida();
        setFechaFinalInput('');
        setFechaInicialInput('');
        setEmpleadoSeleccionado('');
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

    useEffect(() => { console.log(prefijoSeleccionado) }, [prefijoSeleccionado]);

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary" text>
                            <CardText className={classes.cardText} color="primary">
                                <h4 className={classes.colorWhite}>Consulta de Nomina Electrónica</h4>
                            </CardText>
                        </CardHeader>
                        <CardBody>
                            <GridContainer alignItems="center">
                                <GridItem xs={12} sm={12} md={1}>
                                    <FormLabel className={classes.label}>
                                        Por Prefijo
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
                                        Por Empleado
                                    </FormLabel>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        margin="dense"
                                        id="empleado"
                                        labelText="Empleado"

                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: (e) => setEmpleadoSeleccionado(e.target.value),
                                            value: empleadoSeleccionado,
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={2}>
                                    <FormLabel className={classes.label}>
                                        Por Estado DIAN:
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
                                            }} a
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
                            </GridContainer>
                            <GridContainer alignItems="center">
                                <GridItem xs={12} sm={12} md={1}>
                                    <FormLabel className={classes.label}>
                                        Por Fecha
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
                                                //   inputRef: dateRef,
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
                                            label="¿Desea un rango personalizado?"
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
                            <GridContainer alignItems="center">
                                <GridItem xs={12} sm={12} md={12}>
                                    <Button
                                        style={{ float: "right" }}
                                        color="rose"
                                        onClick={() => aplicarFiltros(true)}
                                    >
                                        <span>Aplicar Filtros</span>   <SearchIcon />
                                    </Button>
                                    <Button
                                        style={{ float: "right" }}
                                        color="rose"
                                        onClick={() => limpiarFiltros()}
                                    >
                                        <span>Limpiar Filtros</span>   <FindReplaceIcon />
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
                <br></br>
            </GridContainer>
            <Form form={formEdit} component={false}>
            {data && data.length && <Table
                    className={classes.table}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    size="sm"
                    bordered
                    scroll={{ x: 500 }}
                    dataSource={data}
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
                    )}
                    loading={loading}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                        pageSize: 5,
                    }}
                />}
            </Form>
        </>
    );
}
