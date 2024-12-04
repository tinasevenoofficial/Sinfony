import React from "react";
import PropTypes from "prop-types";
import { Input, Switch, Form } from "antd";

const EditableCell = ({
  record,
  editing,
  dataIndex,
  title,
  children,
  inputType,
  ...restProps
}) => {
  const inputNode =
    inputType === "switch" ? (
      <Switch
        checkedChildren="Activo"
        unCheckedChildren="Inactivo"
        defaultChecked={parseInt(record.activo, 10)}
      ></Switch>
    ) : (
      <Input />
    );
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
  record: PropTypes.arrayOf(
    PropTypes.shape({
      activo: PropTypes.string,
    })
  ),
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  inputType: PropTypes.string,
};

export default EditableCell;
