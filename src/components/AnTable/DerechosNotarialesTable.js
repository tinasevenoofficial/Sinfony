import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import FormatearNum from "components/ComponenteFormatearNumero/Formatear_numeros"
import { Height } from '@material-ui/icons';
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
  if (((isEditable === 'servicio_adicional') || (isEditable === 'derecho_notarial')) && (editable) && (title !== 'Valor')) {
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
          justifyContent:'flex-end'
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  else if ((editable) && (record.editable === 1)){
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
          justifyContent:'flex-end'
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = this.props.columns

  }
  
  handleSave = (row) => {

    
    let canti_tot = 0;
    let canti_vend = 0;
    let canti_comp = 0;
    let valor_uni = 0;

    //datos de la tabla
    canti_tot = parseInt(row.Tot);
    canti_vend = parseFloat(row.Ven);
    /////verificar que las cantidades vendedor y comprador no sean mayores al total
    if(canti_vend > canti_tot){
      canti_vend = canti_tot
    }
    canti_comp = canti_tot - canti_vend;
    canti_comp = parseFloat(canti_comp.toFixed(2));
    valor_uni = row.valor_uni;

    //calculos
    let precio_total = canti_tot * valor_uni;
    let iva = precio_total * 0.19;
    let total = precio_total + iva;
    let preciot_total_format = FormatearNum(precio_total);
    let iva_format = FormatearNum(iva);
    let total_format = FormatearNum(total);

    // si el item liquidacion es otros, se debe almacenar el valor 
    if (row.editable === 1){

      if(row.tipo_liquidacion === 'servicio_adicional'){
        precio_total = parseInt(row.Valor);
        iva = precio_total * 0.19;
        total = precio_total + iva;
        preciot_total_format = FormatearNum(precio_total);
        iva_format = FormatearNum(iva);
        total_format = FormatearNum(total);
      }
      else{
        precio_total = parseInt(row.Valor);
        iva = 0;
        total = precio_total + iva;
        preciot_total_format = FormatearNum(precio_total);
        iva_format = FormatearNum(iva);
        total_format = FormatearNum(total);
      }
    }

    // si se modifican las cantidades de vendedor y comprador en los derechos notariales
    if (row.tipo_liquidacion === 'derecho_notarial'){

      canti_tot = 1
      canti_vend = parseFloat(row.Ven);
      /////verificar que las cantidades vendedor y comprador no sean mayores al total
      if(canti_vend > canti_tot){
        canti_vend = canti_tot
      }
      canti_comp = canti_tot - canti_vend;
      canti_comp = parseFloat(canti_comp.toFixed(2));
      valor_uni = row.valor_uni;

      //capturar datos para enviar a la API
      let newDataSend = [...this.props.dataSend];
      index = newDataSend.findIndex((item) => row.id_items_liquidaciones === item.id_items_liquidaciones);
      item = newDataSend[index];
      precio_total = item.precio_total;
      iva = item.iva
      total = precio_total + iva;
      console.log(item)
      let liq_json = {
        "id": item.id,
        "id_items_liquidaciones": item.id_items_liquidaciones,
        "id_radicacion": item.id_radicacion,
        "precio_total": item.precio_total, //valor calculado
        "cantidad": canti_tot,
        "iva": item.iva,
        "tipo_liquidacion": item.tipo_liquidacion,
        "cantidad_comprador": canti_comp,
        "cantidad_vendedor": canti_vend,
        "id_actos": null
      }
      console.log(liq_json)
      newDataSend.splice(index, 1, { ...item, ...liq_json });
      this.props.setSend(newDataSend);

      //capturar datos para visualizar en la tabla
      const newData = [...this.props.dataSource];
      let index = newData.findIndex((item) => row.Detalle === item.Detalle);
      let item = newData[index];
      let data_edited = {
        Tot: canti_tot,
        Com: canti_comp,
        Ven: canti_vend,
        Detalle: row.Detalle,
        Total: FormatearNum(total),
        Valor: FormatearNum(precio_total),
        IVA: FormatearNum(iva),
        tipo_liquidacion: row.tipo_liquidacion,
      }
      newData.splice(index, 1, { ...item, ...data_edited });
      this.props.set(newData);

    }
    else {
      //capturar datos para enviar a la API
      let newDataSend = [...this.props.dataSend];
      index = newDataSend.findIndex((item) => row.id_items_liquidaciones === item.id_items_liquidaciones);
      item = newDataSend[index];
      let liq_json = {
        "id": item.id,
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
      newDataSend.splice(index, 1, { ...item, ...liq_json });
      this.props.setSend(newDataSend);

      //capturar datos para visualizar en la tabla
      const newData = [...this.props.dataSource];
      let index = newData.findIndex((item) => row.Detalle === item.Detalle);
      let item = newData[index];
      let data_edited = {
        Tot: canti_tot,
        Com: canti_comp,
        Ven: canti_vend,
        Detalle: row.Detalle,
        Total: total_format,
        Valor: preciot_total_format,
        IVA: iva_format,
        tipo_liquidacion: row.tipo_liquidacion,
        valor_uni: row.valor_uni
      }
      newData.splice(index, 1, { ...item, ...data_edited });
      this.props.set(newData);
    }

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
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
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
