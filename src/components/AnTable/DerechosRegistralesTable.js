import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import FormatearNum from "components/ComponenteFormatearNumero/Formatear_numeros"
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
      console.log('')
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  try{
    var isEditable = record.tipo_liquidacion;
  }
  catch{
    var isEditable = false;
  }
  let childNode = children;
  if ((isEditable === 'servicio_registral') && (editable)) {
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
        <Input ref={inputRef} onPressEnter={save} onBlur={save} autoSize/>
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

export default class EditableTableDerReg extends React.Component {
  constructor(props) {
    super(props);
    this.columns = this.props.columns
  }

  
  calcular_edicion = (row) => {
    let canti_comp = parseInt(row.Com);
    let canti_vend = 1 - canti_comp;
    let canti_tot = parseInt(row.Tot);
    let precio_total = FormatearNum(canti_tot * row.valor_uni);
    let iva = precio_total * 0.19;

    let newData = [...this.props.dataSend];
    let index = newData.findIndex((item) => row.Detalle === item.Detalle);
    let item = newData[index];
    let liq_json = {

      "id_items_liquidaciones": item.id_items_liquidaciones,
      "id_radicacion": item.id_radicacion,
      "precio_total": precio_total, //valor calculado
      "cantidad": canti_tot,
      "iva": iva,
      "tipo_liquidacion": item.tipo_liquidacion,
      "cantidad_comprador": canti_comp,
      "cantidad_vendedor": canti_vend,
      "id_actos": null
      }

    newData.splice(index, 1, { item, canti_comp });

  }
  
  handleSave = (row) => {

    
    //datos de la tabla
    let canti_tot = 0;
    let canti_vend = 0;
    let canti_comp = 0;
    let valor_uni = 0;
    canti_tot = parseInt(row.Tot);
    canti_vend = parseFloat(row.Ven);
    /////verificar que las cantidades vendedor y comprador no sean mayores al total
    if(canti_vend > canti_tot){
      canti_vend = canti_tot
    }
    canti_comp = canti_tot - canti_vend;
    valor_uni = row.valor_uni;

    //calculos
    let precio_total = canti_tot * valor_uni;
    let iva = null;
    let total = precio_total;
    let preciot_total_format = FormatearNum(precio_total);
    let iva_format = null;
    let total_format = FormatearNum(total);

    ///datos para enviar a la API
    let newDataSend = [...this.props.dataSend];
    index = newDataSend.findIndex((item) => row.id_items_liquidaciones === item.id_items_liquidaciones);
    item = newDataSend[index];
    let liq_json = {
      "id_items_liquidaciones": item.id_items_liquidaciones,
      "id_radicacion": item.id_radicacion,
      "precio_total": precio_total, //valor calculado
      "cantidad": canti_tot,
      "iva": null,
      "tipo_liquidacion": item.tipo_liquidacion,
      "cantidad_comprador": canti_comp,
      "cantidad_vendedor": canti_vend,
      "id_actos": null
    }
    newDataSend.splice(index, 1, { ...item, ...liq_json });
    this.props.setSend(newDataSend);

    //datos para visualizar en la tabla
    const newData = [...this.props.dataSource];
    let index = newData.findIndex((item) => row.id_items_liquidaciones === item.id_items_liquidaciones);
    let item = newData[index];
    let data_edited = {
      Tot: canti_tot,
      Com: canti_comp,
      Ven: canti_vend,
      Detalle: row.Detalle,
      Total: total_format,
      Valor: preciot_total_format,
      IVA: null,
      tipo_liquidacion: row.tipo_liquidacion,
      valor_uni: row.valor_uni
    }
    newData.splice(index, 1, { ...item, ...data_edited });
    this.props.set(newData);


  };

  render() {
    const { dataSource } = this.props.dataSource;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
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
      <div >
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={this.props.dataSource}
          columns={columns}
          size="small"
          bordered scroll={{y: 280 }}
          pagination={false}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

//ReactDOM.render(<EditableTable />, mountNode);
