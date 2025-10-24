const express = require("express");

const categoryRouter = require("./routes/categoryRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const app = express();

app.set("query parser", "extended");
app.use(express.json());

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/expenses", expenseRouter);

module.exports = app;
