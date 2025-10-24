const Expense = require("../model/expenseModel");
const Category = require("../model/categoryModel");

// Create a new expense
const createExpense = async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);
    return res.status(201).json({ ok: true, data: expense });
  } catch (err) {
    // Handle validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        ok: false,
        error: messages.join(", "),
      });
    }

    // Handle invalid ObjectId for categoryId
    if (err.name === "CastError") {
      return res.status(400).json({
        ok: false,
        error: "Invalid category ID format",
      });
    }

    return res.status(400).json({ ok: false, error: err.message });
  }
};

// Get a single expense by id
const getExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ ok: false, error: "Expense not found" });
    }

    return res.status(200).json({ ok: true, data: expense });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        ok: false,
        error: "Invalid expense ID format",
      });
    }

    return res.status(400).json({ ok: false, error: err.message });
  }
};

// Get expenses by category id
const getExpensesByCategoryId = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ categoryId: req.params.categoryId });
    if (!expenses || expenses.length === 0) {
      return res
        .status(404)
        .json({ ok: false, error: "No expenses found for this category" });
    }

    return res.status(200).json({
      ok: true,
      data: expenses,
      results: expenses.length,
    });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
};

// Update an expense
const updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!expense) {
      return res.status(404).json({ ok: false, error: "Expense not found" });
    }

    return res.status(200).json({ ok: true, data: expense });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        ok: false,
        error: messages.join(", "),
      });
    }

    if (err.name === "CastError") {
      return res.status(400).json({
        ok: false,
        error: "Invalid ID format",
      });
    }

    return res.status(400).json({ ok: false, error: err.message });
  }
};

// Delete an expense
const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ ok: false, error: "Expense not found" });
    }

    return res.status(204).json({ ok: true, data: null });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports = {
  createExpense,
  getExpense,
  getExpensesByCategoryId,
  updateExpense,
  deleteExpense,
};
