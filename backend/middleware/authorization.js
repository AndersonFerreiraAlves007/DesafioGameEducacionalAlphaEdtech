const { secret_jwt_access_token } = require("../utils/constants");
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies)
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, secret_jwt_access_token);
    req.user_id = data.user_id;
    req.cargo = data.cargo;
    console.log(req.user_id)
    console.log(req.cargo)
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = authorization
