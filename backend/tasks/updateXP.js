const { driveDatabase: Database } = require('../utils/driveDatabase')
const {
  xp_food_reduce,
  xp_fun_reduce,
  xp_hygiene_reduce
} = require('../utils/constants')
const { dadosGlobais } = require('../dados-globais')

async function updateXP() {
  const pathDatabase = 'resources/pets/database.json'
  const database = new Database(pathDatabase)
  const rows = await database.getResources()
  for (let pet of rows) {
    const body = {
      ...pet,
      xp_food: (pet.xp_food - xp_food_reduce > 0) ? pet.xp_food - xp_food_reduce : 0,
      xp_fun: (pet.xp_fun - xp_fun_reduce > 0) ? pet.xp_fun - xp_fun_reduce : 0,
      xp_hygiene: (pet.xp_hygiene - xp_hygiene_reduce > 0) ? pet.xp_hygiene - xp_hygiene_reduce : 0
    }
    await database.updateResource(pet.id, body)
  }
  dadosGlobais.io.emit("update pets", "")
}

  module.exports = updateXP
