/*eslint-disable*/
import React from "react";
import { Input, Space, Tooltip, Popconfirm } from "antd";
import Button from "components/CustomButtons/Button.js";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { STATES_RADICACION } from "./constants"
import Close from "@material-ui/icons/Close";


const handleSearch = (confirm) => {
  confirm();
};

const handleReset = (clearFilters) => {
  clearFilters();
};

const getColumnSearchProps = (dataIndex, searchInput) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        placeholder="Busqueda"
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => handleSearch(confirm)}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(confirm)}
          icon={<SearchOutlined />}
          size="sm"
          style={{ width: 90, backgroundColor: "#40a9ff" }}
        >
          Buscar
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="sm"
          style={{ width: 90 }}
        >
          Limpiar
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : "",
});

function columns(
  classes, searchInput
) {
  const columns = [
    {
      title: "Numero",
      dataIndex: "numero_radicacion",
      width: "15%",
      editable: false,
      sorter: (a, b) => (a.numero_radicacion - b.numero_radicacion),
      ...getColumnSearchProps("numero_radicacion", searchInput),
    },
    {
      title: "Fecha",
      dataIndex: "fecha_radicacion_string",
      width: "15%",
      editable: false,
      sorter: (a, b) => {
        if (a === "No disponible") {
          if (b === "No disponible") {
            return 0;
          } else {
            return 1;
          }
        } else {
          var dateA = new Date(a.fecha_radicacion), dateB = new Date(b.fecha_radicacion);
          if (b === "No disponible") {
            return -1;
          } else {
            return dateA - dateB;
          }
        }

      },
    },

    {
      title: "Acciones",
      dataIndex: "estado",
      filters: [
        {
          text: 'Radicación',
          value: 'radicacion',
        },
        {
          text: 'Liquidacion',
          value: 'liquidacion',
        },
        {
          text: 'Facturación',
          value: 'facturacion',
        },
        {
          text: 'Finalizada',
          value: 'finalizada',
        }
      ],
      onFilter: (value, record) => record.estado.indexOf(value) === 0,
      width: "10%",
      render: (_, record) => {
        return (
          <>
          <Tooltip title={`En ${record.estado}`}>
            <Link to={`radicacion/${record.id}/${STATES_RADICACION[record.estado] || 0}`}>
              <Button
                color="info"
                className={classes.actionButton}
              >
                {record.estado}
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Eliminar radicación">
              <Popconfirm
              title={`Desea eliminar la radicacion #${record.numero_radicacion}?` }
              onConfirm={()=>console.log("eliminando...")}
            >
              <Button
                color="danger"
                className={classes.actionButton}
              >
                <Close className={classes.icon} />
              </Button>
            </Popconfirm>
          </Tooltip>
          </>)
      },
    },
  ];
  return columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
}

export { columns };
