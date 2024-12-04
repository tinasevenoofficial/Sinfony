
import React, { useState, useEffect } from "react";
import CustomInput from "components/CustomInput/CustomInput.js";

export default function InputEmail(props) {

    const [email, setEmail] = useState(props.valor);
    const [validate, setValidate] = useState(true);

    const actualizar = (value) => {
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)) {
            setValidate(false)
            setEmail(value);
            props.indexArray === -1 ? props.update(props.index, value) : props.update(props.indexArray,props.index, value)
            
        } else {
            setEmail(value);
        }
    }

    return (
        <div>
            <CustomInput
                labelText={props.nombre}
                id={props.nombre}
                formControlProps={{
                    fullWidth: true,
                    required: true,
                }}
                inputProps={{
                    type: "text",
                    onChange: (e) => actualizar(e.target.value),
                    value: email,
                }}
            />
            {validate && <span style={{ color: "red" }} >El correo se encuentra mal escrito.</span>}
        </div>
    )

}