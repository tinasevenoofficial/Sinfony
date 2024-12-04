// src/components/FormList.js
import React from 'react';
import FormItem from './FormItem';

const FormList = ({ forms, updateForm, removeForm, dataJson }) => {
  
    return (
        <div>
            {forms.length === 0 ? (
                <p>No hay formularios agregados.</p>
            ) : (
                forms.map((form, index) => (
                    <FormItem
                        key={index}
                        index={index}
                        form={form}
                        updateForm={updateForm}
                        removeForm={removeForm}
                        dataJson={dataJson}
                    />
                ))
            )}
        </div>
    );
};

export default FormList;
