import React from "react";
import {
  Popconfirm,
  Input,
  Space,
  Tag,
  Tooltip,
  Button as ButtonAnt,
} from "antd";
import Button from "components/CustomButtons/Button.js";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import GetAppIcon from "@material-ui/icons/GetApp";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import { SearchOutlined } from "@ant-design/icons";

const handleSearch = (confirm) => {
  confirm();
};

const handleReset = (clearFilters) => {
  clearFilters();
};

const getColumnSearchProps = (dataIndex, nameItem, searchInput) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        placeholder={
          dataIndex === "name" ? `Buscar ${nameItem}` : "Buscar código"
        }
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
          size="small"
          style={{ width: 90, backgroundColor: "#40a9ff" }}
        >
          Buscar
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
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
  cancel,
  isEditing,
  updateOnEdit,
  save,
  delItem,
  editItem,
  onEdit,
  onDelete,
  nameItem,
  searchInput,
  classes
) {
  const columns = [
    {
      title: "Titulo",
      dataIndex: "title",
      editable: true,
      width: "25%",
      sorter: (a, b) => (a.name ? a.name.localeCompare(b.name) : 0),
      ...getColumnSearchProps("name", nameItem, searchInput),
    },
    {
      title: "Nombre del cliente",
      dataIndex: "name",
      editable: true,
      width: "20%",
      sorter: (a, b) => (a.name ? a.name.localeCompare(b.name) : 0),
      ...getColumnSearchProps("name", nameItem, searchInput),
    },
    {
      title: "Fecha Inicio",
      dataIndex: "startDate",
      editable: true,
      width: "15%",
      sorter: (a, b) => (a.code ? a.code.localeCompare(b.code) : 0),
    },
    {
      title: "Expiración",
      dataIndex: "expiration",
      editable: true,
      width: "15%",
      sorter: (a, b) => (a.code ? a.code.localeCompare(b.code) : 0),
      filters: [
        {
          text: "Activo",
          value: true,
        },
        {
          text: "Expirado",
          value: false,
        },
      ],
      onFilter: (value, record) => record.state === value,
      render: (_, record) => {
        return (
          <Tag color={record.state ? "green" : "volcano"}>
            {record.expiration}
          </Tag>
        );
      },
    },
    {
      title: "Archivo",
      dataIndex: "link",
      editable: true,
      width: "15%",
      render: (_, record) => {
        return (
          <>
            <Tooltip title="Descargar">
              <a
                href={record.link}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button color="info" className={classes.actionButton}>
                  <GetAppIcon className={classes.icon} />
                </Button>
              </a>
            </Tooltip>
            <Tooltip title="Ver">
              <a href={record.link} target="_blank">
                <Button color="info" className={classes.actionButton}>
                  <PictureAsPdfIcon className={classes.icon} />
                </Button>
              </a>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        if (editable) {
          updateOnEdit(true);
        }
        return editable ? (
          <div>
            <ButtonAnt type="link" onClick={() => save(record.id)}>
              Guardar
            </ButtonAnt>
            <Popconfirm title="Seguro deseas cancelar?" onConfirm={cancel}>
              <ButtonAnt type="link">Cancelar</ButtonAnt>
            </Popconfirm>
          </div>
        ) : (
          <div>
            <Tooltip title="Editar">
              <Button
                color="success"
                disabled={onEdit}
                className={classes.actionButton}
                onClick={() => editItem(record)}
              >
                <Edit className={classes.icon} />
              </Button>
            </Tooltip>
            <Popconfirm
              title="Seguro deseas eliminar?"
              onConfirm={() => delItem(record.id)}
            >
              <Button
                color="danger"
                disabled={onEdit || onDelete}
                className={classes.actionButton}
              >
                <Close className={classes.icon} />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const inpType = (col) => {
    switch (col.dataIndex) {
      case "startDate":
        return "date";
      case "expiration":
        return "date";
      case "link":
        return "file";
      default:
        return "text";
    }
  };
  return columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: inpType(col),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
}

export { columns };
