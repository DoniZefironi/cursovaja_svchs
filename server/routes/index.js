const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const methodRouter = require('./methodRouter')
const specialityRouter = require('./specialityRouter')
const subjectRouter = require('./subjectRouter')
const syllabusRouter = require('./syllabusRouter')


router.use('/user', userRouter)
router.use('/method', methodRouter)
router.use('/speciality', specialityRouter)
router.use('/subject', subjectRouter)
router.use('/syllabus', syllabusRouter)

module.exports = router