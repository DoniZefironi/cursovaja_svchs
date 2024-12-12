const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const methodRouter = require('./methodRouter')
const specialityRouter = require('./specialityRouter')
const subjectRouter = require('./subjectRouter')
const syllabusRouter = require('./syllabusRouter')
// const form_studiesRouter = require('./form_studiesRouter')
// const speciality_methodsRouter = require('./speciality_methodsRouter')
const type_methosRouter = require('./type_methosRouter')
// const user_methodologicalsRouter = require('./user_methodologicalsRouter')


router.use('/user', userRouter)
router.use('/method', methodRouter)
router.use('/speciality', specialityRouter)
router.use('/subject', subjectRouter);
router.use('/syllabus', syllabusRouter)
// router.use('/form_study', form_studiesRouter)
// router.use('/speciality_method', speciality_methodsRouter)
router.use('/type_method', type_methosRouter)
// router.use('/user_methodological', user_methodologicalsRouter)

module.exports = router