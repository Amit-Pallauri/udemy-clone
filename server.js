const app = require('./app')
const PORT = process.env.PORT || 1234

process.on('uncaughtException', err =>{
    console.log('UNCAUGHT EXCEPTION!! SHUTTING DOWN...')
    console.log(err.name, err.message)
    process.exit(1)
})

const server = app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!! SHUTTING DOWN...')
    console.log(err.name, err.message)
    server.close(()=>{
        process.exit(1)
    })
})

