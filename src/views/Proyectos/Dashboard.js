import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { EXTERNAL_API_PATHS } from 'utils/constants'

import { NavLink } from 'react-router-dom'
// @material-ui/core components

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'
// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Table from 'components/Table/Table.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardText from 'components/Card/CardText.js'
import CardBody from 'components/Card/CardBody.js'

import useStyles from '../../assets/jss/material-dashboard-pro-react/views/common'

import { Spin } from 'antd'

export default function Dashboard() {
  const auth = useSelector(state => state.auth)

  const [proyectos, setProyectos] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const classes = useStyles()

  React.useEffect(() => {
    const consultarProyectos = async () => {
      setLoading(true)
      axios.get(EXTERNAL_API_PATHS.proyecto2)
        .then(response => {
          setLoading(false)
          if (response.status === 200) {
            console.log(response.data)
            let tempData = response.data.map(proyecto => [
              <ListItem>
                <NavLink to={'/admin/proyecto/' + proyecto.codigo}>
                  <ListItemText>
                    <AddIcon style={{ color: 'black' }} />
                    <span style={{ fontSize: '15px', color: 'black', fontWeight: 300, marginLeft: '10px' }}>
                      {proyecto.proyecto}
                    </span>
                  </ListItemText>
                </NavLink>
              </ListItem>,
            ])
            setProyectos(tempData)
          } else {
            console.log(response)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }

    consultarProyectos()
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" text>
              <CardText className={classes.cardText} color="primary">
                <h4 className={classes.colorWhite}>Ver Mis Proyectos</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <Spin spinning={loading}>
                <GridContainer justify="space-between">
                  <GridItem xs={12} sm={12} md={6}>
                    <Table tableData={proyectos} />
                  </GridItem>
                </GridContainer>
              </Spin>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
