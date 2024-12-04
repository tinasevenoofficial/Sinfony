
import React, { useState } from "react";
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

export default function InputExpuestoPoli(props) {

    const classes = useStyles();
    const [expuestoPoli, setExpuestoPoli] = useState(props.valor.tipoDoc ? props.valor.tipoDoc : '');

    const updateExpuestoPoliti = (value) => {
        setPais(value);
        props.indexArray === -1 ? props.update(props.index, value) : props.update(props.indexArray,props.index, value)
    }

    return (
        <div>
            <div className="row" style={{ margin: "0px" }}>
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
                            ¿Es expuesto politicamente?
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
                                value: expuestoPoli,
                                onChange: (e) => updateExpuestoPoliti(e.target.value),
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
                                value="Si"
                            >
                                Si
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                }}
                                value="No"
                            >
                                No
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    )

}