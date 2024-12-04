import React from 'react'

import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import FormatearNum from "components/ComponenteFormatearNumero/Formatear_numeros"

import PropTypes from 'prop-types'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'

import useStyles from './DetailsConsultation.styles'

const options = {
  tooltips: {
    enabled: false,
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const sum = ctx.chart.data.datasets[0].data.reduce((prev, curr) => prev + curr, 0)

        return ((value * 100) / sum).toFixed(2) + '%'
      },
      color: '#fff',
    },
  },
}

const DetailsConsultation = ({ client, data, dataOnlyClient, portfolioPerAge, selected }) => {
  const classes = useStyles()
  console.log(selected)
  const datos = selected !== 'all' && dataOnlyClient ? dataOnlyClient : data
  const dataPie = {
    labels: ['Menor de 30', 'De 30 a 90', 'De 90 a 180', 'Mas de 180'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [datos.cartera_edades.total_menor_30, datos.cartera_edades.total_30_90, datos.cartera_edades.total_90_180, datos.cartera_edades.total_mayor_180],
        backgroundColor: ['#14abc4', '#d7df45', '#9b4c89', '#f8442a'],
      },
    ],
  }

  return (
    <Card className={classes.root}>
      <CardBody>
        <Typography paragraph>CARTERA DETALLADA</Typography>
        <Grid container spacing={5} alignItems="flex-start">
          <Grid item md={8} sm={12}>
            <Typography paragraph component="span" variant="body2">
              CLIENTE:{' '}
            </Typography>
            <Typography paragraph component="span" variant="body2">
              {`${client.nombres} ${client.apellidos}`}
            </Typography>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell}></TableCell>
                  <TableCell className={classes.cell} align="right">
                    Ultimos 3 meses
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Ultimo mes
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.cell} component="th" scope="row">
                    Escrituración
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    {FormatearNum(datos.resumen.total_ultimos_3_mes.escrituras)}
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    {FormatearNum(datos.resumen.total_ultimo_mes.escrituras)}
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    {FormatearNum(datos.resumen.total.escrituras)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.cell} component="th" scope="row">
                    Varios
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    {FormatearNum(datos.resumen.total_ultimos_3_mes.varios)}
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    {FormatearNum(datos.resumen.total_ultimo_mes.varios)}
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    {FormatearNum(datos.resumen.total.varios)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.cell} component="th" scope="row">
                    Depositos
                  </TableCell>
                  <TableCell className={classes.cellTotal} align="right">
                    {FormatearNum(datos.resumen.total_ultimos_3_mes.depositos)}
                  </TableCell>
                  <TableCell className={classes.cellTotal} align="right">
                    {FormatearNum(datos.resumen.total_ultimo_mes.depositos)}
                  </TableCell>
                  <TableCell className={classes.cellTotal} align="right">
                    {FormatearNum(datos.resumen.total.depositos)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.cell} component="th" scope="row"></TableCell>
                  <TableCell className={classes.cell} align="right">
                    {FormatearNum(datos.resumen.total_ultimos_3_mes.escrituras +
                      datos.resumen.total_ultimos_3_mes.varios +
                      datos.resumen.total_ultimos_3_mes.depositos)}
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    {FormatearNum(datos.resumen.total_ultimo_mes.escrituras +
                      datos.resumen.total_ultimo_mes.varios +
                      datos.resumen.total_ultimo_mes.depositos)}
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    {FormatearNum(datos.resumen.total.escrituras + datos.resumen.total.varios + datos.resumen.total.depositos)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item md={4} sm={12}>
            <Card className={classes.containerChart}>
              <CardBody>
                <Pie data={dataPie} plugins={[ChartDataLabels]} options={options} />
              </CardBody>
            </Card>
          </Grid>
        </Grid>
      </CardBody>
    </Card>
  )
}

DetailsConsultation.propTypes = {
  client: PropTypes.object.isRequired,
  portfolioPerAge: PropTypes.arrayOf(PropTypes.number).isRequired,
  data: PropTypes.shape({
    resumen: PropTypes.shape({
      total: PropTypes.shape({
        depositos: PropTypes.number,
        varios: PropTypes.number,
        escrituras: PropTypes.number,
      }),
      total_ultimo_mes: PropTypes.shape({
        depositos: PropTypes.number,
        varios: PropTypes.number,
        escrituras: PropTypes.number,
      }),
      total_ultimos_3_mes: PropTypes.shape({
        depositos: PropTypes.number,
        varios: PropTypes.number,
        escrituras: PropTypes.number,
      }),
    }),
  }),
}

export default DetailsConsultation
