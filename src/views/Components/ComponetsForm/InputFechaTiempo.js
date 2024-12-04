import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function InputFechaTiempo(props) {

    const [valor, setValor] = useState(props.valor);
    const classes = useStyles();

    const actualizar = (value) => {
        console.log(value)
        setValor(value);
        props.indexArray === -1 ? props.update(props.index, value) : props.update(props.indexArray,props.index, value)
    }

    return (
        <div>
            <form className={classes.container} noValidate>
                <TextField
                    id="datetime-local"
                    label={props.nombre}
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        onChange: (e) => actualizar(e.target.value),
                        value: valor,
                    }}
                />
            </form>
            {/* <CustomInput
                labelText=""
                id={props.nombre}
                formControlProps={{
                    fullWidth: true,
                    required: true,
                }}
                inputProps={{
                    type: 'number',
                    onChange: (e) => actualizar(e.target.value),
                    value: valor,
                }}
            /> */}
        </div>
    )
}