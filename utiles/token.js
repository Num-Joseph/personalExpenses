// requiring the jsonwebtoken package
const jwt = require("jsonwebtoken");

exports.signToken = async (payload) => {
  try {
    const token = jwt.sign({ playload }, process.env.SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {}
};
