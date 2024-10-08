const jwt = require('jsonwebtoken')
const { response, request } = require('express')

const hackPatterns = [
    /select.*from/i,          // Intento de SQL injection
    /drop\s+table/i,          // Intento de eliminar tablas
    /insert\s+into/i,         // Intento de manipulación SQL
    /union\s+select/i,        // Unión de consultas SQL para exfiltración de datos
    /<script\b[^>]*>(.*?)<\/script>/i, // Intento de XSS (cross-site scripting)
    /javascript:/i,           // Intento de inyección de JavaScript
    /or\s+1\s*=\s*1/i,        // Bypass SQL mediante "OR 1=1"
    /exec(\s|\()+/i,          // Ejecución de comandos en SQL Server
    /--/i,                    // Comentarios SQL para alterar consultas
    /\/\*/i,                  // Comentarios en SQL para exploits
    /\.\.\/|\.\.\\/i,         // Intentos de Directory Traversal
    /passwd/i,                // Búsqueda de archivos sensibles (ej. passwd en Linux)
    /etc\/passwd/i,           // Búsqueda del archivo passwd en sistemas Unix/Linux
    /base64_decode/i,         // Uso de decodificación para ofuscar ataques
    /benchmark/i,             // Prueba de rendimiento para ataques SQL
    /sleep\(\d+\)/i,          // Intento de Time-based Blind SQL Injection
    /nmap|hydra|metasploit/i  // Herramientas de hacking conocidas
]

const validarHacks = (req = request, res = response, next) => {
    const { message } = req.body

    const textoNormalizado = message.toLowerCase();

    for (let pattern of hackPatterns) {
      if (pattern.test(textoNormalizado)) {
        // TODO: sumar puntos para baneo
        return res.status(404).json({msj: 'Por favor, no uses IUD GPT con malos propósitos'})
      }
    }
    next()
}

module.exports = {
    validarHacks
}