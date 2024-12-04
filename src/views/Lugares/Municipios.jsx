import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Form } from "antd";
import "antd/dist/antd.css";
//Local
import EditableCell from "../../components/Custom/EditableCell";
import useTable from "../../hooks/useTable";
import { columns } from "../../utils/columnMunicipios";
import FormItem from "../../components/Custom/FormMunicipios";
import { EXTERNAL_API_PATHS } from "../../utils/constants";
//Styles
import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
//Constants
const title = "Municipios";
const name = "Municipio";
const key = "municipio";

export default function EditableTable() {
  const classes = useStyles();
  const searchInput = useRef();
  const [departments, setDepartments] = useState();
  const {
    formEdit,
    formCreate,
    data,
    loading,
    onEdit,
    onDelete,
    updateOnEdit,
    createItem,
    editItem,
    delItem,
    save,
    isEditing,
    cancel,
    onFinishFailed,
    updateNameItem,
    updateData,
  } = useTable({ key });

  const auth = useSelector((state) => state.auth);
  const header = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  useEffect(() => {
    axios.get(EXTERNAL_API_PATHS["departamento"]).then((res) => {
      setDepartments(res.data);
    });
    updateNameItem(name);
  }, []);

  useEffect(() => {
    if (data.length) {
      const newData = data.map((item) => ({
        ...item,
        department: item.department.name,
      }));
      updateData(newData);
    }
  }, [loading]);

  return (
    <>
      <FormItem
        name={name}
        title={title}
        maxName={30}
        maxCode={5}
        formCreate={formCreate}
        createItem={createItem}
        onFinishFailed={onFinishFailed}
        loading={loading}
        departments={departments}
      />
      <br />
      <Form form={formEdit} component={false}>
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
            classes
          )}
          loading={loading}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            pageSize: 5,
          }}
        />
      </Form>
    </>
  );
}
