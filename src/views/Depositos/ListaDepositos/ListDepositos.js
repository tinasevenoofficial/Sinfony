import React, { useRef, useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
//import number format function
import FormatearNum from "components/ComponenteFormatearNumero/Formatear_numeros"

//others
import useTable from "hooks/useTableDeposito";
import EditableCell from "components/Custom/EditableCell";
import { columns } from "utils/columnDeposito";
import useStyles from "assets/jss/material-dashboard-pro-react/views/common";
import { FILTER_DAYS } from "utils/constants";
const key = "deposito";



export default function EditableTable() {
  const classes = useStyles();
  const searchInput = useRef();
  const { data, setDays, loading } = useTable({ key });
  const [filtro, setfiltro] = useState();
  data.map((element => {
    if(element.total){

      element.total = FormatearNum(element.total);
    }
  }))

  const handleFiltro = (event) => {
    setDays(event.target.value);
    setfiltro(event.target.value);
  }
  return (
    <Card>
      <CardHeader color="primary" text>
        <CardText className={classes.cardText} color="primary">
          <h4 className={classes.colorWhite}>Mis Depositos</h4>
        </CardText>
      </CardHeader>
      <CardBody>
        <form>
          <GridContainer
            alignItems="center"
            justify="center"
            className={classes.formStyle}
          >
            <GridItem xs={12} sm={6} md={4}>
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel id="filter-label">
                  Mostrar depositos de
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu,
                  }}
                  classes={{
                    select: classes.select,
                  }}
                  displayEmpty
                  defaultValue="1"
                  value={filtro}
                  onChange={handleFiltro}
                  inputProps={{
                    name: "date",
                  }}
                >
                  <MenuItem
                    disabled
                    value=""
                    classes={{
                      root: classes.selectMenuItem,
                    }}
                  >
                    Seleccione un filtro
                  </MenuItem>
                  {FILTER_DAYS.map(({ name, id }) => (
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
            <GridItem xs={12} sm={6} md={4}>
              <Link to="/admin/Depositos">
                <Button color="rose" size="sm">
                  Nuevo Deposito
                </Button>
              </Link>
            </GridItem>
            <GridItem xs={12}>
              <Table
                className={classes.table}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                size="small"
                bordered
                scroll={{ x: 500 }}
                dataSource={data}
                columns={columns(classes, searchInput, setDays, filtro)}
                loading={loading}
                rowClassName="editable-row"
              />
            </GridItem>
          </GridContainer>
        </form>
      </CardBody>
    </Card>
  );
}
