// requiring the express package
const { Router } = require("express");

const authRouter = Router();
const user = require("../controller/auth");
const validation = require("../middlewares/validation");
const Error = require("../middlewares/validationError");

const validate = [...validation, Error.validationError];
authRouter.post("/signUp", validate, user.register);
authRouter.post("/login", user.login);

module.exprts = authRouter;
