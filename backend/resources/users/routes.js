const { makeRouter } = require('../../utils/templateRoutes')
const { driveDatabase: Database } = require('../../utils/driveDatabase')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret_jwt_access_token, expire_in_jwt_access_token, cargo_user, cargo_admin } = require('../../utils/constants');
const {
  xp_food_initial,
  xp_fun_initial,
  xp_hygiene_initial
} = require('../../utils/constants')

function validateCreate(body, users) {
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
      password: bcrypt.hashSync(body.password, salt),
      cargo: cargo_user
    }
  }
}

function validateUpdate(id, body) {
  return {
    status: true,
    message: '',
    bodyValidate: body
  }
}

function middlewareAdd(resourceAdd) {
  return resourceAdd
}

function middlewareAutorizationCreate(body, user_id, cargo) {
  return true
}

function middlewareAutorizationUpdate(resource, user_id, cargo) {
  return true
}

function middlewareAutorizationDelete(resource, user_id, cargo) {
  return true
}

function middlewareAutorizationTruncate(user_id, cargo) {
  return true
}

const defaultProps = {
  validateCreate,
  validateUpdate,
  middlewareAdd,
  middlewareAutorizationCreate,
  middlewareAutorizationUpdate,
  middlewareAutorizationDelete,
  middlewareAutorizationTruncate,
  isAutorizationCreate: true
}

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
  },
  middlewareAutorizationCreate: (body, user_id, cargo) => {
    if(cargo === cargo_admin) {
      return true
    } else {
      return false
    }
  },
  middlewareAutorizationUpdate: (resource, user_id, cargo) => {
    if(cargo === cargo_admin) {
      return true
    } else {
      if(user_id === resource.id) {
        return true
      } else {
        return false
      }
    }
  },
  middlewareAutorizationDelete: (resource, user_id, cargo) => cargo === cargo_admin,
  middlewareAutorizationTruncate: (user_id, cargo) => cargo === cargo_admin,
})

router.post('/register', async (req, res) => {
  const { username, password, namePet } = req.body

  const databaseUser = new Database('resources/users/database.json', defaultProps)

  const databasePets = new Database('resources/pets/database.json')

  const { resource: user, message: messageUser } = await databaseUser.addResource({ username, password })
  
  const { resource: pet, message: messagePet } = await databasePets.addResource({ 
    name: namePet, 
    user_id: user.id, 
    color: '#00a1cc',
    xp_food: xp_food_initial,
    xp_fun: xp_fun_initial,
    xp_hygiene: xp_hygiene_initial, 
  })

  if(user) 
    res.json({
      status: true,
      data: { user, pet },
      message: "Sucesso"
    }) 
  else {
    res.json({
      status: false,
      data: null,
      message: messageUser
    })
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
      const token = jwt.sign({ user_id: users[0].id, cargo: users[0].cargo ? users[0].cargo : cargo_user }, secret_jwt_access_token, { expiresIn: expire_in_jwt_access_token });
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json({
          status: true,
          message: "Logado com sucesso!",
          data: {
            user_id: users[0].id,
            token
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
