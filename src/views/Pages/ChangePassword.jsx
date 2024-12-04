/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { validations } from "../../validators/messages";
import { EXTERNAL_API_PATHS } from "../../utils/constants";


// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
// material ui icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// antd components
import { message } from "antd";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Danger from "components/Typography/Danger.js";


// style for this view
import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";

export default function ValidationForms() {
  const classes = useStyles();
  const { register, handleSubmit, getValues, reset, setError, formState: { errors } } = useForm();
  let auth = useSelector((state) => state.auth);
  let header = { headers: { Authorization: `Bearer ${auth.token}` } };

  const [show, setShow] = useState({
    pwd: false,
    newpwd: false,
    repeat: false
  });
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async data => {
    setDisabled(true);
    await axios.put(`${EXTERNAL_API_PATHS['usuario']}/${auth.user.id}`, data, header).then(() => {
      message.success('Contraseña cambiada con exito');
      reset();
    }).catch((e) => {
      message.error('No se pudo cambiar la contraseña');
      setError("current_password", {
        type: "custom",
        message: validations.INCORRECT_PWD
      })
    });
    setDisabled(false);
  }

  const handleClickShowPwd = (name) => {
    setShow((s) => ({ ...s, [name]: !s[name] }));
  };

  return (
    <GridContainer justify="center" >
      <GridItem xs={12} sm={6} md={5}>
        <Card>
          <CardHeader color="primary" text>
            <CardText className={classes.cardText} color="primary">
              <h4 className={classes.colorWhite}>Cambio de contraseña</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("current_password", { required: validations.BLANK, minLength: { value: 6, message: validations.LEN_PWD } })}
                autoComplete="off"
                fullWidth
                label="Contraseña actual" color="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPwd('current_password')}

                      >
                        {show.current_password ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  type: show.current_password ? 'text' : 'password',
                  autoComplete: "off"
                }}
              />
              {errors.current_password && <Danger>{errors.current_password?.message}</Danger>}

              <TextField
                {...register("password", { required: validations.BLANK, minLength: { value: 6, message: validations.LEN_PWD } })}
                autoComplete="off"
                fullWidth
                label="Nueva contraseña" color="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPwd('password')}

                      >
                        {show.password ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  type: show.password ? 'text' : 'password',
                  autoComplete: "off"
                }}
              />
              {errors.password && <Danger>{errors.password?.message}</Danger>}
              <TextField
                {...register("password_confirmation",
                  {
                    required: validations.BLANK,
                    minLength: { value: 6, message: validations.LEN_PWD },
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { password } = getValues();
                        return password === value || validations.MATCH;
                      }
                    }
                  }
                )}
                autoComplete="off"
                fullWidth
                label="Confirmar contraseña" color="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPwd('password_confirmation')}

                      >
                        {show.password_confirmation ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  type: show.password_confirmation ? 'text' : 'password',
                  autoComplete: "off"
                }}
              />
              {errors.password_confirmation && <Danger>{errors.password_confirmation?.message}</Danger>}

              <Button type="submit" color="info" className="d-block mx-auto mt-3" disabled={disabled}>Cambiar contraseña</Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
