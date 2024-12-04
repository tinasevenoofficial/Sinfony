import React, { useRef } from "react";
import { Table, Form } from "antd";
import "antd/dist/antd.css";
//Local
import EditableCell from "../../components/Custom/EditableCellEdicto";
import useTable from "../../hooks/useTableEdicto";
import { columns } from "../../utils/columnEdictos";
import FormEdictos from "components/Custom/FormEdictos";
//Styles
import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
//Constants
const title = "Edictos";
const name = "Edictos";
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
    editItem,
    delItem,
    save,
    isEditing,
    cancel,
    onFinishFailed,
  } = useTable({ key });

  return (
    <>
      <FormEdictos
        name={name}
        title={title}
        formCreate={formCreate}
        createItem={createItem}
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
            classes
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
