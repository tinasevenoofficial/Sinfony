import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import { EXTERNAL_API_PATHS } from 'utils/constants';
import {useDispatch,useSelector} from 'react-redux';
import { Controller, useForm } from "react-hook-form";

// @material-ui/core components
import { makeStyles, styled } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
// import Collapse from '@material-ui/core/Collapse';

// material-ui icons
//import Price from "@material-ui/icons/AddShoppingCart";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import FormLabel from "@material-ui/core/FormLabel";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import Button from "components/CustomButtons/Button.js";
import Selects from "@material-ui/core/Select";

import FormatearNum from "components/ComponenteFormatearNumero/Formatear_numeros"
import { PAYMENT_METHODS } from "../../utils/constants";

// importar modal
import Persona from "views/Persona/Otorgante";
import Dialog from "../Components/Methods/DialogMethods";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import stylesForms from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import stylesTables from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import stylesButton from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.js";
import DnsIcon from "@material-ui/icons/Dns";

import { Spin, message, Select } from 'antd';

import { infoColor, primaryColor } from "assets/jss/material-dashboard-pro-react.js";
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

const { Option } = Select;
const useStyles = makeStyles(styles);
const useStylesForm = makeStyles(stylesForms);
const useStylesTables = makeStyles(stylesTables);
const useStylesButton = makeStyles(stylesButton)

