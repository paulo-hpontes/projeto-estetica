const { body } = require("express-validator");

const serviceValidation = () => {
  return [
    body("serviceType")
      .isString()
      .withMessage({message: ["Tipo do serviço é obrigatório!"]}),

    body("serviceName")
      .isString()
      .withMessage({message: ["Nome do serviço é obrigatótio!"]}),

    body("serviceValue")
      .isInt({min:1})
      .withMessage({message: ["Valor do serviço é obrigatório!"]}),
  ];
};

const updateServiceValidation = () => {
  return [
    body("serviceName")
      .isString()
      .withMessage({message: ["Nome do serviço é obrigatótio!"]}),

    body("serviceValue")
      .isInt({min:1})
      .withMessage({message: ["Valor do serviço é obrigatório!"]}),
  ];
};

module.exports = {
  serviceValidation,
  updateServiceValidation
};
