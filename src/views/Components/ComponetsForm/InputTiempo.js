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

const useStyles = makeStyles(styles);

export default function InputTiempo(props) {

    const classes = useStyles();
    const [duracion, setDuracion] = useState('');
    const [tiempo, setTiempo] = useState('');

    useEffect(() => {
        if (props.valor) {
            setDuracion(props.valor.duracion)
            setTiempo(props.valor.tiempo);
        }
    }, []);


    const updateDuracion = (value) => {
        setDuracion(value);
        props.indexArray === -1 ? props.update(props.index, { duracion: value, tiempo: tiempo }) : props.update(props.indexArray,props.index, { duracion: value, tiempo: tiempo })
    }

    const updateTiempo = (value) => {
        setTiempo(value);
        props.indexArray === -1 ? props.update(props.index, { duracion: duracion, tiempo: value }) : props.update(props.indexArray,props.index, { duracion: duracion, tiempo: value })
    }

    return (
        <div>
            <div style={{ margin: "0px" }}>
                <div className="col-md-12">
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                        required
                    >
                        <InputLabel
                            htmlFor="simple-select11"
                            className={classes.selectLabel}
                        >
                            Duración
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
                                value: duracion,
                                onChange: (e) => updateDuracion(e.target.value),
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
                                value="años"
                            >
                                Años
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                }}
                                value="año"
                            >
                                Año
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                }}
                                value="meses"
                            >
                                Meses
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                }}
                                value="mes"
                            >
                                Mes
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                }}
                                value="días"
                            >
                                Días
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                }}
                                value="día"
                            >
                                Día
                            </MenuItem>
                        </Select>
                        <CustomInput
                            labelText="Cantidad"
                            id={props.nombre}
                            formControlProps={{
                                fullWidth: true,
                                required: true,
                            }}
                            inputProps={{
                                type: "number",
                                onChange: (e) => updateTiempo(e.target.value),
                                value: tiempo,
                            }}
                        />
                    </FormControl>
                </div>
            </div>
        </div>
    )

}