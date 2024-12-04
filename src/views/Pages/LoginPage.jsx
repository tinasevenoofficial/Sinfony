import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import Email from '@material-ui/icons/Email'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import ReactLoading from 'react-loading'
import { useTenancyContext } from 'context/TenancyContext'

import { login } from '_redux/actions'
import { principalImages } from 'utils/constants'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import Button from 'components/CustomButtons/Button.js'
import Card from 'components/Card/Card.js'
import CardBody from 'components/Card/CardBody.js'
import CardFooter from 'components/Card/CardFooter.js'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle.js'

import slide1 from '../../assets/img/supernotariado.png'
import slide2 from '../../assets/img/ucnc.png'
import slide3 from '../../assets/img/gov.png'
import logoSinfony from '../../assets/img/sinfonyLogo.png'
import logoSinfonyG from '../../assets/img/sinfonyLogoG.png'

const useStyles = makeStyles(styles)

export default function LoginPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { loading, name } = useTenancyContext()

  const [cardAnimaton, setCardAnimation] = useState('cardHidden') // REVIEW
  const [loadd, setLoadd] = useState()
  const [mensaje, setMensaje] = useState()

  async function onSubmit() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    setLoadd(true)

    axios
      .post(
        '/api/user/login',
        { email, password },
        {
          mode: 'cors',
        }
      )
      .then(response => {
        if (response.status === 200) {
          const permisos = response.data.user.permisos.map(item => item.id)
          const user = {
            roles: response.data.user.id_rol,
            email: response.data.user.email,
            name: response.data.user.usuario,
            id: response.data.user.id,
            permisos,
          }
          dispatch(login({ user, token: response.data.token }))
          history.push('/admin/dashboard')
        } else {
          setMensaje('Ingreso Incorrecto - Verifique sus credenciales')
        }
        setLoadd(false)
      })
      .catch(() => {
        setMensaje('Ingreso Incorrecto')
        setLoadd(false)
      })
  }

  useEffect(() => {
    const id = setTimeout(function () {
      setCardAnimation('')
    }, 700)
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id)
    }
  })

  const classes = useStyles()

  return (
    <div className={classes.container}>
      <GridContainer justify="center" className={classes[cardAnimaton]}>
        <GridItem xs={12} sm={10} md={6}>
          <div className="container">
            <div className="slider">
              <Card style={{ backgroundColor: '#F3F3F3' }}>
                <CardBody>
                  <div>
                    <Carousel>
                      <Carousel.Item>
                        <img className="d-block w-100" src={slide1} alt="Superintendencia de Notariado y Registro" />
                      </Carousel.Item>
                    </Carousel>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="logoSuper">
              <Card style={{ backgroundColor: '#F3F3F3', display: 'flex' }}>
                <CardBody>
                  {loading ? <center>
                    <ReactLoading type="bubbles" color="#2d358c" height="20%" width="20%" />
                  </center> : <img className="photoLogoNot" src={principalImages[name]} />}
                </CardBody>
              </Card>
            </div>
            <div className="botones">
              <Card style={{ backgroundColor: '#F3F3F3' }}>
                <CardBody>
                  <div className="row">
                    <Button className="boton-responsive" color="mi" size="sm">
                      Tutoriales
                    </Button>
                  </div>
                  <div className="row">
                    <Button className="boton-responsive" color="mi" size="sm">
                      Soporte
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </GridItem>
        <GridItem xs={10} sm={10} md={4}>
          <form id="form">
            {loadd === true ? (
              <Card style={{ backgroundColor: '#F3F3F3' }} login>
                <CardBody profile>
                  <div>
                    <div className="loading-puntos">
                      <center>
                        <ReactLoading type={'bubbles'} color={'#2d358c'} height={'50%'} width={'30%'} />
                      </center>
                    </div>
                    <div className="title">
                      <center>
                        <a>Cargando</a>
                      </center>
                    </div>
                    <div className="loading-img">
                      <center>
                        <a>
                          <img className="photoLogoSinfonyL" src={logoSinfonyG} alt="..." />
                        </a>
                      </center>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card style={{ backgroundColor: '#F3F3F3' }} login /* className={classes[cardAnimaton]} */>
                <CardBody profile>
                  <div>
                    <img className="photoLogoSinfony" src={logoSinfony} />
                  </div>
                  <CustomInput
                    labelText="Correo Electronico"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Contraseña"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                        </InputAdornment>
                      ),
                      type: 'password',
                      autoComplete: 'off',
                    }}
                  />
                  <div id="mostrar">
                    {mensaje !== undefined ? (
                      <div className="alert alert-danger mx-4" role="alert">
                        <center>{mensaje}</center>
                      </div>
                    ) : (
                      <div>
                        <b></b>
                      </div>
                    )}
                  </div>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" onClick={onSubmit} block color="mi" className="boton-responsive">
                    INICIAR SESIÓN
                  </Button>
                </CardFooter>
              </Card>
            )}
          </form>
        </GridItem>
      </GridContainer>
    </div>
  )
}
