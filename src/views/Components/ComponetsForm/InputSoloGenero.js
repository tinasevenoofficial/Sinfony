
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

export default function InputSoloGenero(props) {

    const classes = useStyles();
    const [genero, setGenero] = useState('');

    useEffect(() => {
        if (props.valor) {
            setGenero(props.valor);
        }
    }, []);

    const updateGenero = (value) => {
        setGenero(value);
        props.indexArray === -1 ? props.update(props.index, value) : props.update(props.indexArray, props.index, value)
    }

    return (
        <div>
            <div
                style={{ margin: "0px" }}
            >
                <div className="col-12">
                    <InputLabel
                        htmlFor="simple-select11"
                        className={classes.selectLabel}
                    >
                        Genero:
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
                            value: genero,
                            onChange: (e) => updateGenero(e.target.value),
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
                            value="Masculino"
                        >
                            Masculino
                            </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                            }}
                            value="Femenino"
                        >
                            Femenino
                            </MenuItem>
                    </Select>
                </div>
            </div>
        </div>
    )
}