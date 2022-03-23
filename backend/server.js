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
const { dadosGlobais } = require('./dados-globais')

const PORT = 3333

const tasksExecute = Object.values(tasks)

const configCors = {
  origin: ["http://localhost:3334", "https://gameeducacional.andersonferreiraalves.com", "https://gutiguti.alphaedtechprojects.website"],
  credentials: true,
  optionSuccessStatus: 200,
}

tasksExecute.forEach(({ task, time }) => {
  setInterval(task, time)
})

const app = express()

app.get('/', (req, res) => {
  process.env.HOST_FRONTEND,
  res.send(`API GAME EDUCACIONA VERSÃO: ${process.env.VERSION}`)
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
app.use(express.urlencoded({ extended: true })) 
app.use(cors(configCors))
app.use(cookieParser());

app.use('/items', itemsRouter)
app.use('/pets', petsRouter)
app.use('/scenes', scenesRouter)
app.use('/users', usersRouter)

server.listen(PORT)

