const express = require('express')
const http = require('http');
const cors = require('cors')
const cookieParser = require("cookie-parser");
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

console.log('Frontend: ' + process.env.HOST_FRONTEND)
console.log('Env: ' + process.env.NODE_ENV)

const configCors = {
  origin: "https://gameeducacional.andersonferreiraalves.com",
  credentials: true,
  optionSuccessStatus: 200,
}

tasksExecute.forEach(({ task, time }) => {
  setInterval(task, time)
})

const app = express()

app.get('/', (req, res) => {
  process.env.HOST_FRONTEND,
  res.send('API GAME EDUCACIONA VERSÃO: 2.0.10')
})

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

dadosGlobais.io = io

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // saber o que é
app.use(cors(configCors))
app.use(cookieParser());

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

