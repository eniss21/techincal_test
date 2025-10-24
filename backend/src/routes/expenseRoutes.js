const express = require("express");
const {
  createExpense,
  getExpense,
  getExpensesByCategoryId,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const router = express.Router();

router.route("/").post(createExpense);
router.route("/category/:categoryId").get(getExpensesByCategoryId);
router.route("/:id").get(getExpense).patch(updateExpense).delete(deleteExpense);

module.exports = router;
