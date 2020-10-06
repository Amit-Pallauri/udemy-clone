const { Schema, model } = require('mongoose')

const QuestionsSchema = new Schema({
    reply : {
        type : String,
        required : true,
        trim : true
    },
    question : {
        type : Schema.Types.ObjectId,
        ref : 'questions'
    },
    uploaderReply : {
        type : Schema.Types.ObjectId,
        ref : 'uploader'
    },
    consumerReply : {
        type : Schema.Types.ObjectId,
        ref : 'consumer'
    }
})

const Questions = model('questions', QuestionsSchema)

module.exports = Questions