import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Form, message } from "antd";
import { EXTERNAL_API_PATHS } from "../utils/constants";

const useTable = () => {
  const [formEdit] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [onEdit, setOnEdit] = React.useState(false);
  const [onDelete, setOnDelete] = React.useState(false);

  const transformData = (edicto) => ({
    id: edicto.id,
    title: edicto.titulo,
    name: edicto.nombre_cliente,
    startDate: edicto.fecha_inicio,
    expiration: edicto.fecha_expiracion,
    link: edicto.ruta_archivo,
    state: moment(moment().format("YYYY-MM-DD")).isSameOrBefore(
      edicto.fecha_expiracion
    ),
  });

  useEffect(() => {
    setLoading(true);
    axios.get(EXTERNAL_API_PATHS.edicto).then((res) => {
      const newData =
        res.data.length > 0
          ? res.data.map((edicto) => transformData(edicto))
          : [];
      setData(newData);
      setLoading(false);
    });
  }, []);

  const headers = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const typeAlert = "updatable";

  const createItem = (values, setValues) => {
    message.loading({ content: "Subiendo archivo...", typeAlert });
    const formData = new FormData();
    formData.append("archivo", values.file);
    formData.append(
      "fecha_expiracion",
      moment(values.expiration).format("YYYY-MM-DD")
    );
    formData.append(
      "fecha_inicio",
      moment(values.startDate).format("YYYY-MM-DD")
    );
    formData.append("nombre_cliente", values.name);
    formData.append("titulo", values.title);
    axios
      .post(EXTERNAL_API_PATHS.edicto, formData, headers)
      .then((res) => {
        setData((d) => [...d, transformData(res.data)]);
        message.success({ content: "Edicto creado correctamente", typeAlert });
        setValues({
          title: "",
          name: "",
          expiration: moment().add(1, "days"),
          startDate: moment(),
          file: null,
          fileName: "",
        });
      })
      .catch(() => {
        message.error({ content: "Error al crear edicto", typeAlert });
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
      message.loading({ content: "Eliminando edicto...", typeAlert });
      updateOnDelete(true);
      axios
        .delete(`${EXTERNAL_API_PATHS.edicto}/${id}`)
        .then(() => {
          newData.splice(index, 1);
          setData(newData);
          message.success({
            content: "Edicto eliminado correctamente",
            typeAlert,
          });
          updateOnDelete(false);
        })
        .catch(() => {
          message.error({
            content: "Error interno, intente nuevamente",
            typeAlert,
          });
        });
    } else {
      message.error({ content: "Error al eliminar edicto", typeAlert });
    }
  };

  const save = async (id) => {
    try {
      const row = await formEdit.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const formData = new FormData();
        if (typeof row.link === "object") {
          formData.append("archivo", row.link);
        }
        formData.append(
          "fecha_expiracion",
          moment(row.expiration).format("YYYY-MM-DD")
        );
        formData.append(
          "fecha_inicio",
          moment(row.startDate).format("YYYY-MM-DD")
        );
        formData.append("nombre_cliente", row.name);

        formData.append("titulo", row.title);
        message.info("Guardando...", 3);
        axios
          .post(
            `${EXTERNAL_API_PATHS.edicto}/${id}?_method=PUT`,
            formData,
            headers
          )
          .then((res) => {
            newData.splice(index, 1, transformData(res.data));
            setData(newData);
            setEditingKey("");
            message.success(`Editado con exito`);
            setOnEdit(false);
          })
          .catch(() => {
            message.error(`No se pudo editar`);
          });
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
    delItem,
    save,
    isEditing,
    cancel,
    onFinishFailed,
  };
};

export default useTable;
