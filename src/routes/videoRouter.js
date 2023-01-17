const router = require('express').Router()
const videoController = require('../controllers/videoController')

router.route("/video").post((req,res) => videoController.create(req,res))

router.route("/videos").get((req,res) => videoController.getAll(req,res))

router.route("/videos/:id").get((req,res) => videoController.getOne(req,res))

router.route("/videos/:id").delete((req,res) => videoController.delete(req,res))

router.route("/videoupdate/:id").put((req,res) => videoController.update(req,res))

module.exports = router