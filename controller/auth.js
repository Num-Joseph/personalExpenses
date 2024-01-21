const createError = require("http-error");
const prisma = require("../utils/prisma");

const bcrypt = require("../utils/bcrypt");

const checkUser = require("../verification/user");

const jwt = require("../utils/token");
const e = require("express");

exports.register = async (req, res, next) => {
  const data = req.body;
  const checkUserExits = await checkUser(data.email);
  if (checkUserExits) {
    res.status(400).json({
      message: "User account Already Exits",
    });
  } else {
    try {
      data.password = await bcrypt.hash(data.password);
      const user = await prisma.user.create({
        data,
      });
      const token = await jwt.signToken(user.id);
      delete user.password;
      res.status(201).json({
        status: "successful",
        user,
        AccessToken: token,
      });
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }
};
exports.login = async (req, res, next) => {
  try {
    const data = req.body;
    const userExits = await checkUser(data.email);
    if (!userExits) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      const checkPass = await bcrypt.compare(
        data.password,
        userExits,
        password
      );
      if (!checkPass) {
        res.status(422).json({
          message: "Invalid Credentials!",
        });
      } else {
        const token = await jwt.signToken(userExits, id);
        res.status(200).json({
          message: "User succesful logged in!",
          AccessToken: token,
        });
      }
    }
  } catch (e) {
    next(createError(e.statusCode, e.message));
  }
};
