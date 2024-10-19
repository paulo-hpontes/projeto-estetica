const { body } = require("express-validator");

const serviceValidation = () => {
  return [
    body("serviceType")
      .isString()
      .withMessage("Tipo do serviço é obrigatório!"),

    body("serviceName")
      .isString()
      .withMessage("Nome do serviço é obrigatótio!"),

    body("serviceValue")
      .isNumeric()
      .withMessage("Valor do serviço é obrigatório!"),
  ];
};

const updateServiceValidation = () => {
  return [
    body("serviceName")
      .isString()
      .withMessage("Nome do serviço é obrigatótio!"),

    body("serviceValue")
      .isNumeric()
      .withMessage("Valor do serviço é obrigatório!"),
  ];
};

module.exports = {
  serviceValidation,
  updateServiceValidation
};
