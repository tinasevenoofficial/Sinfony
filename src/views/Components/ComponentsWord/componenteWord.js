import React, { useEffect, useState } from 'react';
import {
    Document,
    Packer,
    Paragraph,
    AlignmentType,
    TextRun,
    Indent,
    Header,
    PageNumber,
} from "docx";

//obtener estilo para la función de word dependiendo de su estilo 
function ComponenteWord(props) {

    if (props.negrilla && props.italica) {
        return (
            new TextRun({ text: props.texto, size: 24, bold: true, italics: true, font: { name: "Arial" } })
        )
    } else {
        if (props.negrilla) {
            return (
                new TextRun({ text: props.texto, size: 24, bold: true, font: { name: "Arial" } })
            )
        } else if (props.italica) {
            return (
                new TextRun({ text: props.texto, size: 24, italics: true, font: { name: "Arial" } })
            )
        } else {
            return (
                new TextRun({ text: props.texto, size: 24, font: { name: "Arial" } })
            )
        }
    }


}

export default ComponenteWord;