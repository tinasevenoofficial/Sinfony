
import React, { useState, useEffect } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function InputTextArea(props) {
    const [textarea, setTextArea] = useState(props.valor);

    const actualizar = (value) => {
        console.log("TextArea" + value)
        setTextArea(value);
        props.indexArray === -1 ? props.update(props.index, value) : props.update(props.indexArray,props.index, value)
    }

    return (
        <div>
            <TextareaAutosize
                placeholder={props.nombre}
                id={props.nombre}
                onChange={(e) => actualizar(e.target.value)}
                value={textarea}
                formControlProps={{
                    fullWidth: true,
                    required: true,
                }}

            />
        </div>
    )

}