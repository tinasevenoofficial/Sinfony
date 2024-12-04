import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
// react components used to create a google map

import docs from 'assets/img/doc.svg'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Table, Space, Modal } from 'antd';
import "antd/dist/antd.css";

// @material-ui/icons
import Map from "@material-ui/icons/Map";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import RateReviewIcon from '@material-ui/icons/RateReview';

// core components
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import "assets/css/material-dashboard-pro-react.css";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { isConstructorDeclaration } from "typescript";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  cardTitle: {
    ...dashboardStyle,
    ...loginPageStyle,
    marginTop: "0",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    color: "white"
  },
  ButtonTabla: {
    borderColor: "none",
    textDecoration: "none"
  },
  progress: {
    marginTop: '10px',
  },
  comentario1: {
    width: '100%',
    maxHeight: 300,
    position: 'relative',
    overflow: 'auto',
  },
  comentario2: {
    display: 'inline',
  },
  colorWhite: {
    color: 'white',
  },
  cardText: {
    padding: "0px 35px 0px 35px",
  },
};

let key = 0;
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Solicitud() {

  const auth = useSelector((state) => state.auth);

  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [usuarios, setUsuario] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [archivo, setArchivo] = useState("");
  const [comentario, setComentario] = useState("");
  const [chat, setChat] = useState([]);
  let [loading, setLoading] = React.useState(true);

  const userList = async () => {

    let config = {
      headers: { Authorization: `Bearer ${auth.token}` }
    };
    axios.get(process.env.REACT_APP_URL_API + '/api/SolicitudesTramites', config)
      .then((response) => {
        console.log(response.data)
        let data = response.data.map((user) => ({
          key: user.id,
          nombre: user.nombre + ' ' + user.apellidos,
          tramite: 'Documentos',
          fecha: '20/01/2021',
          email: user.correo_electronico,
          direccion: user.direccion,
          telefono: user.telefono,
          documentos_anexos: JSON.parse(user.documentos_anexos),
          etapa: user.etapa
        }))
        setUsuario(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      })
  }
  useEffect(() => {
    userList();
  }, [])


  const chatList = async () => {

    let config = {
      headers: { Authorization: `Bearer ${auth.token}` }
    };
    // Bearer ${auth.token}
    axios.get(process.env.REACT_APP_URL_API + '/api/SolicitudesTramites/comentariosRevisionView/1', config)
      .then((response) => {

        let data = response.data
        let datatemp = [];
        for (let index = 1; index <= (Object.keys(data).length) / 2; index++) {
          datatemp.push({ user: data['usuario' + index], comentario: data['comentario' + index] })
        }

        setChat(datatemp);
      })
      .catch((e) => {
        console.log(e);
      })
  }
  useEffect(() => {
    chatList();
  }, [])

  const Comentarios = async () => {

    let config = {
      headers: { Authorization: `Bearer ${auth.token}` }
    };

    let comentarios1 = document.getElementById("Observacion").value;
    axios.put(process.env.REACT_APP_URL_API + '/api/SolicitudesTramites/comentariosRevision/1',
      {
        comentarios: comentarios1,
        respuesta: false,
        usuario: auth.user.name
      },
      config
    )
      .then((response) => {
        if (response.status === 200) {
          chatList();
        }
      })
      .catch((e) => {
        console.log(e);
      })
  };

  console.log(usuarios);
  const columns = [
    {
      title: 'Tipo de tramite',
      dataIndex: 'tramite',
      key: 'tramite',
      filters: usuarios.map(a =>
        [
          {
            text: a.tramite,
            value: a.tramite
          }
        ]
      )
    },
    {
      title: 'Fecha de solicitud',
      dataIndex: 'fecha',
      key: 'fecha',
      sorter: (a, b) => a.fecha.length - b.fecha.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Nombre solicitante',
      dataIndex: 'nombre',
      key: 'nombre',
      sorter: (a, b) => a.nombre.length - b.nombre.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Acción',
      key: 'action',
      render: (record) => (
        <GridContainer key={record.key} direction="row">
          <GridItem size="small" xs={4}><Tooltip title="Info. contacto" arrow><IconButton color="rose" aria-label="información contacto" component="span" onClick={() => { handleClickOpen(); showKey(record.key) }} ><AccountCircleIcon /></IconButton></Tooltip></GridItem>
          <GridItem size="small" xs={4}><Tooltip title="Ver documento" arrow><IconButton color="primary" aria-label="ver documento" component="span" onClick={() => { handleClickOpen1(); showKey(record.key) }}><DescriptionIcon /></IconButton></Tooltip></GridItem>
          <GridItem size="small" xs={4}><Tooltip title="Ver documento" arrow><IconButton color="primary" aria-label="revisión" component="span" onClick={() => { handleClickOpen2(); showKey(record.key) }}><RateReviewIcon /></IconButton></Tooltip></GridItem>
        </GridContainer>
      ),
    },
  ];

  function showKey(l) {
    setCount(l)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  }
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  }


  const archivar = async e => {
    let arch = e.target;
    for (let index = 0; index < arch.files.length; index++) {
      let element = arch.files[index];
      var allowedExtensions = /(.pdf)$/i;
      if (!allowedExtensions.exec(element.name)) {
        alert("Por favor adjuntar el archivo con extensión .pdf")
      } else {
        setArchivo(arch.files);
      }
    }
  }

  console.log(count);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" text>
            <CardText className={classes.cardText} color="primary">
              <h4 className={classes.colorWhite}> Solicitudes </h4>
            </CardText>
          </CardHeader>
          <CardBody>
            {/* <GridContainer> */}
            {loading ? <div style={{ textAlign: 'center' }}><CircularProgress className={classes.progress} size={40} color="primary" /></div> : <Table dataSource={usuarios} columns={columns}>
            </Table>}
            {/* </GridContainer> */}
          </CardBody>
        </Card>
      </GridItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {usuarios.map(element => {
            if (element.key === count) {
              return (<Card key={element.key}>
                <CardHeader color="info">
                  <h3 className={classes.cardTitle}><b>{element.nombre}</b></h3>
                  <h5 style={{ color: 'white' }}>Información de contacto</h5>
                </CardHeader>
                <CardBody>
                  <h4>Dirección: <b>{element.direccion}</b></h4>
                  <h4>Teléfono: <b>{element.telefono}</b></h4>
                  <h4>Correo electrónico: <b>{element.email}</b></h4>
                </CardBody>
              </Card>)
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info" round>
            Salir
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <GridContainer style={{ textAlign: "center" }} justify="center" alignItems="center">
            {usuarios.map(element => {
              if (element.key === count) {
                if (element.documentos_anexos === null) {
                  return (<GridItem xs={12} key={element.key}>
                    <h3>No hay documentos</h3>
                    {element.etapa != '3' && <GridItem key={element.key}><Button disabled>Validar Documento</Button></GridItem>}
                  </GridItem>)
                } else {
                  let doc = element.documentos_anexos.map(item => {
                    return (<div>
                      <GridItem xs={4} key={item.documento}>
                        <a href={item.url}>
                          <img alt={item.url} src={docs}></img>
                          <h5>Documento {item.documento}</h5>
                        </a>
                      </GridItem>
                      {element.etapa === '3' && <GridItem key={element.key}><Button color="info">Validar Documento</Button></GridItem>}
                    </div>)
                  })
                  return doc
                }
              }
            })}
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="info" round>
            Salir
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <GridContainer style={{ textAlign: "center" }} justify="center" alignItems="center">
            <GridItem ms={12}>
              <h3>Por favor, subir el archivo en formato pdf</h3>
              <input
                className="form-control"
                type="file"
                id="docs"
                onChange={e => archivar(e)}
                accept=".pdf"
                name="archivo"
              ></input>
            </GridItem>
            <GridItem lg={12}>
              <br></br>
              <Button color="info">Enviar</Button>
            </GridItem>
            <GridItem ms={12}>
              <Divider variant="middle" />
              <br></br>
              <h3>Listado de comentarios</h3>
              <List className={classes.comentario1}>
                {chat.map((comen) => {
                  return (
                    <div key={key++}>
                      <ListItem alignItems="center">
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={comen.user}
                          secondary={
                            <React.Fragment>
                              {/* <Typography
                                component="span"
                                variant="body2"
                                className={classes.comentario2}
                                color="textPrimary"
                              >
                              </Typography> */}
                              {comen.comentario}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  )
                })}
              </List>
            </GridItem>
            <GridItem lg={10}>
              <br></br>
              <Divider variant="middle" />
              <h3>Comentarios</h3>
              <TextareaAutosize id="Observacion" value={comentario} onChange={e => setComentario(e.target.value)} style={{ width: '100%', height: '200px' }} aria-label="empty textarea" placeholder="Por favor diligenciar los comentarios" />
            </GridItem>
            <GridItem lg={12}>
              <Button color="info" onClick={Comentarios}>Enviar</Button>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="info" round>
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  );
}