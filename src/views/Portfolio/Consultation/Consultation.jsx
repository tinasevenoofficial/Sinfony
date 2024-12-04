/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

import { useCRUD, useBoolean, useFetch } from 'hooks';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardText from 'components/Card/CardText';
import globalStyles from 'assets/jss/material-dashboard-pro-react/views/common';

import { Filter, Details, Table, DetailsClient, TableWithoutClient } from './components';

const portfolioPerAge = [18305000, 24305000, 54305000, 14305000];

const ConsultationPortfolio = () => {
  const globalClasses = globalStyles();
  const { data, loading, error } = useFetch('/api/creditos');

  const { fields, remove, append, update, replace } = useCRUD([]);
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedShowClient, setSelectedShowClient] = useState(null); 
  const [fieldsCreditClient, setFieldsCreditClient] = useState([]);
  const [dataOnlyClient, setDataOnlyClient] = useState([]);
  const [subLoading, setSubLoading] = useState(false);
  const [open, setOpen] = useBoolean(false);

  const handleSelected = ({ target }) => {
    console.log(target.value);
    setSelectedClient(target.value);
  };

  useEffect(() => {
    if (data && data.clientes) {
      replace(data.clientes);
    } else if (error) {
      console.error("Error al obtener clientes:", error);
    }
  }, [data, error, replace]);

  useEffect(() => {
    if (selectedClient !== 'all') {
      credits_client();
    }
  }, [selectedClient]);

  const client = useMemo(
    () =>
      selectedClient !== 'all'
        ? fields.find(({ id_clientes }) => id_clientes === selectedClient)
        : { id_clientes: '0', nombres: 'TODOS', apellidos: '' },
    [selectedClient, fields]
  );

  const showClient = useMemo(
    () => fields.find(({ id_clientes }) => id_clientes === selectedShowClient),
    [selectedShowClient, fields]
  );

  const credits_client = () => {
    setSubLoading(true);
    axios
      .get(`/api/creditos_cliente/${selectedClient}`)
      .then((res) => {
        setFieldsCreditClient(res.data || []);
        setDataOnlyClient(res.data || []);
        setSubLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener créditos del cliente:", err);
        setSubLoading(false);
      });
  };

  const onOpen = (id) => {
    setSelectedShowClient(id);
    setOpen(true);
  };

  const onClose = () => {
    setSelectedShowClient(null);  
    setOpen(false);
  };

  const create = (data) => {
    axios
      .post('/api/clientes', data)
      .then((res) => {
        append(res.data); //Preguntar si aqui agrega para que se vea en la tabla
        onClose();
      })
      .catch((err) => {
        console.error("Error al crear cliente:", err);
      });
  };

  const edit = (id, data) => {
    axios
      .put(`/api/clientes/${id}`, data)
      .then((res) => {
        update(id, res.data);
        onClose();
      })
      .catch((err) => {
        console.error("Error al editar cliente:", err);
      });
  };

  const _delete = (id) => {
    axios
      .delete(`/api/clientes/${id}`)
      .then(() => {
        remove(id);
        onClose();
      })
      .catch((err) => {
        console.error("Error al eliminar cliente:", err);
      });
  };

  const onSave = (data, id) => {
    if (id) {
      edit(id, data);
    } else {
      create(data);
    }
  };

  return (
    <Card>
      <CardHeader color="primary" text>
        <CardText className={globalClasses.cardText} color="primary">
          <h4 className={globalClasses.colorWhite}>Consultas a cartera</h4>
        </CardText>
      </CardHeader>
      <CardBody>
        <Filter clients={fields} loading={loading} selected={selectedClient} handleSelected={handleSelected} />
        {!loading && !subLoading && (
          <Details
            client={client}
            data={data}
            selected={selectedClient}
            dataOnlyClient={dataOnlyClient}
            loading={selectedClient !== 'all' ? subLoading : loading}
            portfolioPerAge={portfolioPerAge}
          />
        )}
        {selectedClient === 'all' ? (
          <TableWithoutClient clients={fields} loading={loading} onDelete={_delete} onOpen={onOpen} />
        ) : (
          <Table client={fieldsCreditClient} loading={subLoading} />
        )}
        <DetailsClient open={open} onClose={onClose} onSubmit={onSave} client={showClient} />
      </CardBody>
    </Card>
  );
};

export default ConsultationPortfolio;
