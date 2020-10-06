const { connect } = require('mongoose')
const { MONGO_URI, MONGO_PASS } = process.env

connect(MONGO_URI.replace('<password>', MONGO_PASS), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify  : false
}).then(()=>{
    console.log('database connected')
})
