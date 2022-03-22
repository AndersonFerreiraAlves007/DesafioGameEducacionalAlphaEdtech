const { makeRouter } = require('../../utils/templateRoutes')
const { driveDatabase: Database } = require('../../utils/driveDatabasePG')
const { cargo_admin, cargo_user } = require('../../utils/constants')

const router = makeRouter('resources/scenes/database.json', {
  validateCreate: (body, scenes) => {
    for(let i = 0; i < scenes.length; i+=1) {
      if(scenes[i].name === body.name) return {
        status: false,
        message: `Name ${body.name} já está cadastrado!`,
        bodyValidate: body
      }
    }
    return {
      status: true,
      message: 'Sucesso',
      bodyValidate: body
    }
  },
  validateUpdate: (id, body, scenes) => {
    for(let i = 0; i < scenes.length; i+=1) {
      if(scenes[i].name === body.name && scenes[i].id !== id) return {
        status: false,
        message: `Name ${body.name} já está cadastrado!`,
        bodyValidate: body
      }
    }
    return {
      status: true,
      message: 'Sucesso',
      bodyValidate: body
    }
  },
  middlewareAutorizationCreate: (body, user_id, cargo) => true,
  middlewareAutorizationUpdate: (resource, user_id, cargo) => cargo === cargo_admin,
  middlewareAutorizationDelete: (resource, user_id, cargo) => cargo === cargo_admin,
  middlewareAutorizationTruncate: (user_id, cargo) => cargo === cargo_admin,
})

router.get('/:id/items', async (req, res) => {
  const scene_id = parseInt(req.params.id, 10)
  const databaseScene = new Database('resources/scenes/database.json')
  const databaseItems = new Database('resources/items/database.json')

  const scene = await databaseScene.getResources({ id: scene_id });

  if(scene.length === 0) {
    res.json({
      status: false,
      message: "Id não encontrado",
      data: null
    })
  } else {
    const itens = await databaseItems.getResources({ scene_id });
    res.json({
      status: true,
      message: "Senha incorreta!",
      data: {
        ...scene[0],
        itens
      }
    })
  }

})

router.get('/all/with_items', async (req, res) => {
  const databaseScene = new Database('resources/scenes/database.json')
  const databaseItems = new Database('resources/items/database.json')

  const scenes = await databaseScene.getResources();

  const scenesResponse = []

  for(let i = 0; i < scenes.length ; i+=1) {
    const items = await databaseItems.getResources({ scene_id: scenes[i].id });
    scenesResponse.push({
      ...scenes[i],
      items
    })
  }

  res.json({
    status: true,
    message: "Sucesso",
    data: scenesResponse
  })

})

module.exports = router;
