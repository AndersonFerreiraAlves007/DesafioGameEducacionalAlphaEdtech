const { secret_jwt_access_token } = require("../utils/constants");
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  let token = req.cookies.access_token;
  if (!token) {
    token = req.headers['our-custom-header']
    console.log('USANDO HEADER')
    console.log(token)
  }
  console.log('REQuistion')
  console.log(req.cookies)
  if (!token) {
    return res.sendStatus(404);
  }
  try {
    console.log('TRY')
    const data = jwt.verify(token, secret_jwt_access_token);
    console.log(data)
    req.user_id = data.user_id;
    req.cargo = data.cargo;
    return next();
  } catch (error) {
    console.log('CATCH')
    console.log(error)
    return res.sendStatus(403);
  }
};

module.exports = authorization
