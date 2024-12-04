import React from "react";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import useStyles from "./styles/DialogStyles";
import DnsIcon from "@material-ui/icons/Dns";
import { useMethodContext } from "../../../context/MethodContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCustom = (props) => {
  const { open, setOpen, icon, title, children, ...other } = props;
  const classes = useStyles();
  const { sendData, validateForm } = useMethodContext();

  const handleClose = () => {
    setOpen(false);
  };

  const saveData = () => {
    const isErrors = validateForm();
    if (!isErrors) {
      sendData();
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      className={classes.relative}
      onClose={handleClose}
      aria-labelledby="method"
      aria-describedby="method-description"
      {...other}
    >
      <div className={classes.title}>
        {icon || <DnsIcon />} {title}
      </div>
      <DialogContent className={classes.dialogContent}>
        {children}
      </DialogContent>
      <div className={classes.containerButtons}>
        <Button
          color="rose"
          onClick={handleClose}
          //className={`${classes.button} ${classes.buttonCancel}`}
        >
          Cerrar
        </Button>
        <Button
          color="rose"
          onClick={saveData}
          //className={`${classes.button} ${classes.buttonSend}`}
        >
          Guardar
        </Button>
      </div>
    </Dialog>
  );
};

DialogCustom.defaultProps = {
  icon: null,
  children: null,
};

DialogCustom.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.element,
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default DialogCustom;
