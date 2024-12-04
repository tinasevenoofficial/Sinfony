import React from "react";
import PropTypes from "prop-types";

// CSS Custom Steps
import "./styles/NavBar.css";

import { Steps } from "antd";

const { Step } = Steps;

export default function Stepper({
  steps,
  onChange,
  value,
  stepsDisabled,
  ...others
}) {
  return (
    <>
      <Steps type="navigation" current={value} onChange={onChange} {...others}>
        {steps.map(({ title, description, Icon }, id) => (
          <Step
            title={title}
            description={description}
            icon={<Icon />}
            key={id}
            disabled={stepsDisabled.includes(id)}
          />
        ))}
      </Steps>
    </>
  );
}

Stepper.defaultProps = {
  steps: [],
  value: 0,
  stepsDisabled: [],
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.element,
    })
  ),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  stepsDisabled: PropTypes.arrayOf(PropTypes.number),
};
