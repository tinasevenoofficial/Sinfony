import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CircularProgress from "@material-ui/core/CircularProgress";

import FacturarEscrituras from "./FacturarEscrituras";
import FinishView from "./FinishView";
import NavBar from "components/Navbars/NavBar";
import Radicacion from "views/Proyectos/Radiacion/Dashboard";
import Liquidar from "views/LiquidacionEscritura/LiquidarEscritura";
import { EXTERNAL_API_PATHS } from "utils/constants";

const defaultDisabled = [1, 2, 3];

export default function RadicacionShow() {
  let { id, step } = useParams();
  let history = useHistory();
  const [view, setView] = useState(step ? parseInt(step) : 0);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState();
  const [idRadicacion, setIdRadicacion] = useState(id);
  const [numRadicacion, setNumRadicacion] = useState(null);
  const [disabled, setDisabled] = useState([]);

  const steps = [
    {
      title: "Radicación",
      description: id ? "Editar radicación" : "Crear radicación",
      Icon: NoteAddIcon,
    },
    {
      title: "Liquidación",
      description: "Liquidar",
      Icon: ViewAgendaIcon,
    },
    {
      title: "Facturación",
      description: "Facturar escritura",
      Icon: PlaylistAddCheckIcon,
    },
    {
      title: "Finalizada",
      description: "Completa",
      Icon: AssignmentTurnedInIcon,
    },
  ];

  const onChange = (c) => {
    setView(c);
    history.push(`/admin/radicacion/${idRadicacion}/${c}`);
  };

  const getDisabled = (stateRad) => {
    if (stateRad === "radicacion") {
      return [2, 3];
    } else if (stateRad === "liquidacion") {
      return [3];
    } else {
      return [];
    }
  };

  const onChangeId = (numRad, idRad) => {
    setIdRadicacion(idRad);
    setNumRadicacion(numRad);
    setDisabled(getDisabled("liquidacion"));
    history.push(`/admin/radicacion/${idRad}/0`);
  };

  useEffect(() => {
    if (idRadicacion) {
      setLoading(true);
      axios
        .get(`${EXTERNAL_API_PATHS.radicaciones}/${idRadicacion}`)
        .then((res) => {
          setNumRadicacion(res.data.numero_radicacion);
          setDisabled(getDisabled(res.data.estado));
          setState(res.data.estado);
          setLoading(false);
        });
    } else {
      setDisabled(defaultDisabled);
    }
  }, []);

  const isVisible = (idView) => {
    return (
      view === idView &&
      !disabled.includes(idView) &&
      !!idRadicacion &&
      !!numRadicacion
    );
  };

  const setStateLiquidacion = (s) => {
    setState(s);
    setDisabled(getDisabled(s));
  };

  const finish = () => {
    onChange(3);
    setDisabled([]);
  };

  return (
    <>
      <a id="top" />

      <NavBar
        onChange={onChange}
        steps={steps}
        stepsDisabled={disabled}
        value={view}
      />
      {loading && (
        <CircularProgress color="secondary" className="d-block mx-auto" />
      )}
      {view === 0 && (
        <Radicacion
          idRad={numRadicacion}
          OnChangeId={onChangeId}
          nextStep={() => onChange(1)}
        />
      )}
      {isVisible(1) && (
        <Liquidar
          id={numRadicacion}
          nextStep={() => onChange(2)}
          state={state}
          setState={setStateLiquidacion}
        />
      )}
      {isVisible(2) && (
        <FacturarEscrituras
          id={idRadicacion}
          numRad={numRadicacion}
          nextStep={finish}
        />
      )}
      {isVisible(3) && <FinishView numRad={numRadicacion} />}
    </>
  );
}
