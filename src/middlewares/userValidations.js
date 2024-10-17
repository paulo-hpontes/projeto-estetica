const { body } = require("express-validator");

const userCreateValidate = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório!")
      .isLength({ min: 4 })
      .withMessage("O nome precisa ter no mínimo 4 caracteres!"),

    body("email")
      .isString()
      .withMessage("O E-mail é obrigatório!")
      .isEmail()
      .withMessage("Insira um e-mail válido!"),

    body("password")
      .isString()
      .withMessage("A senha é obrigatória!")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo 6 caracteres!"),

    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatória!")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("As senhas não são iguais!");
        }
        return true;
      }),
  ];
};

const loginValidate = () => {
  return [
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório!")
      .isEmail()
      .withMessage("Insira um e-mail válido!"),

    body("password")
      .isString()
      .withMessage("A senha é obrigatória!")
  ];
};


module.exports = {
  userCreateValidate,
  loginValidate,
};
