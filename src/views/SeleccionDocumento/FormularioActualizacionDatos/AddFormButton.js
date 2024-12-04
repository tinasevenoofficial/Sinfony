// src/components/AddFormButton.js
import React from 'react';
import Button from "components/CustomButtons/Button.js";

const AddFormButton = ({ addForm }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Button onClick={addForm} text="Agregar Formulario" />
        </div>
    );
};

export default AddFormButton;
