import React, { useRef } from "react";
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

//others
import useTable from "hooks/useTableRadicacion";
import EditableCell from "components/Custom/EditableCell";
import { columns } from "utils/columnRadicaciones";
import useStyles from "assets/jss/material-dashboard-pro-react/views/common";
import { FILTER_DAYS } from "utils/constants";

const key = "radicaciones";

export default function EditableTable() {

  const classes = useStyles();

  const searchInput = useRef();
  const { data, setDays, loading } = useTable({ key });

  return (
    <Card>
      <CardHeader color="rose" text>
        <CardText className={classes.cardText} color="primary">
          <h4 className={classes.colorWhite}>Radicaciones</h4>
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
                  Mostrar radicaciones de
                <Select
                  MenuProps={{
                    className: classes.selectMenu,
                  }}
                  className={classes.select}
                  displayEmpty
                  defaultValue="1"
                  onChange={(e) => {
                    setDays(e.target.value);
                  }}
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
              <Link to="/admin/radicacion">
                <Button color="rose" size="sm">
                  Nueva radicación
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
                columns={columns(classes, searchInput)}
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
