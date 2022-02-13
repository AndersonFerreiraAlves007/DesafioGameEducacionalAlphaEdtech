const { makeRouter } = require('../../utils/templateRoutes')
const { driveDatabase: Database } = require('../../utils/driveDatabase')

const router = makeRouter('resources/scenes/database.json', {
  validateCreate: ({ name }, scenes) => {
    for(let i = 0; i < scenes.length; i+=1) {
      if(scenes[i].name === name) return false
    }
    return true
  },
  validateUpdate: (id, { name }, scenes) => {
    for(let i = 0; i < scenes.length; i+=1) {
      if(scenes[i].name === name && scenes[i].id !== id) return false
    }
    return true
  }
})

router.get('/:id/items', async (req, res) => {
  const scene_id = parseInt(req.params.id, 10)
  const databaseScene = new Database('resources/scenes/database.json')
  const databaseItems = new Database('resources/items/database.json')

  const scene = await databaseScene.getResources({ id: scene_id });

  if(scene.length === 0) {
    return null
  }

  const itens = await databaseItems.getResources({ scene_id });

  res.json({
    ...scene[0],
    itens
  })

})

module.exports = router;
