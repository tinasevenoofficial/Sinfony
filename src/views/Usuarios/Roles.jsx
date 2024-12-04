import React, { useEffect, useRef, useState } from "react";
import { Table, Form, Spin, Alert } from "antd";
import "antd/dist/antd.css";
//material ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Button from "components/CustomButtons/Button.js";
//Local
import EditableCell from "../../components/Custom/EditableCell";
import useTable from "../../hooks/useTableRol";
import { columns } from "../../utils/columnRoles";
import FormItem from "../../components/Custom/FormRoles";
import Permisos from "./Permisos";
//Styles
import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
//Constants
const title = "Roles";
const name = "Rol";
const key = "rol";

export default function EditableTable() {
  const classes = useStyles();
  const [loadPermit, setLoadPermit] = useState("hide");
  const [modal, setModal] = useState({
    visible: false,
    id: "",
  });
  const searchInput = useRef();
  const {
    formEdit,
    formCreate,
    data,
    permisos,
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
  } = useTable({ key });

  useEffect(() => {
    updateNameItem(name);
  }, []);

  const setStatePermit = (val) => {
    setLoadPermit(val);
  };

  const showModal = (record) => {
    setModal((mod) => ({
      ...mod,
      visible: true,
      rolName: record.name,
      id: record.id,
    }));
  };

  const handleCancel = () => {
    setModal((mod) => ({ ...mod, visible: false }));
  };

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
            classes,
            showModal
          )}
          loading={loading}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            pageSize: 5,
          }}
        />
      </Form>
      <Dialog
        open={modal.visible}
        keepMounted
        onClose={handleCancel}
        aria-labelledby="permits-title"
        aria-describedby="permits-description"
      >
        <DialogTitle id="permits-title">
          <div className={classes.titleModal}>
            <VerifiedUserIcon />
            <p className={classes.text}> Permisos para {modal.rolName}</p>
          </div>
        </DialogTitle>
        <DialogContent id="permits-description">
          <Permisos
            allPermits={permisos}
            key={`${modal.rolName}-${modal.id}`}
            rol={modal.id}
            stateLoad={setStatePermit}
          />
        </DialogContent>
        <DialogActions>
          <Spin style={{ marginRight: 100 }} spinning={loadPermit === "load"}>
            {loadPermit !== "hide" && loadPermit !== "load" ? (
              <Alert
                message={
                  loadPermit === "error"
                    ? "No se pudo guardar"
                    : "Guardado correctamente"
                }
                type={loadPermit}
              />
            ) : (
              false
            )}
          </Spin>
          <Button onClick={handleCancel} color="danger" simple>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
