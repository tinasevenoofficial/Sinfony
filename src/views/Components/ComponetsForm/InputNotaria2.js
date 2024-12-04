
import React, { useState, useEffect } from "react";

export default function InputNotaria2(props) {

    const [notario, setNotario] = useState('Yeison Lopez');

    const updateNotaria = () => {
        props.indexArray === -1 ? props.update(props.index, notario) : props.update(props.indexArray, props.index, notario)
    }
    return (
        <div>
            {updateNotaria()}
        </div>
    )
}