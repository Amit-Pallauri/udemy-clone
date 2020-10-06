const { Schema, model } = require('mongoose')

const coursesSchema = new Schema({
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
    category : {
        type : String,
        enum : ['Cooking', 'Coding', 'finance'],
        required : true
    },
    price : {
        type : Number,
        required : true,
        trim : true
    },
    videos: [{
        type : Schema.Types.ObjectId,
        ref : 'videos'
    }],
    uploader : {
        type : Schema.Types.ObjectId,
        ref : 'uploader'
    },
    revenue : {
        type : Number,
        required : false,
        default : 0
    }   
})

const Courses = model('course', coursesSchema)

module.exports = Courses