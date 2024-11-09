const router = require("express").Router();

const {
  payment,
  getAllPayment,
  deletePayment,
  updatePayment,
} = require("../controllers/PaymentController");

const authUser = require("../middlewares/authUser");

router.get("/", getAllPayment);
router.post("/", authUser, payment);
router.put("/:id", authUser, updatePayment);
router.delete("/:id", authUser, deletePayment);

module.exports = router;
