const express = require("express");
const cors = require("cors");

const categoryRouter = require("./routes/categoryRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/expenses", expenseRouter);

module.exports = app;
