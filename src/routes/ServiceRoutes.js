const router = require("express").Router();

// Service Controller
const {
  newService,
  deleteService,
  updateService,
  getAllService,
  getServiceById
} = require("../controllers/ServicesController");

// Service Middleware
const {
  serviceValidation,
  updateServiceValidation,
} = require("../middlewares/serviceValidation");
const authUser = require("../middlewares/authUser");
const validate = require("../middlewares/handleValidation");

// Service Routes
router.get('/', getAllService);
router.post('/', authUser, serviceValidation(), validate, newService);
router.put('/:id', authUser, updateServiceValidation(), validate, updateService);
router.get('/:id', getServiceById);
router.delete("/:id", authUser, deleteService);

module.exports = router;
