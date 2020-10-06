const { verify } = require('jsonwebtoken')
const privatekey = process.env.privatekey
const Courses = require('../models/Courses')
const bufferToString = require('../utils/bufferToString')
const Uploader = require('../models/Uploader')
const {createToken} = require('../utils/createToken')
const cloudinary = require('../utils/cloudinary')
const Videos = require('../models/videos')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

module.exports = {
    signUp : catchAsync(async (req, res, next) => {
            const newUploader = await Uploader.create({...req.body})
            createToken(newUploader)
            await newUploader.save()
            res.status(200).json({
                status : 'success',
                user : 'uploader',
                message : 'registered successfully',
                data : newUploader
            })
    }),

    signIn : catchAsync(async (req, res, next) => {
        const {email, password} = req.body
        const foundUser = await Uploader.findByEmailAndPassword(email, password)
        createToken(foundUser)
        foundUser.save()
        res.status(200).json({
            status : 'success',
            user : 'uploader',
            message : 'loggedIn successfully',
            data : foundUser
        })    
    }),

    signOut : async (req, res, next) => {
        const token = req.headers.authorization 
        const foundUser = await Uploader.findOneAndUpdate({ accessToken: token }, { accessToken : null })
        if(!foundUser) return next(new AppError('invalid credentials', 400))
        return res.json({
            status : 'success',
            'message' : 'loggedOut successfully'
        })    
    },

    createCourse : catchAsync(async (req, res, next) =>{
        const token = req.headers.authorization
        const decoded = await verify(token, privatekey) 
        const newCourse = await Courses.create({...req.body, uploader : decoded.id})
        await Uploader.findByIdAndUpdate(decoded.id, {$push : { courses : newCourse._id }})
        res.json({
            status : 'success',
            message : 'course created',
            data : newCourse
        })    
    }),

    addVideos : catchAsync(async (req, res, next) => {
        const { originalname, buffer } = req.file
        const videoContent = bufferToString( originalname, buffer)
        const { secure_url } = await cloudinary.v2.uploader.upload(
            videoContent, 
            { 
                resource_type: "video", 
                chunk_size: 6000000,
                eager: [
                    { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
                    { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
                eager_async: true,
                eager_notification_url: "https://mysite.example.com/notify_endpoint" 
            })
        const courseId = req.params.courseId
        const newVideo = await Videos.create({...req.body, video : secure_url, course : courseId})
        await Courses.findByIdAndUpdate(courseId, { $push : { videos : newVideo }})
        const foundCourses = await Courses.findById(courseId).populate('videos')
        res.json({
            status : 'success',
            message : 'video added',
            data : foundCourses
        })    
    })
}