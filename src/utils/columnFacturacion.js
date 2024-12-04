/*eslint-disable*/
import React from "react";
import { Popconfirm, Input, Space, Switch, Tooltip, Button as ButtonAnt } from "antd";
import Button from "components/CustomButtons/Button.js";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SendIcon from '@material-ui/icons/Send';
import CodeIcon from '@material-ui/icons/Code';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
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
  showModalRadicacion,
) {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "date_issue",
      width: "15%",
      editable: false,
      // defaultSortOrder: "ascend",
      sorter: (a, b) => (a.name ? a.name.localeCompare(b.name) : 0),
      ...getColumnSearchProps("name", searchInput),
    },
    {
      title: "No.",
      dataIndex: "id_factura",
      width: "20%",
      editable: true,
      // defaultSortOrder: "ascend",
      sorter: (a, b) => (a.name ? a.name.localeCompare(b.name) : 0),
      ...getColumnSearchProps("name", searchInput),
    },
    {
      title: "Cliente",
      dataIndex: "nombre",
      width: "25%",
      editable: false,
      // defaultSortOrder: "ascend",
      sorter: (a, b) => (a.code ? a.code.localeCompare(b.code) : 0),
      ...getColumnSearchProps("code", searchInput),
    },
    {
      title: "Total",
      dataIndex: "total",
      width: "10%",
      editable: false,
      // defaultSortOrder: "ascend",
      sorter: (a, b) => (a.code ? a.code.localeCompare(b.code) : 0),
      ...getColumnSearchProps("code", searchInput),
    },
    {
      title: "Estado",
      dataIndex: "state_document_id",
      width: "10%",
      editable: false,
      // defaultSortOrder: "ascend",
      sorter: (a, b) => (a.code ? a.code.localeCompare(b.code) : 0),
      ...getColumnSearchProps("code", searchInput),
    },
    // {
    //   title: "Estado",
    //   dataIndex: "state_document_id",
    //   width: "10%",
    //   editable: true,
    //   // defaultSortOrder: "ascend",
    //   // sorter: (a, b) => (a.activo ? a.activo.localeCompare(b.activo) : 0),
    //   filters: [
    //     {
    //       text: "Activo",
    //       value: "1",
    //     },
    //     {
    //       text: "Inactivo",
    //       value: "0",
    //     },
    //   ],
    //   onFilter: (value, record) => record.estado === value,
    //   render: (_, record) => {
    //     return (
    //       <Switch
    //         checkedChildren="Activo"
    //         unCheckedChildren="Inactivo"
    //         checked={parseInt(record.estado, 10)}
    //         disabled
    //       />
    //     );
    //   },
    // },
    {
      title: "Acciones",
      dataIndex: "actions",
      width: "15%",
      render: (_, record) => {
        const editable = isEditing(record);
        console.log(_)
        console.log(record)
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
            { record.state_document_id != 1 && <Tooltip title="Enviar a DIAN">
              <Button
                color="success"
                disabled={onEdit}
                className={classes.actionButton}
                onClick={() => editItem(record)}
              >
                <SendIcon className={classes.icon} />
              </Button>
            </Tooltip>
            }
            <Tooltip title="Descargar XML">
              <Button
                color="info"
                disabled={onEdit}
                className={classes.actionButton}
                onClick={() => showModal(record)}
              >
                <CodeIcon className={classes.icon} />
              </Button>
            </Tooltip>
            <Tooltip title="Descargar PDF">
              <Button
                color="danger"
                disabled={onEdit}
                className={classes.actionButton}
                onClick={() => showModalRadicacion(record)}
              >
                <PictureAsPdfIcon className={classes.icon} />
              </Button>
            </Tooltip>
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
