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

//ant design
import { message } from 'antd';

const useStyles = makeStyles(theme => ({
    root: { color: 'black', fontSize: '18px' },
}));


export default function LeasingViviendaUsada() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const auth = useSelector((state) => state.auth);
    const [numeroDocu, setNumeroDocu] = useState('');
    const [numeroAparta, setNumeroAparta] = useState('');
    const [numeroDocuConyuge, setNumeroDocuConyuge] = useState('');
    const [nombreConyuge, setNombreConyuge] = useState('');
    const [numberOrden, setNumberOrden] = useState('')
    const [nombrePropie, setNombrePropie] = useState('')
    const [comentarios, setComentarios] = React.useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [afectaVivienda, setAfectaVivienda] = useState('');
    const [formaPago, setFormaPago] = useState('');
    const [valorInicial, setValorInicial] = useState('');
    const [valorPrestamo, setValorPrestamo] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [minuta, setMinuta] = useState(null);
    const [aprobacion, setApobacion] = useState(null);
    const [propiedad, setPropiedad] = useState(null);
    const [escrituraAdquisicion, setEscrituraAdquisicion] = useState(null);
    const [libertad, setLibertad] = useState(null);
    const [impuesto, setImpuesto] = useState(null);
    const [valorizacion, setValorizacion] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [fichaCata, setFichaCata] = useState(null);
    const [poderPersona, setPoderPersona] = useState(null);
    const [camaraBanco, setCamaraBanco] = useState(null);
    const [superFinanciero, setSuperFinanciero] = useState(null);
    const [retencion, setRetencion] = useState(null);
    const [opcional, setOpcional] = useState(null);
    const formData = new FormData();

    //alert key
    const key = 'updatable';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onLibertadChange = event => {
        // Update the state 
        setLibertad(event.target.files[0]);
    };

    const libertadData = () => {
        if (libertad) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {libertad.name}</p>
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

    const onMinutaChange = event => {
        // Update the state 
        setMinuta(event.target.files[0]);
    };

    const minutaData = () => {
        if (minuta) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {minuta.name}</p>
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

    const onAprobacionChange = event => {
        // Update the state 
        setApobacion(event.target.files[0]);
    };

    const aprobacionData = () => {
        if (aprobacion) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {aprobacion.name}</p>
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

    const onValorizacionChange = event => {
        // Update the state 
        setValorizacion(event.target.files[0]);
    };

    const valorizacionData = () => {
        if (valorizacion) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {valorizacion.name}</p>
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

    const onEscrituraAdquisicionChange = event => {
        // Update the state 
        setEscrituraAdquisicion(event.target.files[0]);
    };

    const escrituraAdquisicionData = () => {
        if (escrituraAdquisicion) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {escrituraAdquisicion.name}</p>
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

    const onPropiedadChange = event => {
        // Update the state 
        setPropiedad(event.target.files[0]);
    };

    const propiedadData = () => {
        if (propiedad) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {propiedad.name}</p>
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

    const onImpuestoChange = event => {
        // Update the state 
        setImpuesto(event.target.files[0]);
    };

    const impuestoData = () => {
        if (impuesto) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {impuesto.name}</p>
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

    const onAdminChange = event => {
        // Update the state 
        setAdmin(event.target.files[0]);
    };

    const adminData = () => {
        if (admin) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {admin.name}</p>
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

    const onFichaCataChange = event => {
        // Update the state 
        setFichaCata(event.target.files[0]);
    };

    const fichaCataData = () => {
        if (fichaCata) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {fichaCata.name}</p>
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

    const onCamaraBancoDataChange = event => {
        // Update the state 
        setCamaraBanco(event.target.files[0]);
    };

    const camaraBancoData = () => {
        if (camaraBanco) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {camaraBanco.name}</p>
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

    const onPoderPersonaChange = event => {
        // Update the state 
        setPoderPersona(event.target.files[0]);
    };

    const poderPersonaData = () => {
        if (poderPersona) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {poderPersona.name}</p>
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

    const onSuperFinancieraChange = event => {
        // Update the state 
        setSuperFinanciero(event.target.files[0]);
    };

    const superfinancieraData = () => {
        if (superFinanciero) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {superFinanciero.name}</p>
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

    const onRetencionChange = event => {
        // Update the state 
        setRetencion(event.target.files[0]);
    };

    const retencionData = () => {
        if (retencion) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {retencion.name}</p>
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

    const onOpcionalChange = event => {
        // Update the state 
        setOpcional(event.target.files[0]);
    };

    const opcionalData = () => {
        if (opcional) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {opcional.name}</p>
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
        if ((numeroDocu && numeroAparta && numberOrden && formaPago && nombrePropie && valorInicial && numeroDocuConyuge && valorTotal && valorPrestamo && nombreConyuge && estadoCivil && afectaVivienda) !== '' && (minuta && aprobacion && propiedad && escrituraAdquisicion && libertad && impuesto && valorizacion && admin && fichaCata && poderPersona && camaraBanco && superFinanciero && retencion && opcional)) {
            message.loading({ content: 'Creando Trámite...', key: key, duration: 10 });
            let config = {
                method: 'post',
                url: process.env.REACT_APP_URL_API + "/api/tramite",
                headers: { Authorization: `Bearer ${auth.token}` },
                data: formData,
            };

            formData.append('tipo_tramite', 'escritura');
            formData.append('tipo_documento', 'vivienda_usada');
            formData.append('identificacion', numeroDocu);
            formData.append('identificacion_conyugue', numeroDocuConyuge);
            formData.append('estado_civil', estadoCivil);
            formData.append('nombre_conyugue', nombreConyuge);
            formData.append('numero_apto', numeroAparta);
            formData.append('numero_orden', numberOrden);
            formData.append('forma_pago', formaPago);
            formData.append('prestamo', valorPrestamo);
            formData.append('nombre_propietario', nombrePropie);
            formData.append('valor_cuota_inicial', valorInicial);
            formData.append('valor_total', valorTotal);
            formData.append('afectación_vivienda', afectaVivienda);
            formData.append('anotaciones', comentarios);
            formData.append('documento_1', minuta, 'minuta');
            formData.append('documento_2', aprobacion, 'carta_aprobacion');
            formData.append('documento_3', propiedad, 'reglamento_propiedad_raiz');
            formData.append('documento_4', escrituraAdquisicion, 'copia_escritura_adquisicion');
            formData.append('documento_5', libertad, 'certificado_libertad_tradicion');
            formData.append('documento_6', impuesto, 'paz_salvo_impuesto_predial');
            formData.append('documento_7', valorizacion, 'valorizacion');
            formData.append('documento_8', admin, 'administracion');
            formData.append('documento_9', fichaCata, 'ficha_catastral');
            formData.append('documento_10', poderPersona, 'poder_persona_que_firma_por_banco');
            formData.append('documento_11', camaraBanco, 'camara_comercio_banco');
            formData.append('documento_12', superFinanciero, 'superfinanciera');
            formData.append('documento_13', retencion, 'pago_retencion_anticipada');
            formData.append('documento_14', opcional, 'opcional');

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
                    setValorPrestamo('');
                    setValorTotal('');
                    setAfectaVivienda('');
                    setComentarios('');
                    setEstadoCivil('');
                    setNombreConyuge('');
                    setNumeroDocuConyuge('');
                    setMinuta(null);
                    setApobacion(null);
                    setPropiedad(null);
                    setEscrituraAdquisicion(null);
                    setLibertad(null);
                    setImpuesto(null);
                    setValorizacion(null);
                    setAdmin(null);
                    setFichaCata(null);
                    setPoderPersona(null);
                    setCamaraBanco(null);
                    setSuperFinanciero(null);
                    setRetencion(null);
                    setOpcional(null);
                })
                .catch((e) => {
                    message.error({ content: 'No se pudo crear el tramite', key: key, duration: 3 })
                })
        } else {
            message.error({ content: 'Es necesario diligenciar los campos requeridos', key: key, duration: 2 })
        }
    }

    return (
        <div>
            <Button style={{ width: '100%' }} color="mi" onClick={handleClickOpen}>
                Solicitar
            </Button>
            <Dialog fullWidth="true" maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ paddingTop: '25px' }}>Leasing de vivienda usada</DialogTitle>
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
                                        shrink={true}
                                        style={{ color: '#aaaaaa' }}
                                    >
                                        Estado Civil *
                                    </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        inputProps={{
                                            value: estadoCivil,
                                            onChange: (e) => setEstadoCivil(e.target.value)
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
                                            value="Casado"
                                        >
                                            Casado
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Casada"
                                        >
                                            Casada
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Unión Libre"
                                        >
                                            Unión Libre
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem className={classes.color} md={6}>
                                <FormControl
                                    fullWidth
                                >
                                    <InputLabel
                                        htmlFor="simple-select"
                                        className={classes.root}
                                        shrink={true}
                                        style={{ color: '#aaaaaa' }}
                                    >
                                        Afectación de vivienda*
                                    </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        inputProps={{
                                            value: afectaVivienda,
                                            onChange: (e) => setAfectaVivienda(e.target.value)
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
                                            value="No"
                                        >
                                            No
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Si"
                                        >
                                            Si
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </GridItem>
                        </GridContainer>
                        <GridContainer >
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    labelText="Nombre completo del cónyuge"
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
                                        onChange: (e) => setNombreConyuge(e.target.value),
                                        value: nombreConyuge,
                                    }}
                                />
                            </GridItem>
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    labelText="Número de documento de identidad del cónyuge"
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
                                        onChange: (e) => setNumeroDocuConyuge(e.target.value),
                                        value: numeroDocuConyuge,
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
                                        shrink={true}
                                        style={{ color: '#aaaaaa' }}
                                    >
                                        Forma de pago *
                                    </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
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
                                    labelText="Valor del Préstamo"
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
                                        onChange: (e) => setValorPrestamo(e.target.value),
                                        value: valorPrestamo,
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
                        <div style={{ marginBottom: "10px" }} className={classes.formCategory}>
                            <span style={{ color: '#aaaaaa', fontSize: 14 }}><b>Adjuntos requeridos *</b></span>
                        </div>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Minuta *</b></span>
                                {minutaData()}
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
                                            onChange={(e) => onMinutaChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Carta de aprobación *</b></span>
                                {aprobacionData()}
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
                                            onChange={(e) => onAprobacionChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Reglamento de Propiedad Raíz *</b></span>
                                {propiedadData()}
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
                                            onChange={(e) => onPropiedadChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Copia de Escritura de adquisición *</b></span>
                                {escrituraAdquisicionData()}
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
                                            onChange={(e) => onEscrituraAdquisicionChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Certificado de Libertad y Tradición *</b></span>
                                {libertadData()}
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
                                            onChange={(e) => onLibertadChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Paz y Salvo de Impuesto Predial *</b></span>
                                {impuestoData()}
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
                                            onChange={(e) => onImpuestoChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Valorización *</b></span>
                                {valorizacionData()}
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
                                            onChange={(e) => onValorizacionChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Administración *</b></span>
                                {adminData()}
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
                                            onChange={(e) => onAdminChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Ficha Catastral *</b></span>
                                {fichaCataData()}
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
                                            onChange={(e) => onFichaCataChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Poder de la persona que va a firmar en nombre del Banco *</b></span>
                                {poderPersonaData()}
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
                                            onChange={(e) => onPoderPersonaChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Cámara y comercio del Banco *</b></span>
                                {camaraBancoData()}
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
                                            onChange={(e) => onCamaraBancoDataChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Superfinanciera *</b></span>
                                {superfinancieraData()}
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
                                            onChange={(e) => onSuperFinancieraChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Pago de la retención en la fuente anticipada *</b></span>
                                {retencionData()}
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
                                            onChange={(e) => onRetencionChange(e)}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Opcional *</b></span>
                                {opcionalData()}
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
                                            onChange={(e) => onOpcionalChange(e)}
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
        </div >
    );
}