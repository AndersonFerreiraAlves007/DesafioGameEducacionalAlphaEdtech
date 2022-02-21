const { makeRouter } = require('../../utils/templateRoutes')

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
      console.log('UIUIU 1')
      console.log(body)
      console.log('UIUIU 2')
      return {
        status: true,
        message: 'Sucesso',
        bodyValidate: body
      }
    }
  }
)

module.exports = router;
