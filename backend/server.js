const express = require('express')
const http = require('http');
const cors = require('cors')
const { Server } = require("socket.io");
const itemsRouter = require('./resources/items/routes')
const petsRouter = require('./resources/pets/routes')    
const scenesRouter = require('./resources/scenes/routes')    
const usersRouter = require('./resources/users/routes')  
const tasks = require('./tasks')
const { driveDatabase: Database  } = require('./utils/driveDatabase')
const { dadosGlobais } = require('./dados-globais')

const PORT = 3333

const tasksExecute = Object.values(tasks)

const configCors = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

tasksExecute.forEach(({ task, time }) => {
  setInterval(task, time)
})

const app = express()

/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
})  */

app.get('/', (req, res) => {
  res.send('API GAME EDUCACIONA VERSÃO: 2.0.9')
})

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

dadosGlobais.io = io

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // saber o que é
app.use(cors(configCors))

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

server.listen(PORT)

