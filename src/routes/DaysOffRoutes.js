const router = require("express").Router();

// DaysOff Controllers
const {
  newDayOff,
  removeDaysOff,
  getAllDaysOff,
} = require("../controllers/DaysOffController");

// DaysOff Middleware
const authUser = require("../middlewares/authUser");

// DaysOff Routes
router.get('/', getAllDaysOff);
router.post('/', authUser, newDayOff);
router.delete('/:id', authUser, removeDaysOff);

module.exports = router;