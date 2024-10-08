const { Schema, model } = require('mongoose')

const ChatSchema = Schema({
    question: {
        type: String
    },
    answer : {
        type: String
    },
    studentId : {
        type: String
    },
    courseId : {    
        type: String
    },
    name : {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = model('Chat', ChatSchema)
