// requiring the bcrypt package
const bcrypt = require("bcrypt");

// hashing the password to signin
exports.hash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwd = await bcrypt.hash(password, salt);
  return passwd;
};

// comparing the password and the hash password to login
exports.compare = async (password, syspassword) => {
  const passwd = await bcrypt.compare(password, syspassword);
  return passwd;
};
