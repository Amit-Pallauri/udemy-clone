const Courses  = require('../models/Courses')
const Consumer = require('../models/Consumer')
const Uploader = require('../models/Uploader')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { verify } = require('jsonwebtoken')
const privateKey = process.env.privateKey
const {createToken} = require('../utils/createToken')
const { populate } = require('../models/Courses')
const stripe = require('stripe')('sk_test_51HUEyCDOfBXcEuEsTZCdBB0EyPYnqaNdEve90jIbZL5aMuJNfLFFHeMtqend6JfcCFOxKnRvfNh4b9y0EzZsnfNk00YehuaxbT')

module.exports = {
    signUp : catchAsync( async (req, res, next) => {
        const newUploader = await Consumer.create({...req.body})
        createToken(newUploader)
        await newUploader.save()
        res.status(200).json({
            status : 'success',
            user : 'consumer',
            message : 'registered successfully',
            data : newUploader
        })    
    }),

    signIn : catchAsync( async (req, res, next) => {
        const {email, password} = req.body
        const foundUser = await Consumer.findByEmailAndPassword(email, password)
        if(!foundUser) return next(new AppError('incorrect credentials', 400))
        createToken(foundUser)
        foundUser.save()
        res.status(200).json({
            status : 'success',
            user : 'consumer',
            message : 'loggedIn successfully',
            data : foundUser
        })    
    }),

    signOut : catchAsync( async (req, res, next) => {
        const token = req.headers.authorization 
        const foundUser = await Consumer.findOneAndUpdate({ accessToken: token }, { accessToken : null })
        if(!foundUser) return next(new AppError( 'invalid credentials', 400 ))
        return res.json({
            status : 'success',
            'message' : 'loggedOut successfully'
        })    
    }),

    getCourses : catchAsync( async (req, res, next) => {
        const foundCourses = await Courses.find({})
        res.json({
            status : 'success',
            message : 'found all cources',
            data : foundCourses
        })    
    }),

    getParticularCourse : catchAsync( async (req, res, next) => {
        const courseId = req.params.courseId
        const foundCourse = await Courses.findById(courseId).populate('videos').populate('uploader')
        if(!foundCourse) return next(new AppError('invalid credentials', 400)) 
        res.json({
            status : 'success',
            message : 'found the course',
            data : foundCourse
        })    
    }),

    buyCourse : catchAsync( async (req, res, next) => {
        const accessToken = req.headers.authorization
        const consumerId =  await verify(accessToken, privateKey)
        const courseId = req.params.courseId
        
        const { amount, source, receipt_email } = req.body
        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source,
            receipt_email
          })
        
        if (!charge) throw new Error('charge unsuccessful')
        
        // update the data in user and in courses
        const foundConsumer = await Consumer.findByIdAndUpdate(consumerId.id, { $push : { courses : courseId }}, { new : true })
        const foundCourse = await Courses.findByIdAndUpdate(courseId , { $inc : { revenue : req.body.ammount}}, { new : true })
        await Uploader.findByIdAndUpdate(foundCourse.uploader, { $inc : { revenue : req.body.ammount}})

        res.json({
            status : 'success',
            message : 'bought the course successfully',
            charge : charge,
            data : foundConsumer
        })    
    }),

    getUserData : catchAsync( async (req, res, next) => {
        const accessToken = req.headers.authorization
        const userId = await verify(accessToken, privateKey)
        if ( userId == null || userId == undefined ){
            return next( new AppError('token expired', 400))
        }
        const foundConsumer = await Consumer.findById(userId.id).populate('courses')
        const foundUploader = await Uploader.findById(userId.id).populate({path : 'courses', model : 'course', populate: { path: 'videos', model : 'videos'}})
        if(!foundUploader && !foundConsumer) return next(new AppError('invalid credentials', 400))
        if( foundConsumer ){
            return res.json({
                status : 'success',
                user : 'consumer',
                data : foundConsumer
            })
        }else if( foundUploader ){
            return res.json({
                status : 'success',
                user : 'uploader',
                data : foundUploader
            })
        }    
    })
}