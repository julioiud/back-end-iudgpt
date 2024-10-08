const { Router } = require('express')
const { 
    sendMessage
} = require('../controllers/message-controller')
const { validarSecret } = require('../middlewares/validar-secret')
const { validarHacks } = require('../middlewares/valida-hacks')
const router = Router()

router.post(
    '/', 
    [validarSecret, validarHacks], 
    sendMessage
)


module.exports = router