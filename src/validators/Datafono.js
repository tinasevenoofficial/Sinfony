import { messages } from "./messages";

const rules = {
  banco: {
    presence: {
      message: messages.BLANK,
      allowEmpty: false,
    },
  },
  tipo_tarjeta: {
    presence: {
      message: messages.BLANK,
      allowEmpty: false,
    },
  },
};

export default rules;
