import { messages } from "./messages";

const rules = {
  cheque: {
    presence: {
      message: messages.BLANK,
      allowEmpty: false,
    },
    numericality: { noStrings: true },
  },
};

export default rules;
