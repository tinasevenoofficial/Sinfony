/*eslint-disable*/
import React, { useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import numerosletras from 'numeros_a_letras'
import { departamentos } from '../ValoresDefecto/DepartMuni';
import ComponenteWord from "../ComponentsWord/componenteWord";
import CambiarVocabulario from '../Digitacion/CambiarVocabulario'
import saveAs from "file-saver";
import {
    Document,
    Packer,
    Paragraph,
    AlignmentType,
    TextRun,
    TabStopType,
    TabStopPosition
} from "docx";
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import moment from 'moment';
import localeEs from 'moment/locale/es';

moment.updateLocale('es', localeEs);

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";



const useStyles = makeStyles(styles);

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


export default function ObtenerWord(props) {

    const auth = useSelector((state) => state.auth);


    const classes = useStyles();
    const classes2 = useStyles2();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const buttonClassname = clsx({
        [classes2.buttonSuccess]: success,
    });

    const TipoTextoWord = (props) => {

        console.log("tipoTextoWord")
        console.log(props.json)
        console.log(props.texto)
        console.log(props.found)
        let found = props.found;
        let tipoFound = props.json.tipo.includes('invicible') ? "vacio" : props.json.tipo;
        let texto = props.texto;
        let contenido = props.json.valor;

        //variables locales dependen del valor del props
        let estadoCivil = '';
        let documento = '';
        let mayorOmenor = '';

        const formatear = (num) => {
            while (num.toString().indexOf('.') !== -1) {
                num = num.toString().replace('.', '');
            } num = num.toString();
            let resultado = '';
            for (var j, i = num.length - 1, j = 0; i >= 0; i--, j++)
                resultado = num.charAt(i) + ((j > 0) && (j % 3 === 0) ? "." : "") + resultado;
            return resultado;
        }

        if (contenido) {

            if (tipoFound === 'mayoromenor') {
                if (contenido === 'mayor') {
                    mayorOmenor = 'mayor';
                } else {
                    mayorOmenor = 'menor';
                }
            }


            if (tipoFound === 'estadocivil') {
                if (contenido.genero === 'Masculino') {
                    estadoCivil = contenido.estadoCivilM;
                } else {
                    estadoCivil = contenido.estadoCivilF;
                }
            }
            if (tipoFound === 'tipoDoc') {
                if (contenido.tipoDoc === 'Cédula de extranjería') {
                    documento = " " + formatear(contenido.numDoc);
                } else if (contenido.tipoDoc === 'Cédula de ciudadanía') {
                    documento = " " + formatear(contenido.numDoc) + " expedida en " + contenido.municipio + ", " + departamentos.filter((departamento) => (departamento.id === Number(contenido.departamento))).map(function (e) { return e.name; })[0];
                } else if (contenido.tipoDoc === 'Pasaporte') {
                    documento = contenido.numPas + " de " + contenido.pais;
                }
            }

            if (tipoFound === 'tipoDocCom') {

                if (contenido.tipoDoc === 'Cédula de extranjería') {
                    documento = " la cédula de extranjería número " + formatear(contenido.numDoc);
                } else if (contenido.tipoDoc === 'Cédula de ciudadanía') {
                    documento = " la cédula de ciudadanía número " + formatear(contenido.numDoc) + " expedida en " + contenido.municipio + ", " + departamentos.filter((departamento) => (departamento.id === Number(contenido.departamento))).map(function (e) { return e.name; })[0];
                } else if (contenido.tipoDoc === 'Pasaporte') {
                    documento = " el pasaporte número " + contenido.numPas + " de " + contenido.pais;
                }
            }

            switch (tipoFound) {

                case "vacio": return (texto.replace(found, ""));

                case "number": return (texto.replace(found, contenido));

                case "number1": return (texto.replace(found, " " + numerosletras(Number(contenido)).toLowerCase()));

                case "text": return (texto.replace(found, " " + contenido));

                case "email": return (texto.replace(found, " " + contenido));

                case "date": return (texto.replace(found, " " + contenido));

                case "date1": return (texto.replace(found, " " + moment(contenido).format('LL')));

                case "date2": return (texto.replace(found, " " + numerosletras(Number(moment(contenido).format('DD'))).toLowerCase() + " (" + moment(contenido).format('D') + ") del mes de " + moment(contenido).format('MMMM') + " del año " + numerosletras(Number(moment(contenido).format('YYYY'))) + " (" + moment(contenido).format('YYYY') + ")"));

                case "date3": return (texto.replace(found, " " + numerosletras(Number(moment(contenido).format('DD'))).toLowerCase() + " (" + moment(contenido).format('D') + ") del mes de " + moment(contenido).format('MMMM').substr(0, 1).toUpperCase() + moment(contenido).format('MMMM').substr(1,) + " del año " + numerosletras(Number(moment(contenido).format('YYYY'))) + " (" + moment(contenido).format('YYYY') + ")"));

                case "date4": return (texto.replace(found, " " + numerosletras(Number(moment(contenido).format('DD'))).toUpperCase() + " (" + moment(contenido).format('D') + ") DEL MES DE " + moment(contenido).format('MMMM').toUpperCase() + " DEL AÑO " + numerosletras(Number(moment(contenido).format('YYYY'))).toUpperCase() + " (" + moment(contenido).format('YYYY') + ")"));

                case "date5": return (texto.replace(found, " a los " + numerosletras(Number(moment(contenido).format('DD'))) + "días del mes de " + moment(contenido).format('MMMM').substr(0, 1).toUpperCase() + moment(contenido).format('MMMM').substr(1,) + " del " + numerosletras(Number(moment(contenido).format('YYYY')))));

                case "date6": return (texto.replace(found, " " + moment(contenido).format('dddd').toLowerCase() + ", " + moment(contenido).format('DD') + " de " + moment(contenido).format('MMMM') + " de " + moment(contenido).format('YYYY HH:mm')));

                case "tipoDoc": return (texto.replace(found, documento));

                case "tipoDocNum": return (texto.replace(found, formatear(contenido)));

                case "tipoDocCom": return (texto.replace(found, documento));

                case "textarea": return (texto.replace(found, " " + contenido));

                case "pais": return (texto.replace(found, " " + contenido));

                case "tiempo": return (texto.replace(found, numerosletras(Number(contenido.tiempo)).toLowerCase() + " " + contenido.duracion));

                case "estadocivil": return (" " + texto.replace(found, " " + estadoCivil));

                case "sologenero": return (" " + texto.replace(found, " " + contenido));

                case "notaria": return (texto.replace(found, " " + contenido));

                case "notaria1": return (texto.replace(found, " " + contenido));

                case "notaria2": return (texto.replace(found, " " + contenido));

                case "mayoromenor": return (texto.replace(found, mayorOmenor));

                default:
                    return "Campo no reconocido";
            }
        } else {
            return "_____________";
        }
    }

    const createFormWord = (arraydata, archivoJson, cantidad, genero, nombrePlantilla) => {
        let data = arraydata.map((linea, index) => {
            let word = [];
            let foundit = ["inicio"];
            let activateY = false;
            let parrafoRepetido = "";
            linea.hijos.forEach((item, index) => {
                let foundY = item.texto.match(/(Y{3})\w*:\w*(Y{3})/gm);
                parrafoWord = item.texto
                console.log(item.texto);
                console.log(foundY);
                let endFoundY = item.texto.match(/(Y{3})\\\w*:\w*(Y{3})/gm);
                console.log(endFoundY);
                if (foundY) {
                    activateY = true;
                }
                let parrafoWord = '';
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

                            let value = XXXenY != "" ? XXXenY : item.texto;
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
                                                    console.log("problema")
                                                    //VAMOS ACA, SE ENVIA EL JSON {TIPO: NOMBRE: VALOR} -> DEL CAMPO ENCONTRADO EN LA SUBARRAY DENTRO DE LA ARRAY GENERAL 
                                                    let textoTrue = TipoTextoWord({ found: element, texto: textXXXSegunda, json: archivoJson[ind].valor[contador[0]] })
                                                    word.push(ComponenteWord({
                                                        key: index,
                                                        negrilla: item.negrilla,
                                                        letra: item.letra,
                                                        italica: item.italica,
                                                        size: item.size,
                                                        texto: textoTrue,
                                                    }));
                                                }
                                            }
                                        });
                                    } else if (found.length > 1) {
                                        console.log("FoundLength > 1")
                                        let parrafo = textXXXSegunda;
                                        let tempParrafo;
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
                                                    tempParrafo = TipoTextoWord({ found: element, texto: parrafo, json: archivoJson[ind].valor[contador[0]] });
                                                    parrafo = tempParrafo;
                                                }
                                            }
                                        });
                                        if (!repetido) {
                                            word.push(ComponenteWord({
                                                key: index,
                                                negrilla: item.negrilla,
                                                letra: item.letra,
                                                italica: item.italica,
                                                size: item.size,
                                                texto: tempParrafo,
                                            }));
                                        }
                                    }
                                } else {
                                    //Código para WORD si no se encuentra XXX
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
                                                            cadenaArray = cadenaArray + TipoTextoWord({ found: element, texto: segundaFrase.replace(/ /g, ''), json: archivoJson[posicionArrayCampos].valor[ind] }).replace(/ /g, '') + ', '
                                                            contador.push(ind);
                                                            console.log(cadenaArray)
                                                            subNombreDelCampo = nombreDelCampo + "_" + subContador;
                                                            subContador = subContador + 1;
                                                            //console.log(nombreDelCampo)
                                                        }

                                                    });
                                                    console.log("parrafoWord entra")
                                                    console.log(segundaFrase)
                                                    let textoSinY = TipoTextoWord({ found: segundaFrase, texto: parrafoWord ? parrafoWord : value, json: { tipo: "text", nombre: "", orden: "1", valor: cadenaArray } })
                                                    parrafoWord = textoSinY
                                                    console.log("parrafoWord")
                                                    console.log(parrafoWord);

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
                                                                subCadenaArray = TipoTextoWord({ found: campoBase, texto: subCadenaArray, json: archivoJson[posicionArrayCampos].valor[ind] })
                                                                console.log("subCadenaArray = 0")
                                                                console.log(subCadenaArray)
                                                            }
                                                        } else {
                                                            let nombreNuevo = campoBase.slice(3, -3).split(':')[1] + "_" + subContador;
                                                            if (subNombreDelCampo === nombreNuevo) {
                                                                contadorFinal = contadorFinal + 1;
                                                                subCadenaArray = TipoTextoWord({ found: campoBase, texto: subCadenaArray, json: archivoJson[posicionArrayCampos].valor[ind] })
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
                                                console.log(parrafoWord)
                                                parrafo = TipoTextoWord({ found: segundaFrase, texto: parrafoWord ? parrafoWord : value, json: { tipo: "text", nombre: "", orden: "1", valor: parrafoYYY } });
                                                parrafoWord = parrafo
                                                console.log(parrafo)
                                            }
                                        }
                                        //Revisar si se quita
                                        if (!repetido) {
                                            word.push(ComponenteWord({
                                                key: index,
                                                negrilla: item.negrilla,
                                                letra: item.letra,
                                                italica: item.italica,
                                                size: item.size,
                                                texto: tempParrafo,
                                            }));
                                        }
                                    }
                                }

                            } else {

                                if (textXXXSegunda != '') {
                                    if (parrafoRepetido != textXXXSegunda && parrafoRepetido != item.texto) {
                                        word.push(ComponenteWord({
                                            key: index,
                                            negrilla: item.negrilla,
                                            letra: item.letra,
                                            italica: item.italica,
                                            size: item.size,
                                            texto: textXXXSegunda + " ",
                                        }));
                                    }
                                    parrafoRepetido = item.texto
                                } else {
                                    console.log("No es igual" + textXXXSegunda)
                                    if (parrafoRepetido != item.texto) {
                                        word.push(ComponenteWord({
                                            key: index,
                                            negrilla: item.negrilla,
                                            letra: item.letra,
                                            italica: item.italica,
                                            size: item.size,
                                            texto: item.texto + " ",
                                        }));
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
                                                        let textoTrue = TipoTextoWord({ found: element, texto: textXXXPrimera, json: archivoJson[contador[0]] })
                                                        word.push(ComponenteWord({
                                                            key: index,
                                                            negrilla: item.negrilla,
                                                            letra: item.letra,
                                                            italica: item.italica,
                                                            size: item.size,
                                                            texto: textoTrue,
                                                        }));
                                                    }
                                                }
                                            });
                                        } else if (found.length > 1) {
                                            let parrafo = textXXXPrimera;
                                            let tempParrafo;
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
                                                        tempParrafo = TipoTextoWord({ found: element, texto: parrafo, json: archivoJson[contador[0]] })
                                                        parrafo = tempParrafo;
                                                    }
                                                }
                                            });
                                            if (!repetido) {
                                                word.push(ComponenteWord({
                                                    key: index,
                                                    negrilla: item.negrilla,
                                                    letra: item.letra,
                                                    italica: item.italica,
                                                    size: item.size,
                                                    texto: tempParrafo,
                                                }));
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
                                                        let tempParra = TipoTextoWord({ found: element, texto: parrafoWord ? parrafoWord : value, json: archivoJson[contador[0]] })
                                                        parrafoWord = tempParra
                                                        console.log("parrafoWord")
                                                        console.log(parrafoWord);
                                                    }
                                                }
                                            });
                                        } else if (found.length > 1) {
                                            let parrafo = value;
                                            let tempParrafo;
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
                                                        tempParrafo = TipoTextoWord({ found: element, texto: parrafo, json: archivoJson[contador[0]] });
                                                        parrafo = tempParrafo;
                                                    }
                                                }
                                            });
                                            if (!repetido) {
                                                word.push(ComponenteWord({
                                                    key: index,
                                                    negrilla: item.negrilla,
                                                    letra: item.letra,
                                                    italica: item.italica,
                                                    size: item.size,
                                                    texto: tempParrafo,
                                                }));
                                            }
                                        }
                                    }

                                }
                            }
                        })
                        //Saltar a otro parrafo, despues de analizar el presente
                        if (endFoundY) {
                            let parteTexto = parrafoWord
                            foundY.map((element, ind) => {
                                parteTexto = parteTexto.replace(element.toString(), '')
                                console.log(parteTexto)
                                console.log(element)
                            })
                            endFoundY.map((element, ind) => {
                                parteTexto = parteTexto.replace(element, '')
                            })
                            word.push(ComponenteWord({
                                key: index,
                                negrilla: item.negrilla,
                                letra: item.letra,
                                italica: item.italica,
                                size: item.size,
                                texto: parteTexto,
                            }));
                            activateY = false;
                        }
                    } 
                } else {
                    console.log("entra Si no encontro YYY")
                    //Hallar XXX, ZZZ en parrafos donde no se encuentres YYY

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
                                            let textoTrue = TipoTextoWord({ found: element, texto: texto, json: archivoJson[contador[0]] })
                                            word.push(ComponenteWord({
                                                key: index,
                                                negrilla: item.negrilla,
                                                letra: item.letra,
                                                italica: item.italica,
                                                size: item.size,
                                                texto: textoTrue,
                                            }));
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
                                            tempParrafo = TipoTextoWord({ found: element, texto: parrafo, json: archivoJson[contador[0]] });
                                            parrafo = tempParrafo;
                                        }
                                    }
                                });
                                if (!repetido) {
                                    word.push(ComponenteWord({
                                        key: index,
                                        negrilla: item.negrilla,
                                        letra: item.letra,
                                        italica: item.italica,
                                        size: item.size,
                                        texto: tempParrafo,
                                    }));
                                }
                            }
                        } else {
                            // Cuando no hay XXX en el parrafo
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
                                            let textoTrue = TipoTextoWord({ found: element, texto: item.texto, json: archivoJson[contador[0]] })
                                            word.push(ComponenteWord({
                                                key: index,
                                                negrilla: item.negrilla,
                                                letra: item.letra,
                                                italica: item.italica,
                                                size: item.size,
                                                texto: textoTrue,
                                            }));
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
                                            tempParrafo = TipoTextoWord({ found: element, texto: parrafo, json: archivoJson[contador[0]] })
                                            parrafo = tempParrafo;
                                        }
                                    }
                                });
                                if (!repetido) {
                                    word.push(ComponenteWord({
                                        key: index,
                                        negrilla: item.negrilla,
                                        letra: item.letra,
                                        italica: item.italica,
                                        size: item.size,
                                        texto: tempParrafo,
                                    }));
                                }
                            }
                        }

                    } else {

                        if (texto != '') {
                            if (parrafoRepetido != texto && parrafoRepetido != item.texto) {
                                word.push(ComponenteWord({
                                    key: index,
                                    negrilla: item.negrilla,
                                    letra: item.letra,
                                    italica: item.italica,
                                    size: item.size,
                                    texto: texto
                                })
                                )
                            }
                            parrafoRepetido = item.texto
                        } else {
                            if (parrafoRepetido != item.texto) {
                                word.push(ComponenteWord({
                                    key: index,
                                    negrilla: item.negrilla,
                                    letra: item.letra,
                                    italica: item.italica,
                                    size: item.size,
                                    texto: item.texto
                                })
                                )
                            }
                            parrafoRepetido = item.texto
                        }
                    }
                }


            });
            return word;
        })
        // console.log('data');
        // console.log(data);
        gDoxc(data, arraydata, nombrePlantilla)
    }

    const getData = () => {

        // console.log(loading);
        // console.log("Recibe Campos");
        if (props.idDocu != -1) {
            setLoading(true)
            setSuccess(false);
            let config = {
                method: 'get',
                url: process.env.REACT_APP_URL_API + '/api/documentosAgiles/' + parseInt(props.idDocu) + '/showWithFile',
                headers: { Authorization: `Bearer ${auth.token}`, "Content-Type": "application/json" },
            };
            const fechData = async () => {
                const result = await axios(config).then((response) => {
                    let fields = JSON.parse(response.data.json);
                    console.log(response.data.nombre_documento)
                    onFileUpload(response.data.archivoJson, fields.archivoJson, fields.cantidad, fields.genero, response.data.nombre_documento);
                });
            }
            fechData();
        } else {
            alert(" Seleccione un documento para exportar en WORD")

        }
    }

    const onFileUpload = (archivo, json, cantidad, genero, nombrePlantilla) => {
        // Create an object of formData 
        if (archivo) {
            loaddata(archivo, json, cantidad, genero, nombrePlantilla)
        }
    }

    const loaddata = (archivo, json, cantidad, genero, nombrePlantilla) => {
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
        createFormWord(arraydata, json, cantidad, genero, nombrePlantilla)
        //console.log(arraydata);
    }

    const gDoxc = (datosWord, datos, nombrePlantilla) => {

        const docx = new Document({
            creator: "Sebastian Garcia",
            description: "Test Número 1",
            title: "Poder control",
        });

        let array1 = datosWord.map((item, index) => {
            //console.log(datosWord);
            let alinamiento;
            let tab = new TextRun("");
            if (datos[index].align === 'center') {
                alinamiento = AlignmentType.CENTER;
            } else if (datos[index].align === 'both') {
                tab = new TextRun("\t");
                alinamiento = AlignmentType.JUSTIFIED;
            }
            return (
                new Paragraph({
                    children:
                        [
                            ...item,
                            tab
                        ],
                    alignment: alinamiento,
                    tabStops:
                        [
                            {
                                type: TabStopType.RIGHT,
                                position: TabStopPosition.MAX,
                            },
                        ],
                    spacing: {
                        line: 300,

                    }
                }))
        })

        docx.addSection(
            {
                children: [
                    ...array1,
                ]
            });

        Packer.toBlob(docx).then((blob) => {
            saveAs(blob, nombrePlantilla + ".docx");
        });
        setLoading(false);
        setSuccess(true);
    }
    return (
        <Button style={{ marginLeft: '4px' }} variant="contained" color="rose" className={buttonClassname} component="label" disabled={loading} onClick={() => getData()} type="button">
            {loading ? <span><i className="fa fa-spinner fa-spin"></i> Cargando</span> : "Word"}
        </Button>
    );
}
