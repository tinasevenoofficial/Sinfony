import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Attachment from "@material-ui/icons/Attachment";

// core components
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import stylesButton from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.js";
import Button from "components/CustomButtons/Button.js";
import { Table, Input, Space, Spin } from 'antd';



//ant design
import { message } from 'antd';

const useStyles = makeStyles(theme => ({
    root: { color: 'black', fontSize: '18px' },
}));

const useStylesButton = makeStyles(stylesButton)
export default function Add_servicio(props) {
    
    const auth = useSelector((state) =>   state.auth);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const classesButton = useStylesButton();
    const [selected, setselectedRowkeys] = useState([]);
    const [data_serv, setdata_serv] = useState([]);
    const [servAdd, setServAdd] = useState([]);
    const [loading, setLoading] = useState(false);
    //alert key
    const key = 'updatable';

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'precio',
            dataIndex: 'precio',
            key: 'precio',
        },
    ];

    const handleClickOpen = () => {
        
        setOpen(true);

        let config = {
            headers: {Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin':true },
        };
        setLoading(true)
        axios.get(process.env.REACT_APP_URL_API+'/api/liquidaciones?filtro=servicio_adicional',config)
        .then((response)=>{
            console.log(response)
            let data = [];
            let data_add = [];
            var i = 0;
            response.data.forEach(element => {
                
                //data para visualizar en el modal
                let temp_data = {
                    key: i,
                    name: element.name,
                    precio: element.precio, 
                };
                data.push(temp_data);
                i += 1;

                //data para visualizar en la tabla
                let data_json = {
                    Tot: 0,
                    Com: 0,
                    Ven: 0,
                    Detalle: element.name,
                    Total: 0,
                    Valor: 0,
                    valor_uni: element.precio,
                    IVA: null,
                    tipo_liquidacion: element.tipo,
                    id_items_liquidaciones: element.id,
                    editable: element.editable
                }
                data_add.push(data_json);
            });
            setdata_serv(data);
            setServAdd(data_add);
            setLoading(false)
        })
    }


    const addService = () => {

        try {
            
            let servicios = [...props.data];
            let dataToSend = [...props.dataSend]
            let index;
            selectedRowKeys.forEach(element => {

                let condicion;
                props.data.forEach((datos) => {
                    if (datos.Detalle === servAdd[element].Detalle){

                        condicion = true;
                    }
                })
                if (!condicion){
                    index = servicios.findIndex(element => (element.Detalle === 'Retefuente') | (element.Detalle === 'superintendencia de Notariado'));
                    servicios.splice(index, 0, servAdd[element]);
                    // servicios.push(servAdd[element]);
                    //data para enviar a la API
                    let liq_json = {
                        "id": null,
                        "id_items_liquidaciones": servAdd[element].id_items_liquidaciones,
                        "id_radicacion": dataToSend[0].id_radicacion,
                        "precio_total": 0, //valor calculado
                        "cantidad": 0,
                        "iva": 0,
                        "tipo_liquidacion": servAdd[element].tipo_liquidacion,
                        "cantidad_comprador": 0,
                        "cantidad_vendedor": 0,
                        "id_actos": null,
                        "editable": servAdd[element].editable
                    }
                    dataToSend.push(liq_json)
                }
            })
            props.setSend(dataToSend);
            props.set(servicios);
            handleClose();
        }
        catch (error){
            console.log(error)
            alert('selecciona un servicio adicional')
        }
    }
    
    const {selectedRowKeys} = selected; 
    const onSelectChange = selectedRowKeys  => {
        //console.log('selectedRowKeys changed: ', selectedRowKeys );
        setselectedRowkeys({selectedRowKeys})
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <div>
            <Button  
                onClick={handleClickOpen} 
                justIcon
                color="rose"
                className={classesButton.marginRight}>
                <span className="material-icons">
                    library_add
                </span>
            </Button>
            <label fontSize='100px'><b>Añadir servicios adicionales</b></label>
            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Spin spinning={loading}>
                    <DialogContent>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <span class="material-icons">
                                add_shopping_cart
                            </span>
                        </CardIcon>
                        <h3 className={classes.cardIconTitle}>SERVICIOS NOTARIALES</h3>
                    </CardHeader>
                    </DialogContent>
                    <DialogContent>
                        <div>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={data_serv} pagination={false}/>
                        </div>
                    </DialogContent>
                    <div style={{ padding: '23px' }}>
                        <DialogActions style={{ display: 'contents' }}>
                            <Button color="rose" size="sm" onClick={handleClose} style={{ float: 'left' }}>
                                Cancelar
                            </Button>
                            <Button color="rose" size="sm" onClick={addService} style={{ float: 'right' }}>
                                Añadir
                            </Button>
                        </DialogActions>
                    </div>
                </Spin>
            </Dialog>
        </div>
    );
}
