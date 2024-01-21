const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PORT = 7070;

app.use(bodyParser.json());

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log("Hashing password error", error);
    throw error;
  }
}
const newExpenses = await prisma.expenses.create({
  data: {
    name: "Note Book",
  },
});
const expenses = await prisma.expenses.findOne({
  where: {
    id: 1,
  },
});
console.log(expenses);
const updatedExpenses = await prisma.expenses.update({
  where: {
    id: 1,
  },
  data: {
    name: "Updated Expenses",
  },
});
const deletedExpenses = await prisma.expenses.delete({
  where: {
    id: 1,
  },
});

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
