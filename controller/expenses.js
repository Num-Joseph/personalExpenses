const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const saveExpenses = async (req, res, next) => {
  try {
    const data = req.body;
    const expenses = await prisma.expenses.create({
      data,
    });
    res.status(201).json({
      task,
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

const getExpenses = async (req, res, next) => {
  try {
    const expenses = await prisma.expenses.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json({
      expenses,
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

const singleExpenses = async (req, res, next) => {
  try {
    const id = req.params.id;
    const expenses = await prisma.task.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json({
      expenses,
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

const removeExpenses = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await prisma.expenses.delete({
      where: {
        id,
      },
    });
    res.status(404).json({
      message: "Expenses has been deleted",
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

const updateExpenses = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const expenses = await prisma.expenses.update({
      where: {
        id,
      },
      data,
    });
    res.status(201).json({
      expenses,
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = {
  saveExpenses,
  updateExpenses,
  removeExpenses,
  getExpenses,
  singleExpenses,
};
