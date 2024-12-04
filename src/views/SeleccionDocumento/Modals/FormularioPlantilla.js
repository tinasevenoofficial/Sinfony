import React, { useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AppRegistrationIcon from '@material-ui/icons/Apps';
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
import App from "../FormularioActualizacionDatos/App"

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

export default function AuteDocuPrivado({dataJson, idPlantilla}) {
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


    return (
        <>
            <Button color="success" className={classes.actionButton} onClick={handleClickOpen}>
                <AppRegistrationIcon className={classes.icon} />
              </Button>
            <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ paddingTop: '25px' }}>
                    Registro Escrituración Jaramillo Mora
                </DialogTitle>
                <DialogContent>
                    <App dataJson={dataJson} idPlantilla={idPlantilla}></App>
                </DialogContent>
            </Dialog>
        </>
    );
}
