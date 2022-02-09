const express = require('express')
const cors = require('cors')

const PORT = 3333

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// rotas

app.listen(PORT)
