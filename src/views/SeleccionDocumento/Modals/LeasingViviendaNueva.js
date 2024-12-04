import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Attachment from "@material-ui/icons/Attachment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { message } from 'antd';

const useStyles = makeStyles(theme => ({
    root: { color: 'black', fontSize: '18px' },
}));

//ant design


export default function LeasingViviendaNueva() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const auth = useSelector((state) => state.auth);
    const [numeroDocu, setNumeroDocu] = useState('');
    const [numeroAparta, setNumeroAparta] = useState('');
    const [numberOrden, setNumberOrden] = useState('')
    const [formaPago, setFormaPago] = useState('')
    const [nombrePropie, setNombrePropie] = useState('')
    const [comentarios, setComentarios] = React.useState('');
    const [valorInicial, setValorInicial] = useState('');
    const [valorContrato, setValorContrato] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [plazo, setPlazo] = useState('');
    const [camaraComercioVende, setCamaraComercioVende] = useState(null);
    const [camaraComercioCompra, setCamaraComercioCompra] = useState(null);
    const [contratoLeasing, setContratoLeasing] = useState(null);
    const [pazSalvoMunicipal, setPazSalvoMunicipal] = useState(null);
    const [cartaProrrateo, setCartaProrrateo] = useState(null);
    const [pazSalvoDepartamental, setPazSalvoDepartamental] = useState(null);
    const [pazSalvoAdministra, setPazSalvoAdministra] = useState(null);
    const [poderes, setPoderes] = useState(null);
    const formData = new FormData();

    //alert key
    const key = 'updatable';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onCamaraComercioVendeChange = event => {
        // Update the state 
        setCamaraComercioVende(event.target.files[0]);
    };

    const camaraComercioVendeData = () => {
        if (camaraComercioVende) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {camaraComercioVende.name}</p>
                </div>
            );
        } else {
            return (
                <div style={{ fontSize: 10, color: '#E36767' }}>
                    Selecciona un archivo
                </div>
            );
        }
    };

    const onCamaraComercioCompraChange = event => {
        // Update the state 
        let temp = event.target.files[0];
        temp._name = 'compraventa'
        setCamaraComercioCompra(temp);
    };

    const camaraComercioCompraData = () => {
        if (camaraComercioCompra) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {camaraComercioCompra.name}</p>
                </div>
            );
        } else {
            return (
                <div style={{ fontSize: 10, color: '#E36767' }}>
                    Selecciona un archivo
                </div>
            );
        }
    };

    const onContratoLeasingChange = event => {
        // Update the state 
        setContratoLeasing(event.target.files[0]);
    };

    const contratoLeasingData = () => {
        if (contratoLeasing) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {contratoLeasing.name}</p>
                </div>
            );
        } else {
            return (
                <div style={{ fontSize: 10, color: '#E36767' }}>
                    Selecciona un archivo
                </div>
            );
        }
    };

    const onPazSalvoMunicipalChange = event => {
        // Update the state 
        setPazSalvoMunicipal(event.target.files[0]);
    };

    const pazSalvoMunicipalData = () => {
        if (pazSalvoMunicipal) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {pazSalvoMunicipal.name}</p>
                </div>
            );
        } else {
            return (
                <div style={{ fontSize: 10, color: '#E36767' }}>
                    Selecciona un archivo
                </div>
            );
        }
    };

    const onCartaProrrateoChange = event => {
        // Update the state 
        setCartaProrrateo(event.target.files[0]);
    };

    const cartaProrrateoData = () => {
        if (cartaProrrateo) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {cartaProrrateo.name}</p>
                </div>
            );
        } else {
            return (
                <div style={{ fontSize: 10, color: '#E36767' }}>
                    Selecciona un archivo
                </div>
            );
        }
    };

    const onPazSalvoDepartamentalChange = event => {
        // Update the state 
        setPazSalvoDepartamental(event.target.files[0]);
    };

    const pazSalvoDepartamentalData = () => {
        if (pazSalvoDepartamental) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {pazSalvoDepartamental.name}</p>
                </div>
            );
        } else {
            return (
                <div style={{ fontSize: 10, color: '#E36767' }}>
                    Selecciona un archivo
                </div>
            );
        }
    };

    const onPazSalvoAdministraChange = event => {
        // Update the state 
        setPazSalvoAdministra(event.target.files[0]);
    };

    const pazSalvoAdministraData = () => {
        if (pazSalvoAdministra) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {pazSalvoAdministra.name}</p>
                </div>
            );
        } else {
            return (
                <div style={{ fontSize: 10, color: '#E36767' }}>
                    Selecciona un archivo
                </div>
            );
        }
    };

    const onPoderesChange = event => {
        // Update the state 
        setPoderes(event.target.files[0]);
    };

    const poderesData = () => {
        if (poderes) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {poderes.name}</p>
                </div>
            );
        } else {
            return (
                <div style={{ fontSize: 10, color: '#E36767' }}>
                    Selecciona un archivo
                </div>
            );
        }
    };

    const sendData = () => {
        if ((numeroDocu && numeroAparta && numberOrden && formaPago && nombrePropie && valorInicial && valorContrato && valorTotal && plazo) !== '' && (camaraComercioVende && camaraComercioCompra && contratoLeasing && pazSalvoMunicipal && cartaProrrateo && pazSalvoDepartamental && pazSalvoAdministra && poderes)) {
            message.loading({ content: 'Creando Trámite...', key: key, duration: 10 });
            let config = {
                method: 'post',
                url: process.env.REACT_APP_URL_API + "/api/tramite",
                headers: { Authorization: `Bearer ${auth.token}` },
                data: formData,
            };

            formData.append('tipo_tramite', 'escritura');
            formData.append('tipo_documento', 'vivienda_nueva');
            formData.append('identificacion', numeroDocu);
            formData.append('numero_apto', numeroAparta);
            formData.append('numero_orden', numberOrden);
            formData.append('forma_pago', formaPago);
            formData.append('nombre_propietario', nombrePropie);
            formData.append('valor_cuota_inicial', valorInicial);
            formData.append('valor_contrato', valorContrato);
            formData.append('valor_total', valorTotal);
            formData.append('plazo', plazo);
            formData.append('anotaciones', comentarios);
            formData.append('documento_1', camaraComercioVende, 'camara_comercio_vendedor');
            formData.append('documento_2', camaraComercioCompra, 'camara_comercio_comprador');
            formData.append('documento_3', contratoLeasing, 'contrato_leasing');
            formData.append('documento_4', pazSalvoMunicipal, 'paz_salvo_municipal');
            formData.append('documento_5', cartaProrrateo, 'carta_prorrateo');
            formData.append('documento_6', pazSalvoDepartamental, 'paz_salvo_departamental');
            formData.append('documento_7', pazSalvoAdministra, 'paz_salvo_administracion');
            formData.append('documento_8', poderes, 'poderes');

            axios(config)
                .then((response) => {
                    message.success({ content: '¡Trámite Creado!', key: key, duration: 3 });
                    handleClose();
                    setNumeroDocu('');
                    setNumeroAparta('');
                    setNumberOrden('');
                    setFormaPago('');
                    setNombrePropie('');
                    setValorInicial('');
                    setValorContrato('');
                    setValorTotal('');
                    setPlazo('');
                    setComentarios('');
                    setCamaraComercioVende(null);
                    setCamaraComercioCompra(null);
                    setContratoLeasing(null);
                    setPazSalvoMunicipal(null);
                    setCartaProrrateo(null);
                    setPazSalvoDepartamental(null);
                    setPazSalvoAdministra(null);
                    setPoderes(null);
                })
                .catch((e) => {
                    message.error({ content: 'No se pudo crear el tramite', key: key, duration: 3 })
                })

        } else {
            message.error({ content: 'Es necesario diligenciar los campos requeridos', key: key, duration: 2 })
        }
    }
    console.log(camaraComercioCompra)

    return (
        <div>
            <Button style={{ width: '100%' }} color="mi" onClick={handleClickOpen}>
                Solicitar
            </Button>
            <Dialog fullWidth="true" maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ paddingTop: '25px' }}>Leasing de vivienda nueva</DialogTitle>
                <DialogContent>
                    <form >
                        <GridContainer >
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    labelText="Número de orden"
                                    labelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.root,
                                        }
                                    }}
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true,
                                    }}
                                    inputProps={{
                                        type: "number",
                                        onChange: (e) => setNumberOrden(e.target.value),
                                        value: numberOrden,
                                    }}
                                />
                            </GridItem>
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    labelText="Número de apartamento"
                                    labelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.root,
                                        }
                                    }}
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true,
                                    }}
                                    inputProps={{
                                        type: "number",
                                        onChange: (e) => setNumeroAparta(e.target.value),
                                        value: numeroAparta,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer >
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    labelText="Nombre del propietario"
                                    labelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.root,
                                        }
                                    }}
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true,
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: (e) => setNombrePropie(e.target.value),
                                        value: nombrePropie,
                                    }}
                                />
                            </GridItem>
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    labelText="Número de documento"
                                    labelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.root,
                                        }
                                    }}
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true,
                                    }}
                                    inputProps={{
                                        type: "number",
                                        onChange: (e) => setNumeroDocu(e.target.value),
                                        value: numeroDocu,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer >
                            <GridItem className={classes.color} md={6}>
                                <FormControl
                                    fullWidth
                                >
                                    <InputLabel
                                        htmlFor="simple-select"
                                        className={classes.root}
                                        style={{ color: '#aaaaaa' }}
                                        shrink={true}
                                    >
                                        Forma de pago *
                                    </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select,

                                        }}
                                        inputProps={{
                                            value: formaPago,
                                            onChange: (e) => setFormaPago(e.target.value)
                                        }}
                                    >
                                        <MenuItem
                                            disabled
                                            classes={{
                                                root: classes.selectMenuItem
                                            }}
                                        >
                                            Escoger...
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Leasing"
                                        >
                                            Leasing
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Hipoteca"
                                        >
                                            Hipoteca
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    labelText="Valor Cuota inicial"
                                    labelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.root,
                                        }
                                    }}
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true,
                                    }}
                                    inputProps={{
                                        type: "number",
                                        onChange: (e) => setValorInicial(e.target.value),
                                        value: valorInicial,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer >
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    labelText="Valor del Contrato"
                                    labelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.root,
                                        }
                                    }}
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true,
                                    }}
                                    inputProps={{
                                        type: "number",
                                        onChange: (e) => setValorContrato(e.target.value),
                                        value: valorContrato,
                                    }}
                                />
                            </GridItem>
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    labelText="Valor total"
                                    labelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.root,
                                        }
                                    }}
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true,
                                    }}
                                    inputProps={{
                                        type: "number",
                                        onChange: (e) => setValorTotal(e.target.value),
                                        value: valorTotal,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer >
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    labelText="Plazo"
                                    labelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.root,
                                        }
                                    }}
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true,
                                    }}
                                    inputProps={{
                                        type: "date",
                                        onChange: (e) => setPlazo(e.target.value),
                                        value: plazo,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <div style={{ marginBottom: "10px" }} className={classes.formCategory}>
                            <span style={{ color: '#aaaaaa', fontSize: 14 }}><b>Anexos del Acto *</b></span>
                        </div>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Cámara y Comercio vendedor *</b></span>
                                {camaraComercioVendeData()}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1} >
                                <div style={{ marginTop: "0px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        size="sm"
                                        color="info"
                                    >
                                        <Attachment />
                                        SUBIR ARCHIVO
                                        <input
                                            type="file"
                                            accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                            style={{ display: "none" }}
                                            onChange={(e) => onCamaraComercioVendeChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Cámara y comercio comprador *</b></span>
                                {camaraComercioCompraData()}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1} >
                                <div style={{ marginTop: "0px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        size="sm"
                                        color="info"
                                    >
                                        <Attachment />
                                        SUBIR ARCHIVO
                                        <input
                                            type="file"
                                            accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                            style={{ display: "none" }}
                                            onChange={(e) => onCamaraComercioCompraChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Contrato de Leasing *</b></span>
                                {contratoLeasingData()}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1} >
                                <div style={{ marginTop: "0px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        size="sm"
                                        color="info"
                                    >
                                        <Attachment />
                                        SUBIR ARCHIVO
                                        <input
                                            type="file"
                                            accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                            style={{ display: "none" }}
                                            onChange={(e) => onContratoLeasingChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Paz y salvo Municipal *</b></span>
                                {pazSalvoMunicipalData()}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1} >
                                <div style={{ marginTop: "0px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        size="sm"
                                        color="info"
                                    >
                                        <Attachment />
                                        SUBIR ARCHIVO
                                        <input
                                            type="file"
                                            accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                            style={{ display: "none" }}
                                            onChange={(e) => onPazSalvoMunicipalChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Carta de prorrateo *</b></span>
                                {cartaProrrateoData()}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1} >
                                <div style={{ marginTop: "0px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        size="sm"
                                        color="info"
                                    >
                                        <Attachment />
                                        SUBIR ARCHIVO
                                        <input
                                            type="file"
                                            accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                            style={{ display: "none" }}
                                            onChange={(e) => onCartaProrrateoChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Paz y salvo Departamental *</b></span>
                                {pazSalvoDepartamentalData()}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1} >
                                <div style={{ marginTop: "0px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        size="sm"
                                        color="info"
                                    >
                                        <Attachment />
                                        SUBIR ARCHIVO
                                        <input
                                            type="file"
                                            accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                            style={{ display: "none" }}
                                            onChange={(e) => onPazSalvoDepartamentalChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Paz y salvo de administración *</b></span>
                                {pazSalvoAdministraData()}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1} >
                                <div style={{ marginTop: "0px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        size="sm"
                                        color="info"
                                    >
                                        <Attachment />
                                        SUBIR ARCHIVO
                                        <input
                                            type="file"
                                            accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                            style={{ display: "none" }}
                                            onChange={(e) => onPazSalvoAdministraChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Poderes *</b></span>
                                {poderesData()}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1} >
                                <div style={{ marginTop: "0px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        size="sm"
                                        color="info"
                                    >
                                        <Attachment />
                                        SUBIR ARCHIVO
                                        <input
                                            type="file"
                                            accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                            style={{ display: "none" }}
                                            onChange={(e) => onPoderesChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    id="standard-multiline-flexible"
                                    labelText="Anotaciones"
                                    labelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.root,
                                        }
                                    }}
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: (e) => setComentarios(e.target.value),
                                        value: comentarios,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <div className={classes.formCategory}>
                            <span style={{ color: '#aaaaaa', fontSize: 14 }}> De ser necesario alguna nota, escribirla en el campo anotaciones.</span>
                        </div>
                        <div className={classes.formCategory}>
                            <span style={{ color: '#E36767', fontSize: 12 }}><small>*</small> Campos requeridos</span>
                        </div>
                    </form>
                </DialogContent>
                <div style={{ padding: '23px' }}>
                    <DialogActions style={{ display: 'contents' }}>
                        <Button color="rose" size="sm" onClick={handleClose} style={{ float: 'left' }}>
                            Cancelar
                        </Button>
                        <Button color="rose" size="sm" onClick={sendData} style={{ float: 'right' }}>
                            Continuar
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}