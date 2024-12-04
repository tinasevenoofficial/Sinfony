import React from 'react';
import Button from "components/CustomButtons/Button.js";

const TemplateUploader = ({ template, setTemplate }) => {
    const handleFileChange = (event) => {
        setTemplate(event.target.files[0]);
    };

    return (
        <div>
            <input type="file" accept=".docx" onChange={handleFileChange} />
            <Button
            disabled={!template}
            >
            {template ? `Plantilla cargada: ${template.name}` : 'Cargar Plantilla'}
            </Button>
        </div>
    );
}

export default TemplateUploader;