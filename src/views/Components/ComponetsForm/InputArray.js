/* eslint-disable */
import React, { useState, useEffect } from "react";
import CustomInput from "components/CustomInput/CustomInput.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

// core components
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import jsonACampos from "../Digitacion/JsonACampos";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

const useStyles = makeStyles(styles);

export default function InputArray(props) {

    const classes = useStyles();
    const [cantidad, setCantidad] = useState(props.cantidad != "" ? props.cantidad : 1);
    const [fieldsForm, setFieldsForm] = useState([]);
    const [camposOriginal, setCamposOriginal] = useState(props.camposOriginal ? props.camposOriginal : []);

    const handleAddClick = (e) => {
        e.preventDefault();
        setCantidad(cantidad + 1);
        props.updateCantidad(props.index, cantidad + 1);
        let array = addCampos(cantidad)
        console.log('Entra porque cantidad es mayor que 0')
        setFieldsForm(array[1]);
    }

    const handleRemoveClick = (e) => {
        e.preventDefault();
        setCantidad(cantidad - 1);
        props.updateCantidad(props.index, cantidad - 1);
        let array = deleteCampos(cantidad)
        console.log('Entra porque cantidad es mayor que 0');
        setFieldsForm(array[1]);
    }

    useEffect(() => {
        console.log('props.valor en inputArray');
        console.log(props.valor);
        if (props.valor) {
            let array;
            array = jsonACampos({ documentos: props.valor, subArray: true, indexSubArray: props.index, updateArrayProps: props.update });
            console.log('array de campos')
            console.log(array)
            setFieldsForm(array[1]);
        }
    }, []);

    const addCampos = (value) => {
        console.log('ADDCAMPOS')
        console.log('CANTIDAD', value)
        console.log(props.valor)
        camposOriginal.map((item) => {
            props.valor[props.valor.length]= { tipo: item.tipo, nombre: item.nombre + "_" + value, orden: '', valor: '' }
        })
        console.log('props.valor')
        console.log(props.valor)
        props.updateField(props.index, props.valor)
        let array = jsonACampos({ documentos: props.valor, subArray: true, indexSubArray: props.index, updateArrayProps: props.update });
        console.log(array)
        setFieldsForm(array[1]);

        return array
    }

    const deleteCampos = (value) => {
        console.log('DeleteCampos')
        console.log('CANTIDAD', value)
        camposOriginal.map((item) => {
            props.valor.pop()
        })
        console.log(props.valor)
        props.updateField(props.index, props.valor)
        let array = jsonACampos({ documentos: props.valor, subArray: true, indexSubArray: props.index, updateArrayProps: props.update });
        console.log(array)
        setFieldsForm(array[1]);

        return array
    }

    return (
        <div>
            <div style={{ margin: "0px" }}>
                <div className="col-md-12" style={{textAlign: 'right'}}>
                    <h5>{`Cantidad de ${props.nombre} : ${cantidad} `}</h5>
                </div>
            </div>
            <div>
                {
                    fieldsForm.map((item, index) => <div key={index}>{item}</div>)
                }
            </div>
            <div className="btn-box text-center m-1">
                {cantidad !== 1 && <button
                    className="btn btn-danger m-1"
                    onClick={handleRemoveClick}>{`Eliminar ${props.nombre}`}</button>}
                <button className="btn btn-info m-1" onClick={handleAddClick}>{`Agregar otro ${props.nombre}`}</button>
            </div>
        </div>

    )

}