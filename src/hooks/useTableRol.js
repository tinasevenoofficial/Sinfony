import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, message } from "antd";
import { EXTERNAL_API_PATHS } from "../utils/constants";

const useTable = ({ key }) => {
  const [formEdit] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [nameItem, setNameItem] = useState("");
  const [data, setData] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [onEdit, setOnEdit] = React.useState(false);
  const [onDelete, setOnDelete] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(EXTERNAL_API_PATHS[key]).then((res) => {
      setData(res.data);
      setLoading(false);
    });
    axios.get(EXTERNAL_API_PATHS["permiso"]).then((res) => {
      setPermisos(res.data);
    });
  }, []);

  const createItem = (values) => {
    const formData = {
      name: values.name,
      code: values.code,
      ...values,
    };
    message.info("Guardando...");
    axios
      .post(EXTERNAL_API_PATHS[key], formData)
      .then((res) => {
        const newData = [...data];
        newData.push({
          ...formData,
          id: res.data.id,
        });
        setData(newData);
        message.success(`${nameItem} ${values.name} creado con exito`);
      })
      .catch(() => {
        message.error(`No se pudo crear el ${nameItem}`);
      });
  };

  const editItem = (record) => {
    formEdit.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const delItem = (id) => {
    const newData = [...data];
    const index = newData.findIndex((item) => id === item.id);

    if (index > -1) {
      message.info("Eliminando...");
      updateOnDelete(true);
      axios
        .delete(`${EXTERNAL_API_PATHS[key]}/${id}`)
        .then(() => {
          const item = newData[index];
          newData.splice(index, 1);
          setData(newData);
          message.success(`${nameItem} ${item.name} eliminado`);
          updateOnDelete(false);
        })
        .catch(() => {
          message.error(`No se pudo eliminar ${nameItem}`);
        });
    } else {
      message.error(`Ocurrio un problema eliminando ${nameItem}`);
    }
  };

  const save = async (id) => {
    try {
      const row = await formEdit.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        // const formData = {
        //   name: row.name,
        //   code: row.code,
        // };
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
        message.success(`${nameItem} ${item.name} editado con exito`);
        setOnEdit(false);
      }
    } catch (errInfo) {
      message.error("Ocurrió un error en el guardado");
    }
  };

  const isEditing = (record) => record.id === editingKey;

  const cancel = () => {
    setEditingKey("");
    setOnEdit(false);
  };
  const updateNameItem = (value) => {
    setNameItem(value);
  };

  const onFinishFailed = () => {
    message.error(`Complete el formulario`);
  };

  const updateOnEdit = (value) => {
    setOnEdit(value);
  };

  const updateOnDelete = (value) => {
    setOnDelete(value);
  };

  const updateLoading = (value) => {
    setLoading(value);
  };

  const updateData = (value) => {
    setData(value);
  };

  return {
    formEdit,
    formCreate,
    data,
    permisos,
    loading,
    onEdit,
    onDelete,
    updateData,
    updateOnEdit,
    updateLoading,
    createItem,
    editItem,
    delItem,
    save,
    isEditing,
    cancel,
    onFinishFailed,
    updateNameItem,
  };
};

export default useTable;
