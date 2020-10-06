const { Schema, model } = require('mongoose')

const QuestionsSchema = new Schema({
    question : {
        type : String,
        required : yes
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'consumer'
    },
    replies : [{
        type : Schema.Types.ObjectId,
        ref : 'replies'
    }],
    video : {
        type : Schema.Types.ObjectId,
        ref : 'videos'
    },
})

const Questions = model('questions', QuestionsSchema)

module.exports = Questions