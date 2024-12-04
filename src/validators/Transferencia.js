import { messages } from "./messages";

const rules = {
  banco: {
    presence: {
      message: messages.BLANK,
      allowEmpty: false,
    },
  },
  numero_transferencia: {
    presence: {
      message: messages.BLANK,
      allowEmpty: false,
    },
  },
};

export default rules;
