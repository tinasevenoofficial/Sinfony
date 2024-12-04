// src/App.js
import React, { useState, useEffect } from 'react';
import FormList from './FormList';
import SubmitButton from './SubmitButton';
import ProgressModal from './ProgressModal';
import SweetAlert from "react-bootstrap-sweetalert";
import Button from "components/CustomButtons/Button.js";
import TemplateUploader from './TemplateUploader';
import axios from 'axios';
import { EXTERNAL_API_PATHS } from 'utils/constants';


function App({dataJson, idPlantilla}) {
  const [template, setTemplate] = useState(null);
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState('');
  const [messages, setMessages] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormAdded, setIsFormAdded] = useState(false);  
  const [projects, setProjects] = useState([]); 
  const [selectedProject, setSelectedProject] = useState(null); 
  const [selectedTemplate, setSelectedTemplate] = useState(null); 
  const [templates, setTemplates] = useState([]); 

  // Fetch projects from API
  useEffect(() => {
    axios.get('/api/plantillaDocumentos/proyectos')
      .then(response => {
        console.log('Projects fetched:', response.data); 
        setProjects(response.data); 
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setError('No se pudieron cargar los proyectos.'); 
      });
  }, []);

  // Fetch templates when a project is selected
  useEffect(() => {
    if (selectedProject) {
      const project = projects.find(p => p.codigo === selectedProject);
      if (project) {
        setTemplates(project.plantilla_documentos); // Set the associated templates
      }
    }
  }, [selectedProject, projects]);

  
 // Función para agregar un formulario
 const addForm = () => {
  if (forms.length === 0) {
    setForms([...forms, {}]);  // Agregar formulario vacío
    setIsFormAdded(true);  // Cambiar el estado para indicar que el formulario fue agregado
  }
};
  // Función para actualizar un formulario
  const updateForm = (index, form) => {
    setForms(forms.map((f, i) => (i === index ? form : f)));
  };

   // Función para remover un formulario
   const removeForm = () => {
    setForms([]);  // Eliminar todos los formularios
    setIsFormAdded(false);  // Cambiar el estado para indicar que no hay formulario
  };


  // Función para manejar la apertura del modal
  const openModal = () => {
    setIsModalOpen(true);
  };

   // Función para manejar el cierre del modal
   const closeModal = () => {
    setIsModalOpen(false);
  };

 // Función para resetear el estado después de la descarga
 const resetState = () => {
  setIsLoading(false);
  setProgress(0);
  setCurrent('');
  setMessages([]);
  setJobId(null);
  setDownloadUrl(null);
  setError(null);
  closeModal();
};


  // Función para monitorear el estado del trabajo
  useEffect(() => {
    let interval = null;

    if (jobId && isLoading) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:8000/status/${jobId}`);
          const data = await response.json();

          if (response.ok) {
            setProgress(data.progress);
            setCurrent(data.current);
            setMessages(data.messages);

            if (data.status === 'completado') {
              setDownloadUrl(`http://localhost:8000/download/${jobId}`);
              setIsLoading(false);
              clearInterval(interval);
              closeModal();
            }
          } else {
            setError(data.message || 'Error al obtener el estado del trabajo.');
            setIsLoading(false);
            clearInterval(interval);
            closeModal();
          }
        } catch (err) {
          setError('Error al comunicarse con el servidor.');
          setIsLoading(false);
          clearInterval(interval);
          closeModal();
        }
      }, 2000); // Poll cada 2 segundos
    }

    return () => clearInterval(interval);
  }, [jobId, isLoading]);

  useEffect(() => {
    axios.get(EXTERNAL_API_PATHS.plantillaDocumentos + "/" + idPlantilla).then(async (responsePlantilla) => {
      const response = await axios.get(EXTERNAL_API_PATHS.files + `/${responsePlantilla.data.url_documento}`, { responseType: 'blob' })
      if (response.status === 200) {
        // Crear un Blob a partir de la respuesta binaria
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const fileURL = URL.createObjectURL(blob);
        setTemplate(response.data);
        console.log("Plantilla Cargada!")
      } else {
        console.error('Error en la descarga del archivo:', response.statusText);
      }
    }).catch((e) => {
      console.log(e)
    });
  }, []);

  return (
    <>
  {/* Project Selection */}
<div style={{
 
          borderBottom: '1px solid #ccc',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '15px',
}}>
  {/* Proyectos */}
  <div style={{ marginBottom: '20px' }}>
    <label style={{
      fontSize: '16px',
      color: '#515354',
      marginBottom: '8px',
      marginRight: '4px',
      display: 'inline-block',
    }}>Proyectos</label>
    <select
      value={selectedProject || ''}
      onChange={(e) => setSelectedProject(e.target.value)}
      style={{
        width: '40%',
        padding: '8px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderTop: '1px solid #ccc',
        color: '#515354',
        outline: 'none',
        transition: 'all 0.3s ease',
        marginRight: '4px',
      }}
    >
      <option value="">Seleccione un proyecto...</option>
      {projects.map(project => (
        <option key={project.codigo} value={project.codigo}>
          {project.proyecto}
        </option>
      ))}
    </select>
  </div>

  {/* Plantillas */}
  <div style={{ marginBottom: '8px' }}>
    <label style={{
      fontSize: '16px',
      color: '#515354',
      marginRight: '8px',
      display: 'inline-block',
    }}>Plantillas</label>
    <select
      value={selectedTemplate || ''}
      onChange={(e) => setSelectedTemplate(e.target.value)}
      style={{
        width: '40%',
        padding: '8px',
        fontSize: '14px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        color: '#515354',
        outline: 'none',
        transition: 'all 0.3s ease',
        marginRight: '4px',
      }}
    >
      <option value="">Seleccione una plantilla...</option>
      {templates.map(template => (
        <option key={template.id} value={template.id}>
          {template.nombre_plantilla}
        </option>
      ))}
    </select>
  </div>
</div>


      <div style={{ marginBottom: '20px', alignItems: 'center' }}>
        <Button
          color="primary"
          onClick={isFormAdded ? removeForm : addForm}  
        >
          {isFormAdded ? 'Retirar Formulario' : 'Agregar Formulario'}  
        </Button>
      </div>

      <FormList forms={forms} updateForm={() => {}} removeForm={() => {}} dataJson={dataJson} />
      <SubmitButton
        template={template}
        forms={forms}
        setIsLoading={setIsLoading}
        setProgress={setProgress}
        setCurrent={setCurrent}
        setMessages={setMessages}
        setJobId={setJobId}
        setDownloadUrl={setDownloadUrl}
        setError={setError}
        openModal={openModal}
      />

      {/* Modal de Progreso */}
      <ProgressModal
        isOpen={isModalOpen}
        onDismiss={closeModal}
        progress={progress}
        current={current}
        latestMessage={messages[messages.length - 1] || ''}
        messages={messages}
      />

      {/* Mensaje de Error */}
      {error && (
        <SweetAlert
          onDismiss={() => setError(null)}
          dismissButtonAriaLabel="Cerrar"
        >
          {error}
        </SweetAlert>
      )}

      {/* Enlace de Descarga */}
      {downloadUrl && (
        <SweetAlert
          onConfirmed={resetState}
          isMultiline={false}
        >
          <div>
            <a href={downloadUrl} download="documentos_generados.zip">
              <Button text="Descargar Documentos" />
            </a>
            <Button text="Resetear" onClick={resetState} />
          </div>
          <p>{downloadUrl}</p>
          Documentos generados exitosamente.
        </SweetAlert>
      )}
    </>
  );
}

export default App;
