import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, message } from "antd";
import { EXTERNAL_API_PATHS } from "../utils/constants";

const useTable = ({ key }) => {
  const [formEdit] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [nameItem, setNameItem] = useState("");
  const [data, setData] = useState([]);
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
  }, []);

  const createItem = (values) => {
    const formData = {
      name: values.name,
      code: values.code.toString(),
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

  const editItemProyecto = (record) => {
    formEdit.setFieldsValue({ ...record });
    setEditingKey(record.codigo);
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
          message.success(
            `${nameItem ? nameItem + item.name : "usuario"} eliminado`
          );
          updateOnDelete(false);
        })
        .catch(() => {
          message.error(`No se pudo eliminar ${nameItem}`);
        });
    } else {
      message.error(`Ocurrio un problema eliminando ${nameItem}`);
    }
  };

  const delItemProyecto = (id) => {
    const newData = [...data];
    const index = newData.findIndex((item) => id === item.codigo);
    if (index > -1) {
      message.info("Eliminando...");
      updateOnDelete(true);
      axios
        .delete(`${EXTERNAL_API_PATHS[key]}/${id}`)
        .then(() => {
          const item = newData[index];
          newData.splice(index, 1);
          setData(newData);
          message.success(
            `${nameItem ? nameItem + item.name : "proyecto"} eliminado`
          );
          updateOnDelete(false);
        })
        .catch(() => {
          message.error(`No se pudo eliminar ${nameItem}`);
        });
    } else {
      message.error(`Ocurrio un problema eliminando ${nameItem}`);
    }
  };

  const delItemSeguimiento = (id) => {
    console.log("se elimina el siguiente seguimiento con el id "+id)
  }

  const save = async (id) => {
    try {
      const row = await formEdit.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const formData = {
          ...row,
          name: row.name,
          code: row.code.toString(),
          activo: row.activo ? "1" : "0",
        };
        message.info("Guardando...");
        axios
          .put(`${EXTERNAL_API_PATHS[key]}/${id}`, formData)
          .then((res) => {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...formData,
            });
            setData(newData);
            setEditingKey("");
            message.success(`${nameItem} ${item.name} editado con exito`);
            setOnEdit(false);
          })
          .catch(() => {
            message.error(`No se pudo editar ${nameItem}`);
          });
      }
    } catch (errInfo) {
      message.error("Ocurrió un error en el guardado");
    }
  };

  const saveProyecto = async (id) => {
    try {
      const row = await formEdit.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.codigo);
      if (index > -1) {
        const formData = {
          proyecto: row.proyecto,
          estado: row.estado,
        };
        message.info("Guardando...");
        axios
          .put(`${EXTERNAL_API_PATHS[key]}/${id}`, formData)
          .then((res) => {
            if (res.status === 201) {
              const item = newData[index];
              newData.splice(index, 1, {
                ...item,
                ...formData,
              });
              setData(newData);
              setEditingKey("");
              message.success(`${row.proyecto} editado con exito`);
              setOnEdit(false);
            }
          })
          .catch(() => {
            message.error(`No se pudo editar ${nameItem}`);
          });
      }
    } catch (errInfo) {
      message.error("Ocurrió un error en el guardado");
    }
  };

  const saveEstado = async (id) => {
    try {
      const row = await formEdit.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const formData = {
          estado: row.estado,
        };
        message.info("Guardando...");
        let estado = row.estado === "1" ? "activado" : "desactivado";
        axios
          .put(`${EXTERNAL_API_PATHS[key]}/${id}`, formData)
          .then(() => {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...formData,
            });
            setData(newData);
            setEditingKey("");
            message.success(
              `El usuario ${newData[index].nombres} ${newData[index].apellidos} se ha ${estado}`
            );
            setOnEdit(false);
          })
          .catch(() => {
            message.error(
              `No se pudo actualizar el estado del usuario ${newData[index].nombres} ${newData[index].apellidos}`
            );
          });
      }
    } catch (errInfo) {
      message.error("Ocurrió un error en el guardado");
    }
  };

  const isEditing = (record) => record.id === editingKey;

  const isEditingProyecto = (record) => record.codigo === editingKey;

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
    loading,
    onEdit,
    onDelete,
    updateData,
    updateOnEdit,
    updateLoading,
    createItem,
    editItem,
    editItemProyecto,
    delItem,
    delItemProyecto,
    save,
    saveProyecto,
    saveEstado,
    isEditing,
    isEditingProyecto,
    cancel,
    onFinishFailed,
    updateNameItem,
  };
};

export default useTable;
