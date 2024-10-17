const router = require("express").Router();

// controller
const {newScheduling, deleteScheduling} = require('../controllers/SchedulingController');

// middleware
const {schedulingValidation} = require('../middlewares/schedulingValidation');
const authUser = require("../middlewares/authUser");
const validate = require("../middlewares/handleValidation");


// Routes
router.post('/', authUser, schedulingValidation(), validate, newScheduling);
router.delete('/:id', authUser, deleteScheduling);

module.exports = router;