import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Form } from "antd";
import { EXTERNAL_API_PATHS, FILTER_DAYS } from "../utils/constants";

const useTable = ({ key }) => {
  const [formEdit] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);

  //   const searchInput = useRef();

  const getDeposito = (id = 1) => {
    setLoading(true);
    const dataForm = FILTER_DAYS.filter((filter) => filter.id === id)[0];
    axios
      .get(
        `${EXTERNAL_API_PATHS[key]}${
          dataForm.fechaInicio
            ? `?fechaInicio=${dataForm.fechaInicio}${
                dataForm.fechaFin ? `&fechaFin=${dataForm.fechaFin}` : ""
              }`
            : ""
        }`
      )
      .then((res) => {
        setData(
          res.data.map((item) => {
            return {
              ...item,
              fecha_radicacion_string: moment(item.fecha_radicacion).isValid()
                ? moment(item.fecha_radicacion).format("LLL")
                : "No disponible",
            };
          })
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getDeposito();
  }, []);

  return {
    formEdit,
    formCreate,
    data,
    setDays: getDeposito,
    loading,
  };
};

export default useTable;
