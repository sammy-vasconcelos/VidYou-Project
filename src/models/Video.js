const mongoose = require("mongoose")
const { Schema } = mongoose

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    linkVideo: {
        type: String,
        required: true
    },
    tumbnail: {
        type: String,
        required: true
    },
  },
  {timestamps: true}
) 

const Video = mongoose.model("Video", videoSchema)

module.exports = {Video, videoSchema}