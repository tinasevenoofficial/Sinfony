import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Controller } from "react-hook-form";
import { message } from "antd";
import "animate.css";

// material ui core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
// material ui icons
import DnsIcon from "@material-ui/icons/Dns";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";

// local
import {
  PAYMENT_METHODS,
  REQUIRED_METHODS,
  EXTERNAL_API_PATHS,
} from "../../utils/constants";
import useStylesLocal from "./styles/FacturaCardStyles";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Dialog from "../Components/Methods/DialogMethods";
import { validations } from "../../validators/messages";

const useStyles = makeStyles(styles);

const FacturaCard = React.memo((props) => {
  const classes = useStyles();
  const classesLocal = useStylesLocal();
  const {
    id,
    type,
    onClose,
    otorgantes,
    total,
    register,
    errors,
    watch,
    setValue,
    lenParent,
    control,
    numRad,
  } = props;

  const [method, setMethod] = useState(0);
  const [open, setOpen] = useState(null);
  const [anim, setAnim] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const openMethod = () => {
    setMethod(
      PAYMENT_METHODS.find((m) => m.id === watch(`${type}.${id}.method`))
    );
    setOpen(true);
  };

  const selecteds = watch(type)?.map(({ otorgante }) => otorgante);

  const current = parseFloat(
    (watch(`${type}.${id}.percent`) / 100) * total || 0
  ).toLocaleString("es-CO");

  const currentClear = parseFloat(
    (watch(`${type}.${id}.percent`) / 100) * total || 0
  );

  useEffect(() => {
    setValue(`${type}.${id}`, { total: current });
  }, [current]);

  useEffect(() => {
    setValue(`${type}.${id}`, { percent: parseInt(100 / lenParent, 10) });
  }, [lenParent]);

  useEffect(() => {
    if (REQUIRED_METHODS.includes(watch(`${type}.${id}.method`))) {
      setValue(`${type}.${id}.requiredMethod`, true);
      setOpenTooltip(true);
      setAnim(true);
      const timer = setTimeout(function () {
        setOpenTooltip(false);
        setAnim(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setOpenTooltip(false);
      setValue(`${type}.${id}.requiredMethod`, false);
    }
    setValue(`${type}.${id}.method_data`, undefined);
  }, [watch(`${type}.${id}.method`)]);

  const handleClose = () => {
    setOpenTooltip(false);
  };

  const handleOpen = () => {
    setOpenTooltip(true);
  };

  const sendDIAN = () => {
    if (watch(`${type}.${id}.method_data`)) {
      axios
        .post(EXTERNAL_API_PATHS.facturarDian, watch(`${type}.${id}`))
        .then((res) => {
          message.success(
            `Factura enviada a la DIAN, con numero ${res.data.numero_factura}`,
            3
          );
          setValue(`${type}.${id}.id_dian`, res.data.numero_factura);
        });
    } else {
      message.error(`Debe completar el metodo de pago`, 3);
    }
  };

  return (
    <Card style={{ backgroundColor: "#fafafa" }}>
      <CloseIcon className={classesLocal.close} onClick={onClose} />
      <CardBody>
        <GridContainer justify="center" alignItems="center">
          <GridItem xs={12} lg={5}>
            <GridContainer>
              <GridItem xs={4}>
                <FormLabel className={classes.label}>Otorgante</FormLabel>
              </GridItem>
              <GridItem xs={8}>
                <TextField
                  select
                  error={!!errors?.otorgante}
                  helperText={errors?.otorgante && errors.otorgante.message}
                  fullWidth
                  SelectProps={{
                    ...register(`${type}.${id}.otorgante`, {
                      required: validations.BLANK,
                    }),
                    displayEmpty: true,
                  }}
                  defaultValue={watch(`${type}.${id}.otorgante`) || ""}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  {otorgantes.map(({ nombre: name, numero_documento }) => (
                    <MenuItem
                      key={`otorgante${numero_documento}`}
                      value={numero_documento}
                      disabled={selecteds?.includes(numero_documento)}
                    >
                      {name.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
              </GridItem>
              <GridItem xs={4}>
                <FormLabel className={classes.label}>Metodo de pago</FormLabel>
              </GridItem>
              <GridItem xs={8}>
                <TextField
                  select
                  error={!!errors?.method}
                  helperText={errors?.method && validations.BLANK}
                  fullWidth
                  SelectProps={{
                    ...register(`${type}.${id}.method`, {
                      required: true,
                    }),
                    defaultValue: watch(`${type}.${id}.method`) || "",
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  {PAYMENT_METHODS.map(({ name, id }) => (
                    <MenuItem key={`method${id}`} value={id}>
                      {name.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} lg={2} align="center">
            <h4>${current}</h4>
            <TextField
              type="number"
              error={!!errors?.percent}
              helperText={errors?.percent && errors.percent.message}
              inputProps={{
                ...register(`${type}.${id}.percent`, {
                  required: validations.BLANK,
                  min: {
                    value: 1,
                    message: `${validations.MIN} 1`,
                  },
                  max: {
                    value: 100,
                    message: `${validations.MAX} 100`,
                  },
                }),
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </GridItem>
          <GridItem xs={12} lg={4}>
            <GridContainer>
              <GridItem xs={4}>
                <FormLabel className={classes.label}>Nro. Factura</FormLabel>
              </GridItem>
              <GridItem xs={8}>
                {watch(`${type}.${id}.id_dian`) || "Sin asignar"}
              </GridItem>
              <GridItem xs={4}>
                <FormLabel className={classes.label}>Observacion</FormLabel>
              </GridItem>
              <GridItem xs={8}>
                <TextField
                  multiline
                  rows={2}
                  error={!!errors?.observation}
                  helperText={errors?.observation && errors.observation.message}
                  inputProps={{
                    ...register(`${type}.${id}.observation`, {
                      maxLength: {
                        value: 250,
                        message: "Máximo 250 carácteres",
                      },
                    }),
                  }}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={1}>
            <Tooltip
              title={
                watch(`${type}.${id}.requiredMethod`)
                  ? "Completar pago!"
                  : "Pago"
              }
              placement="left"
              open={openTooltip}
              onClose={handleClose}
              onOpen={handleOpen}
            >
              <Button
                className={`animate__animated ${
                  anim ? "animate__heartBeat" : ""
                }`}
                color="primary"
                disabled={watch(`${type}.${id}.method`) === null}
                justIcon
                onClick={openMethod}
              >
                <DnsIcon />
              </Button>
            </Tooltip>
            <Tooltip title="DIAN" placement="left">
              <Button
                color="primary"
                disabled={!watch(`${type}.${id}.id_dian`)}
                onClick={sendDIAN}
                justIcon
              >
                <SendIcon />
              </Button>
            </Tooltip>
          </GridItem>
          <Controller
            control={control}
            name={`${type}.${id}.method_data`}
            render={({ field: { onChange } }) =>
              open && (
                <Dialog
                  open={open}
                  setOpen={setOpen}
                  numRad={numRad}
                  method={method}
                  setData={watch(`${type}.${id}.method_data`)}
                  onSave={(d) => {
                    onChange(d);
                    setValue(`${type}.${id}.id_dian`, undefined);
                  }}
                  value={currentClear || 0}
                />
              )
            }
          />
        </GridContainer>
      </CardBody>
    </Card>
  );
});

FacturaCard.defaultProps = {
  total: { amount: 0, percent: 1 },
  otorgantes: [],
  selecteds: [],
  errors: {},
};

FacturaCard.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  otorgantes: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string,
      numero_documento: PropTypes.number,
    })
  ),
  total: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    otorgante: PropTypes.string,
    method: PropTypes.string,
    percent: PropTypes.string,
    observation: PropTypes.string,
  }),
  type: PropTypes.oneOf(["compradores", "vendedores"]).isRequired,
  lenParent: PropTypes.number.isRequired,
  control: PropTypes.any.isRequired,
  numRad: PropTypes.number.isRequired,
};

FacturaCard.displayName = "FacturaCard";
export default FacturaCard;
