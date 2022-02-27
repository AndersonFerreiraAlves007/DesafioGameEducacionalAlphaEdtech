if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')

const PORT = 3334

const app = express()

app.use(express.static('src'))

app.use('/login', express.static('src/pages/login-register.html'))

app.get('/utils/constants.js', (req, res) => {
    res.append('Content-Type', 'application/javascript; charset=UTF-8');
    //res.header("Content-Type", "application/javascript")
    //res.type('application/json')
    res.send(
        `
            const HOST_API = "${process.env.HOST_API}"

            export {
                HOST_API
            }
        `
    )
})

app.listen(PORT, () => {
    console.log(`linten => http://localhost:${PORT}`);
})
