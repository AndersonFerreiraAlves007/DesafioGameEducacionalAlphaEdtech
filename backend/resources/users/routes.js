const { makeRouter } = require('../../utils/templateRoutes')
const { driveDatabase: Database } = require('../../utils/driveDatabase')
const bcrypt = require("bcrypt");

const router = makeRouter('resources/users/database.json', {
  validateCreate: (body, users) => {
    for(let i = 0; i < users.length; i+=1) {
      if(users[i].username === body.username) return {
        status: false,
        message: `Username ${body.username} já está cadastrado!`,
        bodyValidate: body
      }
    }
    const salt = bcrypt.genSaltSync(10);
    return {
      status: true,
      message: 'Sucesso',
      bodyValidate: {
        ...body,
        password: bcrypt.hashSync(body.password, salt)
      }
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
    const salt = bcrypt.genSaltSync(10);
    return body.password ? {
      status: true,
      message: 'Sucesso',
      bodyValidate: body
    } : {
      status: true,
      message: 'Sucesso',
      bodyValidate: {
        ...body,
        password: bcrypt.hashSync(body.password, salt)
      }
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
      data: {
        user_id: -1
      }
    })
  } else {
    if(bcrypt.compareSync(password, users[0].password)) {
      res.json({
        status: true,
        message: "Logado com sucesso!",
        data: {
          user_id: users[0].id
        }
      })
    } else {
      res.json({
        status: false,
        message: "Senha incorreta!",
        data: {
          user_id: -1
        }
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
