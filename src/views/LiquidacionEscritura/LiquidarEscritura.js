import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { EXTERNAL_API_PATHS } from 'utils/constants'
import ReactDOM, { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles, styled } from "@material-ui/core/styles";

// material-ui icons
//import Price from "@material-ui/icons/AddShoppingCart";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Tables from "components/AnTable/DerechosNotarialesTable";
import TablesRegistrales from "components/AnTable/DerechosRegistralesTable";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import Button from "components/CustomButtons/Button.js";

// importar modal
import Add_servicio from "./modalLiquidacion/modal_serviciosAdicionales";
import Add_registro from "./modalLiquidacion/modal_serviciosRegistrales";

import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";
import stylesForms from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import stylesTables from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import stylesButton from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import { TableSelectCell } from "mui-datatables";

import { Spin, message } from "antd";

import roundHalfEven from "round-half-even";

import FormatearNum from "components/ComponenteFormatearNumero/Formatear_numeros";

import PDF from "views/Proyectos//PDFcreateLiquidacion.js";
import ReactToPrint, {
  PrintContextConsumer,
  useReactToPrint,
} from "react-to-print";
import LoadingS from "components/Loading/Loading";
import ReactLoading from "react-loading";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

const columnsDer = [
  {
    title: "Detalle",
    dataIndex: "Detalle",
    key: "Detalle",
    width: 100,
    align: "right",
  },
  {
    title: "Ven",
    dataIndex: "Ven",
    key: "Ven",
    width: 35,
    editable: true,
    align: "right",
  },
  {
    title: "Com",
    dataIndex: "Com",
    key: "Com",
    width: 35,
    align: "right",
  },

  {
    title: "Tot",
    dataIndex: "Tot",
    key: "Tot",
    width: 35,
    editable: true,
    align: "right",
  },
  {
    title: "Valor",
    dataIndex: "Valor",
    key: "Valor",
    width: 60,
    align: "right",
  },
  {
    title: "Total",
    dataIndex: "Total",
    key: "Total",
    width: 60,
    align: "right",
  },
];

const columnsNot = [
  {
    title: "Detalle",
    dataIndex: "Detalle",
    key: "Detalle",
    width: 80,
  },
  {
    title: "Ven",
    dataIndex: "Ven",
    key: "Ven",
    width: 30,
    editable: true,
    align: "right",
  },
  {
    title: "Com",
    dataIndex: "Com",
    key: "Com",
    width: 30,
    editable: false,
    align: "right",
  },
  {
    title: "Tot",
    dataIndex: "Tot",
    key: "Tot",
    width: 30,
    editable: true,
    align: "right",
  },
  {
    title: "Valor",
    dataIndex: "Valor",
    key: "Valor",
    width: 45,
    editable: true,
    align: "right",
  },
  {
    title: "IVA",
    dataIndex: "IVA",
    key: "IVA",
    width: 45,
    align: "right",
  },
  {
    title: "Total",
    dataIndex: "Total",
    key: "Total",
    width: 45,
    align: "right",
  },
];

const useStylesForm = makeStyles(stylesForms);
const useStylesTables = makeStyles(stylesTables);
const useStylesButton = makeStyles(stylesButton);

