const express = require('express')
const { mongoConnection } = require('./databases/configuration')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')
dotenv.config()

 //mongoConnection()

 app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH', 'TRACE', 'CONNECT'], // Permite métodos
        allowedHeaders: ['Content-Type', 'Authorization', 'token', 'secret'], // Cabeceras permitidas
        credentials: true
    })
)


app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//const usuarios = require('./routes/usuario')
const messages = require('./routes/message')

//app.use('/api/v1/usuarios', usuarios)
app.use('/api/v1/messages', messages)


app.get("*", (req, res) => {
    return res.status(404).json({
        msj: 'No encontrado',
        status: 404
    })
})

module.exports = app