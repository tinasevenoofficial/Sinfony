import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Select } from "antd";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./styles/CommonStyles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { EXTERNAL_API_PATHS } from "utils/constants";

const { Option } = Select;
const EditableContext = React.createContext(null);

const styles = () => ({
  button: {
    backgroundColor: "#e91e63",
    color: "white",
    margin: "0px 10px",
  },
  container: {
    margin: 20,
    maxWidth: 430,

    "& .MuiFormControl-root": {
      paddingTop: 0,
      margin: 0,
    },
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

const EditableRow = ({ ...props }) => {
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
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Deposito",
        dataIndex: "numero_deposito",
        width: "30%",
      },
      {
        title: "Valor",
        dataIndex: "otros",
        editable: true,
        render: (_, record) => {
          const moneyFormat = new Intl.NumberFormat("es-CO");
          return moneyFormat.format(record.otros);
        },
      },
      {
        title: "Descargue",
        dataIndex: "descargue",
        editable: true,
      },
      {
        title: "Eliminar",
        dataIndex: "operation",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Desea eliminar?"
              overlayStyle={{ zIndex: 1301 }}
              onConfirm={() => this.handleDelete(record.key)}
              cancelText="Cancelar"
              okText="Si"
            >
              <DeleteForeverIcon />
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [],
      depositos: [],
      count: 0,
      selected: null,
      loading: true,
    };
  }
  componentDidMount() {
    axios.get(EXTERNAL_API_PATHS.deposito).then((response) =>
      this.setState((s) => ({
        ...s,
        depositos: response.data,
        count: response.data.lenght,
        loading: false,
      }))
    );
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource, selected, depositos } = this.state;
    if (selected) {
      const newDeposito = depositos.find((d) => d.id === selected);
      if (newDeposito) {
        this.setState({
          dataSource: [...dataSource, newDeposito],
          count: count + 1,
          selected: null,
        });
      }
    }
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  onChange = (value) => {
    this.setState({
      selected: value,
    });
  };

  render() {
    const { dataSource } = this.state;
    const { classes } = this.props;
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
        }),
      };
    });
    return (
      <>
        {this.state.loading ? (
          <div className={classes.loading}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <>
            <GridContainer
              justify="center"
              alignItems="center"
              className={classes.container}
            >
              <GridItem xs={8}>
                <Select
                  showSearch
                  dropdownStyle={{ zIndex: 2000 }}
                  style={{ width: "100%" }}
                  placeholder="Buscar deposito"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  value={this.selected}
                  filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.depositos?.map(({ id, numero_deposito }) => (
                    <Option key={id} value={id}>
                      {numero_deposito}
                    </Option>
                  ))}
                </Select>
              </GridItem>

              <GridItem xs={5}>
                <Autocomplete
                  id="deposito"
                  options={this.state.depositos}
                  getOptionLabel={(option) => option.numero_deposito}
                  style={{ outline: "none" }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="Buscar deposito" />
                  )}
                />
              </GridItem>
              <GridItem xs={4}>
                <TextField id="descargue" label="Descargue" fullWidth />
              </GridItem>
              <GridItem xs={3}>
                <Button onClick={this.handleAdd} className={classes.button}>
                  Agregar
                </Button>
              </GridItem>
            </GridContainer>
            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={dataSource}
              columns={columns}
            />
          </>
        )}
      </>
    );
  }
}

export default withStyles(styles)(EditableTable);
