import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// @material-ui/core components
import { makeStyles, styled } from "@material-ui/core/styles";

// material-ui icons
//import Price from "@material-ui/icons/AddShoppingCart";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Tables from "components/AnTable/DerechosNotarialesTable";
import TablesRegistrales from "components/AnTable/DerechosRegistralesTable"
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import Button from "components/CustomButtons/Button.js";


// importar modal
import Add_servicio from "../LiquidacionEscritura/modalLiquidacion/modal_serviciosAdicionales"
import Add_registro from "../LiquidacionEscritura/modalLiquidacion/modal_serviciosRegistrales"

import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
import stylesForms from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import stylesTables from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import stylesButton from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import { TableSelectCell } from "mui-datatables";

import { Table, Input, Space } from 'antd';

import roundHalfEven from "round-half-even";

// const columnsNot = [
//     {
//       title: 'Detalle',
//       dataIndex: 'Detalle',
//       key: 'Detalle',
//       width: 110,
//     },
//     {
//       title: 'Cantidad',
//       children: [
//         {
//         title: 'Com',
//         dataIndex: 'Com',
//         key: 'Com',
//         width: 30,
//         editable: true,
//         },

//         {
//           title: 'Ven',
//           dataIndex: 'Ven',
//           key: 'Ven',
//           width: 30,
//           editable: true,
//         },

//         {
//           title: 'Tot',
//           dataIndex: 'Tot',
//           key: 'Tot',
//           width: 30,
//           editable: true,
//         }
//       ],
//     },
//     {
//       title: 'Valor',
//       dataIndex: 'Valor',
//       key: 'Valor',
//       width: 50,
//     },
//     {
//       title: 'IVA',
//       dataIndex: 'IVA',
//       key: 'IVA',
//       width: 50,
//     },
//     {
//       title: 'Total',
//       dataIndex: 'Total',
//       key: 'Total',
//       width: 50,
//     },
//   ];

const columnsDer = [
    {
        title: 'Detalle',
        dataIndex: 'Detalle',
        key: 'Detalle',
        width: 100,
        align: 'right',
    },
    {
        title: 'Ven',
        dataIndex: 'Ven',
        key: 'Ven',
        width: 35,
        editable: true,
        align: 'right',
    },
    {
        title: 'Com',
        dataIndex: 'Com',
        key: 'Com',
        width: 35,
        align: 'right',
    },


    {
        title: 'Tot',
        dataIndex: 'Tot',
        key: 'Tot',
        width: 35,
        editable: true,
        align: 'right',
    },
    {
        title: 'Valor',
        dataIndex: 'Valor',
        key: 'Valor',
        width: 60,
        align: 'right',
    },
    {
        title: 'Total',
        dataIndex: 'Total',
        key: 'Total',
        width: 60,
        align: 'right',
    },
];

const columnsNot = [
    {
        title: 'Detalle',
        dataIndex: 'Detalle',
        key: 'Detalle',
        width: 80,
    },
    {
        title: 'Ven',
        dataIndex: 'Ven',
        key: 'Ven',
        width: 30,
        editable: true,
        align: 'right',
    },
    {
        title: 'Com',
        dataIndex: 'Com',
        key: 'Com',
        width: 30,
        editable: false,
        align: 'right',
    },
    {
        title: 'Tot',
        dataIndex: 'Tot',
        key: 'Tot',
        width: 30,
        editable: true,
        align: 'right',
    },
    {
        title: 'Valor',
        dataIndex: 'Valor',
        key: 'Valor',
        width: 45,
        editable: true,
        align: 'right',
    },
    {
        title: 'IVA',
        dataIndex: 'IVA',
        key: 'IVA',
        width: 45,
        align: 'right',
    },
    {
        title: 'Total',
        dataIndex: 'Total',
        key: 'Total',
        width: 45,
        align: 'right',
    },
];
const useStylesForm = makeStyles(stylesForms);
const useStylesTables = makeStyles(stylesTables);
const useStylesButton = makeStyles(stylesButton)

