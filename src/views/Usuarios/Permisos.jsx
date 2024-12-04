import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Checkbox, message } from "antd";
import PropTypes from "prop-types";
import axios from "axios";
import "antd/dist/antd.css";
import { EXTERNAL_API_PATHS } from "../../utils/constants";

export default function Permisos(props) {
  const { rol, allPermits, stateLoad } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState({
    ver: false,
    crear: false,
    modificar: false,
    eliminar: false,
  });

  const auth = useSelector((state) => state.auth);
  const header = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };
  const columns = [
    {
      title: "Nombre de la vista",
      dataIndex: "vista",
      render(_, record) {
        return {
          props: {
            style: { background: record.key % 2 === 0 ? "#fff" : "#f1f1f1" },
          },
          children: <div>{record.vista}</div>,
        };
      },
    },

    {
      title: (
        <>
          Ver
          <br />
          <Checkbox
            checked={select.ver}
            onChange={(e) => selectAll(e, "ver")}
          />
        </>
      ),
      dataIndex: "ver",
      align: "center",
      render: (_, record) => {
        return {
          props: {
            style: { background: record.key % 2 === 0 ? "#fff" : "#f1f1f1" },
          },
          children: (
            <Checkbox
              checked={record.ver ? record.ver.state : false}
              onChange={(e) => onChangePermission(e, record.key, "ver")}
            />
          ),
        };
      },
    },
    {
      title: (
        <>
          Crear
          <br />
          <Checkbox
            checked={select.crear}
            onChange={(e) => selectAll(e, "crear")}
          />
        </>
      ),
      dataIndex: "crear",
      align: "center",
      render: (_, record) => {
        return {
          props: {
            style: { background: record.key % 2 === 0 ? "#fff" : "#f1f1f1" },
          },
          children: (
            <Checkbox
              checked={record.crear ? record.crear.state : false}
              onChange={(e) => onChangePermission(e, record.key, "crear")}
            />
          ),
        };
      },
    },
    {
      title: (
        <>
          Modificar
          <br />
          <Checkbox
            checked={select.modificar}
            onChange={(e) => selectAll(e, "modificar")}
          />
        </>
      ),
      dataIndex: "modificar",
      align: "center",
      render: (_, record) => {
        return {
          props: {
            style: { background: record.key % 2 === 0 ? "#fff" : "#f1f1f1" },
          },
          children: (
            <Checkbox
              checked={record.modificar ? record.modificar.state : false}
              onChange={(e) => onChangePermission(e, record.key, "modificar")}
            />
          ),
        };
      },
    },
    {
      title: (
        <>
          Eliminar
          <br />
          <Checkbox
            checked={select.eliminar}
            onChange={(e) => selectAll(e, "eliminar")}
          />
        </>
      ),
      dataIndex: "eliminar",
      align: "center",
      render: (_, record) => {
        return {
          props: {
            style: { background: record.key % 2 === 0 ? "#fff" : "#f1f1f1" },
          },
          children: (
            <Checkbox
              checked={record.eliminar ? record.eliminar.state : false}
              onChange={(e) => onChangePermission(e, record.key, "eliminar")}
            />
          ),
        };
      },
    },
  ];

  const savePermit = (idPermiso, estado, index, perm) => {
    const formData = {
      id_rol: rol,
      id_permisos: idPermiso,
    };
    stateLoad("load");
    axios
      .post(EXTERNAL_API_PATHS["rolPermiso"], formData, header)
      .then(() => {
        const newData = [...data];
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          [perm]: { ...item[perm], state: estado },
        });
        setData(newData);
        setSelect((sel) => ({
          ...sel,
          [perm]: newData.every((x) =>
            x[perm] ? x[perm].state === true : false
          ),
        }));
        stateLoad("success");
      })
      .catch(() => {
        stateLoad("error");
      });
  };

  const deletePermit = (id, estado, index, perm) => {
    stateLoad("load");
    axios
      .delete(
        `${EXTERNAL_API_PATHS["rolPermiso"]}/${rol}?id_permisos=${id}`,header)
      .then(() => {
        const newData = [...data];
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          [perm]: { ...item[perm], state: estado },
        });
        setData(newData);
        setSelect((sel) => ({
          ...sel,
          [perm]: newData.every((x) =>
            x[perm] ? x[perm].state === true : false
          ),
        }));
        stateLoad("success");
      })
      .catch(() => {
        stateLoad("error");
      });
  };
  const onChangePermission = (e, key, perm) => {
    try {
      const index = data.findIndex((item) => key === item.key);
      console.log("Llega", e.target.checked, key, perm);
      if (index > -1) {
        const item = data[index];
        if (e.target.checked) {
          savePermit(item[perm].id, e.target.checked, index, perm);
        } else {
          deletePermit(item[perm].id, e.target.checked, index, perm);
        }
      }
    } catch (errInfo) {
      message.error(`Error: ${errInfo}`);
    }
  };

  const selectAll = (e, perm) => {
    try {
      stateLoad("load");
      const check = e.target.checked;
      let dataUpdate = [];
      data.forEach((item) => {
        if (item[perm].state !== check) {
          if(check){
            dataUpdate.push({
              id_rol: rol,
              id_permisos: item[perm].id,
              action: 'create'
            })
          }else{
            dataUpdate.push({
              id_rol: rol,
              id_permisos: item[perm].id,
              action: 'delete'
            })            
          }          
        }
      });
      let formData = {
        array_permisos: dataUpdate,
      };
      axios.post(
        `${EXTERNAL_API_PATHS["permisosRoles"]}/${rol}`,
        formData,
        header
      ).then(() => {
          setData(() => {
            const newData = [...data];
            data.forEach((_, i) => {
              newData[i][perm] = { ...newData[i][perm], state: check };
            });
            return newData;
          });
          setSelect((sel) => ({ ...sel, [perm]: check }));
          stateLoad("success");            
        });
    }

    catch(errInfo){
      message.error(`Error: ${errInfo}`);
    };

  };

  const setPermisos = (permisos) => {
    const newAllPermits = {};
    allPermits.map((permit) => {
      if (newAllPermits[permit.name]) {
        newAllPermits[permit.name] = {
          ...newAllPermits[permit.name],
          [permit.action.toLowerCase()]: {
            state: permisos.includes(permit.id),
            id: permit.id,
          },
        };
        console.log("verificando", permisos.includes(permit.id), permit.id);
      } else {
        newAllPermits[permit.name] = {
          ...newAllPermits[permit.name],
          vista: permit.name,
          [permit.action.toLowerCase()]: {
            state: permisos.includes(permit.id),
            id: permit.id,
          },
          key: Object.keys(newAllPermits).length + 1,
        };
      }
    });
    const permitsRol = Object.values(newAllPermits);
    setSelect((sel) => ({
      ...sel,
      ver: permitsRol.every((x) => (x.ver ? x.ver.state === true : false)),
      crear: permitsRol.every((x) =>
        x.crear ? x.crear.state === true : false
      ),
      modificar: permitsRol.every((x) =>
        x.modificar ? x.modificar.state === true : false
      ),
      eliminar: permitsRol.every((x) =>
        x.eliminar ? x.eliminar.state === true : false
      ),
    }));
    console.log("final:", permitsRol, select);
    setData(permitsRol);
  };

  useEffect(() => {
    if (rol) {
      stateLoad("hide");
      setLoading(true);
      axios
        .get(`${EXTERNAL_API_PATHS["rolPermiso"]}/${rol}`, header)
        .then((res) => {
          setPermisos(res.data);
          setLoading(false);
        })
        .catch((errInfo) => {
          message.error(`Error: ${errInfo}`);
          setPermisos([]);
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      <Table
        columns={columns}
        loading={loading}
        dataSource={data}
        size="small"
        scroll={{ x: 500 }}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}

Permisos.propTypes = {
  rol: PropTypes.number.isRequired,
  allPermits: PropTypes.arrayOf().isRequired,
  stateLoad: PropTypes.string.isRequired,
};
