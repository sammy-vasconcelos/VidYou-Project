const mongoose = require('mongoose');
const { videoSchema } = require('./Video');

//
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
    },
    videos:{
        type: [videoSchema]
    }
   },
   {timestamps: true}       // grava a data da criação do registro e data de atualização
);

const User = mongoose.model("User", userSchema)

module.exports = {User, userSchema}