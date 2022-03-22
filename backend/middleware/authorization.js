const { secret_jwt_access_token } = require("../utils/constants");
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(404);
  }
  try {
    const data = jwt.verify(token, secret_jwt_access_token);
    req.user_id = data.user_id;
    req.cargo = data.cargo;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = authorization
