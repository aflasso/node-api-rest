const express = require('express')
require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
    res.send('¡Bienvenido a Express!')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})