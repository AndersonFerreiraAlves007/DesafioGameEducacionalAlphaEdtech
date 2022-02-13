const express = require('express')
const cors = require('cors')
const itemsRouter = require('./resources/items/routes')
const petsRouter = require('./resources/pets/routes')    
const scenesRouter = require('./resources/scenes/routes')    
const usersRouter = require('./resources/users/routes')  
const tasks = require('./tasks')
const { driveDatabase: Database  } = require('./utils/driveDatabase')

const PORT = 3333

const tasksExecute = Object.values(tasks)

tasksExecute.forEach(({ task, time }) => {
  setInterval(task, time)
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/items', itemsRouter)
app.use('/pets', petsRouter)
app.use('/scenes', scenesRouter)
app.use('/users', usersRouter)

app.put('/truncate', async (req, res) => {

  const databaseUsers = new Database('resources/users/database.json')
  await databaseUsers.truncate()
  const databasePets = new Database('resources/pets/database.json')
  await databasePets.truncate()
  const databaseScenes = new Database('resources/scenes/database.json')
  await databaseScenes.truncate()
  const databaseItems = new Database('resources/items/database.json')
  await databaseItems.truncate()

  res.json({
    status: true,
    message: 'Banco de dados resetado'
  })
})

app.listen(PORT)
