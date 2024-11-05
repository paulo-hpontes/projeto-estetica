const { body } = require("express-validator");

const schedulingValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage({ message: ["Nome de usuário é necessário!"] }),

    body("start")
      .isString()
      .withMessage({ message: ["Horário do agendamento é necessário!"] }),

    body("service")
      .isObject()
      .withMessage({ message: ["Tipo do serviço é obrigatório!"] }),

    body("userEmail")
      .isString()
      .optional()
      .withMessage({ message: ["E-mail de usuário é necessário!"] }),
  ];
};

module.exports = {
  schedulingValidation,
};
