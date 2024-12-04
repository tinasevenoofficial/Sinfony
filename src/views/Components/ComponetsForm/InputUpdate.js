import React, { useState } from "react";
import CustomInput from "components/CustomInput/CustomInput.js";

export default function InputUpdate(props) {

  const [valor, setValor] = useState(props.valor);
  let campoAgregar;

  const actualizar = (value) => {
    console.log(value)
    setValor(value);
    props.indexArray === -1 ? props.update(props.index, value) : props.update(props.indexArray,props.index, value)
  }

  if (props.tipo === 'date') {
    campoAgregar = <CustomInput
      labelText=""
      formControlProps={{
        fullWidth: true,
        required: true,
      }}
      inputProps={{
        type: props.tipo,
        onChange: (e) => actualizar(e.target.value),
        value: valor,
      }}
    />
  } else if (props.tipo != 'date') {
    campoAgregar = <CustomInput
      labelText={props.nombre}
      formControlProps={{
        fullWidth: true,
        required: true,
      }}
      inputProps={{
        type: props.tipo,
        onChange: (e) => actualizar(e.target.value),
        value: valor,
      }}
    />
  }
  return (
    <div>
      {campoAgregar}
    </div>
  )
}