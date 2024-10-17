const router = require("express").Router();

// controller
const {
  register,
  login,
  getCurrentUser,
  getUserById,
} = require("../controllers/UserController");


// Middlewares
const authUser = require("../middlewares/authUser");
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidate,
  loginValidate,
} = require("../middlewares/userValidations");

// Routes
router.post("/register", userCreateValidate(), validate, register);
router.post("/login", loginValidate(), validate, login);
router.get("/profile", authUser, getCurrentUser);
router.get("/:id", getUserById);

module.exports = router;