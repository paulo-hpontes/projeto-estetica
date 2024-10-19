const router = require("express").Router();

// Scheduling Controller
const {
  newScheduling,
  deleteScheduling,
  getAllScheduling,
  getSchedulingById,
} = require("../controllers/SchedulingController");

// Scheduling Middleware
const { schedulingValidation } = require("../middlewares/schedulingValidation");
const authUser = require("../middlewares/authUser");
const validate = require("../middlewares/handleValidation");

// Scheduling Routes
router.post("/", authUser, schedulingValidation(), validate, newScheduling);
router.delete("/:id", authUser, deleteScheduling);
router.get('/', getAllScheduling);
router.get('/:id', getSchedulingById);

module.exports = router;