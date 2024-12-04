
import React, { useState, useEffect } from "react";

export default function InputNotaria(props) {

    const [notaria, setNotaria] = useState('Notaria 51');

    const updateNotaria = () => {
        props.indexArray === -1 ? props.update(props.index, notaria) : props.update(props.indexArray, props.index, notaria)
    }
    return (
        updateNotaria()
    )
}