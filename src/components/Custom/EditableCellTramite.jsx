import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Input, Form, DatePicker, Space } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "../../assets/jss/material-dashboard-pro-react/views/common";

const EditableCell = (props) => {
  const {
    record,
    editing,
    dataIndex,
    title,
    children,
    inputType,
    form,
    ...restProps
  } = props;

  const [state, setState] = useState("Seleccione...");
  const classes = useStyles();

  const handleFile = (e) => {
    setState(e.target.files[0].name);
    form.setFieldsValue({
      link: e.target.files[0],
    });
  };

  const handleDate = (date, dateString) => {
    form.setFieldsValue({
      [dataIndex]: dateString,
    });
  };

  let inputNode = null;
  if (editing) {
    switch (inputType) {
      case "date":
        inputNode = (
          <Space direction="vertical">
            <DatePicker
              locale={locale}
              onChange={handleDate}
              defaultValue={
                dataIndex === "startDate"
                  ? moment(record.startDate)
                  : moment(record.expiration)
              }
            />
          </Space>
        );
        break;
      case "file":
        inputNode = (
          <>
            <Input
              value={state}
              className={classes.label}
              addonAfter={
                <label htmlFor="link">
                  <IconButton
                    color="primary"
                    size="small"
                    aria-label="Subir archivo"
                    component="span"
                  >
                    <AttachFileIcon fontSize="inherit" />
                  </IconButton>
                </label>
              }
            />
            <input
              id="link"
              name="link"
              type="file"
              accept="application/pdf"
              onChange={handleFile}
              hidden
            />
          </>
        );
        break;
      default:
        inputNode = <Input />;
    }
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Agregue ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

EditableCell.defaultProps = {
  record: null,
  editing: false,
  dataIndex: "",
  title: "",
  children: null,
  inputType: "",
};

EditableCell.propTypes = {
  /*record: PropTypes.objectOf(
    PropTypes.shape({
      activo: PropTypes.string,
    })
  ),*/
  record: PropTypes.object,
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  inputType: PropTypes.string,
  form: PropTypes.shape({
    setFieldsValue: PropTypes.func,
  }),
};

export default EditableCell;
