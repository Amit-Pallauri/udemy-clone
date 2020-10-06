const { verify } = require('jsonwebtoken');
const Uploader = require("../models/Uploader");
const Consumer = require('../models/Consumer')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { privatekey } = process.env

module.exports = {
    uploaderToken : catchAsync( async (req, res, next) => {
        const token = req.headers.authorization
        if(!token) return next(new AppError('token needed', 400 ))
        const foundUser = await Uploader.findOne({accessToken : token})
        if(!foundUser) return next(new AppError('invalid credentials', 400 ))
        verify(token, privatekey, (err, _)=>{
            if(err && err.name == 'JsonWebTokenError') return next(new AppError('invalid credentials', 400 ))
            else if(err && err.name == 'TokenExpiredError') return next(new AppError('token expired', 400 ))
            next()
        })    
    }),

    consumerToken : catchAsync( async (req, res, next) => {
        const token = req.headers.authorization
        if(!token) return next(new AppError('token needed', 400 ))
        const foundUser = await Consumer.findOne({accessToken : token})
        if(!foundUser) return next(new AppError('invalid credentials', 400 ))
        verify(token, privatekey, (err, _)=>{
            if(err && err.name == 'JsonWebTokenError') return next(new AppError('invalid credentials', 400 ))
            else if(err && err.name == 'TokenExpiredError') return next(new AppError('token expired', 400 ))
            next()
        })    
    })
}