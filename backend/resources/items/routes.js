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
  }
})

module.exports = router;
