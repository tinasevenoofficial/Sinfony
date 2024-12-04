
import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

// core components
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);

export default function InputSoloEstadoCivil(props) {

    const classes = useStyles();
    const [genero, setGenero] = useState(props.genero);
    const [estadoCivilF, setEstadoCivilF] = useState('');
    const [estadoCivilM, setEstadoCivilM] = useState('');

    useEffect(() => {
        if (props.valor) {
            setEstadoCivilF(props.valor.estadoCivilF);
            setEstadoCivilM(props.valor.estadoCivilM);
        }
    }, []);

    const updateEstadoCivilF = (value) => {
        setEstadoCivilF(value);
        props.indexArray === -1 ? props.update(props.index, { genero: genero, estadoCivilF: value, estadoCivilM: estadoCivilM }) : props.update(props.indexArray, props.index, { genero: genero, estadoCivilF: value, estadoCivilM: estadoCivilM })
    }

    const updateEstadoCivilM = (value) => {
        setEstadoCivilM(value);
        props.indexArray === -1 ? props.update(props.index, { genero: genero, estadoCivilF: estadoCivilF, estadoCivilM: value }) : props.update(props.indexArray, props.index, { genero: genero, estadoCivilF: estadoCivilF, estadoCivilM: value })
    }

    return (
        <div>
            <div
                style={{ margin: "0px" }}
            >
                <div className="col-12">
                    {genero === "Femenino" && (
                        <div style={{ margin: "10px" }}>
                            <div className="col-md-12">
                                <InputLabel
                                    htmlFor="simple-select11"
                                    className={classes.selectLabel}
                                >
                                    Estado civil
                                        </InputLabel>
                                <Select
                                    style={{ width: '100%' }}
                                    MenuProps={{
                                        className: classes.selectMenu,
                                    }}
                                    classes={{
                                        select: classes.select,
                                    }}

                                    inputProps={{
                                        type: "text",
                                        value: estadoCivilF,
                                        onChange: (e) => updateEstadoCivilF(e.target.value),
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
                                        value="Soltera"
                                    >
                                        Soltera
                                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value="Soltera sin unión marital de hecho"
                                    >
                                        Soltera sin unión marital de hecho
                                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value="Soltera con unión marital de hecho"
                                    >
                                        Soltera con unión marital de hecho
                                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value="Religiosa"
                                    >
                                        Religiosa
                                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value="Casada"
                                    >
                                        Casada
                                            </MenuItem>
                                </Select>
                            </div>
                        </div>
                    )
                    }
                    {genero === "Masculino" && (
                        <div style={{ margin: "10px" }}>
                            <div className="col-md-12">
                                <InputLabel
                                    htmlFor="simple-select11"
                                    className={classes.selectLabel}
                                >
                                    Estado Civil:
                                        </InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu,
                                    }}
                                    classes={{
                                        select: classes.select,
                                    }}
                                    style={{ width: '100%' }}
                                    inputProps={{
                                        type: "text",
                                        value: estadoCivilM,
                                        onChange: (e) => updateEstadoCivilM(e.target.value),
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
                                        value="Soltero"
                                    >
                                        Soltero
                                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value="Soltero sin unión marital de hecho"
                                    >
                                        Soltero sin unión marital de hecho
                                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value="Soltero con unión marital de hecho"
                                    >
                                        Soltero con unión marital de hecho
                                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value="Religioso"
                                    >
                                        Religioso
                                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        value="Casado"
                                    >
                                        Casado
                                            </MenuItem>
                                </Select>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}