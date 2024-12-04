import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Attachment from "@material-ui/icons/Attachment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

//ant design
import { message } from 'antd';

const useStyles = makeStyles(theme => ({
    root: { color: '#aaaaaa', fontSize: '18px' },
}));


export default function CopiaLibroVarios() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    //Variables
    const auth = useSelector((state) => state.auth);
    const [numeroDocu, setNumeroDocu] = useState('')
    const [numeroFolio, setNumeroFolio] = useState('')
    const [tipoCopia, setTipoCopia] = useState('')
    const [comentarios, setComentarios] = React.useState('');
    const [cedulaSolicitante, setCedulaSolicitante] = useState(null);
    const formData = new FormData();

    //alert key
    const key = 'updatable';


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onCedulaChange = event => {
        // Update the state 
        setCedulaSolicitante(event.target.files[0]);
    };

    const cedulaData = () => {
        if (cedulaSolicitante) {
            return (
                <div>
                    <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre: {cedulaSolicitante.name}</p>
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
        if ((numeroDocu && numeroFolio && tipoCopia) !== '' && (cedulaSolicitante)) {
            message.loading({ content: 'Creando Trámite...', key: key, duration: 10 });
            let config = {
                method: 'post',
                url: process.env.REACT_APP_URL_API + "/api/tramite",
                headers: { Authorization: `Bearer ${auth.token}` },
                data: formData,
            };

            formData.append('tipo_tramite', 'copia');
            formData.append('tipo_documento', 'libro_varios');
            formData.append('identificacion', numeroDocu);
            formData.append('numero_folio', numeroFolio);
            formData.append('tipo_copia', tipoCopia);
            formData.append('anotaciones', comentarios);
            formData.append('documento_1', cedulaSolicitante, 'cedula_solicitante');

            axios(config)
                .then((response) => {
                    message.success({ content: '¡Trámite Creado!', key: key, duration: 3 });
                    handleClose();
                    setNumeroDocu('');
                    setComentarios('');
                    setNumeroFolio('');
                    setTipoCopia('');
                    setCedulaSolicitante(null);
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
                <DialogTitle id="form-dialog-title" style={{ paddingTop: '25px' }}>Copia de libro de varios</DialogTitle>
                <DialogContent>
                    <form >
                        <GridContainer >
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    id="numerodocu"
                                    labelText="Número de Documento o Nit"
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
                            <GridItem className={classes.color} md={6}>
                                <CustomInput
                                    id="numerodocu"
                                    labelText="Número de Folio o Carpeta"
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
                                    labelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.root,
                                        }
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: (e) => setNumeroFolio(e.target.value),
                                        value: numeroFolio,
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
                                        Tipo de Copia *
                                    </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        inputProps={{
                                            value: tipoCopia,
                                            onChange: (e) => setTipoCopia(e.target.value)
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
                                            value="Reconocimiento de Hijo"
                                        >
                                            Reconocimiento de Hijo
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Legitimaciones"
                                        >
                                            Legitimaciones
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Adopciones"
                                        >
                                            Adopciones
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Alteraciones de la Patria Potesta"
                                        >
                                            Alteraciones de la Patria Potesta
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Emancipaciones"
                                        >
                                            Emancipaciones
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Capitulaciones Matrimoniales"
                                        >
                                            Capitulaciones Matrimoniales
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Interdicción Judicial"
                                        >
                                            Interdicción Judicial
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected,
                                            }}
                                            value="Discernimientos de Guardia"
                                        >
                                            Discernimientos de Guardia
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </GridItem>
                        </GridContainer>
                        <div style={{ marginBottom: "10px", marginTop: "10px" }} className={classes.formCategory}>
                            <span style={{ color: '#aaaaaa', fontSize: 14 }}><b>Adjuntos requeridos *</b></span>
                        </div>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} >
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}><b>Copia de Cédula del Solicitante *</b></span>
                                {cedulaData()}
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
                                            onChange={(e) => onCedulaChange(e)}
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