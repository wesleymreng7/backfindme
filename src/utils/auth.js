const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const decoded = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.contributor = decoded.data.id
    next();
  } catch (error) {
    res.send({
      status: 400,
      error: error.message,
      message: "Credenciais incorretas",
    });
  }
};




const setPassword = async (password) => {
  try {
    const encrypt = await crypt.hash(password, 10);
    return encrypt;
  } catch (error) {
    throw error;
  }
};

const checkPassword = async (textPass, hashPass) => {
  try {
    const match = crypt.compare(textPass, hashPass);
    return match;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  setPassword,
  checkPassword,
  verifyToken
};
