// src/components/SubmitButton.js
import React from 'react';
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";

const SubmitButton = ({
    template,
    forms,
    setIsLoading,
    setProgress,
    setCurrent,
    setMessages,
    setJobId,
    setDownloadUrl,
    setError,
    openModal
}) => {

    // Función para manejar la generación real de documentos
    const handleRealSubmit = async () => {
        if (!template) {
            alert('Por favor, carga una plantilla DOCX.');
            return;
        }
        if (forms.length === 0) {
            alert('Por favor, agrega al menos un formulario.');
            return;
        }

        const formData = new FormData();
        formData.append('template', template);

        forms.forEach((form, index) => {
            const blob = new Blob([JSON.stringify(form)], { type: 'application/json' });
            formData.append('json_files', blob, `formulario_${index + 1}.json`);
        });

        try {
            // Iniciar el trabajo real en el backend
            const response = await axios.post('http://localhost:8000/generate-docs', formData);
            const { job_id } = response.data;

            // Actualizar el estado
            setJobId(job_id);
            setIsLoading(true);
            setProgress(0);
            setCurrent('Iniciando...');
            setMessages(['Trabajo iniciado.']);
            openModal();
        } catch (error) {
            console.error('Error al enviar los datos al backend:', error);
            setError('Ocurrió un error al iniciar el procesamiento de los documentos.');
        }
    };

    // Función para manejar la simulación de generación de documentos
    const handleSimulateSubmit = async () => {
        try {
            // Iniciar la simulación en el backend
            const response = await axios.post('http://localhost:8000/simulate-docs');
            const { job_id } = response.data;

            // Actualizar el estado
            setJobId(job_id);
            setIsLoading(true);
            setProgress(0);
            setCurrent('Iniciando simulación...');
            setMessages(['Simulación iniciada.']);
            openModal();
        } catch (error) {
            console.error('Error al iniciar la simulación en el backend:', error);
            setError('Ocurrió un error al iniciar la simulación.');
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            {/* Botón para Generar Documentos Reales */}
            <Button onClick={handleRealSubmit} color="success">
                Generar
            </Button>
        </div>
    );
};

export default SubmitButton;
