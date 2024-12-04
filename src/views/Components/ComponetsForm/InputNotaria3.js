
import React, { useState, useEffect } from "react";

export default function InputNotaria3(props) {

    const [direcNotaria, setDirecNotaria] = useState('Calle 24 #12 - 62');

    const updateNotaria = () => {
        props.indexArray === -1 ? props.update(props.index, direcNotaria) : props.update(props.indexArray, props.index, direcNotaria)
    }
    return (
        updateNotaria()
    )
}