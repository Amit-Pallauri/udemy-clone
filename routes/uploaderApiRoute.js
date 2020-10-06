const router = require('express').Router()
const { signUp, signIn, signOut, createCourse, addVideos } = require('../controllers/uploaderApiController')
const { uploaderToken } = require('../middlewares/authenticate')
const upload = require('multer')

router.post('/uploader/signUp', signUp)
router.post('/uploader/signIn', signIn)
router.delete('/uploader/signOut', uploaderToken, signOut)
router.post('/createCourse', uploaderToken, createCourse)
router.post('/addVideo/:courseId',upload().single('video'), uploaderToken, addVideos)

module.exports = router
