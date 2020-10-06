const { Schema, model } = require('mongoose')

const videoSchema = new Schema({
    video : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
        trim : true
    },
    description :{
        type : String,
        required : true,
        trim : true
    },
    course :{
        type : Schema.Types.ObjectId,
        ref : 'course'
    },
    questions : [{
        type : Schema.Types.ObjectId,
        ref : 'questions'
    }]
})

const Videos = model('videos', videoSchema)

module.exports = Videos