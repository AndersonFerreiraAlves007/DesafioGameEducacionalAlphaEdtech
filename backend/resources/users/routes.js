const { makeRouter } = require('../../utils/templateRoutes')
const { driveDatabase: Database } = require('../../utils/driveDatabase')

const router = makeRouter('resources/users/database.json', {
  validateCreate: (body, users) => {
    for(let i = 0; i < users.length; i+=1) {
      if(users[i].username === username) return {
        status: false,
        message: `Username ${username} já está cadastrado!`,
        bodyValidate: body
      }
    }
    return {
      status: true,
      message: 'Sucesso',
      bodyValidate: body
    }
  },
  validateUpdate: (id, body, users) => {
    for(let i = 0; i < users.length; i+=1) {
      if(users[i].username === body.username && users[i].id !== id) return {
        status: false,
        message: `Username ${body.username} já está cadastrado!`,
        bodyValidate: body
      }
    }
    return {
      status: true,
      message: 'Sucesso',
      bodyValidate: body
    }
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const databaseUser = new Database('resources/users/database.json')

  const users = await databaseUser.getResources({ username })

  if(users.length === 0) {
    res.json({
      status: false,
      message: "Usuário não cadastrado!",
      data: null
    })
  } else {
    if(users[0].password === password) {
      res.json({
        status: true,
        message: "Logado com sucesso!",
        data: null
      })
    } else {
      res.json({
        status: false,
        message: "Senha incorreta!",
        data: null
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
    res.json({
      status: false,
      message: "Id não encontrado!",
      data: null
    })
  } else {
    const pets = await databasePets.getResources({ user_id });
    res.json({
      status: true,
      message: "Sucesso",
      data: {
        ...user[0],
        pets
      }
    })
  }

})

module.exports = router;
