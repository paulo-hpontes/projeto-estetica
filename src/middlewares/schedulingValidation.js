const { body } = require("express-validator");

const schedulingValidation = () => {
  return [
    body("date")
      .isNumeric()
      .withMessage({message:["Escolha uma data"]}),

    body("time")
      .isNumeric()
      .withMessage({message:["Escolha um horário"]}),
  ];
};

module.exports = {
  schedulingValidation
}