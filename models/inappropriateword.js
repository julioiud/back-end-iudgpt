const { Schema } = require("mongoose")


const InapropiateWordSchema = Schema({
    studentId: {
        type: String
    },
    words : {
        type: String
    },
    createdAt : {
        type: Date,
        default: new Date()
    }
})

module.exports = model('InapropiateWord', InapropiateWordSchema)
