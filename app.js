const express = require('express')
const { config } = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser')
const AppError = require('./utils/appError') 
const cors = require('cors')
config()
require('./db')
const app = express()

app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended : true }))
app.use( bodyParser.json())
app.use(express.json())

const uploaderApiRoute = require('./routes/uploaderApiRoute')
const consumerApiRoute = require('./routes/consumerApiRoutes')
const errorHandler = require('./handler/errorHandler')

app.use(uploaderApiRoute)
app.use(consumerApiRoute)

app.all( '*', (req, _, next) => {
  next(new AppError(`can not find route ${req.originalUrl} in this server`, 404))
})

app.use(errorHandler)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get('*', (req, res)=>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app