export default function LiquidarTables({ id, nextStep, state, setState }) {
  const dispatch = useDispatch();

  const classes = useStyles();
  const classesForm = useStylesForm();
  const classesTables = useStylesTables();
  const classesButton = useStylesButton();

  const [tableNot, setTableNot] = useState([]);
  const [tableDer, setTableDer] = useState([]);
  const [dataSend, setdataSend] = useState([]);
  const [id_radi, setId_radi] = useState(0);
  // const [estado, setEstado] = useState(state);
  const [apesfo, setApesfo] = useState(0);
  const [Totales, setTotales] = useState({
    iva: 0,
    TotDer: 0,
    TotOtros: 0,
    TotLiq: 0,
  });
  const [loading, setLoading] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  const [prev, setPrev] = useState(false);
  const [loadingPrint, setLoadingPrint] = useState(false);
  const [numRad, setNumRad] = useState();
  const [data, setData] = useState();
  const componentRef = useRef();

  // useEffect(() => {
  //   setEstado(state);
  // }, [state]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleNumRad = (event) => {
    setNumRad(event.target.value);
  };

  useEffect(() => {
    calcular_totales();
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
        if (
          element.tipo_liquidacion == "derecho_notarial" ||
          element.tipo_liquidacion == "servicio_adicional"
        ) {
          TotDer += element.precio_total;
          iva += element.iva;
          TotLiq += element.precio_total + parseFloat(element.iva.toFixed(2));

          //calcular total notaria
          if (element.cantidad > 1) {
            TotNotCom +=
              (element.precio_total / element.cantidad) *
              element.cantidad_comprador *
              1.19;
            TotNotVen +=
              (element.precio_total / element.cantidad) *
              element.cantidad_vendedor *
              1.19;
            TotNotCom = parseFloat(TotNotCom.toFixed(2));
            TotNotVen = parseFloat(TotNotVen.toFixed(2));
          } else {
            TotNotCom +=
              element.precio_total * element.cantidad_comprador * 1.19;
            TotNotVen +=
              element.precio_total * element.cantidad_vendedor * 1.19;
            TotNotCom = parseFloat(TotNotCom.toFixed(2));
            TotNotVen = parseFloat(TotNotVen.toFixed(2));
          }
        } else if (element.tipo_liquidacion == "recaudo_terceros") {
          TotOtros += element.precio_total;
          TotLiq += element.precio_total;

          //calcular total notaria
          if (element.cantidad > 1) {
            //verificar si las cantidades son enteras
            TotNotComTer +=
              (element.precio_total / element.cantidad) *
              element.cantidad_comprador;
            TotNotVenTer +=
              (element.precio_total / element.cantidad) *
              element.cantidad_vendedor;
            TotNotComTer = parseFloat(TotNotComTer.toFixed(2));
            TotNotVenTer = parseFloat(TotNotVenTer.toFixed(2));
          } else {
            //cantidades decimales
            TotNotComTer += element.precio_total * element.cantidad_comprador;
            TotNotVenTer += element.precio_total * element.cantidad_vendedor;
          }
        } else {
          if (element.id_items_liquidaciones == 40) {
            TotImpDepCom += element.precio_total * element.cantidad_comprador;
            TotImpDepVen += element.precio_total * element.cantidad_vendedor;
            TotRegisCom += TotImpDepCom;
            TotRegisVen += TotImpDepVen;
          } else if (element.id_items_liquidaciones == 41) {
            TotRegCom += element.precio_total * element.cantidad_comprador;
            TotRegVen += element.precio_total * element.cantidad_vendedor;
            TotRegisCom += TotRegCom;
            TotRegisVen += TotRegVen;
          } else {
            if (element.cantidad > 1) {
              TotRegisCom +=
                (element.precio_total / element.cantidad) *
                element.cantidad_comprador;
              TotRegisVen +=
                (element.precio_total / element.cantidad) *
                element.cantidad_vendedor;
              TotRegisCom = parseFloat(TotRegisCom.toFixed(2));
              TotRegisVen = parseFloat(TotRegisVen.toFixed(2));
            } else {
              TotRegisCom += element.precio_total * element.cantidad_comprador;
              TotRegisVen += element.precio_total * element.cantidad_vendedor;
            }
          }
        }
      });
      TotNotCom = TotNotCom + TotNotComTer;
      TotNotVen = TotNotVen + TotNotVenTer;
      TotCom += TotNotCom + TotRegisCom;
      TotVen += TotNotVen + TotRegisVen;
      granTot += TotCom + TotVen;
    }
    document.getElementById("TotDer").innerHTML =
      "$ " + `${FormatearNum(TotDer)}`;
    document.getElementById("TotIva").innerHTML = "$ " + `${FormatearNum(iva)}`;
    document.getElementById("TotOtr").innerHTML =
      "$ " + `${FormatearNum(TotOtros)}`;
    document.getElementById("TotLiq").innerHTML =
      "$ " + `${FormatearNum(parseFloat(TotLiq.toFixed(2)))}`;

    document.getElementById("TotNotCom").innerHTML =
      "$ " + `${FormatearNum(TotNotCom)}`;
    document.getElementById("TotNotVen").innerHTML =
      "$ " + `${FormatearNum(TotNotVen)}`;
    document.getElementById("TotImpCom").innerHTML =
      "$ " + `${FormatearNum(TotImpDepCom)}`;
    document.getElementById("TotImpVen").innerHTML =
      "$ " + `${FormatearNum(TotImpDepVen)}`;
    document.getElementById("TotRegCom").innerHTML =
      "$ " + `${FormatearNum(TotRegCom)}`;
    document.getElementById("TotRegVen").innerHTML =
      "$ " + `${FormatearNum(TotRegVen)}`;
    document.getElementById("TotRegisCom").innerHTML =
      "$ " + `${FormatearNum(TotRegisCom)}`;
    document.getElementById("TotRegisVen").innerHTML =
      "$ " + `${FormatearNum(TotRegisVen)}`;
    document.getElementById("TotCVCom").innerHTML =
      "$ " + `${FormatearNum(TotCom)}`;
    document.getElementById("TotCVVen").innerHTML =
      "$ " + `${FormatearNum(TotVen)}`;
    document.getElementById("GranTot").innerHTML =
      "$ " + `${FormatearNum(parseFloat(granTot.toFixed(2)))}`;
  };

  const liquidar_acto = (cuanti_derec, element) => {
    //segun el tipo de liquidacion se calculara un valor para el acto
    let precio_liquidacion;
    precio_liquidacion = element.acto.parametros.base1;
    if (element.acto.parametros.tope1 < cuanti_derec) {
      let diferencia = cuanti_derec - element.acto.parametros.base1;
      if (cuanti_derec <= element.acto.parametros.tope2) {
        precio_liquidacion += diferencia * element.acto.parametros.base2;
      } else if (
        element.acto.parametros.tope2 < cuanti_derec &&
        cuanti_derec <= element.acto.parametros.tope3
      ) {
        precio_liquidacion += diferencia * element.acto.parametros.base3;
      } else if (
        element.acto.parametros.tope3 < cuanti_derec &&
        cuanti_derec <= element.acto.parametros.tope4
      ) {
        precio_liquidacion += diferencia * element.acto.parametros.base4;
      } else {
        precio_liquidacion += diferencia * element.acto.parametros.base5;
      }
    }
    const precio_liq = precio_liquidacion || 0;
    return parseFloat(precio_liq.toFixed(2));
  };

  const retefuente = (element, valorRet) => {
    var retef = 0;
    if (element.acto.retencion_fuente == 1) {
      retef = valorRet * element.acto.porcentaje_retencion_fuente;
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

    return retef;
    //GUARDAR LA RETEFUENTE EN RECAUDO A TERCEROS
  };

  const calcularTerceros = (configuracion, VTotCuan) => {
    //super
    let VSuper;
    if (VTotCuan == 0) {
      VSuper = configuracion.super1;
    } else if (
      VTotCuan > configuracion.tope1 &&
      VTotCuan <= configuracion.tope2
    ) {
      VSuper = configuracion.super2;
    } else if (
      VTotCuan > configuracion.tope2 &&
      VTotCuan <= configuracion.tope3
    ) {
      VSuper = configuracion.super3;
    } else if (
      VTotCuan > configuracion.tope3 &&
      VTotCuan <= configuracion.tope4
    ) {
      VSuper = configuracion.super4;
    } else if (
      VTotCuan > configuracion.tope4 &&
      VTotCuan <= configuracion.tope5
    ) {
      VSuper = configuracion.super5;
    } else if (
      VTotCuan > configuracion.tope5 &&
      VTotCuan <= configuracion.tope6
    ) {
      VSuper = configuracion.super6;
    } else {
      VSuper = configuracion.super7;
    }

    return VSuper;
  };

  const calcularImpDepartamental = (
    configuracion,
    cuantia,
    bolfis,
    porcentaje
  ) => {
    let TotImpDepar;
    if (bolfis == "M") {
      TotImpDepar = configuracion.minima;
    } else if (bolfis == "S") {
      TotImpDepar = configuracion.base0;
      if (1 <= cuantia <= configuracion.tope1) {
        TotImpDepar += cuantia * configuracion.base1;
      } else if (configuracion.tope1 < cuantia <= configuracion.tope2) {
        TotImpDepar += cuantia * configuracion.base2;
      } else if (configuracion.tope2 < cuantia) {
        TotImpDepar += cuantia * configuracion.base3;
      }
    }
    TotImpDepar = TotImpDepar * porcentaje;

    return parseFloat(TotImpDepar.toFixed(2));
  };

  const calcularImpRegistro = (
    configuracion,
    cuantia,
    registro,
    porcentaje
  ) => {
    let TotimpReg;
    if (registro == "M") {
      TotimpReg = configuracion.minima;
    } else if (registro == "S") {
      if (configuracion.tope1 >= cuantia) {
        TotimpReg = configuracion.base0;
      } else if (configuracion.tope1 < cuantia <= configuracion.tope2) {
        TotimpReg = cuantia * configuracion.base1;
      } else if (configuracion.tope2 < cuantia <= configuracion.tope3) {
        TotimpReg = cuantia * configuracion.base2;
      } else if (configuracion.tope3 < cuantia <= configuracion.tope4) {
        TotimpReg = cuantia * configuracion.base3;
      } else if (configuracion.tope4 < cuantia) {
        TotimpReg = cuantia * configuracion.base4;
      }
    }
    TotimpReg = TotimpReg * porcentaje;

    return parseFloat(TotimpReg.toFixed(2));
  };

  const enviarData = () => {
    setLoadingSend(true);
    axios
      .put(
        process.env.REACT_APP_URL_API + "/api/liquidaciones/" + id_radi,
        dataSend
      )
      .then((response) => {
        if (response.status === 200) {
          message.success("Datos enviados correctamente");
        } else {
          
          message.error("Ha ocurrido un error");
        }
        if(setState){

          setState("facturacion");
        }
        setLoadingSend(false);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      alert("Enter clicked!!!");
    }
  };

  function imprimir() {
    setLoadingPrint(true);

    const consultar = async () => {
      await axios.get(EXTERNAL_API_PATHS.pdfLiquidacion)
        .then((response) => {
          if (response.status == 201 || response.status == 200) {
            setData(response.data);
            setPrev(false);
            setPrev(true);

            /* download() */
            handlePrint();
            hidePrint();

            /* return(
                    <div>
                            <PDF dataFromParent={response.data} ref={componentRef} />
                        </div>
                    ) */
            /* ReactDOM.render(element, document.getElementById('root')); */
          }
        })
        .catch((e) => {
          console.log(e);
          setLoadingPrint(false);
        });
    };

    consultar();
  }

  const hidePrint = () => {
    setPrev(false);
    setLoadingPrint(false);
    return <div></div>;
  };

  /* function download(){
        

        const input = document.getElementById('print');
        const pdf = new jsPDF();
        if (pdf) {
          domtoimage.toPng(input)
            .then(imgData => {
              pdf.addImage(imgData, 'PNG', 10, 10, 200,300);
              pdf.save('download.pdf');
              hidePrint()
            });
        }
    
        
    } */
  useEffect(() => {
    liquidacion(id);
  }, []);

  const liquidacion = (idRad) => {
    setLoading(true);
    let num_rad;
    if (typeof idRad === "number") {
      num_rad = idRad;
    } else {
      num_rad = numRad;
    }

    setNumRad(num_rad);
    let config = {
      headers: {
        "Access-Control-Allow-Origin": true,
      },
    };
    axios
      .get(
        process.env.REACT_APP_URL_API +
        "/api/liquidacionRadi?numero_radicacion=" +
        num_rad,
        config
      )
      .then((response) => {
        setLoading(false);
        let id_radi = response.data.derechos_notariales[0].id_radicacion;
        setId_radi(id_radi);
        

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
        let index;

        //recaudo a terceros
        let TotSup = 0;

        //derechos registrales
        let TotImpDepar = 0;
        let TotimpReg = 0;
        ////////////////////////////////////////////////////// ITERAR POR DERECHOS NOTARIALES ///////////////////////////////////////////////
        response.data.derechos_notariales.forEach((element) => {
          //liquidar derechos notariales
          if (element.tipo_liquidacion == "derecho_notarial") {
            var precio_liquidacion = element.precio_total;
            var iva_derNot = element.iva;
            var tot_derNot = precio_liquidacion + iva_derNot;
            var cuantia = element.acto.cuantia;
            var data_recTer = [];
            VTotCuan = VTotCuan + cuantia; //guardar la suma de la cuantia para todos los actos
            //evaluar si el acto ya esta liquidado
            if (element.id == null) {
              let tipLiq = element.acto.id_tarifa;
              let avaluo = element.acto.avaluo;
              // decidir si el calculo se hace con la cuantia o con el avaluo
              if (avaluo > cuantia) {
                var cuanti_derec = avaluo;
                
              } else {
                var cuanti_derec = cuantia;
              }

              // cuando un acto viene sin cuantia y cualquier tipo liquidacion diferente de 01, se toma como 01
              if (tipLiq == "02" && (cuantia == 0 || cuantia == null)) {
                tipLiq = "01";

                ///si este caso ocurre mirar si toca cambiar la configuracion
              }

              //////////////////////////////////////////////////////// se liquida el valor del acto segun su tipo ////////////////////////////////////////////////////////////////////////////////////////
              precio_liquidacion = liquidar_acto(cuanti_derec, element);
              ////////////////////////// aporte especial fondo
              if (precio_liquidacion > element.topesliq.tope1) {
                let temp_apesfo;
                if (element.exento == 1) {
                  alert("el otorgante es entidad exenta");
                  temp_apesfo =
                    apesfo + (precio_liquidacion - element.topesliq.tope1);
                  precio_liquidacion = element.topesliq.tope1;

                  setApesfo(temp_apesfo);
                } else if (precio_liquidacion > element.topesliq.tope2) {
                  temp_apesfo =
                    apesfo + (precio_liquidacion - element.topesliq.tope2);
                  precio_liquidacion = element.topesliq.tope2;

                  setApesfo(temp_apesfo);
                }
              }

              //calcular iva de los derechos notariales
              iva_derNot = precio_liquidacion * 0.19;
              iva_derNot = parseFloat(iva_derNot.toFixed(2));
              TotIva += iva_derNot;
              tot_derNot = iva_derNot + precio_liquidacion;

              /////////////////////////////////////////////////////////////////RECAUDO A TERCEROS////////////////////////////////////////////////////////////////////////////
              ///////////////////////////////////////////////// calcular retefuente /
              element.acto.otorgantes.forEach((otorgante) => {
                if (otorgante.tipo_organizacion == "Persona Natural") {
                  let partici = cuantia * otorgante.porcentaje_participacion; //participacion del otorgante en el total de la cuantia
                  retef = retef + retefuente(element, partici);
                }
              });

              if (retef !== 0) {
                //guardar total
                TotDerNot += retef;

                // se arma el json que se el va retornar al servidor con los datos actualizados
                let retef_precio = FormatearNum(retef);
                liq_json = {
                  id: null,
                  id_items_liquidaciones: response.data.idretef,
                  id_radicacion:
                    response.data.derechos_notariales[0].id_radicacion,
                  precio_total: retef, //valor calculado
                  cantidad: 1,
                  iva: null,
                  tipo_liquidacion: "recaudo_terceros",
                  cantidad_comprador: 0,
                  cantidad_vendedor: 1,
                  id_actos: null,
                };
                //data para mostrar en la tabla
                var data_retef = {
                  Tot: 1,
                  Com: 0,
                  Ven: 1,
                  Detalle: "Retefuente",
                  Total: retef_precio,
                  Valor: null,
                  IVA: null,
                };
                index = sendData.findIndex(
                  (element) => element.id_items_liquidaciones === 22
                );
                sendData[index] = liq_json;

                index = data_recTer.findIndex(
                  (element) => element.Detalle === "Retefuente"
                );
                data_recTer[index] = data_retef;
                // sendData.push(liq_json);
                // data_recTer.push(data_retef);
              }

              //calcular super y fondo
              let VSuper = calcularTerceros(
                response.data.configuracion,
                VTotCuan
              );
              TotSup += VSuper;
              TotOtros += TotSup * 2;
              let VSuper_precio = FormatearNum(TotSup);
              // se arma el json que se el va retornar al servidor con los datos actualizados
              liq_json = {
                id: null,
                id_items_liquidaciones: response.data.idsup,
                id_radicacion:
                  response.data.derechos_notariales[0].id_radicacion,
                precio_total: TotSup, //valor calculado
                cantidad: 1,
                iva: null,
                tipo_liquidacion: "recaudo_terceros",
                cantidad_comprador: 0.5,
                cantidad_vendedor: 0.5,
                id_actos: null,
              };
              index = sendData.findIndex(
                (element) => element.id_items_liquidaciones === 20
              );
              if (index === -1) {
                sendData.push(liq_json);
              } else {
                sendData[index] = liq_json;
              }
              // sendData.push(liq_json);
              //visualizar datos en la vista
              let data_sup = {
                Tot: 1,
                Com: 0.5,
                Ven: 0.5,
                Detalle: "superintendencia de Notariado",
                Total: VSuper_precio,
                Valor: null,
                IVA: null,
              };
              index = data.findIndex(
                (element) => element.Detalle === "superintendencia de Notariado"
              );
              if (index === -1) {
                data_recTer.push(data_sup);
              } else {
                data[index] = data_sup;
              } // data_recTer.push(data_sup);

              // se arma el json que se el va retornar al servidor con los datos actualizados
              liq_json = {
                id: null,
                id_items_liquidaciones: response.data.idfon,
                id_radicacion:
                  response.data.derechos_notariales[0].id_radicacion,
                precio_total: TotSup, //valor calculado
                cantidad: 1,
                iva: null,
                tipo_liquidacion: "recaudo_terceros",
                cantidad_comprador: 0.5,
                cantidad_vendedor: 0.5,
                id_actos: null,
              };
              index = sendData.findIndex(
                (element) => element.id_items_liquidaciones === 21
              );
              if (index === -1) {
                sendData.push(liq_json);
              } else {
                sendData[index] = liq_json;
              }
              // sendData.push(liq_json);
              //visualizar los datos en la vista
              let data_fon = {
                Tot: 1,
                Com: 0.5,
                Ven: 0.5,
                Detalle: "Fondo Nacional de Notariado",
                Total: VSuper_precio,
                Valor: null,
                IVA: null,
              };
              index = data.findIndex(
                (element) => element.Detalle === "Fondo Nacional de Notariado"
              );
              if (index === -1) {
                data_recTer.push(data_fon);
              } else {
                data[index] = data_fon;
              }
              // data_recTer.push(data_fon);

              //////////////////////////////////////////////////derechos registrales/////////////////////////////////////////////////////////////////////////
              //CALCULAR IMPUESTO DEPARTAMENTALES
              let boleta = element.acto.bolfis;
              let porcentaje_bolfis = element.acto.porcentaje_bolfis;
              let precio_total = calcularImpDepartamental(
                response.data.derechos_registrales[0],
                cuantia,
                boleta,
                porcentaje_bolfis
              );
              TotImpDepar += precio_total;
              let impdeparFormat = FormatearNum(TotImpDepar);
              // se arma el json que se el va retornar al servidor con los datos actualizados
              liq_json = {
                id: response.data.derechos_registrales[0].id,
                id_items_liquidaciones:
                  response.data.derechos_registrales[0].id_items_liquidaciones,
                id_radicacion: element.id_radicacion,
                precio_total: TotImpDepar, //valor calculado
                cantidad: 1,
                iva: null,
                tipo_liquidacion:
                  response.data.derechos_registrales[0].tipo_liquidacion,
                cantidad_comprador: 0.5,
                cantidad_vendedor: 0.5,
                id_actos: element.id_actos,
              };
              index = sendData.findIndex(
                (element) => element.id_items_liquidaciones === 40
              );
              if (index === -1) {
                sendData.push(liq_json);
              } else {
                sendData[index] = liq_json;
              }
              // sendData.push(liq_json);
              //visualizar datos en la vista
              let data_json = {
                Tot: 1,
                Com: 0.5,
                Ven: 0.5,
                Detalle: response.data.derechos_registrales[0].detalle,
                Total: impdeparFormat,
                Valor: impdeparFormat,
              };
              index = data_derReg.findIndex(
                (element) => element.Detalle === "Impuestos departamentales"
              );
              if (index === -1) {
                data_derReg.push(data_json);
              } else {
                data_derReg[index] = data_json;
              }
              // data_derReg.push(data_json);

              //CALCULAR IMPUESTO REGISTROS
              let registro = element.acto.registro;
              let porcentaje_registro = element.acto.porcentaje_registro;
              let Impreg = calcularImpRegistro(
                response.data.derechos_registrales[1],
                cuantia,
                registro,
                porcentaje_registro
              );
              TotimpReg += Impreg;
              let impregFormat = FormatearNum(TotimpReg);
              // se arma el json que se el va retornar al servidor con los datos actualizados
              liq_json = {
                id: response.data.derechos_registrales[1].id,
                id_items_liquidaciones:
                  response.data.derechos_registrales[1].id_items_liquidaciones,
                id_radicacion: element.id_radicacion,
                precio_total: TotimpReg, //valor calculado
                cantidad: 1,
                iva: null,
                tipo_liquidacion:
                  response.data.derechos_registrales[1].tipo_liquidacion,
                cantidad_comprador: 0.5,
                cantidad_vendedor: 0.5,
                id_actos: element.id_actos,
              };
              index = sendData.findIndex(
                (element) => element.id_items_liquidaciones === 41
              );
              if (index === -1) {
                sendData.push(liq_json);
              } else {
                sendData[index] = liq_json;
              }
              // sendData.push(liq_json);
              //visualizar datos en la vista
              let data_regis = {
                Tot: 1,
                Com: 0.5,
                Ven: 0.5,
                Detalle: response.data.derechos_registrales[1].detalle,
                Total: impregFormat,
                Valor: impregFormat,
              };
              index = data_derReg.findIndex(
                (element) => element.Detalle === "Impuesto de registro"
              );
              if (index === -1) {
                data_derReg.push(data_regis);
              } else {
                data_derReg[index] = data_regis;
              }
              // data_derReg.push(data_regis);
            }
            //guardar el total
            // TotDerNot += precio_liquidacion;
            let precio = FormatearNum(precio_liquidacion);
            let tot_derNotFormat = FormatearNum(tot_derNot);
            let iva_precio = FormatearNum(iva_derNot);
            // se arma el json que se el va retornar al servidor con los datos actualizados
            liq_json = {
              id: element.id,
              id_items_liquidaciones: element.id_items_liquidaciones,
              id_radicacion: element.id_radicacion,
              precio_total: precio_liquidacion, //valor calculado
              cantidad: 1,
              iva: iva_derNot,
              tipo_liquidacion: element.tipo_liquidacion,
              cantidad_comprador: 0.5,
              cantidad_vendedor: 0.5,
              id_actos: element.acto.id,
            };
            sendData.push(liq_json);

            //data para mostrar en la tabla
            data_json = {
              Tot: 1,
              Com: 0.5,
              Ven: 0.5,
              Detalle: element.detalle,
              Total: tot_derNotFormat,
              Valor: precio,
              IVA: iva_precio,
              tipo_liquidacion: element.tipo_liquidacion,
              id_items_liquidaciones: element.id_items_liquidaciones,
            };
            index = data.findIndex(
              (element) => element.tipo_liquidacion === "derecho_notarial"
            );
            data.splice(index, 0, data_json);
            // data.push(data_json);
            data = data.concat(data_recTer);
          }

          //liquidar servivicios adicionales
          else if (element.tipo_liquidacion == "servicio_adicional") {
            // se arma el json que se el va retornar al servidor con los datos actualizados
            let serAdi = FormatearNum(element.precio_total);
            let iva_add = element.precio_total * 0.19;
            let serAdiIva = FormatearNum(iva_add);
            let serAdiTot = FormatearNum(iva_add + element.precio_total);
            let liq_json = {
              id: element.id,
              id_items_liquidaciones: element.id_items_liquidaciones,
              id_radicacion: element.id_radicacion,
              precio_total: element.precio_total,
              cantidad: element.cantidad,
              iva: iva_add,
              tipo_liquidacion: element.tipo_liquidacion,
              cantidad_comprador: element.cantidad_comprador,
              cantidad_vendedor: element.cantidad_vendedor,
              id_actos: null,
            };
            sendData.push(liq_json);
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
              id_items_liquidaciones: element.id_items_liquidaciones,
              editable: element.editable,
            };
            //guardar total
            TotDerNot += element.precio_total;
            TotIva += iva_add;

            index = data.findIndex(
              (element) => element.Detalle === "Retefuente"
            );
            data.splice(index, 0, data_json);
          }

          //Recaudos a terceros traidos de la base de datos
          else if (element.tipo_liquidacion == "recaudo_terceros") {
            let VSuper = element.precio_total;
            TotOtros += VSuper * 2;
            let VSuper_precio = FormatearNum(VSuper);
            liq_json = {
              id: element.id,
              id_items_liquidaciones: element.id_items_liquidaciones,
              id_radicacion: element.id_radicacion,
              precio_total: element.precio_total, //valor calculado
              cantidad: element.cantidad,
              iva: element.iva,
              tipo_liquidacion: element.tipo_liquidacion,
              cantidad_comprador: element.cantidad_comprador,
              cantidad_vendedor: element.cantidad_vendedor,
              id_actos: null,
            };

            //data para mostrar en la tabla
            var data_recTer = {
              Tot: element.cantidad,
              Com: element.cantidad_comprador,
              Ven: element.cantidad_vendedor,
              Detalle: element.detalle,
              Total: VSuper_precio,
              Valor: element.valor_uni,
              IVA: element.iva,
              editable: element.editable,
              tipo_liquidacion: element.tipo,
              id_items_liquidaciones: element.id_items_liquidaciones,
            };
            sendData.push(liq_json);
            data.push(data_recTer);
          }
        });

        ////////////////////////////////////////////////////// ITERAR POR DERECHOS REGISTRALES ///////////////////////////////////////////////
        response.data.derechos_registrales.forEach((element) => {
          if (element.base0 === undefined) {
            let precio_total = element.precio_total;
            let impdeparFormat = FormatearNum(precio_total);
            // se arma el json que se el va retornar al servidor con los datos actualizados
            liq_json = {
              id: element.id,
              id_items_liquidaciones: element.id_items_liquidaciones,
              id_radicacion: element.id_radicacion,
              precio_total: precio_total, //valor calculado
              cantidad: element.cantidad,
              iva: element.iva,
              tipo_liquidacion: element.tipo_liquidacion,
              cantidad_comprador: element.cantidad_comprador,
              cantidad_vendedor: element.cantidad_vendedor,
              id_actos: element.id_actos,
            };
            sendData.push(liq_json);
            //visualizar datos en la vista
            let data_json = {
              Tot: element.cantidad,
              Com: element.cantidad_comprador,
              Ven: element.cantidad_vendedor,
              Detalle: element.detalle,
              Total: impdeparFormat,
              Valor: impdeparFormat,
              tipo_liquidacion: element.tipo_liquidacion,
              valor_uni: element.valor_unitario,
              id_items_liquidaciones: element.id_items_liquidaciones,
            };
            data_derReg.push(data_json);
          }
        });
        //actualizar datos para enviar al servidor
        setdataSend(sendData);
        //actualizar los datos de la tabla de derechos notariales con su liquidacion y servicion adicionales
        setTableNot(data);
        //actualizar los datos de la tabla para los derechos registrales
        setTableDer(data_derReg);
        let total_liq = TotDerNot + TotIva + TotOtros;
        setTotales({
          ...Totales,
          TotDer: TotDerNot,
          iva: TotIva,
          TotOtros: TotOtros,
          TotLiq: total_liq,
        });
        //
      })
      .catch((error) => {
        setLoading(false);
      })
  };

  const [checked, setChecked] = React.useState([24, 22]);
  const handleToggle = (value) => {
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
      <Spin spinning={loadingSend}>
        <CardHeader color="primary" text>
          <CardText className={classes.cardText} color="primary">
            <h4 className={classes.colorWhite}> Liquidar Escritura </h4>
          </CardText>
        </CardHeader>
        <CardBody>
          <form>
            <GridContainer direction="row" justify="flex-end">
              <GridItem
                style={{
                  marginRight: "100px",
                  backgroundColor: "#f2f2f2",
                  border: "1px solid black",
                }}
              >
                <FormLabel style={{ fontSize: "20px" }}>
                  Radicación Nro. {id ? id : ""}
                </FormLabel>
                {!id && (
                  <>
                    <CustomInput
                      id="Radicacion"
                      formControlProps={{}}
                      inputProps={{
                        type: "text",
                        value: numRad,
                        onChange: handleNumRad,
                      }}
                      helpText="A block of help text that breaks onto a new line."
                      onPressEnter={liquidacion}
                    />
                    {/* </GridItem>
                              <GridItem> */}
                    <Button
                      justIcon
                      color="rose"
                      className={classes.marginRight}
                      onClick={liquidacion}
                    >
                      <span className="material-icons">search</span>
                    </Button>
                  </>
                )}
              </GridItem>
            </GridContainer>
          </form>
          <GridContainer>
            <GridItem xs={8}>
              <div className={classes.cardHeader}>
                <h3 className={classes.cardTitle}>
                  Derechos notariales y recaudo
                </h3>
              </div>
              <>
                <Tables
                  columns={columnsNot}
                  dataSource={tableNot}
                  set={setTableNot}
                  dataSend={dataSend}
                  setSend={setdataSend}
                  loading={loading}
                />
              </>
            </GridItem>
            <GridItem xs={4} direction="row" style={{ marginTop: "30px" }}>
              <div>
                <Add_servicio
                  data={tableNot}
                  set={setTableNot}
                  dataSend={dataSend}
                  setSend={setdataSend}
                />
                <table style={{ width: 250, height: 150, textAlign: "right" }}>
                  <tr>
                    <td>Total Derechos</td>
                    <td id="TotDer" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                  </tr>
                  <tr>
                    <td text-align="right">Total IVA</td>
                    <td id="TotIva" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                  </tr>
                  <tr>
                    <td text-align="right">Otros</td>
                    <td id="TotOtr" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                  </tr>
                  <tr>
                    <td text-align="right">
                      <b>Total Liquidación</b>
                    </td>
                    <td id="TotLiq" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                  </tr>
                </table>
              </div>
            </GridItem>
          </GridContainer>
          <GridContainer style={{ padding: 20 }}>
            <GridItem xs={8}>
              <div className={classes.cardHeader}>
                <h3 className={classes.cardTitle}>Derechos registrales</h3>
              </div>
              <>
                <TablesRegistrales
                  columns={columnsDer}
                  dataSource={tableDer}
                  set={setTableDer}
                  dataSend={dataSend}
                  setSend={setdataSend}
                  loading={loading}
                />
              </>
            </GridItem>
            <GridItem xs={4} direction="row" style={{ marginTop: "30px" }}>
              <div>
                {/* <Button   
                                    justIcon
                                    color="primary"
                                    className={classesButton.marginRight}>
                                    <span class="material-icons">
                                        library_add
                                    </span>
                                </Button> */}
                <Add_registro
                  data={tableDer}
                  set={setTableDer}
                  dataSend={dataSend}
                  setSend={setdataSend}
                />
                <table style={{ width: 320, height: 200, textAlign: "right" }}>
                  <tr>
                    <td></td>
                    <td>Vendedor</td>
                    <td>Comprador</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total Notaria</b>
                    </td>
                    <td id="TotNotVen" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                    <td id="TotNotCom" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                  </tr>
                  <tr>
                    <td text-align="right">Total imp. dptal</td>
                    <td id="TotImpVen" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                    <td id="TotImpCom" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                  </tr>
                  <tr>
                    <td text-align="right">Total registro</td>
                    <td id="TotRegVen" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                    <td id="TotRegCom" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                  </tr>
                  <tr>
                    <td text-align="right">
                      <b>Total registrales</b>
                    </td>
                    <td id="TotRegisVen" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                    <td id="TotRegisCom" style={{ background: "#e6e6e6" }}>
                      $ 0
                    </td>
                  </tr>
                  <tr>
                    <td text-align="right">
                      <b>Totales CV</b>
                    </td>
                    <td id="TotCVVen">$ 0</td>
                    <td id="TotCVCom">$ 0</td>
                  </tr>
                  <tr>
                    <td text-align="right">
                      <b>Gran total</b>
                    </td>
                    <td id="GranTot">$ 0</td>
                    {/* <th style={{columnSpan:"2"}} style={{background:'#e6e6e6'}}>$ 0</th> */}
                  </tr>
                </table>
              </div>
            </GridItem>
          </GridContainer>
          <GridContainer justify="flex-end" style={{ padding: 20 }}>
            <div className={classes.cardContentLeft}>
              {loadingPrint === false ? (
                <Button color="rose" onClick={imprimir}>
                  IMPRIMIR
                </Button>
              ) : (
                <Button disabled>
                  <div>
                    <center>
                      <ReactLoading
                        type={"bubbles"}
                        color={"#2d358c"}
                        height={"20%"}
                        width={"20%"}
                      />
                    </center>
                  </div>
                </Button>
              )}

              <Button color="rose" className={classes.marginRight}>
                ENVIAR CORREO
              </Button>

              <Button
                color="rose"
                className={classes.marginRight}
                onClick={enviarData}
              >
                FINALIZAR
              </Button>

              {state === "facturacion" && (
                <Button
                  color="rose"
                  className={classes.marginRight}
                  onClick={nextStep}
                >
                  FACTURAR
                </Button>
              )}
            </div>
          </GridContainer>

          {prev === true ? (
            <GridContainer justify="flex-end">
              <div id="print" className={classes.cardContentLeft}>
                <PDF dataFromParent={data} ref={componentRef} />
              </div>
              {/* {hidePrint()} */}
            </GridContainer>
          ) : (
            <div></div>
          )}
        </CardBody>
      </Spin>
    </Card>
  );
}
