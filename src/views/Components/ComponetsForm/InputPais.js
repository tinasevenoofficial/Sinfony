import React, { useState, useEffect } from "react";
import { paises } from '../ValoresDefecto/paises';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

// core components
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);

export default function InputPais(props) {

    const classes = useStyles();
    const [pais, setPais] = useState('');

    useEffect(() => {
        if(props.valor){
            setPais(props.valor);
        }
      }, []);

    const updatePais = (value) => {
        setPais(value);
        props.indexArray === -1 ? props.update(props.index, pais) : props.update(props.indexArray, props.index, pais)
    }
    
    return (
        <div>
            <div className="row" style={{ margin: "0px" }}>
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
                                value: paises,
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
        </div>
    )

}