export default function LiquidarTables() {

    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const classes = useStyles();
    const classesForm = useStylesForm();
    const classesTables = useStylesTables();
    const classesButton = useStylesButton();
    const [] = useState([]);

    const [tableNot, setTableNot] = useState([]);
    const [tableDer, setTableDer] = useState([]);
    const [dataSend, setdataSend] = useState([]);
    const [id_radi, setId_radi] = useState(0);
    const [apesfo, setApesfo] = useState(0);
    const [Totales, setTotales] = useState({
        iva: 0,
        TotDer: 0,
        TotOtros: 0,
        TotLiq: 0,
    }
    );

    useEffect(() => {

        calcular_totales()
    }, [tableNot, tableDer]);

    // const getDataNot = async()=>{

    //     let num_rad = document.getElementById("Radicacion").value
    //     let config = {
    //                 // method: 'get',
    //                 // mode: 'cors', 
    //                 // url:process.env.REACT_APP_URL_API+"/api/liquidaciones",
    //                 headers: {Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin':true },
    //     };
    //     axios.get(process.env.REACT_APP_URL_API+'/api/liquidacionRadi?numero_radicacion='+num_rad,config)
    //     .then((response)=>{
    //             let data = response.data['derechos_notariales'].map((derechos)=>({
    //                 Tot: derechos.cantidad,
    //                 Com: derechos.cantidad_comprador,
    //                 Ven: derechos.cantidad_vendedor,
    //                 Detalle: derechos.detalle,
    //                 Total: derechos.precio_total,
    //                 Valor: derechos.valor_unitario,
    //                 IVA: derechos.iva
    //             }))
    //             setTableNot(data);
    //             console.log(response);
    //             console.log(data);
    //             // let temp = response.data['derechos_notariales']
    //             // console.log(temp[0]['acto']);

    //             let tableDer = response.data['derechos_registrales'].map((derechos)=>({
    //                 Tot: derechos.cantidad,
    //                 Com: derechos.cantidad_comprador,
    //                 Ven: derechos.cantidad_vendedor,
    //                 Detalle: derechos.detalle,
    //                 Total: derechos.precio_total,
    //                 Valor: derechos.valor_unitario,
    //             }))
    //             setTableDer(tableDer);
    //             console.log(tableDer);
    //             })
    //             .catch((e)=>{
    //                 console.log(e);
    //             })
    // }

    const calcular_totales = () => {

        var formatter = new Intl.NumberFormat();

        let TotDer = 0;
        let iva = 0;
        let TotOtros = 0;
        let TotLiq = 0;

        let TotNotCom = 0;
        let TotNotVen = 0;
        let TotNotComTer = 0;
        let TotNotVenTer = 0;
        let TotImpDepCom = 0;
        let TotImpDepVen = 0;
        let TotRegCom = 0;
        let TotRegVen = 0;
        let TotRegisCom = 0;
        let TotRegisVen = 0;
        let TotCom = 0;
        let TotVen = 0;
        let granTot = 0;

        if (dataSend.length > 0) {
            dataSend.forEach((element) => {

                if ((element.tipo_liquidacion == 'derecho_notarial') || (element.tipo_liquidacion == 'servicio_adicional')) {

                    TotDer += element.precio_total;
                    iva += element.iva;
                    TotLiq += element.precio_total + element.iva;

                    //calcular total notaria
                    if (element.cantidad > 1) {
                        TotNotCom += (element.precio_total / element.cantidad) * element.cantidad_comprador;
                        TotNotVen += (element.precio_total / element.cantidad) * element.cantidad_vendedor;
                        TotNotCom = parseInt(TotNotCom.toFixed(2))
                        TotNotVen = parseInt(TotNotVen.toFixed(2))
                    }
                    else {

                        TotNotCom += element.precio_total * element.cantidad_comprador;
                        TotNotVen += element.precio_total * element.cantidad_vendedor;
                    }
                }
                else if (element.tipo_liquidacion == 'recaudo_terceros') {

                    TotOtros += element.precio_total;
                    TotLiq += element.precio_total;

                    //calcular total notaria
                    if (element.cantidad > 1) { //verificar si las cantidades son enteras
                        TotNotComTer += (element.precio_total / element.cantidad) * element.cantidad_comprador;
                        TotNotVenTer += (element.precio_total / element.cantidad) * element.cantidad_vendedor;
                        TotNotComTer = parseInt(TotNotComTer.toFixed(2))
                        TotNotVenTer = parseInt(TotNotVenTer.toFixed(2))
                    }
                    else {
                        //cantidades decimales
                        TotNotComTer += element.precio_total * element.cantidad_comprador;
                        TotNotVenTer += element.precio_total * element.cantidad_vendedor;
                    }
                    console.log(TotNotComTer)
                }
                else {
                    if (element.id_items_liquidaciones == 40) {
                        TotImpDepCom += element.precio_total * element.cantidad_comprador;
                        TotImpDepVen += element.precio_total * element.cantidad_vendedor;
                        TotRegisCom += TotImpDepCom;
                        TotRegisVen += TotImpDepVen;
                    }
                    else if (element.id_items_liquidaciones == 41) {
                        TotRegCom += element.precio_total * element.cantidad_comprador;
                        TotRegVen += element.precio_total * element.cantidad_vendedor;
                        TotRegisCom += TotRegCom;
                        TotRegisVen += TotRegVen;
                    }
                    else {
                        if (element.cantidad > 1) {
                            TotRegisCom += (element.precio_total / element.cantidad) * element.cantidad_comprador;
                            TotRegisVen += (element.precio_total / element.cantidad) * element.cantidad_vendedor;
                            TotRegisCom = parseInt(TotRegisCom.toFixed(2))
                            TotRegisVen = parseInt(TotRegisVen.toFixed(2))
                        }
                        else {

                            TotRegisCom += element.precio_total * element.cantidad_comprador;
                            TotRegisVen += element.precio_total * element.cantidad_vendedor;
                        }
                    }
                }
            })
            TotNotCom = (TotNotCom * 1.19) + TotNotComTer;
            TotNotVen = (TotNotVen * 1.19) + TotNotVenTer;
            TotCom += TotNotCom + TotRegisCom;
            TotVen += TotNotVen + TotRegisVen;
            granTot += TotCom + TotVen;
        }
        document.getElementById("TotDer").innerHTML = ('$ ' + `${formatter.format(TotDer)}`);
        document.getElementById("TotIva").innerHTML = ('$ ' + `${formatter.format(iva)}`);
        document.getElementById("TotOtr").innerHTML = ('$ ' + `${formatter.format(TotOtros)}`);
        document.getElementById("TotLiq").innerHTML = ('$ ' + `${formatter.format(TotLiq)}`);

        document.getElementById("TotNotCom").innerHTML = ('$ ' + `${formatter.format(TotNotCom)}`);
        document.getElementById("TotNotVen").innerHTML = ('$ ' + `${formatter.format(TotNotVen)}`);
        document.getElementById("TotImpCom").innerHTML = ('$ ' + `${formatter.format(TotImpDepCom)}`);
        document.getElementById("TotImpVen").innerHTML = ('$ ' + `${formatter.format(TotImpDepVen)}`);
        document.getElementById("TotRegCom").innerHTML = ('$ ' + `${formatter.format(TotRegCom)}`);
        document.getElementById("TotRegVen").innerHTML = ('$ ' + `${formatter.format(TotRegVen)}`);
        document.getElementById("TotRegisCom").innerHTML = ('$ ' + `${formatter.format(TotRegisCom)}`);
        document.getElementById("TotRegisVen").innerHTML = ('$ ' + `${formatter.format(TotRegisVen)}`);
        document.getElementById("TotCVCom").innerHTML = ('$ ' + `${formatter.format(TotCom)}`);
        document.getElementById("TotCVVen").innerHTML = ('$ ' + `${formatter.format(TotVen)}`);
        document.getElementById("GranTot").innerHTML = ('$ ' + `${formatter.format(granTot)}`);
    }

    const liquidar_acto = (cuanti_derec, element) => {

        //segun el tipo de liquidacion se calculara un valor para el acto
        let precio_liquidacion
        precio_liquidacion = element.acto.parametros.base1;
        if (element.acto.parametros.tope1 < cuanti_derec) {

            let diferencia = cuanti_derec - element.acto.parametros.tope1
            if (cuanti_derec <= element.acto.parametros.tope2) {

                precio_liquidacion += diferencia * element.acto.parametros.base2
            }
            else if ((element.acto.parametros.tope2 < cuanti_derec) && (cuanti_derec <= element.acto.parametros.tope3)) {

                precio_liquidacion += diferencia * element.acto.parametros.base3
            }
            else if ((element.acto.parametros.tope3 < cuanti_derec) && (cuanti_derec <= element.acto.parametros.tope4)) {

                precio_liquidacion += diferencia * element.acto.parametros.base4
            }
            else {

                precio_liquidacion += diferencia * element.acto.parametros.base5
            }
        }
        return precio_liquidacion = Math.round(precio_liquidacion)
    }

    const retefuente = (element, valorRet) => {

        var retef = 0;
        if (element.acto.retencion_fuente == 1) {
            retef = (valorRet * element.acto.porcentaje_retencion_fuente) / 100;
        }

        switch (element.acto.fech_adqui) {

            case 1986:
                retef = retef * 0.9;
                break;
            case 1985:
                retef = retef * 0.8;
                break;
            case 1984:
                retef = retef * 0.7;
                break;
            case 1983:
                retef = retef * 0.6;
                break;
            case 1982:
                retef = retef * 0.5;
                break;
            case 1981:
                retef = retef * 0.4;
                break;
            case 1980:
                retef = retef * 0.3;
                break;
            case 1979:
                retef = retef * 0.2;
                break;
            case 1978:
                retef = retef * 0.1;
                break;
            case 1977:
                retef = retef * 0;
                break;
        }

        return retef
        //GUARDAR LA RETEFUENTE EN RECAUDO A TERCEROS
    }

    const calcularTerceros = (configuracion, VTotCuan) => {

        //super
        let VSuper
        if (VTotCuan == 0) {

            VSuper = configuracion.super1;
        }
        else if ((VTotCuan > configuracion.tope1) && (VTotCuan <= configuracion.tope2)) {
            VSuper = configuracion.super2
        }
        else if ((VTotCuan > configuracion.tope2) && (VTotCuan <= configuracion.tope3)) {
            VSuper = configuracion.super3
        }
        else if ((VTotCuan > configuracion.tope3) && (VTotCuan <= configuracion.tope4)) {

            VSuper = configuracion.super4
        }
        else if ((VTotCuan > configuracion.tope4) && (VTotCuan <= configuracion.tope5)) {

            VSuper = configuracion.super5
        }
        else if ((VTotCuan > configuracion.tope5) && (VTotCuan <= configuracion.tope6)) {

            VSuper = configuracion.super6
        }
        else {

            VSuper = configuracion.super7
        }

        return VSuper
    }

    const calcularImpDepartamental = (configuracion, cuantia, bolfis, porcentaje) => {

        let TotImpDepar;
        if (bolfis == 'M') {
            TotImpDepar = configuracion.minima;
        }
        else if (bolfis == 'S') {
            TotImpDepar = configuracion.base0;
            if ((1 <= cuantia <= configuracion.tope1)) {
                TotImpDepar += cuantia * configuracion.base1;

            }
            else if ((configuracion.tope1 < cuantia <= configuracion.tope2)) {
                TotImpDepar += cuantia * configuracion.base2;

            }
            else if ((configuracion.tope2 < cuantia)) {
                TotImpDepar += cuantia * configuracion.base3;

            }
        }
        return TotImpDepar = TotImpDepar * porcentaje;
    }

    const calcularImpRegistro = (configuracion, cuantia, registro, porcentaje) => {

        let TotimpReg;
        if (registro == 'M') {
            TotimpReg = configuracion.minima;
        }
        else if (registro == 'S') {
            if (configuracion.tope1 >= cuantia) {
                TotimpReg = configuracion.base0;
            }
            else if ((configuracion.tope1 < cuantia <= configuracion.tope2)) {
                TotimpReg = cuantia * configuracion.base1;

            }
            else if ((configuracion.tope2 < cuantia <= configuracion.tope3)) {
                TotimpReg = cuantia * configuracion.base2;

            }
            else if ((configuracion.tope3 < cuantia <= configuracion.tope4)) {
                TotimpReg = cuantia * configuracion.base3;

            }
            else if (configuracion.tope4 < cuantia) {
                TotimpReg = cuantia * configuracion.base4;

            }
        }
        return TotimpReg = TotimpReg * (porcentaje / 100);
    }

    const probando = () => {

        console.log(dataSend);
        let config = {
            headers: { Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin': true },
        };
        axios.put(process.env.REACT_APP_URL_API + '/api/liquidaciones/' + id_radi, dataSend, config);
    }

    const liquidacion = (/*radicacion_data*/) => {

        let jsondata = {

            "derechos_notariales": [
                {
                    "id": null,
                    "id_items_liquidaciones": 1,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": null,
                    "cantidad": 1,
                    "iva": null,
                    "tipo_liquidacion": "derecho_notarial",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "radicacion prueba",
                    "valor_unitario": null,
                    "exento": 0,
                    "topesliq": {
                        "tope1": 5000000,
                        "tope2": 30000000,
                    },
                    "acto": {
                        "id": "8c5d3017-440e-41e5-a3d6-02963c7c57da",
                        "codigo_acto": 89178,
                        "activo": 1,
                        "nombre_acto": "radicacion prueba",
                        "interes_social": null,
                        "actor": null,
                        "porcentaje_aporte": null,
                        "cuantia": 200000000,
                        "tipo_liquidacion": null,
                        "retencion_fuente": "1",
                        "porcentaje_retencion_fuente": 50,
                        "timbre": null,
                        "bolfis": null,
                        "registro": null,
                        "porcentaje_derech": null,
                        "porcentaje_hojas": null,
                        "codigo_uiaf": null,
                        "oto1uiaf": null,
                        "oto2uiaf": null,
                        "codigo_exogena": null,
                        "exogena": null,
                        "ncodsup": null,
                        "consumo": null,
                        "cance": null,
                        "editable": null,
                        "avaluo": null,//435464.20,
                        "id_tarifa": "02",
                        "parametros": {
                            "base1": 21300,
                            "base2": 0.0030,
                            "base3": 0.0030,
                            "base4": 0.0030,
                            "base5": 0.0030,
                            "tope1": 179600,
                            "tope2": 11792290,
                            "tope3": 23584600,
                            "tope4": 35376930,
                        },
                        "otorgantes": [
                            {
                                "numero_documento": "95626",
                                "tipo_organizacion": "Persona Jurídica",
                                "porcentaje_participacion": "0.50",
                                "exento": "0"
                            },
                            {
                                "numero_documento": "89261",
                                "tipo_organizacion": "Persona Jurídica",
                                "porcentaje_participacion": "0.20",
                                "exento": null
                            },
                            {
                                "numero_documento": "12365843",
                                "tipo_organizacion": "Persona Natural",
                                "porcentaje_participacion": "0.30",
                                "exento": null
                            }
                        ]
                    }
                },
                {
                    "id": "4959a453-1198-4180-89bb-b67559a69b03",
                    "id_items_liquidaciones": 2,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": 500,
                    "cantidad": 1,
                    "iva": 120,
                    "tipo_liquidacion": "servicio_adicional",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "fotocopia",
                    "valor_unitario": 150,
                    "acto": null
                },
                {
                    "id": "eeb264eb-2fcf-4dc5-9e74-698490e3f634",
                    "id_items_liquidaciones": 2,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": 5000,
                    "cantidad": 10,
                    "iva": 250,
                    "tipo_liquidacion": "servicio_adicional",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "fotocopia",
                    "valor_unitario": 150,
                    "acto": null
                }
            ],
            "derechos_registrales": [
                {
                    "id": "e9e83f73-446b-420d-908b-6142ddfc9627",
                    "id_items_liquidaciones": 4,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": 758950,
                    "cantidad": 1,
                    "iva": null,
                    "tipo_liquidacion": "derecho_registral",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "certificados",
                    "valor_unitario": 250000
                }
            ],
            "configuracion": {
                "super1": "6800",
                "super2": "10200",
                "super3": "15450",
                "super4": "18600",
                "super5": "25450",
                "super6": "30000",
                "super7": "34050",
                "tope1": "1",
                "tope2": "100000000",
                "tope3": "300000000",
                "tope4": "500000000",
                "tope5": "1000000000",
                "tope6": "1500000000",
            }
        }

        let jsondata2 = {

            "derechos_notariales": [
                {
                    "id": null,
                    "id_items_liquidaciones": 1,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": null,
                    "cantidad": 1,
                    "iva": null,
                    "tipo_liquidacion": "derecho_notarial",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "radicacion prueba",
                    "valor_unitario": null,
                    "acto": {
                        "id": "8c5d3017-440e-41e5-a3d6-02963c7c57da",
                        "codigo_acto": 89178,
                        "activo": 1,
                        "nombre_acto": "radicacion prueba",
                        "interes_social": null,
                        "actor": null,
                        "porcentaje_aporte": null,
                        "cuantia": null,
                        "tipo_liquidacion": null,
                        "retencion_fuente": null,
                        "porcentaje_retencion_fuente": null,
                        "timbre": null,
                        "bolfis": null,
                        "registro": null,
                        "porcentaje_derech": null,
                        "porcentaje_hojas": null,
                        "codigo_uiaf": null,
                        "oto1uiaf": null,
                        "oto2uiaf": null,
                        "codigo_exogena": null,
                        "exogena": null,
                        "ncodsup": null,
                        "consumo": null,
                        "cance": null,
                        "editable": null,
                        "avaluo": null,//435464.20,
                        "parametros": {
                            "base1": 62700,
                            "base2": 0.0030,
                            "base3": 0.0030,
                            "base4": 0.0030,
                            "base5": 0.0030,
                            "tope1": 179600,
                            "tope2": 11792290,
                            "tope3": 23584600,
                            "tope4": 35376930,
                        },
                        "id_tarifa": "01"
                    }
                },
                {
                    "id": "4959a453-1198-4180-89bb-b67559a69b03",
                    "id_items_liquidaciones": 2,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": 500,
                    "cantidad": 1,
                    "iva": 120,
                    "tipo_liquidacion": "servicio_adicional",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "fotocopia",
                    "valor_unitario": 150,
                    "acto": null
                },
                {
                    "id": "eeb264eb-2fcf-4dc5-9e74-698490e3f634",
                    "id_items_liquidaciones": 2,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": 5000,
                    "cantidad": 10,
                    "iva": 250,
                    "tipo_liquidacion": "servicio_adicional",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "fotocopia",
                    "valor_unitario": 150,
                    "acto": null
                }
            ],
            "derechos_registrales": [
                {
                    "id": "e9e83f73-446b-420d-908b-6142ddfc9627",
                    "id_items_liquidaciones": 4,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": 758950,
                    "cantidad": 1,
                    "iva": null,
                    "tipo_liquidacion": "derecho_registral",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "certificados",
                    "valor_unitario": 250000
                }
            ]
        }

        let jsondata3 = {

            "derechos_notariales": [
                {
                    "id": null,
                    "id_items_liquidaciones": 1,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": null,
                    "cantidad": 1,
                    "iva": null,
                    "tipo_liquidacion": "derecho_notarial",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "radicacion prueba",
                    "valor_unitario": null,
                    "acto": {
                        "id": "8c5d3017-440e-41e5-a3d6-02963c7c57da",
                        "codigo_acto": 89178,
                        "activo": 1,
                        "nombre_acto": "radicacion prueba",
                        "interes_social": null,
                        "actor": null,
                        "porcentaje_aporte": null,
                        "cuantia": 200000,
                        "tipo_liquidacion": null,
                        "retencion_fuente": null,
                        "porcentaje_retencion_fuente": null,
                        "timbre": null,
                        "bolfis": null,
                        "registro": null,
                        "porcentaje_derech": null,
                        "porcentaje_hojas": null,
                        "codigo_uiaf": null,
                        "oto1uiaf": null,
                        "oto2uiaf": null,
                        "codigo_exogena": null,
                        "exogena": null,
                        "ncodsup": null,
                        "consumo": null,
                        "cance": null,
                        "editable": null,
                        "avaluo": 435464.20,
                        "parametros": {
                            "base1": 21300,
                            "base2": 0.0030,
                            "base3": 0.0030,
                            "base4": 0.0030,
                            "tope1": 179600,
                            "tope2": 11792290,
                            "tope3": 23584600,
                            "tope4": 35376930,
                        },
                        "id_tarifa": "02"
                    }
                },
                {
                    "id": "4959a453-1198-4180-89bb-b67559a69b03",
                    "id_items_liquidaciones": 2,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": 500,
                    "cantidad": 1,
                    "iva": 120,
                    "tipo_liquidacion": "servicio_adicional",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "fotocopia",
                    "valor_unitario": 150,
                    "acto": null
                },
                {
                    "id": "eeb264eb-2fcf-4dc5-9e74-698490e3f634",
                    "id_items_liquidaciones": 2,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": 5000,
                    "cantidad": 10,
                    "iva": 250,
                    "tipo_liquidacion": "servicio_adicional",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "fotocopia",
                    "valor_unitario": 150,
                    "acto": null
                }
            ],
            "derechos_registrales": [
                {
                    "id": "e9e83f73-446b-420d-908b-6142ddfc9627",
                    "id_items_liquidaciones": 4,
                    "id_radicacion": "635f730c-3ccc-4c7d-8fc6-a3927c2db2cb",
                    "precio_total": 758950,
                    "cantidad": 1,
                    "iva": null,
                    "tipo_liquidacion": "derecho_registral",
                    "cantidad_vendedor": 0.5,
                    "cantidad_comprador": 0.5,
                    "id_actos": null,
                    "detalle": "certificados",
                    "valor_unitario": 250000
                }
            ]
        }
        var formatter = new Intl.NumberFormat();
        let num_rad = document.getElementById("Radicacion").value
        let config = {
            headers: { Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin': true },
        };
        axios.get(process.env.REACT_APP_URL_API + '/api/liquidacionRadi?numero_radicacion=' + num_rad, config)
            .then((response) => {

                // console.log(response.data.derechos_notariales[0].acto)
                // setDer_not(response.data.derechos_notariales[0]);
                // setDer_reg(response.data.derechos_registrales);
                let id_radi = response.data.derechos_notariales[0].id_radicacion;
                setId_radi(id_radi)
                console.log(response)

                //propiedades de la liquidacion
                let sendData = [];
                var data = [];
                var data_recTer = [];
                var VTotCuan = 0;
                var retef = 0;
                var TotDerNot = 0;
                var TotOtros = 0;
                var TotIva = 0;
                var liq_json;
                var data_json;
                let data_derReg = [];
                var control = false;

                //iterar por derechos notariales
                response.data.derechos_notariales.forEach(element => {
                    //liquidar derechos notariales
                    if (element.tipo_liquidacion == 'derecho_notarial') {

                        var precio_liquidacion = element.precio_total;
                        var iva_derNot = element.iva
                        var cuantia = element.cuantia;
                        VTotCuan = VTotCuan + cuantia; //guardar la suma de la cuantia para todos los actos
                        //evaluar si el acto ya esta liquidado
                        if (element.id == null) {

                            let tipLiq = element.acto.id_tarifa;
                            let avaluo = element.acto.avaluo;
                            // decidir si el calculo se hace con la cuantia o con el avaluo
                            if (avaluo > cuantia) {

                                var cuanti_derec = avaluo;
                                console.log('yes')
                            }
                            else {

                                var cuanti_derec = cuantia;
                            }

                            // cuando un acto viene sin cuantia y cualquier tipo liquidacion diferente de 01, se toma como 01
                            if (tipLiq == '02' && (cuantia == 0 || cuantia == null)) {

                                tipLiq = '01';

                                ///si este caso ocurre mirar si toca cambiar la configuracion
                            }

                            //////////////////////////////////////////////////////// se liquida el valor del acto segun su tipo ////////////////////////////////////////////////////////////////////////////////////////
                            precio_liquidacion = liquidar_acto(cuanti_derec, element);

                            //aporte especial fondo
                            if (precio_liquidacion > element.topesliq.tope1) {

                                let temp_apesfo
                                if ((element.exento == 1)) {

                                    alert('el otorgante es entidad exenta')
                                    temp_apesfo = apesfo + (precio_liquidacion - element.topesliq.tope1);
                                    precio_liquidacion = element.topesliq.tope1;

                                    setApesfo(temp_apesfo);
                                }
                                else if (precio_liquidacion > element.topesliq.tope2) {

                                    temp_apesfo = apesfo + (precio_liquidacion - element.topesliq.tope2);
                                    precio_liquidacion = element.topesliq.tope2;

                                    setApesfo(temp_apesfo);
                                }
                            }
                        }
                        //guardar el total
                        TotDerNot += precio_liquidacion;

                        //calcular iva de los derechos notariales
                        iva_derNot = precio_liquidacion * 0.19;
                        TotIva += iva_derNot;
                        let tot_derNot = TotIva + precio_liquidacion;

                        let precio = formatter.format(precio_liquidacion);
                        let tot_derNotFormat = formatter.format(tot_derNot);

                        let iva_precio = formatter.format(iva_derNot);
                        // se arma el json que se el va retornar al servidor con los datos actualizados
                        liq_json = {
                            "id": element.id,
                            "id_items_liquidaciones": element.id_items_liquidaciones,
                            "id_radicacion": element.id_radicacion,
                            "precio_total": precio_liquidacion, //valor calculado
                            "cantidad": element.cantidad,
                            "iva": iva_derNot,
                            "tipo_liquidacion": element.tipo_liquidacion,
                            "cantidad_comprador": element.cantidad_comprador,
                            "cantidad_vendedor": element.cantidad_vendedor,
                            "id_actos": element.acto.id
                        }
                        sendData.push(liq_json);

                        //data para mostrar en la tabla
                        data_json = {
                            Tot: element.cantidad,
                            Com: element.cantidad_comprador,
                            Ven: element.cantidad_vendedor,
                            Detalle: element.detalle,
                            Total: tot_derNotFormat,
                            Valor: precio,
                            IVA: iva_precio,
                            tipo_liquidacion: element.tipo_liquidacion,
                        }
                        data.push(data_json);



                        ///////////////////////////////////////////////// calcular retefuente ////////////////////////////////////////////////////////////////////////////
                        element.acto.otorgantes.forEach(otorgante => {
                            if (otorgante.tipo_organizacion == 'Persona Natural') {
                                let partici = cuantia * otorgante.porcentaje_participacion; //participacion del otorgante en el total de la cuantia
                                retef = retef + retefuente(element, partici);
                            }
                        })
                        //guardar total
                        TotDerNot += retef;

                        //////////////////////////////////////////////////derechos registrales/////////////////////////////////////////////////////////////////////////
                        //CALCULAR IMPUESTO DEPARTAMENTALES
                        let boleta = element.acto.bolfis;
                        let porcentaje_bolfis = element.acto.porcentaje_bolfis;
                        let ImpDepar = calcularImpDepartamental(response.data.derechos_registrales[0], cuantia, boleta, porcentaje_bolfis);
                        let impdeparFormat = formatter.format(ImpDepar);
                        // se arma el json que se el va retornar al servidor con los datos actualizados
                        liq_json = {
                            "id": response.data.derechos_registrales[0].id,
                            "id_items_liquidaciones": response.data.derechos_registrales[0].id_items_liquidaciones,
                            "id_radicacion": element.id_radicacion,
                            "precio_total": ImpDepar, //valor calculado
                            "cantidad": 1,
                            "iva": null,
                            "tipo_liquidacion": response.data.derechos_registrales[0].tipo_liquidacion,
                            "cantidad_comprador": 0.5,
                            "cantidad_vendedor": 0.5,
                            "id_actos": element.id_actos,
                        }
                        sendData.push(liq_json)
                        //visualizar datos en la vista
                        let data_impdpt = {
                            Tot: 1,
                            Com: 0.5,
                            Ven: 0.5,
                            Detalle: response.data.derechos_registrales[0].detalle,
                            Total: impdeparFormat,
                            Valor: impdeparFormat
                        }
                        data_derReg.push(data_impdpt);

                        //CALCULAR IMPUESTO REGISTROS
                        let registro = element.acto.registro;
                        let porcentaje_registro = element.acto.porcentaje_derech;
                        let Impreg = calcularImpRegistro(response.data.derechos_registrales[1], cuantia, registro, porcentaje_registro);
                        let impregFormat = formatter.format(Impreg);
                        // se arma el json que se el va retornar al servidor con los datos actualizados
                        liq_json = {
                            "id": response.data.derechos_registrales[1].id,
                            "id_items_liquidaciones": response.data.derechos_registrales[1].id_items_liquidaciones,
                            "id_radicacion": element.id_radicacion,
                            "precio_total": Impreg, //valor calculado
                            "cantidad": 1,
                            "iva": null,
                            "tipo_liquidacion": response.data.derechos_registrales[1].tipo_liquidacion,
                            "cantidad_comprador": 0.5,
                            "cantidad_vendedor": 0.5,
                            "id_actos": element.id_actos,
                        }
                        sendData.push(liq_json)
                        //visualizar datos en la vista
                        let data_regis = {
                            Tot: 1,
                            Com: 0.5,
                            Ven: 0.5,
                            Detalle: response.data.derechos_registrales[1].detalle,
                            Total: impregFormat,
                            Valor: impregFormat
                        }
                        data_derReg.push(data_regis);
                    }

                    //liquidar servivicios adicionales 
                    else if (element.tipo_liquidacion == 'servicio_adicional') {
                        // se arma el json que se el va retornar al servidor con los datos actualizados
                        let serAdi = formatter.format(element.precio_total);
                        let iva_add = element.precio_total * 0.19;
                        let serAdiIva = formatter.format(iva_add);
                        let serAdiTot = formatter.format(iva_add + element.precio_total);
                        let liq_json = {
                            "id": element.id,
                            "id_items_liquidaciones": element.id_items_liquidaciones,
                            "id_radicacion": element.id_radicacion,
                            "precio_total": element.precio_total,
                            "cantidad": element.cantidad,
                            "iva": iva_add,
                            "tipo_liquidacion": element.tipo_liquidacion,
                            "cantidad_comprador": element.cantidad_comprador,
                            "cantidad_vendedor": element.cantidad_vendedor,
                            "id_actos": null
                        }
                        sendData.push(liq_json)
                        //data para mostrar en la tabla
                        data_json = {
                            Tot: element.cantidad,
                            Com: element.cantidad_comprador,
                            Ven: element.cantidad_vendedor,
                            Detalle: element.detalle,
                            Total: serAdiTot,
                            Valor: serAdi,
                            IVA: serAdiIva,
                            tipo_liquidacion: element.tipo_liquidacion,
                            valor_uni: element.valor_unitario,
                            id_items_liquidaciones: element.id_items_liquidaciones
                        }
                        //guardar total
                        TotDerNot += element.precio_total;
                        TotIva += iva_add;
                        data.push(data_json);
                    }

                    //Recaudos a terceros traidos de la base de datos
                    else {

                        liq_json = {
                            "id": element.id,
                            "id_items_liquidaciones": element.id_items_liquidaciones,
                            "id_radicacion": element.id_radicacion,
                            "precio_total": element.precio_total, //valor calculado
                            "cantidad": element.cantidad,
                            "iva": element.iva,
                            "tipo_liquidacion": element.tipo_liquidacion,
                            "cantidad_comprador": element.cantidad_comprador,
                            "cantidad_vendedor": element.cantidad_vendedor,
                            "id_actos": null
                        }

                        //data para mostrar en la tabla
                        var data_recTer = {
                            Tot: element.cantidad,
                            Com: element.cantidad_comprador,
                            Ven: element.cantidad_vendedor,
                            Detalle: element.detalle,
                            Total: element.precio_total + element.iva,
                            Valor: element.precio_total,
                            IVA: element.iva
                        }
                        sendData.push(liq_json);
                        data.push(data_recTer);
                        control = true;
                    }
                })

                if (!control) {
                    /////////////////////////////////////////////////////////////////RECAUDO A TERCEROS////////////////////////////////////////////////////////////////////////////
                    // se arma el json que se el va retornar al servidor con los datos actualizados
                    let retef_precio = formatter.format(retef);
                    liq_json = {
                        "id": null,
                        "id_items_liquidaciones": response.data.idretef,
                        "id_radicacion": response.data.derechos_notariales[0].id_radicacion,
                        "precio_total": retef, //valor calculado
                        "cantidad": 1,
                        "iva": null,
                        "tipo_liquidacion": 'recaudo_terceros',
                        "cantidad_comprador": 0,
                        "cantidad_vendedor": 1,
                        "id_actos": null
                    }
                    //data para mostrar en la tabla
                    var data_retef = {
                        Tot: 1,
                        Com: 0,
                        Ven: 1,
                        Detalle: 'Retefuente',
                        Total: retef_precio,
                        Valor: null,
                        IVA: null
                    }
                    sendData.push(liq_json);
                    data_recTer.push(data_retef)

                    //calcular super y fondo
                    let VSuper = calcularTerceros(response.data.configuracion, VTotCuan);
                    TotOtros += VSuper * 2;
                    let VSuper_precio = formatter.format(VSuper);
                    // se arma el json que se el va retornar al servidor con los datos actualizados
                    liq_json = {
                        "id": null,
                        "id_items_liquidaciones": response.data.idsup,
                        "id_radicacion": response.data.derechos_notariales[0].id_radicacion,
                        "precio_total": VSuper, //valor calculado
                        "cantidad": 1,
                        "iva": null,
                        "tipo_liquidacion": 'recaudo_terceros',
                        "cantidad_comprador": 0.5,
                        "cantidad_vendedor": 0.5,
                        "id_actos": null
                    }
                    sendData.push(liq_json)
                    //visualizar datos en la vista
                    let data_sup = {
                        Tot: 1,
                        Com: 0.5,
                        Ven: 0.5,
                        Detalle: "superintendencia de Notariado",
                        Total: VSuper_precio,
                        Valor: null,
                        IVA: null
                    }
                    data_recTer.push(data_sup)

                    // se arma el json que se el va retornar al servidor con los datos actualizados
                    liq_json = {
                        "id": null,
                        "id_items_liquidaciones": response.data.idfon,
                        "id_radicacion": response.data.derechos_notariales[0].id_radicacion,
                        "precio_total": VSuper, //valor calculado
                        "cantidad": 1,
                        "iva": null,
                        "tipo_liquidacion": 'recaudo_terceros',
                        "cantidad_comprador": 0.5,
                        "cantidad_vendedor": 0.5,
                        "id_actos": null
                    }
                    sendData.push(liq_json)
                    //visualizar los datos en la vista
                    let data_fon = {
                        Tot: 1,
                        Com: 0.5,
                        Ven: 0.5,
                        Detalle: "Fondo Nacional de Notariado",
                        Total: VSuper_precio,
                        Valor: null,
                        IVA: null
                    }
                    data_recTer.push(data_fon);
                    data = data.concat(data_recTer);
                }


                console.log(sendData)
                setdataSend(sendData);
                //actualizar los datos de la tabla de derechos notariales con su liquidacion y servicion adicionales
                setTableNot(data);
                //actualizar los datos de la tabla para los derechos registrales
                setTableDer(data_derReg);
                let total_liq = TotDerNot + TotIva + TotOtros;
                setTotales({ ...Totales, 'TotDer': TotDerNot, 'iva': TotIva, 'TotOtros': TotOtros, 'TotLiq': total_liq });
                //
            }
            )
    }


    const [checked, setChecked] = React.useState([24, 22]);
    const handleToggle = value => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    return (
        <Card>
            <CardHeader color="primary" text>
                <CardText className={classes.cardText} color="primary">
                    <h4 className={classes.colorWhite}> Liquidar Escritura </h4>
                </CardText>
            </CardHeader>
            <CardBody>
                <form>
                    <GridContainer direction="row" justify="flex-end" >
                        <GridItem style={{ marginRight: '100px', backgroundColor: '#f2f2f2', border: '1px solid black' }}>
                            <FormLabel style={{ fontSize: '20px' }}>
                                Radicación Nro.
                            </FormLabel>
                            <CustomInput
                                id="Radicacion"
                                color="rose"
                                formControlProps={{

                                }}
                                inputProps={{
                                    type: "text"
                                }}
                                helpText="A block of help text that breaks onto a new line."
                            />
                            {/* </GridItem>
                        <GridItem> */}
                            <Button
                                justIcon
                                color="rose"
                                className={classes.marginRight}
                                onClick={liquidacion}
                            >
                                <span class="material-icons">
                                    search
                                </span>
                            </Button>
                        </GridItem>

                    </GridContainer>
                </form>
                <GridContainer>
                    <GridItem xs={8}>
                        <div className={classes.cardHeader}>
                            <h3 className={classes.cardTitle}>Derechos notariales y recaudo</h3>
                        </div>
                        <>
                            <Tables columns={columnsNot} dataSource={tableNot} set={setTableNot} dataSend={dataSend} setSend={setdataSend} />
                        </>
                    </GridItem>
                    <GridItem xs={4} direction="row" style={{ marginTop: '30px' }}>
                        <div >
                            <Add_servicio data={tableNot} set={setTableNot} dataSend={dataSend} setSend={setdataSend} />
                            <table style={{ width: 200, height: 150, textAlign: 'right' }}>
                                <tr>
                                    <td>Total Derechos</td>
                                    <td id="TotDer" style={{ background: '#e6e6e6' }}>$ 0</td>
                                </tr>
                                <tr>
                                    <td text-align='right'>Total IVA</td>
                                    <td id="TotIva" style={{ background: '#e6e6e6' }}>$ 0</td>
                                </tr>
                                <tr>
                                    <td text-align='right'>Otros</td>
                                    <td id="TotOtr" style={{ background: '#e6e6e6' }}>$ 0</td>
                                </tr>
                                <tr>
                                    <td text-align='right'><b>Total Liquidación</b></td>
                                    <td id="TotLiq" style={{ background: '#e6e6e6' }}>$ 0</td>
                                </tr>
                            </table>
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer style={{ padding: 20 }}>
                    <GridItem xs={7}>
                        <div className={classes.cardHeader}>
                            <h3 className={classes.cardTitle}>Derechos registrales</h3>
                        </div>
                        <>
                            <TablesRegistrales columns={columnsDer} dataSource={tableDer} set={setTableDer} dataSend={dataSend} setSend={setdataSend} />
                        </>
                    </GridItem>
                    <GridItem xs={4} direction="row" style={{ marginTop: '30px' }}>
                        <div >
                            {/* <Button   
                                justIcon
                                color="primary"
                                className={classesButton.marginRight}>
                                <span class="material-icons">
                                    library_add
                                </span>
                            </Button> */}
                            <Add_registro data={tableDer} set={setTableDer} dataSend={dataSend} setSend={setdataSend} />
                            <table style={{ width: 290, height: 200, textAlign: 'right' }}>
                                <tr>
                                    <td></td>
                                    <td>Comprador</td>
                                    <td>Vendedor</td>
                                </tr>
                                <tr>
                                    <td><b>Total Notaria</b></td>
                                    <td id="TotNotCom" style={{ background: '#e6e6e6' }}>$ 0</td>
                                    <td id="TotNotVen" style={{ background: '#e6e6e6' }}>$ 0</td>
                                </tr>
                                <tr>
                                    <td text-align='right'>Total imp. dptal</td>
                                    <td id="TotImpCom" style={{ background: '#e6e6e6' }}>$ 0</td>
                                    <td id="TotImpVen" style={{ background: '#e6e6e6' }}>$ 0</td>
                                </tr>
                                <tr>
                                    <td text-align='right'>Total registro</td>
                                    <td id="TotRegCom" style={{ background: '#e6e6e6' }}>$ 0</td>
                                    <td id="TotRegVen" style={{ background: '#e6e6e6' }}>$ 0</td>
                                </tr>
                                <tr>
                                    <td text-align='right'><b>Total registrales</b></td>
                                    <td id="TotRegisCom" style={{ background: '#e6e6e6' }}>$ 0</td>
                                    <td id="TotRegisVen" style={{ background: '#e6e6e6' }}>$ 0</td>
                                </tr>
                                <tr>
                                    <td text-align='right'><b>Totales CV</b></td>
                                    <td id="TotCVCom">$ 0</td>
                                    <td id="TotCVVen">$ 0</td>
                                </tr>
                                <tr>
                                    <td text-align='right'><b>Gran total</b></td>
                                    <td id="GranTot">$ 0</td>
                                    {/* <th style={{columnSpan:"2"}} style={{background:'#e6e6e6'}}>$ 0</th> */}
                                </tr>
                            </table>
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="flex-end" style={{ padding: 20 }}>
                    <div className={classes.cardContentLeft}>
                        <Button color="primary" >
                            IMPRIMIR
                        </Button>
                        <Button color="primary" className={classes.marginRight}>
                            ENVIAR CORREO
                        </Button>
                        <Button color="primary" className={classes.marginRight}>
                            FACTURAR
                        </Button>
                        <Button color="primary" className={classes.marginRight} className={classes.marginRight} onClick={probando} >
                            FINALIZAR
                        </Button>
                    </div>
                </GridContainer>
            </CardBody>
        </Card>
    );
}