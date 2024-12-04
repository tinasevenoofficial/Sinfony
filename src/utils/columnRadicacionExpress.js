/*eslint-disable*/
import React from "react";
import { Popconfirm, Input, Space, Switch, Tooltip, Button as ButtonAnt } from "antd";
import Button from "components/CustomButtons/Button.js";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import SettingsIcon from '@material-ui/icons/Settings';
import { SearchOutlined } from "@ant-design/icons";
import useStyles from "../assets/jss/material-dashboard-pro-react/views/common";


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
    eliminarSeguimiento,
    showModal
) {
    const classes = useStyles();
    console.log(eliminarSeguimiento)
    const columns = [
        {
            title: "Fecha",
            dataIndex: "fecha",
            width: "20%",
            editable: false,
            // defaultSortOrder: "ascend",
        },
        {
            title: "Detalle",
            dataIndex: "detalle",
            width: "10%",
            editable: false,
        },
        {
            title: "Observación",
            dataIndex: "observacion",
            width: "50%",
            editable: false,
        },
        {
            title: "Usuario",
            dataIndex: "usuario",
            width: "10%",
            editable: false,
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            width: "5%",
            render: (_, record) => {
                return <div>
                    <Popconfirm
                        title="Seguro deseas eliminar?"
                        //onConfirm={() => eliminarSeguimiento(record.id)}
                    >
                        <Button
                            color="danger"
                            className={classes.actionButton}
                        >
                            <Close className={classes.icon} />
                        </Button>
                    </Popconfirm>
                </div>
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
