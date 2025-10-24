const Category = require("../model/categoryModel");
const Expense = require("../model/expenseModel");

// Create a category
const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json({ ok: true, data: category });
  } catch (err) {
    // Handle duplicate key error (unique constraint)
    if (err.code === 11000) {
      return res.status(409).json({
        ok: false,
        error: "Category name already exists",
      });
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        ok: false,
        error: messages.join(", "),
      });
    }

    return res.status(400).json({ ok: false, error: err.message });
  }
};

// Get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res.status(404).json({ ok: false, error: "No categories found" });
    }

    const categoriesWithTotal = await Promise.all(
      categories.map(async (category) => {
        const expenses = await Expense.find({ categoryId: category._id });
        const totalAmount = expenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );

        return {
          ...category.toObject(),
          totalAmount,
        };
      })
    );

    return res.status(200).json({
      ok: true,
      data: categoriesWithTotal,
      results: categoriesWithTotal.length,
    });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
};

// Get single category
const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ ok: false, error: "Category not found" });
    }

    return res.status(200).json({ ok: true, data: category });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
};

// Update category
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ ok: false, error: "Category not found" });
    }

    return res.status(200).json({ ok: true, data: category });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        ok: false,
        error: "Category name already exists",
      });
    }

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        ok: false,
        error: messages.join(", "),
      });
    }

    return res.status(400).json({ ok: false, error: err.message });
  }
};

// Delete category
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ ok: false, error: "Category not found" });
    }

    await Expense.deleteMany({ categoryId: req.params.id });

    await Category.findByIdAndDelete(req.params.id);

    return res.status(204).json({ ok: true, data: null });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
