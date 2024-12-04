import React, { useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { EXTERNAL_API_PATHS } from 'utils/constants';

// uploadfiles
import { InputFile } from 'components';
import { Grid, Paper, IconButton, Box, Typography } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { Delete } from '@material-ui/icons';
import { UploadFilesSchema, defaultUploadFiles } from './UploadFiles.schema';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Attachment from "@material-ui/icons/Attachment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

// ant design
import { message } from 'antd';

const useStyles = makeStyles(theme => ({
    root: { color: 'black', fontSize: '18px' },
}));

const MESSAGES = {
    requiredFields: 'Es necesario diligenciar los campos requeridos',
    transactionCreated: '¡Trámite Creado!',
    transactionFailed: 'No se pudo crear el tramite'
};

export default function AuteDocuPrivado() {
    const classes = useStyles();
    const { auth } = useSelector((state) => state);
    const [open, setOpen] = useState(false);
    const [numeroDocu, setNumeroDocu] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [formatoRegistro, setFormatoRegistro] = useState(null);
    const [documentoPrivado, setDocumentoPrivado] = useState([]);
    const formData = new FormData();

    const key = 'updatable';

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const onCedulaChange = useCallback((event) => {
        setFormatoRegistro(event.target.files[0]);
    }, []);

    const cedulaData = formatoRegistro ? (
        <p style={{ fontSize: 10, color: '#aaaaaa' }}>Nombre archivo: {formatoRegistro.name}</p>
    ) : (
        <div style={{ fontSize: 10, color: '#E36767' }}>Selecciona un archivo</div>
    );

    const onDocumentoChange = useCallback((event) => {
        if (documentoPrivado.length + event.documentos.length > 3) {
            message.error('No se pueden adjuntar más de 3 archivos.');
            return;
        }
        setDocumentoPrivado(prev => [...event.documentos]);
    }, []);

    const sendData = useCallback(() => {
        if (!numeroDocu || !formatoRegistro) {
            return message.error({ content: MESSAGES.requiredFields, key: key, duration: 2 });
        }

        message.loading({ content: 'Creando Trámite...', key: key, duration: 10 });

        formData.append('tipo_tramite', 'OrdenEscrituracion');
        formData.append('nombre_tramite', 'JaramilloMora');
        formData.append('identificacion_tramite', numeroDocu);
        formData.append('anotaciones', comentarios);
        formData.append('formatoRegistro', formatoRegistro);
        documentoPrivado.forEach(document => {
            formData.append('documentos[]', document);
        });

        axios.post(EXTERNAL_API_PATHS.tramites, formData).then(response => {
            message.success({ content: MESSAGES.transactionCreated, key: key, duration: 3 });
            handleClose();
            setNumeroDocu('');
            setComentarios('');
            setFormatoRegistro(null);
            setDocumentoPrivado([]);
        }).catch(() => {
            message.error({ content: MESSAGES.transactionFailed, key: key, duration: 3 });
        });
    }, [numeroDocu, formatoRegistro, documentoPrivado, comentarios, formData, handleClose]);

    const { control, formState: { errors } } = useForm({
        resolver: UploadFilesSchema,
        defaultValues: { ...defaultUploadFiles },
    });

    const deleteDocument = useCallback((idx) => {
        setDocumentoPrivado(prev => prev.filter((_, index) => index !== idx));
    }, []);

    return (
        <div>
            <Button style={{ width: '100%' }} color="mi" onClick={handleClickOpen}>
                Solicitar
            </Button>
            <Dialog fullWidth="true" maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ paddingTop: '25px' }}>
                    Registro Escrituración Jaramillo Mora
                </DialogTitle>
                <DialogContent>
                    <form>
                        <GridContainer>
                            <GridItem className={classes.color} st md={8}>
                                <CustomInput
                                    id="numerodocu"
                                    labelText="Número de Matrícula"
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
                                        onChange: (e) => setNumeroDocu(e.target.value),
                                        value: numeroDocu,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <div style={{ marginBottom: "10px" }} className={classes.formCategory}>
                            <span style={{ color: '#aaaaaa', fontSize: 14 }}>
                                <b>Adjuntos requeridos *</b>
                            </span>
                        </div>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}>
                                    <b>Orden Escrituración</b> *
                                </span>
                                {cedulaData}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <div style={{ marginTop: "0px", float: 'right' }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="info"
                                        size="sm"
                                    >
                                        <Attachment />
                                        Orden Escrituración
                                        <input
                                            accept='application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={onCedulaChange}
                                        />
                                    </Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} />
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                                <span style={{ fontSize: 14, color: '#aaaaaa' }}>
                                    <b>Anexos</b>
                                </span>
                                <br />
                            </GridItem>
                        </GridContainer>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Controller
                                    name="documentos"
                                    control={control}
                                    render={({ field }) => (
                                        <InputFile
                                            onChange={(e, files) => {
                                                onDocumentoChange({ documentos: [...documentoPrivado, ...files] });
                                            }}
                                            error={!!errors.documentos}
                                            accept={".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.gif,.png,.zip,.rar"}
                                            helperText={
                                                errors.documentos
                                                    ? errors.documentos.message
                                                    : `Formatos válidos: Imagen (jpg, jpeg, gif, png), Texto (xls, xlsx, doc, docx, pdf), compresión de archivos (zip, rar). 3 archivos máximo, para más documentos subirlos en un .zip/.rar`
                                            }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                {documentoPrivado.map(({ name }, idx) => (
                                    <Grid key={name} item xs="auto">
                                        <Box
                                            variant="outlined"
                                            display="flex"
                                            component={Paper}
                                            justifyContent="space-between"
                                            alignItems="center"
                                            p={1.5}
                                        >
                                            <Typography variant="caption">{name}</Typography>
                                            <IconButton
                                                style={{ marginLeft: 8 }}
                                                size="small"
                                                color="secondary"
                                                onClick={() => deleteDocument(idx)}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
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
                            <span style={{ color: '#aaaaaa', fontSize: 14 }}>
                                De ser necesario alguna nota, escribirla en el campo anotaciones.
                            </span>
                        </div>
                        <div className={classes.formCategory}>
                            <span style={{ color: '#E36767', fontSize: 12 }}>
                                <small>*</small> Campos requeridos
                            </span>
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
