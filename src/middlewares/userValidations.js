const { body } = require("express-validator");

const userCreateValidate = () => {
  return [
    body("name")
      .isString()
      .withMessage({message: ["O nome é obrigatório!"]})
      .isLength({ min: 4 })
      .withMessage({message: ["O nome precisa ter no mínimo 4 caracteres!"]}),

    body("email")
      .isString()
      .withMessage({message: ["O E-mail é obrigatório!"]})
      .isEmail()
      .withMessage({message: ["Insira um e-mail válido!"]}),

    body("password")
      .isString()
      .withMessage({message: ["A senha é obrigatória!"]})
      .isLength({ min: 6 })
      .withMessage({message: ["A senha precisa ter no mínimo 6 caracteres!"]}),

    body("confirmPassword")
      .isString()
      .withMessage({message: ["A confirmação de senha é obrigatória!"]})
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error({message: ["As senhas não são iguais!"]});
        }
        return true;
      }),
  ];
};

const loginValidate = () => {
  return [
    body("email")
      .isString()
      .withMessage({message: ["O e-mail é obrigatório!"]})
      .isEmail()
      .withMessage({message: ["Insira um e-mail válido!"]}),

    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage({message: ["A senha é obrigatória!"]})
  ];
};


module.exports = {
  userCreateValidate,
  loginValidate,
};
