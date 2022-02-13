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
        ...body,
        xp_food: xp_food_initial,
        xp_fun: xp_fun_initial,
        xp_hygiene: xp_hygiene_initial,
      }
    },
  }
)

module.exports = router;
