const { request, response } = require("express")


const validarSecret = (req = request, res = response, next) => {
    const secret = req.header('secret')
    if(!secret) {
        return res.status(401).json({msj: 'No tienes permisos'})
    }
    if(secret !== process.env.SECRET_KEY){
        return res.status(401).json({msj: 'Secret incorrecto!'})
    }
    next()
}

module.exports = { validarSecret }