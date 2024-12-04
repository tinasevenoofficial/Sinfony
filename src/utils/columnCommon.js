import React from "react";
import {
  Popconfirm,
  Input,
  Space,
  Switch,
  Tooltip,
  Button as ButtonAnt,
} from "antd";
import Button from "components/CustomButtons/Button.js";
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
      title: "Nombre",
      dataIndex: "name",
      width: "40%",
      editable: true,
      // defaultSortOrder: "ascend",
      sorter: (a, b) => (a.name ? a.name.localeCompare(b.name) : 0),
      ...getColumnSearchProps("name", nameItem, searchInput),
    },
    {
      title: "Código",
      dataIndex: "code",
      width: "20%",
      editable: true,
      // defaultSortOrder: "ascend",
      sorter: (a, b) => (a.code ? a.code.localeCompare(b.code) : 0),
      ...getColumnSearchProps("code", nameItem, searchInput),
    },
    {
      title: "Estado",
      dataIndex: "activo",
      width: "20%",
      editable: true,
      // defaultSortOrder: "ascend",
      // sorter: (a, b) => (a.activo ? a.activo.localeCompare(b.activo) : 0),
      filters: [
        {
          text: "Activo",
          value: "1",
        },
        {
          text: "Inactivo",
          value: "0",
        },
      ],
      onFilter: (value, record) => record.activo === value,
      render: (_, record) => {
        return (
          <Switch
            checkedChildren="Activo"
            unCheckedChildren="Inactivo"
            checked={parseInt(record.activo, 10)}
            disabled
          />
        );
      },
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      width: "20%",
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
  return columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "activo" ? "switch" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
}

export { columns };
