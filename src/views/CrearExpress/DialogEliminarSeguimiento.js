import * as React from 'react';
import PropTypes from 'prop-types';
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useStyles from "../Components/Methods/styles/DialogStyles";
import CloseIcon from "@material-ui/icons//Close";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogEliminarSeguimiento = (props) => {
    const { onClose, open, eliminarSeguimiento, datosEliminarSegui } = props;
    const classes = useStyles();

    return (
        <Dialog
            onClose={onClose}
            TransitionComponent={Transition}
            open={open}
            className={classes.relative}
            icon={CloseIcon}
            title="Eliminar Seguimiento"
        >
            <div className={classes.title2}>
                Eliminar Seguimiento
            </div>
            <DialogContent className={classes.content}>
                <div style={{ marginTop: "50px" }}>
                    ¿Desea eliminar el siguiente seguimiento?
                </div>
                <div style={{ marginTop: "10px" }}>
                    <table style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse', width: '100%' }}>
                        <tr>
                            <th style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}>Fecha</th>
                            <th style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}>Detalle</th>
                            <th style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}>Observación</th>
                            <th style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}>Usuario</th>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p>{datosEliminarSegui.fecha}</p></td>
                            <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p>{datosEliminarSegui.detalle}</p></td>
                            <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p>{datosEliminarSegui.observacion}</p></td>
                            <td style={{ border: '1px solid #9A9A9A', borderCollapse: 'collapse' }}><p>{datosEliminarSegui.usuario}</p></td>
                        </tr>
                    </table>
                </div>
            </DialogContent>
            <div className={classes.containerButtons}>
                <Button
                    color="rose"
                    onClick={onClose}
                >
                    Cerrar
                </Button>
                <Button
                    color="rose"
                    onClick={eliminarSeguimiento}
                >
                    Eliminar
                </Button>
            </div>
        </Dialog>
    );
}

DialogEliminarSeguimiento.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    eliminarSeguimiento: PropTypes.func.isRequired,
};

export default DialogEliminarSeguimiento;
