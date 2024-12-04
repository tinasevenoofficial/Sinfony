import React, { useState } from "react";
import CustomInput from "components/CustomInput/CustomInput.js";

export default function InputTipoDocNum(props) {

    const [valor, setValor] = useState(props.valor);

    const actualizar = (value) => {
        console.log(value)
        setValor(value);
        props.indexArray === -1 ? props.update(props.index, value) : props.update(props.indexArray,props.index, value)
    }

  return (
        <div>
            <CustomInput
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
            />
        </div>
    )
}