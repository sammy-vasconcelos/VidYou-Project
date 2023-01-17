const router = require('express').Router()
const { checkToken } = require('../controllers/userController')
const userController = require('../controllers/userController')

router.route("/register").post((req, res) => userController.create(req,res))

router.route("/user").get((req,res) => userController.getAll(req,res))

router.route("/user/:id").get(checkToken,(req,res) => userController.getOne(req,res))

router.route("/userdelete/:id").delete(checkToken,(req,res) => userController.deleteUser(req,res))

router.route("/userUpdate/:id").put(checkToken,(req,res)=> userController.update(req,res))

router.route("/userLogin").post((req,res)=> userController.login(req,res))


module.exports = router