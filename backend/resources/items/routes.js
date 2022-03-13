const { cargo_admin, cargo_user } = require('../../utils/constants')
const { makeRouter } = require('../../utils/templateRoutes')

const router = makeRouter('resources/items/database.json', {
  validateCreate: (body, items) => {
    return {
      status: true,
      message: 'Sucesso',
      bodyValidate: body
    }
  },
  validateUpdate: (id, body, items) => {
    return {
      status: true,
      message: 'Sucesso',
      bodyValidate: body
    }
  },
  middlewareAutorizationCreate: (body, user_id, cargo) => cargo === cargo_admin,
  middlewareAutorizationUpdate: (resource, user_id, cargo) => cargo === cargo_admin,
  middlewareAutorizationDelete: (resource, user_id, cargo) => cargo === cargo_admin,
  middlewareAutorizationTruncate: (user_id, cargo) => cargo === cargo_admin,
})

module.exports = router;
