import React from "react";
import { Popconfirm, Input, Space, Tooltip, Button as ButtonAnt } from "antd";
import Button from "components/CustomButtons/Button.js";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import GetAppIcon from "@material-ui/icons/GetApp";
import { SearchOutlined } from "@ant-design/icons";

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
  classes,
  showModal,
  getDocument
) {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre_plantilla",
      width: "30%",
      editable: true,
      // defaultSortOrder: "ascend",
      sorter: (a, b) => (a.nombre_plantilla ? a.nombre_plantilla.localeCompare(b.nombre_plantilla) : 0),
      ...getColumnSearchProps("nombre_plantilla", searchInput),
    },
    {
      title: "Proyecto",
      dataIndex: "nombre_proyecto",
      width: "30%",
      editable: true,
      // defaultSortOrder: "ascend",
      sorter: (a, b) => (a.nombre_proyecto ? a.nombre_proyecto.localeCompare(b.nombre_proyecto) : 0),
      ...getColumnSearchProps("nombre_proyecto", searchInput),
    },
    {
      title: "Plantilla",
      dataIndex: "plantilla",
      width: "20%",
      render: (_, record) => {
        return (
          <>
           <Tooltip key={record.id} title={"Plantilla"}>
              <Button color="info" className={classes.actionButton} onClick={()=> getDocument({urlDocumento: record.plantilla, fileName: record.nombre_plantilla})}>
                <GetAppIcon className={classes.icon} />
              </Button>
            </Tooltip>
          </>
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
            <Tooltip title="Permisos">
              <Button
                color="info"
                disabled={onEdit}
                className={classes.actionButton}
                onClick={() => showModal(record)}
              >
                <Check className={classes.icon} />
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
        inputType: col.dataIndex === "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
}

export { columns };
