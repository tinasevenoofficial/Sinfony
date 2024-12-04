import React, { useState } from "react";
import axios from 'axios';
import { EXTERNAL_API_PATHS } from 'utils/constants';

// core components
import Button from "components/CustomButtons/Button.js";

// importar modal

import { message,  } from 'antd';


export default function DeleteDepostio ({ id, set, filtro }) {
    const [] = useState([]);
    const eliminar = () => {
        message.warning('eliminando datos...');
        axios.delete(EXTERNAL_API_PATHS+"/"+id)
        .then((response) => {

            if(response.status === 201){

                set(filtro);
                message.success('Datos eliminados correctamente');
            }
            else{
                console.log(response.status)
                message.error('Ha ocurrido un error');
            }
        })
    };

    return(
        
            <Button 
                justIcon
                color="danger"
                className="lassesButton.marginRight"
                onClick={eliminar}>
                <span class="material-icons">
                    delete
                </span>
            </Button>
        
    );
}