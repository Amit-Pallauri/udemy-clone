const AppError = require("../utils/appError")

const handleCastError = err => {
  const message = `Inavlid ${err.path} : ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicateDBError = err => {
  const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);
  const message = `Duplicate field Value : ${value}. please try with another`
  return new AppError(message, 400)
}

const handleValidationError = err =>{
  const errors = Object.values(err.errors).map(  el => el.message )
  const message = `Invalid input data : ${errors.join('. ')}`
  return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status : err.status,
    error : err,
    message : err.message,
    stack : err.stack 
  })
}

const sendErrorProd = (err, res) => {
  if(err.isOperational){
    res.status(err.statusCode).json({
      status : err.status,
      message : err.message 
    })
  }else {
    console.log('ERROR', err)
    res.status(500).json({
      status : 'fail',
      message : 'something went wrong' 
    })
  }
}

module.exports = (err, req, res, next ) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'fail'
    
    if(process.env.NODE_ENV === 'development'){
      sendErrorDev(err, res)
    }else if(process.env.NODE_ENV === 'production'){
      let error = {...err}
      if(err.name == 'CastError') error = handleCastError(err)
      if(err.code == 11000) error = handleDuplicateDBError(err)
      if(err.name == 'ValidationError') error = handleValidationError(err)
      sendErrorProd(error, res)
    }
  }