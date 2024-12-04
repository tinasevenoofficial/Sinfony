/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { message } from 'antd';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Table, Form, Spin, Alert } from "antd";

// @material-ui/icons
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';

// core components
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import EditableCell from "../../components/Custom/EditableCell";
import { columns } from "../../utils/columnUsuarios";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardText from "components/Card/CardText.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Permisos from "./Permisos";
import Persona from "views/Persona/Otorgante";
import { EXTERNAL_API_PATHS } from 'utils/constants'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import useTable from "../../hooks/useTable";

const title = "Listado de Usuarios";
const name = "Listado de usuarios";
const key = "usuario";

import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
import {  infoColor } from "assets/jss/material-dashboard-pro-react.js";

const { Option } = Select;

export default function AdminUsers() {

  const auth = useSelector((state) => state.auth);
  const searchInput = useRef();
  const classes = useStyles();
  const [personas, setPersonas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [rolEdit, setRolEdit] = useState(0)
  const [rol, setRol] = useState();
  const [persona, setPersona] = useState();
  const [modal, setModal] = useState({
    visible: false,
    id: "",
  });
  const [loadPermit, setLoadPermit] = useState("hide");

  const [newPerson, setNewPerson] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openModalPerson, setOpenModalPerson] = useState(false);
  const [updateTable, setUpdateTable] = useState('');

  const showModal = (record) => {
    setRolEdit(record.id_rol)
    setModal((mod) => ({
      ...mod,
      visible: true,
      nombre: record.nombres + " " + record.apellidos,
      id: record.id,
      idRol: record.id_rol,
    }));
    console.log(record)
    console.log(rolEdit)
  };

  function validarEmail(email) {
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)) {
      return (true)
    } else {
      return (false);
    }
  }

  const handleCancel = () => {
    setModal((mod) => ({ ...mod, visible: false }));
  };

  const {
    formEdit,
    formCreate,
    permisos,
    data,
    loading,
    onEdit,
    onDelete,
    updateOnEdit,
    updateData,
    createItem,
    editItem,
    delItem,
    save,
    isEditing,
    cancel,
    saveEstado,
    onFinishFailed,
    updateNameItem,
  } = useTable({ key });

  let config = { headers: { Authorization: `Bearer ${auth.token}` } };

  const personaList = async () => {
    axios.get(EXTERNAL_API_PATHS['persona'], config)
      .then((response) => {
        setPersonas(response.data);
        console.log("response.data")
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const actualizarRol = (val) => {
    let keyupdate = 'actualizar'
    message.loading({ content: 'Actualizando...', key: keyupdate, duration: 20 });
    let found = roles.find(element => element.id == rolEdit);
    let data = {
      id_rol: rolEdit,
      scopes: found.description
    }
    console.log(data);
    axios.put(EXTERNAL_API_PATHS['usuario'] + '/' + modal.id, data, config)
      .then((response) => {
        message.success({ content: `Se ha actualizado exitosamente el rol del usuario ${modal.nombre}`, key: keyupdate });
        setUpdateTable(true)
        console.log(response)
      })
      .catch((e) => {
        message.error({ content: `No se pudo actualizar el rol del usuario ${modal.nombre}`, key: keyupdate });
        console.log(e);
      })
  };

  const setStatePermit = (val) => {
    setLoadPermit(val);
  };


  const RolesList = async () => {
    axios.get(EXTERNAL_API_PATHS['rol'], config)
      .then((res) => {
        setRoles(res.data);
        console.log('roles')
        console.log(res.data)
      })
      .catch((e) => {
        console.log(e);
      })
  }

  useEffect(() => {
    personaList();
    RolesList();
  }, [])

  useEffect(() => {
    personaList();
  }, [newPerson])

  useEffect(() => {
    axios.get(EXTERNAL_API_PATHS[key], config).then((res) => {
      setUpdateTable(false)
      updateData(res.data);
    });
  }, [updateTable]);

  const crearUsuario = () => {
    let key = 'update'
    let found = roles.find(element => element.id == rol);
    message.loading({ content: 'Cargando...', key: key, duration: 20 });
    if (persona && rol && password) {
      if (validarEmail(email)) {
        let jsonData = {
          email: email,
          admin: false,
          password: password,
          id_persona: persona,
          id_rol: rol,
          password_confirmation: password,
          scopes: found.description
        }
        console.log(jsonData)
        axios.post(EXTERNAL_API_PATHS['usuario'], jsonData, config)
          .then((response) => {
            if (response.status === 200) {
              message.success({ content: `Se ha creado exitosamente el usuario con correo ${email}`, key: key });
              console.log(response.data);
            } else {
              message.error({ content: `No se pudo crear el usuario`, key: key });
              console.log(response.data);
            }
            setUpdateTable(true)
          })
          .catch((e) => {
            message.error({ content: `No se pudo crear el usuario`, key: key });
            console.log(e)
          })
      } else {
        message.error({ content: `La dirección de correo no es valida`, key: key });
      }
    } else {
      message.error({ content: `Es necesario llenar todos los campos`, key: key });
    }
  };

  // Funciones para select
  const onChangePersona = (value) => {
    console.log("value")
    console.log(value)
    setPersona(value)
  }

  function onChangeRol(value) {

    setRol(value)
  }

  function onChangeRolEdit(value) {
    setRolEdit(value)
  }

  /* const mostrarContrasena2 = i => {
    //console.log(i)
    console.log(i);
    var tipo = document.getElementById("pass" + i);
    if (tipo.type == "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }

    //console.log(tipo);
  }; */

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" text>
              <CardText className={classes.cardText} color="primary">
                <h4 className={classes.colorWhite}>Crear Usuario</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form id="form">
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={2}>
                    <FormLabel className={classes.label}>
                      <span className={classes.colorRose}>*</span> Persona
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        classes={{
                          select: classes.select,
                        }}
                        displayEmpty
                        defaultValue=""
                        onChange={(event) => {
                          onChangePersona(event.target.value);
                        }}
                        inputProps={{
                          name: "Personas",
                        }}
                      >
                        <MenuItem
                          disabled
                          value=""
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Seleccione persona
                        </MenuItem>
                        {personas.map(({ nombres, apellidos, id }) => (
                          <MenuItem
                            key={id}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected,
                            }}
                            value={id}
                          >
                            {apellidos ? nombres + " " + apellidos : nombres}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <Button
                      className={classes.center}
                      color="rose"
                      onClick={() => setOpenModalPerson(true)}
                      size="sm"
                    >
                      <AddIcon /> <PersonIcon />
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormLabel className={classes.label}>
                      <span className={classes.colorRose}>*</span> Rol
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        classes={{
                          select: classes.select,
                        }}
                        displayEmpty
                        defaultValue=""
                        onChange={(event) => {
                          onChangeRol(event.target.value);
                        }}
                        inputProps={{
                          name: "rol",
                          value: rol
                        }}
                      >
                        <MenuItem
                          disabled
                          value=""
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Seleccione rol
                        </MenuItem>
                        {roles.map(({ name, id }) => (
                          <MenuItem
                            key={id}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected,
                            }}
                            value={id}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={2}>
                    <FormLabel className={classes.label}>
                      <span className={classes.colorRose}>*</span> Email
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      margin="dense"
                      id="email"
                      classes={{ marginTop: '-15px' }}
                      labelText="Email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        onChange: (e) => setEmail(e.target.value),
                        value: email,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormLabel className={classes.label}>
                      <span className={classes.colorRose}>*</span> Contraseña
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      style={{ float: 'right' }}
                      id="password"
                      classes={{ marginTop: '-15px' }}
                      labelText="Contraseña"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        onChange: (e) => setPassword(e.target.value),
                        value: password,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <Button
                      className={classes.center}
                      color="rose"
                      onClick={crearUsuario}
                    >
                      crear usuario
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
        <br></br>
      </GridContainer>
      <Form form={formEdit} component={false}>
        <Table
          className={classes.table}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          size="sm"
          bordered
          scroll={{ x: 500 }}
          dataSource={data}
          columns={columns(
            cancel,
            isEditing,
            updateOnEdit,
            saveEstado,
            delItem,
            editItem,
            onEdit,
            onDelete,
            name,
            searchInput,
            classes,
            showModal
          )}
          loading={loading}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            pageSize: 5,
          }}
        />
      </Form>
      <Dialog
        open={modal.visible}
        keepMounted
        onClose={handleCancel}
        aria-labelledby="permits-title"
        aria-describedby="permits-description"
      >
        <DialogTitle id="permits-title">
          <div className={classes.titleModal}>
            <VerifiedUserIcon />
            <p className={classes.text}> Cambiar rol de {modal.nombre}</p>
          </div>
        </DialogTitle>
        <DialogContent id="permits-description">
          <FormControl fullWidth className={classes.selectFormControl}>
            <Select
              MenuProps={{
                className: classes.selectMenu,
              }}
              classes={{
                select: classes.select,
              }}
              displayEmpty
              defaultValue=""
              onChange={(event) => {
                onChangeRolEdit(event.target.value);
              }}
              inputProps={{
                name: "roles",
                value: rolEdit || 0
              }}
            >
              <MenuItem
                disabled
                value=""
                classes={{
                  root: classes.selectMenuItem,
                }}
              >
                Seleccione rol
              </MenuItem>
              {roles.map(({ name, id }) => (
                <MenuItem
                  key={id}
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected,
                  }}
                  value={id}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Spin style={{ marginRight: 100 }} spinning={loadPermit === "load"}>
            {loadPermit !== "hide" && loadPermit !== "load" ? (
              <Alert
                message={
                  loadPermit === "error"
                    ? "No se actualizo correctamente"
                    : "Actualizado correctamente"
                }
                type={loadPermit}
              />
            ) : (
              false
            )}
          </Spin>
          <Button onClick={actualizarRol} color="primary" simple>
            Actualizar
          </Button>
          <Button onClick={handleCancel} color="danger" simple>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Persona
        open={openModalPerson}
        title='Usuario'
        handleClose={setOpenModalPerson}
        addPerson={setNewPerson}
        integrado={true}
      />
    </>
  );
}