export default function Depositos({ tipoDeposito, num_deposito }) {

    const { control, handleSubmit, register, formState: { errors }, watch, setValue, setError } = useForm({ reValidateMode: 'onChange' });
    const auth = useSelector((state) =>   state.auth);

    const dispatch = useDispatch();

    const classes = useStyles();
    const classesForm = useStylesForm();
    const classesTables = useStylesTables();
    const classesButton = useStylesButton();
    const [] = useState([]);

    const [prev, setPrev] = useState(false);
    const [loadingPrint, setLoadingPrint] = useState(false);
    const [numRad, setNumRad] = useState();
    // const [data, setData] = useState({
    //     num_deposito: '',
    //     fecha_deposito: '',
    //     otorgante: '',
    //     //documento_otorgante: '',
    //     id_personas: '',
    //     boleta: '',
    //     notaria: '',
    //     registro: '',
    //     observaciones: '',
    //     id_radicacion: '',
    //     id_proyecto: '',
    //     method_data: '',
    // });
    const [loading, setLoading] = useState(false)
    const [Request, setRequest] = useState('');
    const [fecha, setFecha] = useState('');
    const [NumDeposito, setNumDeposito] = useState('');
    const [otorgantes, setOtorgantes] = useState([]);
    const [datosOtor, setDatosOtor] = useState([]);
    const [documento, setDocumento] = useState('');
    const [selectOtorgante, setSelectOtor] = useState('');
    const [gastoNot, setGasNot] = useState('');
    const [boleta, setBoleta] = useState('');
    const [registro, setRegistro] = useState('');
    const [openModalPerson, setOpenModalPerson] = useState(false);
    const [newPerson, setNewPerson] = useState('');
    const [radicacion, setRadicacion] = useState('');
    const [escritura, setEscritura] = useState('');
    const [proyecto, setProyecto] = useState('');
    const [busquedaPor, setBusquedaPor] = useState('');
    const [selectProyecto, setSelectProyecto] = useState('');
    const [proyectos, setProyectos] = useState([]);
    const [observacion, setobservacion] = useState('');
    const [totalGasNot, setTotalGasNot] = useState('');
    const [totalBoleta, setTotalBoleta] = useState('');
    const [totalRegistro, setTotalRegistro] = useState('');
    const [idPersona, setIdPersona] = useState('');
    const [idRadicacion, setIdRadicacion] = useState('');
    const [idProyecto, setidProyecto] = useState('');
    const [methodPago, setmethodPago] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [open, setOpen] = useState(null);
    const [method, setMethod] = useState(0);
    const [nameTipoPago, setNameTipoPago] = useState(0);
    const [deposito, setDeposito] = useState(
        {
            gastoNot: '',
            boleta: '',
            registro: ''
        }
    );

    const didMount = useRef(false);
    const methodRef = useRef();

    const setTotal = parseInt(totalGasNot) + parseInt(totalBoleta) + parseInt(totalRegistro);
    let busqueda = (<div></div>);
    let vista = (<div></div>);


    useEffect(() => {
        if (num_deposito === undefined) {

            setFecha(fechaActual());
            getConsecutivo();
        }
        isEdit();
        setBoleta();
        consultarProyectos();
    }, []);

    useEffect(() => {

        if (didMount.current) {
            console.log(newPerson)
            let namePerson = newPerson.nombres + ' ' + newPerson.apellidos;
            setSelectOtor(namePerson);
            setDocumento(newPerson.numero_documento.toString());
            setDatosOtor([...datosOtor, newPerson]);
            setIdPersona(newPerson.id);
            addNewPerson(namePerson);
        }
        else {
            didMount.current = true;
        }
    }, [newPerson]);

    useEffect(() => {
        consultarProyectos();
          setOtorgantes([]);
          setDatosOtor([]);
          setDocumento('');
          setSelectOtor('');
          setGasNot('');
          setBoleta('');
          setRegistro('');
          setRadicacion('');
          setEscritura('');
          setProyecto('') ;
          setSelectProyecto('');
          setProyectos([]);
          setobservacion('');
          setTotalGasNot();
          setTotalBoleta();
          setTotalRegistro();
          setIdPersona();
          setIdRadicacion();
          setidProyecto('');
          setDeposito(
            {
                gastoNot: '',
                boleta: '',
                registro: ''
            }
          );

    }, [tipoDeposito]);

    useEffect(() => {

        setTotalGasNot(saveTotales(gastoNot))
    }, [gastoNot])

    useEffect(() => {

        setTotalBoleta(saveTotales(boleta))
    }, [boleta])

    useEffect(() => {

        setTotalRegistro(saveTotales(registro))
    }, [registro])

    const addNewPerson = (person) => {

        let element = {

            value: person,
            label: person,
        };
        setOtorgantes([...otorgantes, element]);
    }

    const isEdit = () => {
        if ((num_deposito !== undefined)) {
            setLoading(true);
           
            axios.get(EXTERNAL_API_PATHS.depositos+'?numero_deposito='+num_deposito)
            .then((response)=>{
                const {data} = response;
                // setData(...response.data);
                setDeposito({
                    gastoNot:data[0].notaria,
                    boleta: data[0].boleta,
                    registro: data[0].registro
                });
                setFecha(data[0].fecha_deposito);
                setNumDeposito(data[0].numero_deposito);
                setSelectOtor(data[0].otorgante)
                addNewPerson(data[0].otorgante);
                setGasNot(data[0].notaria.toString());
                setBoleta(data[0].boleta.toString());
                setRegistro(data[0].registro.toString());
                setobservacion(data[0].observaciones);
                const {method_data} = data[0];
                setDocumento(method_data.documento);
                methodRef.current.value = method_data.method;
                // setMethod(PAYMENT_METHODS.find((m) => m.id === methodRef.current.value));
                setNameTipoPago(methodRef.current.value);
                setIdPersona(data[0].id_personas);
                setIdRadicacion(data[0].id_radicacion);
                setidProyecto(data[0].id_proyecto);
                setmethodPago(method_data);
                setLoading(false);
            })
        }
    }

    const getConsecutivo = () => {

        setLoading(true)
       
        axios.get(EXTERNAL_API_PATHS.conseDepo)
            .then((response) => {

                setNumDeposito(response.data)
                setLoading(false)
            })
    };

    const fechaActual = () => {

        const fecha = new Date();
        let año = fecha.getFullYear()
        let mes =
            fecha.getMonth() + 1 < 10
                ? '0' + (fecha.getMonth() + 1).toString()
                : '' + (fecha.getMonth() + 1)
        let dia =
            fecha.getDate() < 10
                ? '0' + (fecha.getDate())
                : '' + (fecha.getDate())
        let hora =
            fecha.getHours() < 10 ? '0' + fecha.getHours() : '' + fecha.getHours()
        let minutos =
            fecha.getMinutes() < 10
                ? '0' + fecha.getMinutes()
                : +'' + fecha.getMinutes()
        let segundos =
            fecha.getSeconds() < 10
                ? '0' + fecha.getSeconds()
                : +'' + fecha.getSeconds()
        const fecha1 =
            año + '-' + mes + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos

        return fecha1
    };

    const view = () => {

        if (tipoDeposito === 'Deposito') {

            busqueda = (
                <GridContainer justify='center' style={{ backgroundColor: '#f2f2f2' }}>
                    <GridItem >
                        <CustomInput
                            labelText="Radicacion Nro."
                            id="Radicacion"
                            formControlProps={{

                            }}
                            inputProps={{
                                type: "text",
                                value: radicacion,
                                onChange: handleSearchRadicacion
                            }}
                            helpText="A block of help text that breaks onto a new line."
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            labelText="Escritura"
                            id="Escritura"
                            formControlProps={{

                            }}
                            inputProps={{
                                type: "text",
                                value: escritura,
                                onChange: handleSearchEscritura,
                            }}
                            helpText="A block of help text that breaks onto a new line."
                        />
                    </GridItem>
                    <GridItem style={{ marginTop: "10px" }}>
                        <Button
                            justIcon
                            color="rose"
                            className={classes.marginRight}
                            onClick={consultarTotales}
                        >
                            <span className="material-icons">
                                search
                            </span>
                        </Button>
                    </GridItem>
                </GridContainer >
            )
        }
        else if (tipoDeposito === 'Anticipo') {

            busqueda = (
                <GridContainer justify='center' style={{ backgroundColor: '#f2f2f2' }}>
                    <GridItem xs={6} >
                        <GridContainer justify='center'>
                            <Select
                                showSearch
                                dropdownStyle={{ zIndex: 2000 }}
                                style={{ width: "50%" }}
                                placeholder="Seleccione proyecto"
                                optionFilterProp="children"
                                onChange={handleChangeProyecto}
                                filterOption={
                                    (input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                        0

                                    // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {proyectos.map((option) => (
                                    <Option value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </GridContainer>
                    </GridItem>
                </GridContainer >
            )
        }
        else {
            busqueda = (<div></div>)
        }

        if ((tipoDeposito === 'Deposito') || (tipoDeposito === 'Anticipo') || (num_deposito !== undefined)) {
            vista = (
                <Spin spinning={loading}>
                    <CardBody>
                        <ThemeProvider theme={themeInputInfo}>
                            <GridContainer justify='center'>
                                <GridItem xs={2}>
                                    <FormLabel className={classesForm.labelHorizontal} style={{ fontSize: '18px' }}>
                                        <b>Nro Deposito</b>
                                    </FormLabel>
                                </GridItem>
                                <GridItem >
                                    <CustomInput
                                        style={{ padding: '200px' }}
                                        id='NumDepo'
                                        formControlProps={{
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: NumDeposito,
                                        }}
                                    />
                                </GridItem>
                                <GridItem >
                                    <FormLabel className={classesForm.labelHorizontal} style={{ fontSize: '18px' }}>
                                        <b>Fecha</b>
                                    </FormLabel>
                                </GridItem>
                                <GridItem >
                                    <CustomInput
                                        style={{ padding: '200px' }}
                                        id='fecharad'
                                        formControlProps={{
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: fecha
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            {busqueda}
                            <GridContainer style={{ padding: 20 }} justify='center'>
                                <GridItem style={{ marginTop: "40px" }}>
                                    <FormLabel style={{ fontSize: '15px' }}>
                                        Otorgante
                                    </FormLabel>
                                </GridItem>
                                <GridItem style={{ marginTop: "30px" }} xs={3}>
                                    <TextField
                                        id="Otorgante"
                                        select
                                        value={selectOtorgante}
                                        onChange={handleChange}
                                        helperText="Selecciona un otorgante"
                                        fullWidth={true}
                                    >
                                        {otorgantes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </GridItem>
                                <GridItem>
                                    <CustomInput
                                        id='Documento'
                                        labelText="Documento"
                                        formControlProps={{
                                        }}
                                        inputProps={{
                                            type: 'text',
                                            value: documento
                                        }}
                                    />
                                </GridItem>
                                <GridItem style={{ marginTop: "20px" }}>
                                    <Button
                                        justIcon
                                        color="rose"
                                        className={classes.marginRight}
                                        onClick={() => setOpenModalPerson(true)}
                                    >
                                        <span className="material-icons">
                                            personadd
                                        </span>
                                    </Button>
                                    <Persona
                                        open={openModalPerson}
                                        title='Usuario'
                                        handleClose={setOpenModalPerson}
                                        addPerson={setNewPerson}
                                        integrado={true}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify='center' >
                                <GridItem style={{ border: '1px solid gray', marginTop: '20px', borderRadius: 16, justify: 'center' }} xs={6}>
                                    <GridContainer justify='center'>
                                        <GridItem style={{ marginTop: '30px' }} xs={4}>
                                            <FormLabel style={{ fontSize: '20px' }}>
                                                Gastos Notariales
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem>
                                            <CustomInput
                                                id="GastosNotariales"
                                                formControlProps={{

                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    value: FormatearNum(gastoNot),
                                                    onChange: handleGastosNotariales
                                                }}
                                                helpText="A block of help text that breaks onto a new line."
                                                fullWidth={true}

                                            />
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>

                            </GridContainer>
                            <GridContainer justify='center' >
                                <GridItem style={{ border: '1px solid gray', marginTop: '20px', borderRadius: 16 }} xs={6}>
                                    <GridContainer justify='center'>
                                        <GridItem style={{ marginTop: '30px' }} xs={4}>
                                            <FormLabel style={{ fontSize: '20px' }}>
                                                Boleta
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem>
                                            <CustomInput
                                                id="Boleta"
                                                formControlProps={{

                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    value: FormatearNum(boleta),
                                                    onChange: handleBoleta
                                                }}
                                                helpText="A block of help text that breaks onto a new line."
                                                fullWidth={true}

                                            />
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>

                            </GridContainer>
                            <GridContainer justify='center'>
                                <GridItem style={{ border: '1px solid gray', marginTop: '20px', borderRadius: 16 }} xs={6}>
                                    <GridContainer justify='center'>
                                        <GridItem style={{ marginTop: '30px' }} xs={4}>
                                            <FormLabel style={{ fontSize: '20px' }}>
                                                Registro
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem>
                                            <CustomInput
                                                id="Registro"
                                                formControlProps={{

                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    value: FormatearNum(registro),
                                                    onChange: handeRegistro
                                                }}
                                                helpText="A block of help text that breaks onto a new line."
                                                fullWidth={true}

                                            />
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>

                            </GridContainer>
                            <GridContainer justify="center" style={{ padding: 20, marginTop: '30px' }}>
                                <GridItem xs={3}>
                                    <GridContainer>
                                        <GridItem style={{ width: '370px' }}>
                                            <TextField
                                                id="observaciones"
                                                label="Oservaciones"
                                                multiline
                                                rows={2}
                                                variant="outlined"
                                                fullWidth={true}
                                                onChange={writeObservacion}
                                                value={observacion}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                                <GridItem xs={3}>
                                    <GridContainer>
                                        <GridItem xs={12}>
                                            <FormLabel style={{ fontSize: '20px' }}>
                                                Forma de pago.
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem xs={8}>
                                            <FormControl fullWidth className={classes.selectFormControl}>
                                                <Selects
                                                    MenuProps={{
                                                        className: classes.selectMenu,
                                                    }}
                                                    classes={{
                                                        select: classes.select,
                                                    }}
                                                    displayEmpty
                                                    defaultValue={0}
                                                    inputProps={{
                                                        name: "method",
                                                        inputRef: methodRef,
                                                    }}
                                                    onChange={handleChangePago}
                                                    value={nameTipoPago}
                                                >
                                                    <MenuItem
                                                        disabled
                                                        value={0}
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                        }}
                                                    >
                                                        Seleccione
                                                    </MenuItem>
                                                    {PAYMENT_METHODS.map(({ name, id }) => (
                                                        <MenuItem
                                                            key={`method${id}`}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected,
                                                            }}
                                                            value={id}
                                                        >
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Selects>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem xs={4}>
                                            <Button
                                                color="rose"
                                                disabled={disabled}
                                                justIcon
                                                onClick={openMethod}
                                            >
                                                <DnsIcon />
                                            </Button>
                                        </GridItem>
                                        {open && (
                                            <Dialog
                                                open={open}
                                                setOpen={setOpen}
                                                method={method}
                                                onSave={(d) => saveMethodPago(d)}
                                                value={setTotal || 0}
                                            />
                                        )
                                        }
                                    </GridContainer>
                                </GridItem>
                                <Controller
                                  control={control}
                                  name={`.method_data`}
                                  render={({ field: { onChange } }) =>
                                    open && (
                                      <Dialog
                                        open={open}
                                        setOpen={setOpen}
                                        numRad={numRad}
                                        method={method}
                                        setData={watch(`.method_data`)}
                                        onSave={(d) => {
                                          onChange(d);
                                          setValue(`id_dian`, undefined);
                                          saveMethodPago(d)
                                          console.log(d)
                                        }}
                                        value={setTotal || 0}
                                      />
                                    )
                                  }
                                />
                            </GridContainer>
                            <GridContainer justify='center' style={{ marginTop: '5px' }}>
                                <GridItem xs={6}>
                                    <GridContainer justify="flex-end">
                                        <Button
                                            color='rose'
                                            className={classes.marginRight}
                                            onClick={archivar}
                                        >
                                            <span>
                                                ARCHIVAR
                                            </span>
                                        </Button>
                                    </GridContainer>
                                </GridItem>
                            </GridContainer>
                        </ThemeProvider>
                    </CardBody>
                </Spin>
            )
        }

        return vista
    }

    const handleSearchRadicacion = (event) => {

        setEscritura('');
        setProyecto('');
        setBusquedaPor(event.target.id);
        setRadicacion(event.target.value);
        if(event.target.value !== ''){
            setNumRad(event.target.value)
            setRequest(EXTERNAL_API_PATHS.totalesRadi+'?numero_radicacion='+event.target.value);
        }
        else {
            setRequest('')
        }

    };

    const handleSearchEscritura = (event) => {

        setRadicacion('');
        setProyecto('');
        setBusquedaPor(event.target.id);
        setEscritura(event.target.value);
        if (event.target.value !== '') {

            setRequest(EXTERNAL_API_PATHS.totalesRadi+'?numero_escritura=' + event.target.value);
        }
        else {
            setRequest('');
        }

    };

    const saveTotales = (num) => {

        while (num.indexOf('.') !== -1) {
            num = num.replace('.', '')
        }
        while(num.indexOf(',') !== -1){
            num = num.replace(',','.')
        }
        return parseFloat(num)
    };

    const validarInput = (value) => {
        let number = saveTotales(value);
        const regex = /[a-zA-Z]/;
        const haveLetter = regex.test(value)
        if(value == ''){
            return false
        }
        if (Number.isNaN(parseInt(number)) || haveLetter){
            return true;
        }
        return false;
    }
    const handleGastosNotariales = (event) => {

        if (validarInput(event.target.value)) {
            alert('por favor ingrese solo valores numericos')
        }
        else{
            if(!(deposito.gastoNot < saveTotales(event.target.value)) || deposito.gastoNot === ''){
                setGasNot(event.target.value);
                setTotalGasNot(saveTotales(event.target.value));
            }
            else{
                setGasNot(FormatearNum(deposito.gastoNot));
                setTotalGasNot(deposito.gastoNot);
            }
        }
    };

    const handleBoleta = (event) => {

        if (validarInput(event.target.value)) {
            alert('por favor ingrese solo valores numericos')
        }
        else{
            if(!(deposito.boleta < saveTotales(event.target.value)) || deposito.boleta === ''){
                setBoleta(event.target.value);
                setTotalBoleta(saveTotales(event.target.value));
            }
            else{
                setBoleta(FormatearNum(deposito.boleta));
                setTotalBoleta(deposito.boleta);
            }
        }
    };

    const handeRegistro = (event) => {

        if (validarInput(event.target.value)) {
            alert('por favor ingrese solo valores numericos')
        }
        else{
            if(!(deposito.registro < saveTotales(event.target.value)) || deposito.registro === ''){
                setRegistro(event.target.value);
                setTotalRegistro(saveTotales(event.target.value));
            }
            else{
                setRegistro(FormatearNum(deposito.registro));
                setTotalRegistro(deposito.registro);
            }
        }
    };

    const saveMethodPago = (data) => {

        setmethodPago(data);
    }
    const handleChange = (event) => {

        setSelectOtor(event.target.value);
        const datos = datosOtor.find(persona => persona.nombres + ' ' + persona.apellidos === event.target.value);
        setDocumento(datos.numero_documento.toString());
        console.log(datos);
        setIdPersona(datos.id);
    };

    const handleChangePago = (event) => {
        setDisabled(false);
        setNameTipoPago(event.target.value);
    }
    const handleChangeProyecto = (value) => {

        setSelectProyecto(value);
        const idProyect = proyectos.find(proyecto => proyecto.value === value);
        setidProyecto(idProyect.idProyecto.toString());
    };

    const writeObservacion = (event) => {

        setobservacion(event.target.value)
    };

    const resetState = () => {

        setSelectOtor('');
        setDocumento('');
        setGasNot('');
        setBoleta('');
        setRegistro('');
    };

    const archivar = () => {

        let data = {

            fecha_deposito: fecha,
            id_personas: idPersona,
            boleta: totalBoleta,
            notaria: totalGasNot,
            registro: totalRegistro,
            deposito: NumDeposito,
            otros: null,
            observaciones: observacion,
            id_usuarios: null,
            id_radicacion: idRadicacion,
            id_proyecto: idProyecto,
            method_data: [methodPago],

        }
        console.log(data)
        setLoading(true)
        let config = {
            headers: { Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin': true },
        };
        axios.post(EXTERNAL_API_PATHS.depositos,data)
        .then((response)=>{
            if(response.status === 200){

                message.success('Datos enviados correctamente');
            }
            else{
                console.log(response.status)
                message.error('Ha ocurrido un error');
            }
            setLoading(false);
        })
        .catch((error) => {
          message.error('Ha ocurrido un error');
          setLoading(false);
        })
    };

    const consultarProyectos = () => {

        let config = {
            headers: { Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin': true },
        };
        axios.get(EXTERNAL_API_PATHS.proyecto)
            .then((response) => {

                const { data } = response;
                let proyecto = [];
                data.map((value) => {

                    let element = {

                        value: value.name,
                        label: value.name,
                        idProyecto: value.id,
                    }

                    proyecto.push(element)
                });
                setProyectos(proyecto)
            });
    };

    const consultarTotales = () => {

        if (Request !== '') {
            resetState('');
            setLoading(true);
            axios.get(Request)
            .then((response)=>{
                setLoading(false)
                let otorgante = [];

                const [data] = response.data;
                setDeposito({
                    gastoNot: saveTotales(data.derechos_notariales.total),
                    boleta: saveTotales(data.boleta.total),
                    registro: saveTotales(data.registro.total)
                });
                setGasNot(data.derechos_notariales.total);
                setRegistro(data.registro.total);
                setBoleta(data.boleta.total);
                setSelectProyecto(data.proyecto?.name);
                setIdRadicacion(data.id_radicacion);
                let idproyecto;
                if(data.proyecto?.id === undefined){

                    idproyecto = null;
                }
                else {

                        idproyecto = data.proyecto.id;
                    }
                    setidProyecto(idproyecto);
                    data.otorgantes.map((value) => {

                        let element = {

                            value: value.nombres + ' ' + value.apellidos,
                            label: value.nombres + ' ' + value.apellidos,
                        }

                        otorgante.push(element)
                    })
                    setDatosOtor(data.otorgantes);
                    setOtorgantes(otorgante);
                });
        }
        else {

            alert('por favor ingrese un valor (radicacion o escritura)')
        }
    };

    const openMethod = () => {
        setMethod(PAYMENT_METHODS.find((m) => m.id === methodRef.current.value));
        setOpen(true);
    };


    return (
        // <Card>
        view()
        // </Card>
    )
}