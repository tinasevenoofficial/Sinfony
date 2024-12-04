import React, { useState, useEffect } from "react";
import { municipios, departamentos } from '../ValoresDefecto/DepartMuni';
import { paises } from '../ValoresDefecto/paises';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(styles);

export default function InputTipoDoc(props) {

    const classes = useStyles();
    const [tipoDoc, setTipoDoc] = useState('');
    const [numDoc, setNumDoc] = useState('');
    const [numPas, setNumPas] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [pais, setPais] = useState('');

    useEffect(() => {
        if (props.valor) {
            setTipoDoc(props.valor.tipoDoc)
            setNumDoc(props.valor.numDoc);
            setNumPas(props.valor.numPas);
            setDepartamento(props.valor.departamento);
            setMunicipio(props.valor.municipio)
            setPais(props.valor.pais);
        }
    }, []);


    const updateTipoDoc = (value) => {
        setTipoDoc(value);
        props.indexArray === -1 ? props.update(props.index, { tipoDoc: value, numDoc: numDoc, numPas: numPas, departamento: departamento, municipio: municipio, pais: pais }) : props.update(props.indexArray, props.index, { tipoDoc: value, numDoc: numDoc, numPas: numPas, departamento: departamento, municipio: municipio, pais: pais })
    }

    const updateNumDoc = (value) => {
        setNumDoc(value);
        props.indexArray === -1 ? props.update(props.index, { tipoDoc: tipoDoc, numDoc: value, numPas: numPas, departamento: departamento, municipio: municipio, pais: pais }) : props.update(props.indexArray, props.index, { tipoDoc: tipoDoc, numDoc: value, numPas: numPas, departamento: departamento, municipio: municipio, pais: pais })
    }

    const updateNumPas = (value) => {
        setNumPas(value);
        props.indexArray === -1 ? props.update(props.index, { tipoDoc: tipoDoc, numDoc: numDoc, numPas: value, departamento: departamento, municipio: municipio, pais: pais }) : props.update(props.indexArray, props.index, { tipoDoc: tipoDoc, numDoc: numDoc, numPas: value, departamento: departamento, municipio: municipio, pais: pais })
    }

    const updateDepartamento = (value) => {
        setDepartamento(value);
        props.indexArray === -1 ? props.update(props.index, { tipoDoc: tipoDoc, numDoc: numDoc, numPas: numPas, departamento: value, municipio: municipio, pais: pais }) : props.update(props.indexArray, props.index, { tipoDoc: tipoDoc, numDoc: numDoc, numPas: numPas, departamento: value, municipio: municipio, pais: pais })
    }

    const updateMunicipio = (value) => {
        setMunicipio(value);
        props.indexArray === -1 ? props.update(props.index, { tipoDoc: tipoDoc, numDoc: numDoc, numPas: numPas, departamento: departamento, municipio: value, pais: pais }) : props.update(props.indexArray, props.index, { tipoDoc: tipoDoc, numDoc: numDoc, numPas: numPas, departamento: departamento, municipio: value, pais: pais })
    }

    const updatePais = (value) => {
        setPais(value);
        props.indexArray === -1 ? props.update(props.index, { tipoDoc: tipoDoc, numDoc: numDoc, numPas: numPas, departamento: departamento, municipio: municipio, pais: value }) : props.update(props.indexArray, props.index, { tipoDoc: tipoDoc, numDoc: numDoc, numPas: numPas, departamento: departamento, municipio: municipio, pais: value })
    }

    return (
        <div>
            <div style={{ marginTop: '10px' }}>
                <InputLabel
                    htmlFor="tipo-documento11"
                    className={classes.selectLabel}
                >
                    Tipo de Documento
                    </InputLabel>
                <Select
                    MenuProps={{
                        className: classes.selectMenu,
                    }}
                    classes={{
                        select: classes.select,
                    }}

                    inputProps={{
                        type: "text",
                        value: tipoDoc,
                        onChange: (e) => updateTipoDoc(e.target.value),
                    }}
                >
                    <MenuItem
                        disabled
                        classes={{
                            root: classes.selectMenuItem,
                        }}
                    >
                        Escoger...
                      </MenuItem>
                    <MenuItem
                        classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                        }}
                        value="Cédula de ciudadanía"
                    >
                        Cédula de ciudadanía
                      </MenuItem>
                    <MenuItem
                        classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                        }}
                        value="Cédula de extranjería"
                    >
                        Cédula de extranjería
                      </MenuItem>
                    <MenuItem
                        classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                        }}
                        value="Pasaporte"
                    >
                        Pasaporte
                      </MenuItem>
                </Select>
            </div >
            { tipoDoc === "Cédula de ciudadanía" && (
                <div
                    style={{ margin: "0px", marginTop: "0px" }}
                >
                    <div className="col-12">
                        <CustomInput
                            labelText="Num. cédula"
                            formControlProps={{
                                fullWidth: true,
                                required: true,
                            }}
                            inputProps={{
                                type: "number",
                                value: numDoc,
                                onChange: (e) => updateNumDoc(e.target.value)
                            }}
                        />
                    </div>
                    <div className="col-md-12">
                        <InputLabel
                            htmlFor="simple-select11"
                            className={classes.selectLabel}
                        >
                            Departamento
                        </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu,
                            }}
                            classes={{
                                select: classes.select,
                            }}
                            inputProps={{
                                type: "text",
                                value: departamento,
                                onChange: (e) => updateDepartamento(e.target.value)
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem,
                                }}
                            >
                                Escoger...
                                </MenuItem>
                            {
                                departamentos.map((obj) => {
                                    return <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value={obj.id}
                                    >
                                        {obj.name}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </div>
                    <div className="col-12" style={{ marginTop: '10px' }}>
                        <InputLabel
                            htmlFor="simple-select12"
                            className={classes.selectLabel}
                        >
                            Municipio
                        </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu,
                            }}
                            classes={{
                                select: classes.select,
                            }}
                            inputProps={{
                                type: "text",
                                value: municipio,
                                onChange: (e) => updateMunicipio(e.target.value)
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem,
                                }}
                            >
                                Escoger...
                                </MenuItem>
                            {
                                municipios.filter((municipio) => municipio.id_depto === Number(departamento)).sort((a, b) => a.name.localeCompare(b.name)).map((municipio) => {
                                    return <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value={municipio.name}
                                    >
                                        {municipio.name}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </div>
                </div>
            )
            }
            { tipoDoc === "Cédula de extranjería" && (
                <div className="col-12" style={{ marginTop: "10px" }}>
                    <CustomInput
                        labelText="Num. Cédula"
                        formControlProps={{
                            fullWidth: true,
                            required: true,
                        }}
                        inputProps={{
                            type: "number",
                            value: numDoc,
                            onChange: (e) => updateNumDoc(e.target.value)
                        }}
                    />
                </div>
            )
            }
            { tipoDoc === "Pasaporte" && (
                <div style={{ margin: "0px" }}>
                    <div className="col-md-12">
                        <CustomInput
                            labelText="Num. Identidad"
                            formControlProps={{
                                fullWidth: true,
                                required: true,
                            }}
                            inputProps={{
                                type: "text",
                                value: numPas,
                                onChange: (e) => updateNumPas(e.target.value),
                            }}
                        />
                    </div>
                    <div className="col-md-12">
                        <InputLabel
                            htmlFor="simple-select11"
                            className={classes.selectLabel}
                        >
                            Pais:
                        </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu,
                            }}
                            classes={{
                                select: classes.select,
                            }}
                            inputProps={{
                                type: "text",
                                value: pais,
                                onChange: (e) => updatePais(e.target.value),
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem,
                                }}
                            >
                                Escoger...
                                </MenuItem>
                            {
                                paises.map((obj) => {
                                    return <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value={obj.name}
                                    >
                                        {obj.name}
                                    </MenuItem>
                                })
                            }
                        </Select>

                    </div>
                </div>
            )
            }
        </div>
    )

}