const router = require("express").Router();

// User Controller
const {
  register,
  login,
  getCurrentUser,
  getUserById,
  updateAdminUser
} = require("../controllers/UserController");


// User Middlewares
const authUser = require("../middlewares/authUser");
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidate,
  loginValidate,
} = require("../middlewares/userValidations");

// User Routes
router.post("/register", userCreateValidate(), validate, register);
router.post("/login", loginValidate(), validate, login);
router.put("/:id", authUser, updateAdminUser);
router.get("/profile", authUser, getCurrentUser);
router.get("/:id", getUserById);

module.exports = router;