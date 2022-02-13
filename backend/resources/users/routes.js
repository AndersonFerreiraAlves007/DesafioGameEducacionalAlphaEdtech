const { makeRouter } = require('../../utils/templateRoutes')
const { driveDatabase: Database } = require('../../utils/driveDatabase')

const router = makeRouter('resources/users/database.json', {
  validateCreate: ({ username }, users) => {
    for(let i = 0; i < users.length; i+=1) {
      if(users[i].username === username) return false
    }
    return true
  },
  validateUpdate: (id, { username }, users) => {
    for(let i = 0; i < users.length; i+=1) {
      if(users[i].username === username && users[i].id !== id) return false
    }
    return true
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const databaseUser = new Database('resources/users/database.json')

  const users = await databaseUser.getResources({ username })

  if(users.length === 0) {
    res.json({
      status: false,
      message: "Usuário não cadastrado!"
    })
  } else {
    if(users[0].password === password) {
      res.json({
        status: true,
        message: "Logado com sucesso!"
      })
    } else {
      res.json({
        status: false,
        message: "Senha incorreta!"
      })
    }
  }
})

router.get('/:id/pets', async (req, res) => {
  const user_id = parseInt(req.params.id, 10)
  const databaseUser = new Database('resources/users/database.json')
  const databasePets = new Database('resources/pets/database.json')

  const user = await databaseUser.getResources({ id: user_id });

  if(user.length === 0) {
    return null
  }

  const pets = await databasePets.getResources({ user_id });

  res.json({
    ...user[0],
    pets
  })

})

module.exports = router;
