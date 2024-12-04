import { messages } from "./messages";

const rules = {
  deudor: {
    presence: {
      message: messages.BLANK,
      allowEmpty: false,
    },
    numericality: { noStrings: true },
  },
};

export default rules;
