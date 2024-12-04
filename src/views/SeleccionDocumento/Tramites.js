import React, { useRef, useState, setState } from "react";
import { Table, Form } from "antd";
import "antd/dist/antd.css";
//Local
import EditableCell from "../../components/Custom/EditableCellTramite";
import useTable from "../../hooks/useTableTramite";
import { columns } from "../../utils/columnTramites";
import FormFiltrosTramites from "components/Custom/FormFiltrosTramites";
import {Box, List, ListItem,Typography} from '@material-ui/core/';
import { useSelector } from 'react-redux'

//Styles
import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
//Constants
const title = "Consultar Tramites";
const name = "Tramites";
const key = "edicto";

export default function EditableTable() {
  const classes = useStyles();
  const searchInput = useRef();
  const {
    formEdit,
    formCreate,
    data,
    loading,
    onEdit,
    onDelete,
    updateOnEdit,
    createItem,
    searchItem,
    getDocument,
    editItem,
    delItem,
    save,
    isEditing,
    cancel,
    onFinishFailed,
  } = useTable({ key });
  const [drawerState, setDrawerState] = React.useState({});

  const toggleDrawer = (id, anchor, open) => {
    setDrawerState((prevState) => {
      if (prevState[id]?.[anchor] === open) {
        // Si el estado no cambia, no actualices
        return prevState;
      }
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          [anchor]: open,
        },
      };
    });
  };
  const auth = useSelector(state => state.auth)
  let permisos = auth.user.permisos

  const list = (anchor,data) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <div>
      <Typography variant="h5" component="div" gutterBottom>Datos Orden Escrituración:</Typography>
      <List>
        {Object.entries(data).map(([key, value]) => (
          <ListItem key={key}>
            <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
          </ListItem>
        ))}
      </List>
    </div>
    </Box>
  );


  return (
    <>
      <FormFiltrosTramites
        name={name}
        title={title}
        formCreate={formCreate}
        createItem={createItem}
        searchItem={searchItem}
        onFinishFailed={onFinishFailed}
        loading={loading}
         />
      <br />
      <Form form={formEdit} component={false}>
        <Table
          className={classes.table}
          components={{
            body: {
              cell: (props) => <EditableCell form={formEdit} {...props} />,
            },
          }}
          size="small"
          bordered
          scroll={{ x: 500 }}
          dataSource={data}
          columns={columns(
            cancel,
            isEditing,
            updateOnEdit,
            save,
            delItem,
            editItem,
            onEdit,
            onDelete,
            name,
            searchInput,
            classes,
            getDocument,
            toggleDrawer,
            drawerState,
            list,
            permisos
          )}
          loading={loading}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            pageSize: 10,
          }}
        />
      </Form>
    </>
  );
}
