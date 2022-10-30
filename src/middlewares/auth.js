const User = require("../api/users/user.model");
const { verifyJwt } = require("../utils/jwt/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
        error = new Error("Unauthorized");
      return next(error);
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken);
    const userLogged = await User.findById(validToken.id);

    userLogged.password = null;
    req.user = userLogged;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isAuth };
