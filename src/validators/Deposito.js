import { messages } from "./messages";

const rules = {
  depositos: {
    presence: {
      message: messages.BLANK,
      allowEmpty: false,
    },
  },
  total: {
    presence: {
      message: messages.NOT_EQUAL,
      allowEmpty: false,
    },
  },
};

export default rules;
