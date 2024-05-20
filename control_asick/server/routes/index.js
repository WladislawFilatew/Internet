const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const serverRouter = require('./serverRouter')
const mainerRouter = require('./mainerRouter')
const uslovRouter = require('./uslovRouter')

router.use('/user', userRouter)
router.use('/server', serverRouter )
router.use('/mainer', mainerRouter)
router.use('/uslov', uslovRouter)

module.exports = router
