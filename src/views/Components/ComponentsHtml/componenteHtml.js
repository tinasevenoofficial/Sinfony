import React, { useEffect, useState } from 'react';

function ComponenteHtml(props) {

    let [letra, setLetra] = useState("")
    let [negrilla, setNegrilla] = useState(false)
    let [italica, setItalica] = useState(false)
    let [size, setSize] = useState("")

    //obtener estilo para la función de html dependiendo de su estilo 

    useEffect(() => {
        setLetra(props.letra)
        setNegrilla(props.negrilla)
        setItalica(props.italica)
        setSize(props.size)
    }, [props.letra,
    props.negrilla,
    props.italica,
    props.size])
    if (negrilla && italica) {
        return (
            <b><i><span style={{ fontSize: size, fontFamily: letra }}>{props.texto}</span></i></b>
        )
    } else {
        if (negrilla) {
            return (
                <b><span style={{ fontSize: size, fontFamily: letra }}>{props.texto}</span></b>
            )
        } else if (italica) {
            return (
                <i><span style={{ fontSize: size, fontFamily: letra }}>{props.texto}</span></i>
            )
        } else {
            return (
                <span style={{ fontSize: size, fontFamily: letra }}>{props.texto}</span>
            )
        }
    }


}

export default ComponenteHtml;