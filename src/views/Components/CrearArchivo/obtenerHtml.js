/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import ComponenteHtml from '../ComponentsHtml/componenteHtml'
import TipoTextoHtml from '../ComponentsHtml/tipoTextoHtml'
import CambiarVocabulario from '../Digitacion/CambiarVocabulario'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Slide from "@material-ui/core/Slide";

// @material-ui/icons
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import useStyles from "../../../assets/jss/material-dashboard-pro-react/views/common";
import { textSpanOverlapsWith } from "typescript";


const useStyles2 = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: '#FFFFFF',
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: '#FFFFFF',
        position: 'absolute',
    },
    progress: {
        marginTop: '10px',
    },
}));

export default function ObtenerHtml(props) {

    const auth = useSelector((state) => state.auth);
    const [cantidad, setCantidad] = React.useState('');
    const [genero, setGenero] = React.useState('');
    const [seleccion, setSeleccion] = React.useState(parseInt(props.history.location.state.idDocu));
    const [datos, setDatos] = React.useState([]);
    let [datoshtml, setDatoshtml] = useState([]);
    let [varJson, setVarJson] = useState([]);
    let [archivoJson, setArchivoJson] = useState([]);
    const classes = useStyles();
    const classes2 = useStyles2();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    useEffect(() => {
        let data = datos.map((linea, index) => {
            let html = [];
            let foundit = ["inicio"];
            let activateY = false;
            let parrafoRepetido = "";
            linea.hijos.forEach((item, index) => {
                let foundY = item.texto.match(/(Y{3})\w*:\w*(Y{3})/gm);
                parrafoHtml = item.texto
                console.log(item.texto);
                console.log(foundY);
                let endFoundY = item.texto.match(/(Y{3})\\\w*:\w*(Y{3})/gm);
                console.log(endFoundY);
                if (foundY) {
                    activateY = true;
                }
                let parrafoHtml = [];
                console.log(activateY);
                let XXXenY = ""
                let textXXXSegunda = "";
                let textXXXPrimera = "";
                if (activateY) {
                    let inicio = 0;
                    //Si hay varios YYY-YYY en un mismo parrafo
                    if (foundY.length >= 1) {
                        foundY.map((name, ind) => {

                            // Reemplazar campos XXX en el texto antes de realizar las divisiones
                            let foundX = item.texto.match(/(X{3})\w*:\w*(X{3})/gm)
                            console.log("item.texto")
                            console.log(item.texto)
                            if (Array.isArray(foundX)) {
                                console.log("XXX en texto")
                                if (foundX.length === 1) {
                                    foundX.map((element, index) => {
                                        console.log(element)
                                        let cantidadX;
                                        let generoX = "Masculino";
                                        let numeroH = 0;
                                        let numeroM = 0;
                                        archivoJson.map((item, ind) => {
                                            if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                archivoJson[ind].valor.map((subitem, subind) => {
                                                    if (subitem.tipo === 'inviciblesologenero') {
                                                        if (subitem.valor === 'Masculino') {
                                                            numeroH = numeroH + 1;
                                                        } else if (subitem.valor === 'Femenino') {
                                                            numeroM = numeroM + 1;
                                                        }
                                                    }
                                                })
                                                if (numeroH > numeroM) {
                                                    generoX = "Masculino"
                                                } else if (numeroM > 0) {
                                                    generoX = "Femenino"
                                                }
                                                cantidadX = item.cantidad;
                                            }
                                        });
                                        XXXenY = CambiarVocabulario({ found: element, texto: item.texto, genero: generoX, cantidad: cantidadX })
                                        console.log(XXXenY)
                                    })
                                } else if (foundX.length > 1) {
                                    let parrafo = item.texto;
                                    console.log("item.texto en XXX s")
                                    console.log(item.texto)
                                    let tempParrafo = '';
                                    foundX.map((element, index) => {
                                        let cantidadX;
                                        let generoX = "Masculino";
                                        let numeroH = 0;
                                        let numeroM = 0;
                                        archivoJson.map((item, ind) => {
                                            if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                archivoJson[ind].valor.map((subitem, subind) => {
                                                    if (subitem.tipo === 'inviciblesologenero') {
                                                        if (subitem.valor === 'Masculino') {
                                                            numeroH = numeroH + 1;
                                                        } else if (subitem.valor === 'Femenino') {
                                                            numeroM = numeroM + 1;
                                                        }
                                                    }
                                                })
                                                if (numeroH > numeroM) {
                                                    generoX = "Masculino"
                                                } else if (numeroM > 0) {
                                                    generoX = "Femenino"
                                                }
                                                cantidadX = item.cantidad;
                                            }
                                        });
                                        tempParrafo = CambiarVocabulario({ found: element, texto: parrafo, genero: generoX, cantidad: cantidadX })
                                        parrafo = tempParrafo;
                                    })
                                    XXXenY = parrafo;
                                    console.log(XXXenY)
                                }
                            }


                            // Separar frases para sacar YYY
                            console.log("XXXenY")
                            console.log(XXXenY)
                            let value = XXXenY != "" ? XXXenY : item.texto;
                            console.log("value")
                            console.log(value)
                            let primeraFrase = value.substring(inicio, value.indexOf(name)); // for finding the first part
                            let indexNuevo = value.indexOf(name) + name.length; //for the last part
                            let segundaFrase = value.substring(indexNuevo, value.indexOf(endFoundY[ind]));
                            let nuevoInicio = value.indexOf(endFoundY[ind]) + endFoundY[ind].length; //for the last part
                            console.log(primeraFrase)
                            console.log(segundaFrase)
                            inicio = nuevoInicio
                            console.log("foundY")
                            console.log(name)

                            // Proceso para reescribir campos XXX--XXX en segunda frase
                            console.log(item.texto)
                            let foundXSegunda = segundaFrase.match(/(X{3})\w*(X{3})/gm)
                            if (Array.isArray(foundXSegunda)) {
                                console.log("SegundaFraseXXX")
                                if (foundXSegunda.length === 1) {
                                    foundXSegunda.map((element, index) => {
                                        console.log(element)
                                        let cantidadX;
                                        let generoX = "";
                                        let numeroH = 0;
                                        let numeroM = 0;
                                        archivoJson.map((item, ind) => {
                                            if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                archivoJson[ind].valor.map((subitem, subind) => {
                                                    if (subitem.tipo === 'inviciblesologenero') {
                                                        if (subitem.valor === 'Masculino') {
                                                            numeroH = numeroH + 1;
                                                        } else if (subitem.valor === 'Femenino') {
                                                            numeroM = numeroM + 1;
                                                        }
                                                    }
                                                })
                                                if (numeroH > numeroM) {
                                                    generoX = "Masculino"
                                                } else if (numeroM > 0) {
                                                    generoX = "Femenino"
                                                }
                                                cantidadX = item.cantidad;
                                            }
                                        });
                                        textXXXSegunda = CambiarVocabulario({ found: element, texto: item.texto, genero: generoX, cantidad: cantidadX })
                                        console.log(textXXXSegunda)
                                    })
                                } else if (foundXSegunda.length > 1) {
                                    let parrafo = item.texto;
                                    let tempParrafo = '';
                                    foundXSegunda.map((element, index) => {
                                        console.log(element)
                                        let cantidadX;
                                        let generoX = "";
                                        let numeroH = 0;
                                        let numeroM = 0;
                                        archivoJson.map((item, ind) => {
                                            if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                archivoJson[ind].valor.map((subitem, subind) => {
                                                    if (subitem.tipo === 'inviciblesologenero') {
                                                        if (subitem.valor === 'Masculino') {
                                                            numeroH = numeroH + 1;
                                                        } else if (subitem.valor === 'Femenino') {
                                                            numeroM = numeroM + 1;
                                                        }
                                                    }
                                                })
                                                if (numeroH > numeroM) {
                                                    generoX = "Masculino"
                                                } else if (numeroM > 0) {
                                                    generoX = "Femenino"
                                                }
                                                cantidadX = item.cantidad;
                                            }
                                        });
                                        tempParrafo = CambiarVocabulario({ found: element, texto: parrafo, genero: generoX, cantidad: cantidadX })
                                        console.log(textXXXSegunda)
                                        parrafo = tempParrafo;
                                    })
                                    textXXXSegunda = parrafo;
                                }
                            }

                            // Proceso para reescribir campos XXX--XXX en primera frase
                            let foundXPrimera = primeraFrase.match(/(X{3})\w*(X{3})/gm)
                            if (Array.isArray(foundXPrimera)) {
                                console.log("PrimeraFraseXXX")
                                if (foundXPrimera.length === 1) {
                                    foundXPrimera.map((element, index) => {
                                        console.log(element)
                                        let cantidadX;
                                        let generoX = "";
                                        let numeroH = 0;
                                        let numeroM = 0;
                                        archivoJson.map((item, ind) => {
                                            if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                archivoJson[ind].valor.map((subitem, subind) => {
                                                    if (subitem.tipo === 'inviciblesologenero') {
                                                        if (subitem.valor === 'Masculino') {
                                                            numeroH = numeroH + 1;
                                                        } else if (subitem.valor === 'Femenino') {
                                                            numeroM = numeroM + 1;
                                                        }
                                                    }
                                                })
                                                if (numeroH > numeroM) {
                                                    generoX = "Masculino"
                                                } else if (numeroM > 0) {
                                                    generoX = "Femenino"
                                                }
                                                cantidadX = item.cantidad;
                                            }
                                        });
                                        textXXXPrimera = CambiarVocabulario({ found: element, texto: item.texto, genero: generoX, cantidad: cantidadX })
                                        console.log(textXXXPrimera)
                                    })
                                } else if (foundXPrimera.length > 1) {
                                    let parrafo = item.texto;
                                    let tempParrafo = '';
                                    foundXPrimera.map((element, index) => {
                                        console.log(element)
                                        let cantidadX;
                                        let generoX = "";
                                        let numeroH = 0;
                                        let numeroM = 0;
                                        archivoJson.map((item, ind) => {
                                            if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                archivoJson[ind].valor.map((subitem, subind) => {
                                                    if (subitem.tipo === 'inviciblesologenero') {
                                                        if (subitem.valor === 'Masculino') {
                                                            numeroH = numeroH + 1;
                                                        } else if (subitem.valor === 'Femenino') {
                                                            numeroM = numeroM + 1;
                                                        }
                                                    }
                                                })
                                                console.log("genero")
                                                console.log(numeroH)
                                                console.log(numeroM)
                                                if (numeroH > numeroM) {
                                                    generoX = "Masculino"
                                                } else if (numeroM > 0) {
                                                    if (numeroH === 0) {
                                                        generoX = "Femenino"
                                                    }
                                                }
                                                cantidadX = item.cantidad;
                                            }
                                        });
                                        tempParrafo = CambiarVocabulario({ found: element, texto: parrafo, genero: generoX, cantidad: cantidadX })
                                        console.log(textXXXPrimera)
                                        parrafo = tempParrafo;
                                    })
                                    textXXXPrimera = parrafo;
                                }
                            }


                            console.log("archivoJson");
                            console.log(archivoJson);

                            // Reemplazar ZZZ - XXX dentro de un YYY
                            console.log("entra Si encontro ZZZ en YYY")

                            let found = segundaFrase.match(/(Z{3})\w*:\w*:\w*(Z{3})/gm)
                            if (Array.isArray(found)) {
                                if (textXXXSegunda != '') {
                                    if (found.length === 1) {
                                        console.log("FoundLength = 1")
                                        found.map((element, index) => {
                                            let contador = [];
                                            let repetido = false;
                                            let posicionArrayCampos = 0;
                                            if (item.texto != '') {
                                                //Encontrar de que Array son los subcampos
                                                archivoJson.map((item, ind) => {
                                                    if (name.slice(3, -3).split(':')[0] === item.nombre) {
                                                        posicionArrayCampos = ind;
                                                    }
                                                });

                                                //Cuando solo venga un campo en un parrafo                                
                                                //verificar que no se repite un campo mas de dos veces
                                                foundit.map((campo) => {
                                                    if (element.slice(3, -3).split(':')[1] === campo) {
                                                        repetido = true;
                                                    }
                                                });

                                                //encontrar posición del valor
                                                if (!repetido) {
                                                    foundit.push(element.slice(3, -3).split(':')[1])
                                                    archivoJson[posicionArrayCampos].valor.map((item, ind) => {
                                                        if (element.slice(3, -3).split(':')[1] === item.nombre.split('_')[0]) {
                                                            contador.push(ind);
                                                        }
                                                    });

                                                    //VAMOS ACA, SE ENVIA EL JSON {TIPO: NOMBRE: VALOR} -> DEL CAMPO ENCONTRADO EN LA SUBARRAY DENTRO DE LA ARRAY GENERAL 
                                                    html.push(<ComponenteHtml
                                                        key={index}
                                                        negrilla={item.negrilla}
                                                        letra={item.letra}
                                                        italica={item.italica}
                                                        size={item.size}
                                                        texto={TipoTextoHtml({ found: element, texto: textXXXSegunda, json: archivoJson[ind].valor[contador[0]] })[0]}
                                                    />);
                                                }
                                            }
                                        });
                                    } else if (found.length > 1) {
                                        console.log("FoundLength > 1")
                                        let parrafo = textXXXSegunda;
                                        let tempParrafo = [];
                                        let repetido;
                                        let posicionArrayCampos = 0;
                                        found.map((element, index) => {
                                            let contador = [];
                                            repetido = false;
                                            if (parrafo != '') {
                                                archivoJson.map((item, ind) => {
                                                    if (name.slice(3, -3).split(':')[0] === item.nombre) {
                                                        posicionArrayCampos = ind;
                                                    }
                                                });
                                                //Cuando solo venga un campo en un parrafo
                                                //verificar que no se repite un campo mas de dos veces
                                                foundit.map((campo) => {
                                                    if (element.slice(3, -3).split(':')[1] === campo) {
                                                        repetido = true;
                                                    }
                                                });
                                                //encontrar posición del valor
                                                if (!repetido) {
                                                    foundit.push(element.slice(3, -3).split(':')[1])
                                                    archivoJson[posicionArrayCampos].valor.map((item, ind) => {
                                                        if (element.slice(3, -3).split(':')[1] === item.nombre.split('_')[0]) {
                                                            contador.push(ind);
                                                        }
                                                    });
                                                    tempParrafo = TipoTextoHtml({ found: element, texto: parrafo, json: archivoJson[ind].valor[contador[0]] });
                                                    parrafo = tempParrafo[1];
                                                }
                                            }
                                        });
                                        if (!repetido) {
                                            html.push(<ComponenteHtml
                                                key={index}
                                                negrilla={item.negrilla}
                                                letra={item.letra}
                                                italica={item.italica}
                                                size={12}
                                                texto={tempParrafo[0]}
                                            />);
                                        }
                                    }
                                } else {
                                    //Código para HTML si no se encuentra XXX
                                    if (found.length === 1) {
                                        console.log("FoundLength = 1")
                                        found.map((element, index) => {
                                            let contador = [];
                                            let repetido = false;
                                            let posicionArrayCampos = 0;
                                            if (item.texto != '') {
                                                archivoJson.map((item, ind) => {
                                                    if (name.slice(3, -3).split(':')[0] === item.nombre) {
                                                        posicionArrayCampos = ind;
                                                    }
                                                });
                                                console.log("indexPosición :" + posicionArrayCampos)
                                                //Cuando solo venga un campo en un parrafo                                
                                                //verificar que no se repite un campo mas de dos veces
                                                foundit.map((campo) => {
                                                    if (element.slice(3, -3).split(':')[1] === campo) {
                                                        repetido = true;
                                                    }
                                                });
                                                //encontrar posición del valor
                                                if (!repetido) {
                                                    foundit.push(element.slice(3, -3).split(':')[1])
                                                    let nombreDelCampo = element.slice(3, -3).split(':')[1];
                                                    let subNombreDelCampo = element.slice(3, -3).split(':')[1];
                                                    let subContador = 1;
                                                    let cadenaArray = '';
                                                    archivoJson[posicionArrayCampos].valor.map((campos, ind) => {
                                                        console.log(segundaFrase.replace(/ /g, ''))
                                                        console.log(campos.nombre)
                                                        console.log(nombreDelCampo)
                                                        if (subNombreDelCampo === campos.nombre) {
                                                            cadenaArray = cadenaArray + TipoTextoHtml({ found: element, texto: segundaFrase.replace(/ /g, ''), json: archivoJson[posicionArrayCampos].valor[ind] })[1] + ', '
                                                            contador.push(ind);
                                                            console.log(cadenaArray)
                                                            subNombreDelCampo = nombreDelCampo + "_" + subContador;
                                                            subContador = subContador + 1;
                                                            //console.log(nombreDelCampo)
                                                        }

                                                    });
                                                    console.log("parrafoHtml entra")
                                                    console.log(segundaFrase)
                                                    let textoSinY = TipoTextoHtml({ found: segundaFrase, texto: parrafoHtml[1] ? parrafoHtml[1] : value, json: { tipo: "text", nombre: "", orden: "1", valor: cadenaArray } })
                                                    parrafoHtml = textoSinY
                                                    console.log("parrafoHtml")
                                                    console.log(parrafoHtml);

                                                }
                                            }
                                        });
                                    } else if (found.length > 1) {
                                        console.log("FoundLength > 1")
                                        let parrafo = value;
                                        let parrafoYYY = '';
                                        let tempParrafo = [];
                                        let repetido = false;
                                        let posicionArrayCampos = 0;

                                        if (parrafo != '') {
                                            //Averiguar el json de YYY
                                            archivoJson.map((item, ind) => {
                                                if (name.slice(3, -3).split(':')[0] === item.nombre) {
                                                    posicionArrayCampos = ind;
                                                }
                                            });
                                            //verificar que no se repite un campo mas de dos veces                                            
                                            if (!repetido) {
                                                let subCadenaArray = segundaFrase;
                                                let contadorFinal = 0;
                                                let subContador = 0;
                                                let cadenaArray = '';
                                                archivoJson[posicionArrayCampos].valor.map((campos, ind) => {
                                                    foundit.push(campos.nombre)
                                                    let nombreDelCampo = campos.nombre;
                                                    let subNombreDelCampo = campos.nombre;
                                                    found.map((campoBase, index) => {
                                                        //verificar que no se repite un campo mas de dos veces
                                                        foundit.map((campo) => {
                                                            if (campoBase.slice(3, -3).split(':')[1] === campo) {
                                                                repetido = true;
                                                            }
                                                        });
                                                        //
                                                        if (subContador === 0) {
                                                            if (subNombreDelCampo === campoBase.slice(3, -3).split(':')[1]) {
                                                                contadorFinal = contadorFinal + 1;
                                                                subCadenaArray = TipoTextoHtml({ found: campoBase, texto: subCadenaArray, json: archivoJson[posicionArrayCampos].valor[ind] })[1]
                                                                console.log("subCadenaArray = 0")
                                                                console.log(subCadenaArray)
                                                            }
                                                        } else {
                                                            let nombreNuevo = campoBase.slice(3, -3).split(':')[1] + "_" + subContador;
                                                            console.log("nombres >1")
                                                            console.log(nombreNuevo)
                                                            console.log(subNombreDelCampo)
                                                            if (subNombreDelCampo === nombreNuevo) {
                                                                contadorFinal = contadorFinal + 1;
                                                                subCadenaArray = TipoTextoHtml({ found: campoBase, texto: subCadenaArray, json: archivoJson[posicionArrayCampos].valor[ind] })[1]
                                                                console.log("subCadenaArray != 0")
                                                                console.log(subCadenaArray)
                                                            }
                                                        }
                                                        console.log("ContadorFinal === found.length")
                                                        console.log(contadorFinal)
                                                        console.log(found.length)
                                                        if (contadorFinal === found.length) {
                                                            cadenaArray = cadenaArray + subCadenaArray
                                                            console.log("cadenaArray > 1")
                                                            console.log(cadenaArray)
                                                            contadorFinal = 0;
                                                            subContador = subContador + 1;
                                                            subCadenaArray = segundaFrase
                                                        }

                                                    });
                                                    parrafoYYY = cadenaArray
                                                });
                                                console.log("ITEMS")
                                                console.log(parrafo.replace(segundaFrase, parrafoYYY))
                                                console.log(segundaFrase)
                                                console.log(parrafoYYY)
                                                console.log(parrafoHtml[1])
                                                parrafo = TipoTextoHtml({ found: segundaFrase, texto: parrafoHtml[1] ? parrafoHtml[1] : value, json: { tipo: "text", nombre: "", orden: "1", valor: parrafoYYY } });
                                                parrafoHtml = parrafo
                                                console.log(parrafo)
                                            }
                                        }
                                        if (!repetido) {
                                            html.push(<ComponenteHtml
                                                key={index}
                                                negrilla={item.negrilla}
                                                letra={item.letra}
                                                italica={item.italica}
                                                size={12}
                                                texto={tempParrafo[0]}
                                            />);
                                        }
                                    }
                                }

                            } else {

                                if (textXXXSegunda != '') {
                                    if (parrafoRepetido != textXXXSegunda && parrafoRepetido != item.texto) {
                                        html.push(<ComponenteHtml
                                            key={index}
                                            negrilla={item.negrilla}
                                            letra={item.letra}
                                            italica={item.italica}
                                            size={item.size}
                                            texto={textXXXSegunda + " "}
                                        />
                                        )
                                    }
                                    parrafoRepetido = item.texto
                                } else {
                                    console.log("No es igual" + textXXXSegunda)
                                    if (parrafoRepetido != item.texto) {
                                        html.push(<ComponenteHtml
                                            key={index}
                                            negrilla={item.negrilla}
                                            letra={item.letra}
                                            italica={item.italica}
                                            size={item.size}
                                            texto={item.texto + " "}
                                        />
                                        )
                                    }
                                    parrafoRepetido = item.texto
                                }
                            }

                            if (primeraFrase) {
                                let found = primeraFrase.match(/(Z{3})\w*:\w*:\w*(Z{3})/gm)
                                console.log("found primeraFrase")
                                console.log(found)

                                if (Array.isArray(found)) {
                                    if (textXXXPrimera != '') {
                                        if (found.length === 1) {
                                            found.map((element, index) => {
                                                let contador = [];
                                                let repetido = false;
                                                if (item.texto != '') {
                                                    //Cuando solo venga un campo en un parrafo                                
                                                    //verificar que no se repite un campo mas de dos veces
                                                    foundit.map((campo) => {
                                                        if (element.slice(3, -3).split(':')[1] === campo) {
                                                            repetido = true;
                                                        }
                                                    });
                                                    //encontrar posición del valor
                                                    if (!repetido) {
                                                        foundit.push(element.slice(3, -3).split(':')[1])
                                                        archivoJson.map((item, ind) => {
                                                            if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                                contador.push(ind);
                                                            }
                                                        });
                                                        html.push(<ComponenteHtml
                                                            key={index}
                                                            negrilla={item.negrilla}
                                                            letra={item.letra}
                                                            italica={item.italica}
                                                            size={item.size}
                                                            texto={TipoTextoHtml({ found: element, texto: textXXXPrimera, json: archivoJson[contador[0]] })[0]}
                                                        />);
                                                    }
                                                }
                                            });
                                        } else if (found.length > 1) {
                                            let parrafo = textXXXPrimera;
                                            let tempParrafo = [];
                                            let repetido;
                                            found.map((element, index) => {
                                                let contador = [];
                                                repetido = false;
                                                if (parrafo != '') {
                                                    //Cuando solo venga un campo en un parrafo
                                                    //verificar que no se repite un campo mas de dos veces
                                                    foundit.map((campo) => {
                                                        if (element.slice(3, -3).split(':')[1] === campo) {
                                                            repetido = true;
                                                        }
                                                    });
                                                    //encontrar posición del valor
                                                    if (!repetido) {
                                                        foundit.push(element.slice(3, -3).split(':')[1])
                                                        archivoJson.map((item, ind) => {
                                                            if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                                contador.push(ind);
                                                            }
                                                        });
                                                        tempParrafo = TipoTextoHtml({ found: element, texto: parrafo, json: archivoJson[contador[0]] });
                                                        parrafo = tempParrafo[1];
                                                    }
                                                }
                                            });
                                            if (!repetido) {
                                                html.push(<ComponenteHtml
                                                    key={index}
                                                    negrilla={item.negrilla}
                                                    letra={item.letra}
                                                    italica={item.italica}
                                                    size={12}
                                                    texto={tempParrafo[0]}
                                                />);
                                            }
                                        }
                                    } else {
                                        //Campos ZZZ sin haber XXX
                                        if (found.length === 1) {
                                            found.map((element, index) => {
                                                let contador = [];
                                                let repetido = false;
                                                if (item.texto != '') {
                                                    //Cuando solo venga un campo en un parrafo                                
                                                    //console.log(item.texto)
                                                    //verificar que no se repite un campo mas de dos veces
                                                    foundit.map((campo) => {
                                                        if (element.slice(3, -3).split(':')[1] === campo) {
                                                            repetido = true;
                                                        }
                                                    });
                                                    //encontrar posición del valor
                                                    if (!repetido) {
                                                        foundit.push(element.slice(3, -3).split(':')[1])
                                                        archivoJson.map((item, ind) => {
                                                            if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                                contador.push(ind);
                                                            }

                                                        });
                                                        let tempParra = TipoTextoHtml({ found: element, texto: parrafoHtml[1] ? parrafoHtml[1] : value, json: archivoJson[contador[0]] })
                                                        parrafoHtml = tempParra
                                                        console.log("parrafoHtml")
                                                        console.log(parrafoHtml);
                                                    }
                                                }
                                            });
                                        } else if (found.length > 1) {
                                            let parrafo = value;
                                            let tempParrafo = [];
                                            let repetido;
                                            found.map((element, index) => {
                                                let contador = [];
                                                repetido = false;
                                                if (parrafo != '') {
                                                    //Cuando solo venga un campo en un parrafo
                                                    //verificar que no se repite un campo mas de dos veces
                                                    foundit.map((campo) => {
                                                        if (element.slice(3, -3).split(':')[1] === campo) {
                                                            repetido = true;
                                                        }
                                                    });
                                                    //encontrar posición del valor
                                                    if (!repetido) {
                                                        foundit.push(element.slice(3, -3).split(':')[1])
                                                        archivoJson.map((item, ind) => {
                                                            if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                                contador.push(ind);
                                                            }
                                                        });
                                                        tempParrafo = TipoTextoHtml({ found: element, texto: parrafo, json: archivoJson[contador[0]] });
                                                        parrafo = tempParrafo[1];
                                                    }
                                                }
                                            });
                                            if (!repetido) {
                                                html.push(<ComponenteHtml
                                                    key={index}
                                                    negrilla={item.negrilla}
                                                    letra={item.letra}
                                                    italica={item.italica}
                                                    size={12}
                                                    texto={tempParrafo[0]}
                                                />);
                                            }
                                        }
                                    }

                                }
                            }
                        })
                        //Saltar a otro parrafo, despues de analizar el presente
                        if (endFoundY) {
                            let parteTexto = parrafoHtml[1]
                            foundY.map((element, ind) => {
                                parteTexto = parteTexto.replace(element.toString(), '')
                                console.log(parteTexto)
                                console.log(element)
                            })
                            endFoundY.map((element, ind) => {
                                parteTexto = parteTexto.replace(element, '')
                            })
                            html.push(<ComponenteHtml
                                key={index}
                                negrilla={item.negrilla}
                                letra={item.letra}
                                italica={item.italica}
                                size={12}
                                texto={<span style={{ background: 'yellow' }}>{" " + parteTexto} </span>}
                            />);
                            activateY = false;
                        }
                    }
                } else {
                    console.log("entra Si no encontro YYY")
                    let foundX = item.texto.match(/(X{3})\w*:\w*(X{3})/gm)
                    console.log("item.texto")
                    console.log(item.texto)
                    if (Array.isArray(foundX)) {
                        console.log("XXX en texto")
                        if (foundX.length === 1) {
                            foundX.map((element, index) => {
                                console.log(element)
                                let cantidadX;
                                let generoX = "Masculino";
                                let numeroH = 0;
                                let numeroM = 0;
                                archivoJson.map((item, ind) => {
                                    if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                        archivoJson[ind].valor.map((subitem, subind) => {
                                            if (subitem.tipo === 'inviciblesologenero') {
                                                if (subitem.valor === 'Masculino') {
                                                    numeroH = numeroH + 1;
                                                } else if (subitem.valor === 'Femenino') {
                                                    numeroM = numeroM + 1;
                                                }
                                            }
                                        })
                                        if (numeroH > numeroM) {
                                            generoX = "Masculino"
                                        } else if (numeroM > 0) {
                                            generoX = "Femenino"
                                        }
                                        cantidadX = item.cantidad;
                                    }
                                });
                                XXXenY = CambiarVocabulario({ found: element, texto: item.texto, genero: generoX, cantidad: cantidadX })
                                console.log(XXXenY)
                            })
                        } else if (foundX.length > 1) {
                            let parrafo = item.texto;
                            console.log("item.texto en XXX s")
                            console.log(item.texto)
                            let tempParrafo = '';
                            foundX.map((element, index) => {
                                let cantidadX;
                                let generoX = "Masculino";
                                let numeroH = 0;
                                let numeroM = 0;
                                archivoJson.map((item, ind) => {
                                    if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                        archivoJson[ind].valor.map((subitem, subind) => {
                                            if (subitem.tipo === 'inviciblesologenero') {
                                                if (subitem.valor === 'Masculino') {
                                                    numeroH = numeroH + 1;
                                                } else if (subitem.valor === 'Femenino') {
                                                    numeroM = numeroM + 1;
                                                }
                                            }
                                        })
                                        if (numeroH > numeroM) {
                                            generoX = "Masculino"
                                        } else if (numeroM > 0) {
                                            generoX = "Femenino"
                                        }
                                        cantidadX = item.cantidad;
                                    }
                                });
                                tempParrafo = CambiarVocabulario({ found: element, texto: parrafo, genero: generoX, cantidad: cantidadX })
                                parrafo = tempParrafo;
                            })
                            XXXenY = parrafo;
                            console.log(XXXenY)
                        }
                    }

                    //Hallar XXX, ZZZ en parrafos donde no se encuentres YYY

                    let texto = XXXenY != "" ? XXXenY : item.texto
                    let found = texto.match(/(Z{3})\w*:\w*:\w*(Z{3})/gm)
                    if (Array.isArray(found)) {
                        if (XXXenY != '') {
                            if (found.length === 1) {
                                found.map((element, index) => {
                                    let contador = [];
                                    let repetido = false;
                                    if (item.texto != '') {
                                        //Cuando solo venga un campo en un parrafo                                
                                        //verificar que no se repite un campo mas de dos veces
                                        foundit.map((campo) => {
                                            if (element.slice(3, -3).split(':')[1] === campo) {
                                                repetido = true;
                                            }
                                        });
                                        //encontrar posición del valor
                                        if (!repetido) {
                                            foundit.push(element.slice(3, -3).split(':')[1])
                                            archivoJson.map((item, ind) => {
                                                if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                    contador.push(ind);
                                                }
                                            });
                                            html.push(<ComponenteHtml
                                                key={index}
                                                negrilla={item.negrilla}
                                                letra={item.letra}
                                                italica={item.italica}
                                                size={item.size}
                                                texto={TipoTextoHtml({ found: element, texto: texto, json: archivoJson[contador[0]] })[0]}
                                            />);
                                        }
                                    }
                                });
                            } else if (found.length > 1) {
                                let parrafo = texto;
                                let tempParrafo = [];
                                let repetido;
                                found.map((element, index) => {
                                    let contador = [];
                                    repetido = false;
                                    if (parrafo != '') {
                                        //Cuando solo venga un campo en un parrafo
                                        //verificar que no se repite un campo mas de dos veces
                                        foundit.map((campo) => {
                                            if (element.slice(3, -3).split(':')[1] === campo) {
                                                repetido = true;
                                            }
                                        });
                                        //encontrar posición del valor
                                        if (!repetido) {
                                            foundit.push(element.slice(3, -3).split(':')[1])
                                            archivoJson.map((item, ind) => {
                                                if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                    contador.push(ind);
                                                }
                                            });
                                            tempParrafo = TipoTextoHtml({ found: element, texto: parrafo, json: archivoJson[contador[0]] });
                                            parrafo = tempParrafo[1];
                                        }
                                    }
                                });
                                if (!repetido) {
                                    html.push(<ComponenteHtml
                                        key={index}
                                        negrilla={item.negrilla}
                                        letra={item.letra}
                                        italica={item.italica}
                                        size={12}
                                        texto={tempParrafo[0]}
                                    />);
                                }
                            }
                        } else {
                            if (found.length === 1) {
                                found.map((element, index) => {
                                    let contador = [];
                                    let repetido = false;
                                    if (item.texto != '') {
                                        //Cuando solo venga un campo en un parrafo                                
                                        //console.log(item.texto)
                                        //verificar que no se repite un campo mas de dos veces
                                        foundit.map((campo) => {
                                            if (element.slice(3, -3).split(':')[1] === campo) {
                                                repetido = true;
                                            }
                                        });
                                        //encontrar posición del valor
                                        if (!repetido) {
                                            foundit.push(element.slice(3, -3).split(':')[1])
                                            archivoJson.map((item, ind) => {
                                                if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                    contador.push(ind);
                                                }

                                            });
                                            html.push(<ComponenteHtml
                                                key={index}
                                                negrilla={item.negrilla}
                                                letra={item.letra}
                                                italica={item.italica}
                                                size={item.size}
                                                texto={TipoTextoHtml({ found: element, texto: item.texto, json: archivoJson[contador[0]] })[0]}
                                            />);
                                        }
                                    }
                                });
                            } else if (found.length > 1) {
                                let parrafo = item.texto;
                                let tempParrafo = [];
                                let repetido;
                                found.map((element, index) => {
                                    let contador = [];
                                    repetido = false;
                                    if (parrafo != '') {
                                        //Cuando solo venga un campo en un parrafo
                                        //verificar que no se repite un campo mas de dos veces
                                        foundit.map((campo) => {
                                            if (element.slice(3, -3).split(':')[1] === campo) {
                                                repetido = true;
                                            }
                                        });
                                        //encontrar posición del valor
                                        if (!repetido) {
                                            foundit.push(element.slice(3, -3).split(':')[1])
                                            archivoJson.map((item, ind) => {
                                                if (element.slice(3, -3).split(':')[1] === item.nombre) {
                                                    contador.push(ind);
                                                }
                                            });
                                            tempParrafo = TipoTextoHtml({ found: element, texto: parrafo, json: archivoJson[contador[0]] });
                                            parrafo = tempParrafo[1];
                                        }
                                    }
                                });
                                if (!repetido) {
                                    html.push(<ComponenteHtml
                                        key={index}
                                        negrilla={item.negrilla}
                                        letra={item.letra}
                                        italica={item.italica}
                                        size={12}
                                        texto={tempParrafo[0]}
                                    />);
                                }
                            }
                        }

                    } else {

                        if (texto != '') {
                            if (parrafoRepetido != texto && parrafoRepetido != item.texto) {
                                html.push(<ComponenteHtml
                                    key={index}
                                    negrilla={item.negrilla}
                                    letra={item.letra}
                                    italica={item.italica}
                                    size={item.size}
                                    texto={texto + " "}
                                />
                                )
                            }
                            parrafoRepetido = item.texto
                        } else {
                            console.log("No es igual" + texto)
                            if (parrafoRepetido != item.texto) {
                                html.push(<ComponenteHtml
                                    key={index}
                                    negrilla={item.negrilla}
                                    letra={item.letra}
                                    italica={item.italica}
                                    size={item.size}
                                    texto={item.texto + " "}
                                />
                                )
                            }
                            parrafoRepetido = item.texto
                        }
                    }
                }
                // Proceso para reescribir campos ZZZ--ZZZ


            });
            return html;
        })
        setDatoshtml(data)
        setSuccess(true);
        setLoading(false);
    }, [datos])

    useEffect(() => {
        //console.log("Recibe Campos");
        setSuccess(false);
        setLoading(true);
        //Axios
        let config = {
            method: 'get',
            url: process.env.REACT_APP_URL_API + '/api/documentosAgiles/' + seleccion + '/showWithFile',
            headers: { Authorization: `Bearer ${auth.token}`, "Content-Type": "application/json" },
        };
        const fechData = async () => {
            const result = await axios(config).then((response) => {
                let fields = JSON.parse(response.data.json);
                setCantidad(fields.cantidad);
                setGenero(fields.genero);
                //console.log(response)
                onFileUpload(response.data.archivoJson, fields.archivoJson);
            });
        }
        fechData();
    }, [])

    const onFileUpload = (archivo, json) => {
        // Create an object of formData 
        if (archivo) {
            setArchivoJson(json);
            loaddata(archivo);
        }
    }

    const loaddata = (archivo) => {
        let arraydata = archivo.blocks.map((item) => {
            let align = "";
            let hijos = [];
            let indices = [];
            let intervalos = [];
            let temp = 0;
            if (item.data["text-align"]) {
                align = item.data["text-align"];
            }
            if (item.inlineStyleRanges.length > 0) {
                item.inlineStyleRanges.forEach((indice) => {
                    if (indices.indexOf(indice.offset) === -1) {
                        indices.push(indice.offset);
                    }
                    if (indices.indexOf(indice.offset + indice.length) === -1) {
                        indices.push(indice.offset + indice.length);
                    }
                })
                indices.push(item.text.length);
                indices.sort((a, b) => a - b);
                indices.forEach((element) => {
                    intervalos.push({ text: item.text.slice(temp, element), inicio: temp, fin: element });
                    temp = element;
                });
                intervalos.forEach((element) => {
                    let negrillaHijo = false;
                    let italicaHijo = false;
                    item.inlineStyleRanges.forEach((item) => {
                        if (element.inicio >= item.offset && element.fin <= (item.offset + item.length)) {
                            switch (item.style) {
                                case "BOLD": negrillaHijo = true; break;
                                case "ITALIC": italicaHijo = true; break;
                            }
                        }
                    })
                    hijos.push({
                        letra: "Arial",
                        negrilla: negrillaHijo,
                        italica: italicaHijo,
                        size: "12",
                        texto: element.text,
                    })
                })
            } else {
                hijos.push({
                    letra: "Arial",
                    negrilla: false,
                    italica: false,
                    size: "12",
                    texto: item.text,
                })
            }
            return { align, hijos }
        })
        //console.log("Prueba")
        setDatos(arraydata)
    }


    return (
        <div>
            <Heading
                title="Previsualización documento"
                textAlign="center"
                category={<span>Se previsualiza el documento para verificar los campos</span>}
            />
            <GridContainer>
                <GridItem md={8} style={{ margin: 'auto' }}>
                    <Card>
                        <CardHeader color="primary" text>
                            <CardText className={classes.cardText} color="primary">
                                <h4 className={classes.colorWhite}> Previzualicación del documento </h4>
                            </CardText>
                        </CardHeader>

                        <CardBody>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                {loading && <CircularProgress className={classes2.progress} size={100} color="primary" />}
                                {success ? <Alert severity="success">Se ha realizado la previsualización exitosamente</Alert> : <p></p>}
                            </div>
                            {datoshtml.map((item, index) => {
                                let align;
                                if (datos[index].align === "both") {
                                    align = "justify";
                                } else {
                                    align = datos[index].align;
                                }
                                return (<p style={{ textAlign: align }} key={index}><b>{item}</b></p>
                                )
                            })}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
