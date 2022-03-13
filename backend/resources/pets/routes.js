const { makeRouter } = require('../../utils/templateRoutes')
const { cargo_admin, cargo_user } = require('../../utils/constants')

const {
  xp_food_initial,
  xp_fun_initial,
  xp_hygiene_initial
} = require('../../utils/constants')

const router = makeRouter('resources/pets/database.json', 
  {
    middlewareAdd: (body) => {
      return {
        color: '#00a1cc',
        ...body,
        xp_food: xp_food_initial,
        xp_fun: xp_fun_initial,
        xp_hygiene: xp_hygiene_initial,
      }
    },
    validateCreate: (body, pets) => {
      
      return {
        status: true,
        message: 'Sucesso',
        bodyValidate: body
      }
    },
    validateUpdate: (id, body, pets) => {
      return {
        status: true,
        message: 'Sucesso',
        bodyValidate: body
      }
    }, 
    middlewareAutorizationCreate: (body, user_id, cargo) => {
      if(cargo === cargo_admin) {
        return true
      } else {
        if(user_id === body.user_id) {
          return true
        } else {
          return false
        }
      }
    },
    middlewareAutorizationUpdate: (resource, user_id, cargo) => {
      if(cargo === cargo_admin) {
        return true
      } else {
        if(user_id === resource.user_id) {
          return true
        } else {
          return false
        }
      }
    },
    middlewareAutorizationDelete: (resource, user_id, cargo) => cargo === cargo_admin,
    middlewareAutorizationTruncate: (user_id, cargo) => cargo === cargo_admin,
  }
)

module.exports = router;
