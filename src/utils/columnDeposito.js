/*eslint-disable*/
import React, {useState} from "react";
import { Input, Space, Tooltip } from "antd";
import Button from "components/CustomButtons/Button.js";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ModalDeposito from "views/Depositos/DepositosModal"
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import DeleteDepostio from "views/Depositos/DeleteDeposito";

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
  classes, searchInput, setDays, filtro
) {
  const columns = [
    {
      title: "Numero Deposito",
      dataIndex: "numero_deposito",
      width: "15%",
      editable: false,
      sorter: (a, b) => (a.numero_deposito - b.numero_deposito),
      ...getColumnSearchProps("numero_deposito", searchInput),
    },
    {
      title: "Nombre del otorgante",
      dataIndex: "otorgante",
      width: "15%",
      editable: false,
      sorter: (a, b) => (a.otorgante - b.otorgante),
      ...getColumnSearchProps("otorgante", searchInput)
    },
    {
      title: "Fecha",
      dataIndex: "fecha_deposito",
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
          var dateA = new Date(a.fecha_deposito), dateB = new Date(b.fecha_deposito);
          if (b === "No disponible") {
            return -1;
          } else {
            return dateA - dateB;
          }
        }

      },
      ...getColumnSearchProps("fecha_deposito", searchInput)
    },
    {
      title: "Valor",
      dataIndex: "total",
      width: "15%",
      sorter: (a, b) => (a.total - b.total),
    },
    {
      title: "Acciones",
      dataIndex: "estado",
      // filters: [
      //   {
      //     text: 'Radicación',
      //     value: 'deposito',
      //   },
      //   {
      //     text: 'Liquidacion',
      //     value: 'liquidacion',
      //   },
      //   {
      //     text: 'Facturación',
      //     value: 'facturacion',
      //   },
      //   {
      //     text: 'Finalizada',
      //     value: 'finalizada',
      //   }
      // ],
      onFilter: (value, record) => record.estado.indexOf(value) === 0,
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <GridContainer justify={'center'}>
              <GridItem xs={12}>
                <ModalDeposito data={record} />
                <Link to={{pathname: "/admin/Depositos",
                          state:{numero_deposito: record.numero_deposito}}} /*state={{ from: record }}*/> 
                  <Button 
                    justIcon
                    color="info"
                    className="lassesButton.marginRight">
                    <span class="material-icons">
                        edit
                    </span>
                  </Button>
                </Link>
                {/* <Button 
                    justIcon
                    color="danger"
                    className="lassesButton.marginRight">
                    <span class="material-icons">
                        delete
                    </span>
                </Button> */}
                <DeleteDepostio id={record.id} set={setDays} filtro={filtro}/>
              </GridItem>
            </GridContainer>
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
