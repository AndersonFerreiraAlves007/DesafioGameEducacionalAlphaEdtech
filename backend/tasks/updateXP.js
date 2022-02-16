const { readDatabase, writeDatabase } = require('../utils/driveDatabase')
const {
  xp_food_reduce,
  xp_fun_reduce,
  xp_hygiene_reduce
} = require('../utils/constants')

async function updateXP() {
  const pathDatabase = 'resources/pets/database.json'
  const database = await readDatabase(pathDatabase)
  const pets = database.rows.map(pet => {
    return {
      ...pet,
      xp_food: (pet.xp_food - xp_food_reduce > 0) ? pet.xp_food - xp_food_reduce : 0,
      xp_fun: (pet.xp_fun - xp_fun_reduce > 0) ? pet.xp_fun - xp_fun_reduce : 0,
      xp_hygiene: (pet.xp_hygiene - xp_hygiene_reduce > 0) ? pet.xp_hygiene - xp_hygiene_reduce : 0,
    }
  })
  await writeDatabase({
    autoIncrement: database.autoIncrement,
    rows: pets
  }, pathDatabase)
}

module.exports = updateXP