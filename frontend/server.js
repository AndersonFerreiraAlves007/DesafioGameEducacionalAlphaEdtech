const express = require('express')

const PORT = 3334

const app = express()

app.use(express.static('src'))

app.use('/login', express.static('src/pages/login-register.html'))

app.listen(PORT, () => {
    console.log(`linten => http://localhost:${PORT}`);
})
