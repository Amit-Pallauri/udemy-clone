const router = require('express').Router()
const {
    signUp,
    signIn,
    signOut,
    getCourses,
    getParticularCourse,
    buyCourse,
    getUserData
} = require('../controllers/consumerApiController')
const { consumerToken } = require('../middlewares/authenticate')

router.post('/consumer/signUp', signUp)
router.post('/consumer/signIn', signIn)
router.delete('/consumer/signOut', consumerToken, signOut)
router.get('/getallCourses', getCourses)
router.get('/getParticularCourse/:courseId', getParticularCourse)
router.post('/buyCourse/:courseId', consumerToken, buyCourse)
router.get('/getUserData', getUserData)

module.exports = router