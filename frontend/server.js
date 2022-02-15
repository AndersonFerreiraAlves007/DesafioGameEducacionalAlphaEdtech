const express = require('express')

const PORT = 3334

const app = express()

app.use(express.static('src'))

app.listen(PORT, () => {
    console.log(`linten => http://localhost:${PORT}`);
})
