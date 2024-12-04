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
  const [proyectos, setProyectos] = useState();

  useEffect(() => {
    setLoading(true);
    axios.get(EXTERNAL_API_PATHS[key]).then((res) => {
      let data = res.data.map((item)=>{
        return {
                  "nombre_plantilla": item.nombre_plantilla,
                  "id": item.id,
                  "nombre_proyecto": item.proyecto2?.proyecto,
                  "plantilla": item.url_documento
        }

      })
      setData(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.get(EXTERNAL_API_PATHS["proyecto2"]).then((res) => {
      setProyectos(res.data);
    });
  }, []);

  const getDocument = async (record) => {
    try{

    const response = await  axios.get(EXTERNAL_API_PATHS.files+`/${record.urlDocumento}`,{ responseType: 'blob'})

    if (response.status == 200) {
         // Crear un Blob a partir de la respuesta binaria
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        // Crear una URL para el Blob
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace temporal para la descarga
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = record.fileName; // Nombre con el que se descargará el archivo

        // Añadir el enlace al DOM y simular un clic
        document.body.appendChild(a);
        a.click();

        // Limpiar el DOM y revocar la URL
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } else {
      console.error('Error en la descarga del archivo:', response.statusText);
    }

    
  } catch (error) {
    console.error('Error en la descarga del archivo:', error);
  }
   }

  
  const createItem = (values) => {
    const formData = new FormData();
    formData.append("archivo", values.file);
    formData.append("nombre_plantilla", values.name);
    formData.append("variables", '{"test":"test"}');
    formData.append("proyecto", values.proyecto);
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
  // De aqui para ababjo se pueden eliminar las funciones porque no las utiliza el componente
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
  // De aqui para arriba se pueden eliminar las funciones porque no las utiliza el componente

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
    updateNameItem,
    getDocument,
    proyectos
  };
};

export default useTable;
