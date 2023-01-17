const router = require('express').Router()

//user router
const userRouter = require('./authPublicRouter')
router.use('/', userRouter)

// video router
const videoRouter = require('./videoRouter')
router.use("/", videoRouter)

module.exports = router