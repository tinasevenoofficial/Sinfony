import React, { useContext, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// @material-ui ICONS
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

// @material-ui
import IconButton from "@material-ui/core/IconButton";

//@antd
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Select,
  Button,
  Tooltip,
} from "antd";
import { Space } from "antd";
const { Option } = Select;
{
  /*
..#######..########..########..#######..########...######......###....##....##.########.########
.##.....##.##.....##....##....##.....##.##.....##.##....##....##.##...###...##....##....##......
.##.....##.##.....##....##....##.....##.##.....##.##.........##...##..####..##....##....##......
.##.....##.########.....##....##.....##.########..##...####.##.....##.##.##.##....##....######..
.##.....##.##...##......##....##.....##.##...##...##....##..#########.##..####....##....##......
.##.....##.##....##.....##....##.....##.##....##..##....##..##.....##.##...###....##....##......
..#######..##.....##....##.....#######..##.....##..######...##.....##.##....##....##....########
*/
}
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  tipo,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {}
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
      >
        {dataIndex === "porcentaje_participacion" ? (
          <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
        ) : (
          <Select
            style={{ width: 120 }}
            allowClear
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
          >
            {tipo.map((item) => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
          justifyContent: "flex-end",
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "%",
        dataIndex: "porcentaje_participacion",
        key: "porcentaje_participacion",
        editable: true,
      },
      {
        title: "Tipo",
        dataIndex: "id_tipos_otorgantes",
        key: "id_tipos_otorgantes",
        editable: true,
        render: (_, record) =>
          this.props.tipo.filter(
            (item) => item.id === record.id_tipos_otorgantes
          )[0]?.name,
      },
      {
        title: "TipoDoc",
        dataIndex: "tipo_documento",
        key: "tipo_documento",
      },
      {
        title: "Numero",
        dataIndex: "numero_documento",
        key: "numero_documento",
      },
      {
        title: "Nombres",
        dataIndex: "nombres",
        key: "nombres",
      },
      {
        title: "Acciones",
        dataIndex: "operation",
        render: (_, record) =>
          this.props.radicacion1.length >= 1 ? (
            <Popconfirm
              title="Seguro que lo desea eliminar?"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="small"
              >
                <DeleteIcon style={{ fontSize: "20px" }} />
              </IconButton>
            </Popconfirm>
          ) : null,
      },
    ];
  }

  handleDelete = (key) => {
    let newData = [...this.props.radicacion1];
    let temp = newData[this.props.value].otorgantes;
    let data = (newData[this.props.value].otorgantes = temp?.filter(
      (item) => key !== item.id
    ));
    this.props.setRadicacion1(newData);

    // let newData = [...radicacion1]
    // let temp = newData[value]?.actosradiinmuebles
    // newData[value].actosradiinmuebles = temp.filter(item => key !== item.id)
    // setRadicacion1(newData)
  };

  handleSave = (row) => {
    let newData = [...this.props.radicacion1];
    this.props.setRadicacion1([]);
    const index = newData[this.props.value].otorgantes.findIndex(
      (item) => row.id === item.id
    );
    const item = newData[this.props.value].otorgantes[index];
    newData[this.props.value].otorgantes.splice(index, 1, { ...item, ...row });
    // let data1 = [...this.props.radicacion1]
    // data1[this.props.value].otorgantes = newData
    this.props.setRadicacion1(newData);
  };

  render() {
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          tipo: this.props.tipo,
        }),
      };
    });
    return (
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={this.props.radicacion1[this.props.value]?.otorgantes}
        columns={columns}
      />
    );
  }
}

{
  /*
.####.##....##.##.....##.##.....##.########.########..##.......########
..##..###...##.###...###.##.....##.##.......##.....##.##.......##......
..##..####..##.####.####.##.....##.##.......##.....##.##.......##......
..##..##.##.##.##.###.##.##.....##.######...########..##.......######..
..##..##..####.##.....##.##.....##.##.......##.....##.##.......##......
..##..##...###.##.....##.##.....##.##.......##.....##.##.......##......
.####.##....##.##.....##..#######..########.########..########.########
*/
}

export const InmuebleTable = ({ radicacion1, setRadicacion1, value }) => {
  const DeleteI = (key) => {
    let newData = [...radicacion1];
    let temp = newData[value]?.actosradiinmuebles;
    newData[value].actosradiinmuebles = temp.filter((item) => key !== item.id);
    setRadicacion1(newData);
  };

  const inmueble = [
    {
      title: "Matrícula",
      dataIndex: "matricula",
      key: "matricula",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Acciones",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Seguro que lo desea eliminar?"
          onConfirm={() => DeleteI(record.id)}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="small"
          >
            <DeleteIcon style={{ fontSize: "20px" }} />
          </IconButton>
        </Popconfirm>
      ),
    },
  ];
  return (
    <Table
      dataSource={radicacion1[value]?.actosradiinmuebles}
      columns={inmueble}
      pagination={false}
      size="small"
      indentSize={0}
      scroll
    />
  );
};
