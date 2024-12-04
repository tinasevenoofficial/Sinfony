import React, { useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
//@antd components
import { Form } from "antd";

// @material-ui/core components
import FormLabel from "@material-ui/core/FormLabel";
import Close from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//Styles
import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";

const FormItem = (props) => {
  const {
    title,
    createItem,
    onFinishFailed,
    maxName,
    maxCode,
    loading,
    departments,
  } = props;
  const [valuesState, setValuesState] = useState();
  const [values, setValues] = useState();
  let nameRef = useRef(null);
  let codeRef = useRef(null);
  let departmentRef = useRef(null);

  const classes = useStyles();

  const verifyLength = (value, length) => {
    if (value.length <= length) {
      return true;
    }
    return false;
  };
  const validateValues = useCallback(() => {
    if (valuesState) {
      setValuesState((state) => ({
        ...state,
        name: state.name !== "success" ? "error" : state.name,
        code: state.code !== "success" ? "error" : state.code,
        department: state.department !== "success" ? "error" : state.department,
      }));
      return (
        valuesState.name === "success" &&
        valuesState.code === "success" &&
        valuesState.department === "success"
      );
    }
  }, [setValuesState, valuesState]);

  const add = () => {
    if (validateValues()) {
      const send = createItem(values);
      if (send) {
        setValuesState(null);
        setValues(null);
        nameRef.current.value = "";
        codeRef.current.value = "";
        departmentRef.current.value = "";
      }
    } else {
      onFinishFailed();
    }
  };
  const getDepartment = (id) => {
    return departments.find((dep) => {
      return dep.id === id;
    });
  };
  const updateValues = (e) => {
    const { id, name, value: val } = e.target;
    if (name) {
      setValues((state) => ({
        ...state,
        [name]: getDepartment(val).name,
        department_id: val,
      }));
    } else {
      setValues((state) => ({ ...state, [id]: val }));
    }
  };
  const updateValuesState = (input, error) => {
    setValuesState((state) => ({ ...state, [input]: error }));
  };
  return (
    <Card>
      <CardHeader color="rose" text>
        <CardText className={classes.cardText} color="primary">
          <h4 className={classes.colorWhite}>{title}</h4>
        </CardText>
      </CardHeader>
      <CardBody>
        <form>
          <GridContainer alignItems="center" className={classes.formStyle}>
            <GridItem xs={12} sm={2} md={2} lg={1}>
              <FormLabel className={classes.label}>
                <span className={classes.colorRose}>*</span> Nombre
              </FormLabel>
            </GridItem>
            <GridItem xs={12} sm={10} md={3} lg={2}>
              <CustomInput
                success={valuesState?.name === "success"}
                error={valuesState?.name === "error"}
                id="name"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  inputRef: nameRef,
                  onChange: (event) => {
                    if (verifyLength(event.target.value, maxName)) {
                      updateValuesState("name", "success");
                    } else {
                      updateValuesState("name", "error");
                    }
                    updateValues(event);
                  },
                  type: "text",
                  maxLength: maxName,
                  autoComplete: "off",
                  endAdornment:
                    valuesState?.name === "error" ? (
                      <InputAdornment position="end">
                        <Close className={classes.danger} />
                      </InputAdornment>
                    ) : undefined,
                }}
              />
            </GridItem>
            <GridItem sm={12} md={3} lg={4}>
              <GridContainer alignItems="center">
                <GridItem xs={12} lg={4}>
                  <FormLabel className={classes.label}>
                    <span className={classes.colorRose}>*</span> Scoopes
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} lg={8}>
                  <CustomInput
                    success={valuesState?.name === "success"}
                    error={valuesState?.name === "error"}
                    id="description"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      inputRef: nameRef,
                      onChange: (event) => {
                        if (verifyLength(event.target.value, maxName)) {
                          updateValuesState("description", "success");
                        } else {
                          updateValuesState("description", "error");
                        }
                        updateValues(event);
                      },
                      type: "text",
                      maxLength: maxName,
                      autoComplete: "off",
                      endAdornment:
                        valuesState?.name === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : undefined,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <Form.Item className={classes.justifyContentCenter}>
                <Button
                  disabled={loading}
                  className={classes.center}
                  color="rose"
                  onClick={add}
                  size="sm"
                >
                  Añadir
                </Button>
              </Form.Item>
            </GridItem>
          </GridContainer>
        </form>
      </CardBody>
    </Card>
  );
};
FormItem.defaultProps = {
  departments: [],
};

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onFinishFailed: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  maxCode: PropTypes.number.isRequired,
  maxName: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  departments: PropTypes.arrayOf({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default FormItem;
