// src/components/ProgressModal.js
import React, { useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  CircularProgress,  
} from '@material-ui/core/';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

const ProgressModal = ({ isOpen, onDismiss, progress, current, latestMessage, messages }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <Modal open={isOpen} onClose={onDismiss}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <div spacing={2}>
          <div direction="row"  >
            <Typography variant="h6">Procesando Documentos</Typography>
            <IconButton onClick={onDismiss} aria-label="Cerrar">
              <CloseIcon />
            </IconButton>
          </div>

          <div >
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Procesando documentos...
            </Typography>
          </div>

          <div spacing={1}>
            <Typography>Progreso: {progress}%</Typography>
            <Typography>Actual: {current}</Typography>
            <Typography>Último mensaje: {latestMessage}</Typography>
          </div>

          <Button
            variant="outlined"
            startIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={toggleExpand}
            fullWidth
          >
            {isExpanded ? 'Colapsar Historial' : 'Expandir Historial'}
          </Button>

          {isExpanded && (
            <Box
              sx={{
                maxHeight: 300,
                overflowY: 'auto',
                border: '1px solid #ccc',
                p: 1,
                mt: 2,
                borderRadius: 1,
              }}
            >
              {messages.length === 0 ? (
                <Typography variant="body2">No hay mensajes de log disponibles.</Typography>
              ) : (
                messages.map((msg, idx) => (
                  <Typography key={idx} variant="body2">
                    {msg}
                  </Typography>
                ))
              )}
            </Box>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default ProgressModal;
