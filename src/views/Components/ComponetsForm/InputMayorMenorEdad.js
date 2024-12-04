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

export default function InputMayorMenorEdad(props) {

    const classes = useStyles();
    const [mayorMenor, setMayorMenor] = useState('');
    const [tiempo, setTiempo] = useState('');

    useEffect(() => {
        if (props.valor) {
            setMayorMenor(props.valor)
        }
    }, []);


    const updateMayorMenor = (value) => {
        setMayorMenor(value);
        props.indexArray === -1 ? props.update(props.index, value) : props.update(props.indexArray,props.index, value)
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
                            ¿ Es menor o mayor de edad ?
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
                                value: mayorMenor,
                                onChange: (e) => updateMayorMenor(e.target.value),
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
                                value="mayor"
                            >
                                Mayor de edad
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                }}
                                value="menor"
                            >
                                Menor de edad
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    )

}