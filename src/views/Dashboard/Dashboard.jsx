import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import AssignmentIcon from '@material-ui/icons/Assignment'

import { useFetch } from 'hooks'
import Card from 'components/Card/Card'
import Table from 'components/Table/Table'
import CardBody from 'components/Card/CardBody'
import GridItem from 'components/Grid/GridItem'
import CardIcon from 'components/Card/CardIcon'
import CardHeader from 'components/Card/CardHeader'
import GridContainer from 'components/Grid/GridContainer'
import styles from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'

const useStyles = makeStyles(styles)

const Dashboard = () => {
  const classes = useStyles()
  const { data: response } = useFetch('/api/proyecto')

  const item = useMemo(
    response.data.data.map(({ id, nombre }) => (
      <ListItem key={id}>
        <NavLink to={'/admin/proyecto/' + id}>
          <ListItemText>
            <AddIcon style={{ color: 'black' }} />
            <span style={{ fontSize: '15px', color: 'black', fontWeight: 300, marginLeft: '10px' }}>{nombre}</span>
          </ListItemText>
        </NavLink>
      </ListItem>
    )),
    [response]
  )

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <AssignmentIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Mis Proyectos</h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={12} md={6}>
                  <Table tableData={item} />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default Dashboard
