import React, { useEffect, useState } from 'react';
import moment from 'moment';
import localeEs from 'moment/locale/es';
import numerosletras from 'numeros_a_letras'
import { departamentos } from '../ValoresDefecto/DepartMuni';
moment.updateLocale('es', localeEs);

//Se tiene para el texto que se va a imprimir se acorde al campo que se escribio en la plantilla

export default function TipoTextoHtml(props) {
    console.log(props.json)
    let found = props.found;
    let tipoFound = props.json.tipo.includes('invicible') ? "vacio"  : props.json.tipo;
    let texto = props.texto;
    let contenido = props.json.valor;

    //variables locales dependen del valor del props
    let estadoCivil = '';
    let documento = '';
    let mayorOmenor = '';
    let parrafoTexto = [];
    console.log("tipoTextoHTmnl")
    console.log(props.json)
    console.log(texto)
    console.log(found)

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
        if (tipoFound) {

            if (tipoFound === 'mayoromenor'){
                if(contenido === 'mayor'){
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
                    documento = " " + contenido.numPas + " de " + contenido.pais;
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
        }

        
        switch (tipoFound) {
            
            case "vacio": parrafoTexto.push(<span style={{ background: 'yellow' }}>{texto.replace(found, "")} </span>, texto.replace(found, "")); break;

            case "number": parrafoTexto.push(<span style={{ background: 'yellow' }}>{texto.replace(found, contenido)} </span>, texto.replace(found, " " + contenido)); break;

            case "number1": parrafoTexto.push(<span style={{ background: 'yellow' }}>{texto.replace(found, " " + numerosletras(Number(contenido)).toLowerCase())}</span>, texto.replace(found, numerosletras(Number(contenido)).toLowerCase())); break;

            case "text": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + contenido)} </span>, texto.replace(found, contenido + " ")); break;

            case "email": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + contenido)} </span>, texto.replace(found, " " + contenido)); break;

            case "date": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + contenido)} </span>, texto.replace(found, contenido)); break;

            case "date1": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + moment(contenido).format('LL'))} </span>, texto.replace(found, moment(contenido).format('LL'))); break;

            case "date2": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + numerosletras(Number(moment(contenido).format('DD'))).toLowerCase() + " (" + moment(contenido).format('D') + ") del mes de " + moment(contenido).format('MMMM') + " del año " + numerosletras(Number(moment(contenido).format('YYYY'))) + " (" + moment(contenido).format('YYYY') + ")")} </span>, texto.replace(found, numerosletras(Number(moment(contenido).format('DD'))).toLowerCase() + " (" + moment(contenido).format('D') + ") del mes de " + moment(contenido).format('MMMM') + " del año " + numerosletras(Number(moment(contenido).format('YYYY'))) + " (" + moment(contenido).format('YYYY') + ")")); break;

            case "date3": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + numerosletras(Number(moment(contenido).format('DD'))).toLowerCase() + " (" + moment(contenido).format('D') + ") del mes de " + moment(contenido).format('MMMM').substr(0, 1).toUpperCase() + moment(contenido).format('MMMM').substr(1,) + " del año " + numerosletras(Number(moment(contenido).format('YYYY'))) + " (" + moment(contenido).format('YYYY') + ")")} </span>, texto.replace(found, numerosletras(Number(moment(contenido).format('DD'))).toLowerCase() + " (" + moment(contenido).format('D') + ") del mes de " + moment(contenido).format('MMMM').substr(0, 1).toUpperCase() + moment(contenido).format('MMMM').substr(1,) + " del año " + numerosletras(Number(moment(contenido).format('YYYY'))) + " (" + moment(contenido).format('YYYY') + ")")); break;

            case "date4": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + numerosletras(Number(moment(contenido).format('DD'))).toUpperCase() + " (" + moment(contenido).format('D') + ") DEL MES DE " + moment(contenido).format('MMMM').toUpperCase() + " DEL AÑO " + numerosletras(Number(moment(contenido).format('YYYY'))).toUpperCase() + " (" + moment(contenido).format('YYYY') + ")")} </span>, texto.replace(found, numerosletras(Number(moment(contenido).format('DD'))).toUpperCase() + " (" + moment(contenido).format('D') + ") DEL MES DE " + moment(contenido).format('MMMM').toUpperCase() + " DEL AÑO " + numerosletras(Number(moment(contenido).format('YYYY'))).toUpperCase() + " (" + moment(contenido).format('YYYY') + ")")); break;

            case "date5": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " a los " + numerosletras(Number(moment(contenido).format('DD'))) + "días del mes de " + moment(contenido).format('MMMM').substr(0, 1).toUpperCase() + moment(contenido).format('MMMM').substr(1,) + " del " + numerosletras(Number(moment(contenido).format('YYYY'))))} </span>, texto.replace(found, "a los " + numerosletras(Number(moment(contenido).format('DD'))) + "días del mes de " + moment(contenido).format('MMMM').substr(0, 1).toUpperCase() + moment(contenido).format('MMMM').substr(1,) + " del " + numerosletras(Number(moment(contenido).format('YYYY'))))); break;

            case "date6": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + moment(contenido).format('dddd').toLowerCase() + ", " + moment(contenido).format('DD') + " de " + moment(contenido).format('MMMM') + " de " + moment(contenido).format('YYYY HH:mm'))} </span>, texto.replace(found, moment(contenido).format('dddd').toLowerCase() + ", " + moment(contenido).format('DD') + " de " + moment(contenido).format('MMMM') + " de " + moment(contenido).format('YYYY HH:mm'))); break;

            case "tipoDoc": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, documento)} </span>, texto.replace(found, documento)); break;

            case "tipoDocNum": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + contenido)}</span>, texto.replace(found, formatear(contenido))); break;

            case "tipoDocCom": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, documento)} </span>, texto.replace(found, documento)); break;

            case "pais": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + contenido)} </span>, texto.replace(found, contenido)); break;

            case "textarea": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + contenido)} </span>, texto.replace(found, contenido)); break;

            case "tiempo": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, " " + numerosletras(Number(contenido.tiempo)).toLowerCase() + " " + contenido.duracion)} </span>, texto.replace(found, contenido.tiempo + " " + contenido.duracion)); break;

            case "estadocivil": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, estadoCivil)} </span>, texto.replace(found, estadoCivil)); break;

            case "sologenero": parrafoTexto.push(<span style={{ background: 'yellow' }}>{" " + texto.replace(found, contenido)} </span>, texto.replace(found, contenido)); break;

            case "notaria": parrafoTexto.push(<span style={{ background: 'yellow' }}>{texto.replace(found, " " + contenido)} </span>, texto.replace(found, contenido)); break;

            case "notaria1": parrafoTexto.push(<span style={{ background: 'yellow' }}>{texto.replace(found, " " + contenido)} </span>, texto.replace(found, contenido)); break;

            case "notaria2": parrafoTexto.push(<span style={{ background: 'yellow' }}>{texto.replace(found, " " + contenido)} </span>, texto.replace(found, contenido)); break;

            case "mayoromenor": parrafoTexto.push(<span style={{ background: 'yellow' }}>{texto.replace(found, " " + mayorOmenor)} </span>, texto.replace(found, mayorOmenor)); break;

            default:
                parrafoTexto.push("Campo no reconocido"); break;
        }

    } else {
        parrafoTexto.push(<span style={{ background: 'yellow' }}> ____________________________ </span>, texto.replace(found, "______________"));

    }

    return (parrafoTexto)

}
