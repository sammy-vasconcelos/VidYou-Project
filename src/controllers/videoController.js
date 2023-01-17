const {Video: VideoModel} = require('../models/Video')
const videoController = {
    create: async(req,res) => {
        try {
            const video = {
                title: req.body.title,
                description: req.body.description,
                linkVideo: req.body.linkVideo,
                tumbnail: req.body.tumbnail
            }

            const response = await VideoModel.create(video)
            res.status(201).json({msg:"Video criado com sucesso", response})

        } catch (error) {
            console.log(error)
        }
    },

    getAll: async(req,res) => {
        try {
            const videos = await VideoModel.find()
            res.json(videos)
        } catch (error) {
            console.log(error)
        }
    },

    getOne: async(req,res) => {
        try{
        const id = req.params.id
        const video = await VideoModel.findById(id)

        if(!video){
            res.status(404).json({msg:"Video não encontrado."})
            return
        }

        res.json(video)
        } catch (error){
            console.log(error)
        }
    },

    delete: async(req,res) => {
        const id = req.params.id
        const video = await VideoModel.findById(id)

        if(!video){
            res.status(404).json({msg:"Video não encontrado."})
            return
        }

        const deleteVideo = await VideoModel.findByIdAndDelete(id)
        res.status(200).json({deleteVideo, msg:"Vídeo deletado com sucesso."})

    },

    update: async(req,res) => {
        try {

            const id = req.params.id
            const video = {
                title: req.body.title,
                description: req.body.description,
                linkVideo: req.body.linkVideo,
                tumbnail: req.body.tumbnail
            }
            const videoUpdate = await VideoModel.findByIdAndUpdate(id, video)

            if(!video){
                res.status(404).json({msg:"Video não encontrado."})
                return
            }

            res.status(200).json({videoUpdate, msg:"Video alterado com sucesso."}) 
            
        } catch (error) {
            console.log(error)
        }
        
    }
}

module.exports = videoController