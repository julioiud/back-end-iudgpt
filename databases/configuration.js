const mongoose = require('mongoose')

const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'eco-recycle',
            autoCreate: true
        })
        console.log('Conexion exitosa!')
    } catch(e){
        console.log('Error de conexion', e)
        throw new Error('Error de conexion')
    }
}

module.exports = { mongoConnection }