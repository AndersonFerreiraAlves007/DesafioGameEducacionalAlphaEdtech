if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')

const PORT = 3334

const app = express()

app.get('/utils/constants.js', (req, res) => {
    res.append('Content-Type', 'application/javascript; charset=UTF-8');
    res.send(
        `
            const HOST_API = "${process.env.HOST_API}";
            const HOST_FRONTEND = "${process.env.HOST_FRONTEND}";

            export {
                HOST_API,
                HOST_FRONTEND
            }
        `
    )
})

app.use('/', express.static('src'))

app.listen(PORT, () => {
    console.log(`linten => ${process.env.HOST_API}`);
})
