const { body } = require("express-validator");

const schedulingValidation = () => {
  return [
    body("date")
      .isNumeric()
      .withMessage("Escolha uma data"),

    body("time")
      .isNumeric()
      .withMessage("Escolha um horário"),
  ];
};

module.exports = {
  schedulingValidation
}