import React, { useEffect, useState, useMemo } from 'react'

import Map from '@material-ui/icons/Map'
import Slide from '@material-ui/core/Slide'
import Close from '@material-ui/icons/Close'
import Select from '@material-ui/core/Select'
import Dialog from '@material-ui/core/Dialog'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import axios from 'axios'
import { Table } from 'antd'
import Swal from 'sweetalert2'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardIcon from 'components/Card/CardIcon'
import GridItem from 'components/Grid/GridItem'
import CardHeader from 'components/Card/CardHeader'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import Formulario from 'views/Components/Digitacion/Formulario'

import { cardTitle } from 'assets/jss/material-dashboard-pro-react'

import 'antd/dist/antd.css'
import 'assets/css/material-dashboard-pro-react.css'

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
}

const steps = [
  'Información de Contacto',
  'Información del tramite',
  'Anexo de documentos',
  'Validación de solicitud',
  'Revisión de escritura',
  'Agendamiento para firma',
]

const useStyles = makeStyles(styles)

export default function EstadoTramites() {
  const [step, setStep] = useState(0)

  const classes = useStyles()
  const [count, setCount] = useState(0)
  const [etapa, setEtapa] = useState(0)
  const [nombre, setNombre] = useState('')
  const [arreglo, setArreglo] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [direccion, setDireccion] = useState('')
  const [] = useState([])
  const [simpleSelect, setSimpleSelect] = React.useState('')
  const [classicModal, setClassicModal] = React.useState(false)
  const [archivo, setArchivo] = useState('')
  const [cambioEtapa, setCambioEtapa] = useState(true)
  const [datos1, setDatos1] = useState([])
  const [validando, setValidacion] = useState(0)
  const [revision, setRevision] = useState(0)
  const [fecha, setFecha] = useState('')
  const [asignacion, setAsignacion] = useState(0)
  const [showComponent, setShowComponent] = useState(false)
  const [tramites, setTramites] = useState([])
  const [idTramites, setidTramites] = useState(0)

  const [llenaSelect, setLlenaSelect] = useState([])
  const auth = useSelector(state => state.auth)
  const { idTramite } = useParams()
  console.log(idTramite)

  const [data, setData] = useState([
    {
      key: 0,
      number: 0,
      name: 'Lizeth Paola Parra',
    },
  ])

  useEffect(() => {
    if (idTramite)
      (async () => {
        try {
          const result = await axios.get(`/api/solicitudTramites/${idTramite}`)
          if (result.status == 200) {
            console.log(result)
            setCount(result.data.data.etapa)
            for (let i = 0; i < result.data.data.etapa; i++) {
              let m = document.querySelector('#etapa' + i)
              m.classList.add('active')
            }
          } else {
            console.log('ERROR')
          }
        } catch (e) {
          console.log(e)
        }
      })()
  }, [])

  useEffect(() => {
    if (count == 1) {
      axios
        .get('/api/tramites')
        .then(response => {
          if (response.status == 200) {
            setTramites(response.data)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }, [count])

  const columns = [
    {
      title: 'Numero',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Documento',
      dataIndex: 'name',
      key: 'name',
    },
  ]

  const upDocument = event => {
    console.log("Dispara");
    const formData = new FormData()
    formData.append('id_plantilla', event.target.value)
    formData.append('nombre_documento', idTramite)

    axios
      .post('/api/documentosAgiles', formData)
      .then(response => {
        setSimpleSelect(response.data.id)
      })
      .catch(e => {
        console.log(e)
      })
  }
  const siguiente = e => {
    // e.preventDefault();
    alert('Esta seguro de enviar la información a la etapa' + ' ' + count)
    setCount(count + 1)
    let s = document.getElementById('progressbar')
    let m = document.querySelector('#etapa' + count)
    m.classList.add('active')
    console.log(archivo)
  }

  const siguienteE1 = e => {
    e.preventDefault()

    let name = document.getElementById('nombres').value
    let correo = document.getElementById('email').value
    let telefono = document.getElementById('mobile').value
    let apellido = document.getElementById('apellidos').value
    let direccion = document.getElementById('direccion').value

    axios
      .post('/api/SolicitudesTramites', {
        nombre: name,
        apellidos: apellido,
        correo_electronico: correo,
        telefono: telefono,
        direccion: direccion,
        etapa: '1',
      })
      .then(response => {
        console.log(response.status)
        if (response.status == 201) {
          setidTramites(response.data.data.id)
          Swal.fire({
            icon: 'success',
            title: 'Enviado',
            text: 'Datos Guardados. Iniciamos tramite!',
          }).then(result => {
            setCount(count + 1)
            let m = document.querySelector('#etapa' + 0)
            m.classList.add('active')
          })
        }
      })
      .catch(e => {
        console.log('ERROR!!!!!', e)
      })
  }

  const siguienteE3 = e => {
    e.preventDefault()
    let document1 = document.getElementById('docs').value
    console.log(document1)
    // mostrar();
    console.log(archivo)
    const formData = new FormData()
    formData.append('documentos', document1)

    let config = {
      headers: { Authorization: `Bearer ${auth.token}` },
      data: formData,
    }
    axios
      .post(
        process.env.REACT_APP_URL_API + '/api/SolicitudesTramites/estadoTres/' + idTramites,
        {
          documentos: document1,
        },
        config
      )
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log('ERROR!!!!!', e)
      })
  }

  const siguienteE4 = e => {
    // e.preventDefault();

    let config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    }
    axios
      .get(process.env.REACT_APP_URL_API + '/api/SolicitudesTramites/' + idTramites, config)
      .then(response => {
        let data = response.data.data
        console.log(data)
        if (data.respuesta_solicitud != null) {
          setValidacion(1)
          let v = document.querySelector('#validando')
          v.remove()

          setTimeout(() => {
            setCount(count + 1)
            let s = document.getElementById('progressbar')
            let m = document.querySelector('#etapa' + 3)
            m.classList.add('active')
          }, 3000)
        }
      })
      .catch(e => {
        console.log('ERROR!!!!!', e)
      })
  }

  const siguienteE5 = e => {
    e.preventDefault()

    let config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    }
    axios
      .get(process.env.REACT_APP_URL_API + '/api/SolicitudesTramites/' + idTramites, config)
      .then(response => {
        let data = response.data.data
        if (data.respuesta_revision_escritura != null) {
          setRevision(1)
          console.log(data.respuesta_revision_escritura)

          setTimeout(() => {
            setCount(count + 1)
            let s = document.getElementById('progressbar')
            let m = document.querySelector('#etapa' + 4)
            m.classList.add('active')
          }, 2000)
        }
      })
      .catch(e => {
        console.log('ERROR!!!!!', e)
      })
  }

  const siguienteE6 = e => {
    e.preventDefault()

    let config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    }
    axios
      .get(process.env.REACT_APP_URL_API + '/api/SolicitudesTramites/' + idTramites, config)
      .then(response => {
        let data = response.data.data
        if (data.fecha_citacion != null) {
          setFecha(data.fecha_citacion)
          setAsignacion(1)
          console.log(data.fecha_citacion)

          setTimeout(() => {
            // setCount(count + 1);
            let s = document.getElementById('progressbar')
            let m = document.querySelector('#etapa' + 5)
            m.classList.add('active')
          }, 2000)
        }
      })
      .catch(e => {
        console.log('ERROR!!!!!', e)
      })
  }

  const anterior = e => {
    e.preventDefault()

    setCount(count - 1)
    alert(count)
    let m = document.querySelector('#etapa' + (count - 1))
    m.classList.remove('active')
    console.log(m)
  }

  const archivar = async e => {
    setArchivo('')
    setData([])

    let arch = e.target
    if (arch.files.length > 3) {
      alert('Solo puede subir 3 archivos como máximo, si desea más puede crear un archivo .zip/.rar')
      return
    }
    for (let index = 0; index < arch.files.length; index++) {
      let element = arch.files[index]
      var allowedExtensions = /(.jpg|.jpeg|.gif|.png|.xls|.xlsx|.doc|.docx|.pdf|.zip|.rar)$/i
      if (!allowedExtensions.exec(element.name)) {
        alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.')
      } else {
        setArchivo(arch.files)
      }
    }
  }

  const mostrar = e => {
    e.preventDefault()

    setDatos1([])

    for (let i in archivo) {
      if (archivo[i].name != undefined && archivo[i].name != 'item') {
        console.log(archivo)
        datos1.push({
          key: parseInt(i),
          number: i,
          name: archivo[i].name,
        })
      }
    }
    setData(datos1)

    // Swal.fire({
    //   title: 'Esta Seguro de Enviar los Documentos ?',
    //   text: "Verifique antes de enviar!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#5DC857',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Guardar'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(
    //       'Enviado!',
    //       'Documentos Guardados.',
    //       'success'
    //     ).then((res)=>{
    //       setCount(count + 1);
    //       let s = document.getElementById("progressbar");
    //       let m = document.querySelector("#etapa" + count);
    //       m.classList.add("active");
    //     })
    //   }
    // })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Map />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Etapas de Tramites!</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <div className="card1">
                  <ul id="progressbar" className="text-center">
                    {steps.map((stepIter, idx) => (
                      <li
                        key={stepIter}
                        className={classNames('step0', {
                          active: step > idx,
                        })}
                      />
                    ))}
                  </ul>
                  {steps.map(stepIter => (
                    <h6 key={`${stepIter}-label`} className="mb-5">
                      {stepIter}
                    </h6>
                  ))}

                  <button id="sig" onClick={anterior} className="btn btn-primary ">
                    Anterior
                  </button>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <div className="card2 first-screen show ml-2">
                  <GridContainer>
                    {count == 0 && (
                      <>
                        <GridItem xs={12} sm={12} md={12}>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                              <div className="form-group">
                                <CustomInput
                                  labelText="Nombres"
                                  id="nombres"
                                  value={nombre}
                                  // onChange={e => setNombre(e.target.value)}
                                  formControlProps={{
                                    fullWidth: true,
                                    required: true,
                                  }}
                                  inputProps={{
                                    type: 'text',
                                  }}
                                />
                              </div>

                              <div className="form-group">
                                <CustomInput
                                  labelText="Correo Electronico"
                                  id="email"
                                  value={email}
                                  formControlProps={{
                                    fullWidth: true,
                                    required: true,
                                  }}
                                  inputProps={{
                                    type: 'email',
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <CustomInput
                                  labelText="Telefono ó Celular"
                                  id="mobile"
                                  value={mobile}
                                  formControlProps={{
                                    fullWidth: true,
                                    required: true,
                                  }}
                                  inputProps={{
                                    type: 'number',
                                  }}
                                />
                              </div>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <div className="form-group">
                                <CustomInput
                                  labelText="Apellidos"
                                  id="apellidos"
                                  value={apellido}
                                  formControlProps={{
                                    fullWidth: true,
                                    required: true,
                                  }}
                                  inputProps={{
                                    type: 'text',
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <CustomInput
                                  labelText="Dirección"
                                  id="direccion"
                                  value={direccion}
                                  formControlProps={{
                                    fullWidth: true,
                                    required: true,
                                  }}
                                  inputProps={{
                                    type: 'text',
                                  }}
                                />
                              </div>

                              <button
                                style={{ margin: '23px 29px' }}
                                id="sig"
                                onClick={siguienteE1}
                                // onClick={siguienteE1}
                                className="btn btn-primary text-right"
                              >
                                Continuar
                              </button>
                            </GridItem>
                          </GridContainer>

                          <GridContainer>
                            <GridItem>
                              {etapa == 1 && (
                                <div className="alert alert-warning" role="alert">
                                  Datos enviados correctamente
                                </div>
                              )}
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                      </>
                    )}
                    {count == 1 && (
                      <>
                        <GridItem xs={12} sm={12} md={8}>
                          <div className="form-group mt-1 mb-1">
                            <FormControl fullWidth className={classes.selectFormControl}>
                              <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                                Escoja Tramite
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  className: classes.selectMenu,
                                }}
                                classes={{
                                  select: classes.select,
                                }}
                                value={simpleSelect}
                                onChange={(upDocuent)}
                                inputProps={{
                                  name: 'simpleSelect',
                                  id: 'selectTramite',
                                }}
                              >
                                <MenuItem
                                  disabled
                                  classes={{
                                    root: classes.selectMenuItem,
                                  }}
                                >
                                  Escoja Tramite
                                </MenuItem>
                                {tramites.map(tramite => (
                                  <MenuItem
                                    key={tramite.id}
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected,
                                    }}
                                    value={tramite.id_plantilla}
                                  >
                                    {tramite.nombre_tramite}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <button
                            style={{ margin: '23px -42px' }}
                            id="sig"
                            onClick={siguiente}
                            className="btn btn-primary "
                          >
                            Enviar Info.
                          </button>
                        </GridItem>

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            {/*simpleSelect != '' && <Formulario idDocu={simpleSelect} />*/}
                          </GridItem>
                        </GridContainer>
                      </>
                    )}
                    {count == 2 && (
                      <>
                        <GridItem xs={12} sm={12} md={12}>
                          <form>
                            {/* <input
                                  className="form-control"
                                  multiple
                                  type="file"
                                  onChange={e => archivar(e)}
                                  name="archivo"
                                  accept=".jpg,.jpeg,.gif,.png,.xls,.xlsx,.doc,.docx,.pdf,.zip,.rar"
                                ></input>
                                <h6 className="title ">
                                  Formatos válidos: Imagen (jpg,jpeg,gif,png),
                                  Texto (xls,xlsx,doc,docx,pdf), compresión de
                                  archivos (zip, rar). 3 archivos máximo, para
                                  más documentos subirlos en un .zip/.rar
                                </h6> */}

                            <div className="mb-2">
                              <label htmlFor="formFileMultiple" className="form-label">
                                Formatos válidos: Imagen (jpg,jpeg,gif,png), Texto (xls,xlsx,doc,docx,pdf), compresión
                                de archivos (zip, rar). 3 archivos máximo, para más documentos subirlos en un .zip/.rar
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                id="docs"
                                onChange={e => archivar(e)}
                                accept=".jpg,.jpeg,.gif,.png,.xls,.xlsx,.doc,.docx,.pdf,.zip,.rar"
                                name="archivo"
                                multiple
                              ></input>
                            </div>
                          </form>
                        </GridItem>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12} style={{ margin: 'auto' }}>
                            <Table columns={columns} dataSource={data} />
                          </GridItem>
                        </GridContainer>

                        <GridItem xs={12} sm={12} md={5}>
                          <button
                            id="sig"
                            // onClick={e => mostrar(e)}
                            onClick={siguienteE3}
                            className="btn btn-primary "
                          >
                            Enviar Info.
                          </button>
                        </GridItem>
                      </>
                    )}
                    {count == 3 && (
                      <>
                        <GridItem xs={12} sm={12} md={9}>
                          <h5> Validación de Solicitud</h5>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          {/* <button
                              id="sig"
                              onClick={siguienteE4}
                              className="btn btn-primary "
                            >
                              Temp
                            </button> */}
                          {setTimeout(() => {
                            siguienteE4()
                          }, 3000)}
                        </GridItem>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={10}>
                            <div
                              className="alert alert-warning"
                              style={{ marginTop: '20px' }}
                              role="alert"
                              id="validando"
                            >
                              Estamos procesando su solicitud y validando sus documentos, por favor este atento a
                              nuestras notificaciones, si desea mayor información contactenos....
                            </div>
                          </GridItem>
                        </GridContainer>
                        {validando == 1 && (
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={10}>
                              <div className="alert alert-primary" style={{ marginTop: '20px' }} role="alert">
                                Solicitud y Documentos validados
                              </div>
                            </GridItem>
                          </GridContainer>
                        )}
                      </>
                    )}
                    {count == 4 && (
                      <>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={9}>
                            <h5> Revision de escritura</h5>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <center className="mt-5">
                              <a
                                href={require('assets/pdf/prueba.pdf')}
                                style={{ textDecoration: 'none !important' }}
                                target="_blank"
                              >
                                <img alt="..." width="80px" src={require('assets/img/pdf.jpg')}></img>
                                <h6 className="my-3">Compraventa 2020</h6>
                              </a>
                            </center>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <center>
                              <div className={classes.buttonGroup} style={{ marginTop: '2em' }}>
                                <Button className={classes.firstButton} id="sig" onClick={siguienteE5}>
                                  Aceptar Doc.
                                </Button>

                                <Button className={classes.middleButton} onClick={() => setClassicModal(true)}>
                                  Observaciones
                                </Button>
                                <Dialog
                                  classes={{
                                    root: classes.center + ' ' + classes.modalRoot,
                                    paper: classes.modal,
                                  }}
                                  open={classicModal}
                                  keepMounted
                                  onClose={() => setClassicModal(false)}
                                  aria-labelledby="classic-modal-slide-title"
                                  aria-describedby="classic-modal-slide-description"
                                >
                                  <DialogTitle
                                    id="classic-modal-slide-title"
                                    disableTypography
                                    className={classes.modalHeader}
                                  >
                                    <GridContainer>
                                      <GridItem md={10}>
                                        <h4 className={classes.modalTitle}>Observaciones</h4>
                                      </GridItem>
                                      <GridItem md={2}>
                                        <Button
                                          justIcon
                                          style={{ textAlign: 'right' }}
                                          className={classes.modalCloseButton}
                                          key="close"
                                          aria-label="Close"
                                          color="transparent"
                                          onClick={() => setClassicModal(false)}
                                        >
                                          <Close className={classes.modalClose} />
                                        </Button>
                                      </GridItem>
                                    </GridContainer>
                                  </DialogTitle>
                                  <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
                                    <p>Coloque aqui sus sugerencias u observaciones</p>
                                    <form>
                                      <div className="md-form">
                                        <label htmlFor="form7">Comentarios</label>
                                        <textarea id="form7" className="md-textarea form-control" rows="3"></textarea>
                                      </div>
                                    </form>
                                  </DialogContent>
                                  <DialogActions className={classes.modalFooter}>
                                    {/* <Button color="transparent">
                                        Enviar
                                      </Button>
                                      <Button
                                        onClick={() => setClassicModal(false)}
                                        color="danger"
                                        simple
                                      >
                                        Cerrar
                                      </Button> */}
                                    <div className={classes.buttonGroup} style={{ marginTop: '2em' }}>
                                      <Button
                                        className={classes.firstButton}
                                        color="transparent"
                                        style={{ marginRight: '-4em' }}
                                      >
                                        Enviar
                                      </Button>

                                      <Button
                                        onClick={() => setClassicModal(false)}
                                        color="danger"
                                        simple
                                        className={classes.middleButton}
                                      >
                                        Cerrar
                                      </Button>
                                    </div>
                                  </DialogActions>
                                </Dialog>
                              </div>
                            </center>
                          </GridItem>
                        </GridContainer>
                        {revision == 1 && (
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={10}>
                              <div className="alert alert-primary" style={{ marginTop: '20px' }} role="alert">
                                Revision de documento OK!!
                              </div>
                            </GridItem>
                          </GridContainer>
                        )}
                      </>
                    )}
                    {count == 5 && (
                      <>
                        <GridItem xs={12} sm={12} md={9}>
                          <h5> Agendamiento de Cita</h5>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <button id="sig" onClick={siguienteE6} className="btn btn-primary ">
                            Sig
                          </button>
                        </GridItem>

                        {asignacion == 1 && (
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={10}>
                              <div className="alert alert-primary" style={{ marginTop: '20px' }} role="alert">
                                Asignación de la fecha es {fecha}
                              </div>
                            </GridItem>
                          </GridContainer>
                        )}
                      </>
                    )}
                    {count == 6 && (
                      <>
                        <GridItem xs={12} sm={12} md={9}>
                          <h5> Fin </h5>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <button id="sig" type="submit" className="btn btn-primary ">
                            Sig
                          </button>
                        </GridItem>
                      </>
                    )}
                  </GridContainer>
                </div>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}