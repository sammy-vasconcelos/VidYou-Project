const {User: UserModel, User} = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {

    create: async(req,res) => {

      const {name, channel, email,profile,password,confirmpassword,videos} = req.body

        try {

            // const user = {
            //     name: req.body.name,
            //     channel: req.body.channel,
            //     email: req.body.email,
            //     profile: req.body.profile,
            //     password: req.body.password,
            //     confirmpassword: req.body.confirmpassword,
            //     videos: req.body.videos
            // }
                
            // Validações de campos vazios ////////////////////////////////////
            if(!name) {
                return res.status(422).json({msg: 'Nome obrigatório!'})
            }
            if(!channel) {
                return res.status(422).json({msg: 'Nome do canal obrigatório!'})
            }
            if(!email) {
                return res.status(422).json({msg: 'Email obrigatório!'})
            }
            if(!password) {
                return res.status(422).json({msg: 'Senha obrigatória!'})
            }
            if(password !== confirmpassword) {
                return res.status(422).json({msg: 'as senhas não conferem'})
            }
            ///////////////////////////////////////////////////////////////////


            // Validações caso existam dados iguais////////////////////////////
            // const email = user.email
            const userExists = await UserModel.findOne({ email : email })
            if(userExists) {
                return res.status(422).json({msg: 'Email já cadastrado'})
            }

            // const channel = user.channel
            const channelExist = await UserModel.findOne({ channel : channel})
            if(channelExist){
                return res.status(422).json({msg: 'Canal já existe'})
            }
            ///////////////////////////////////////////////////////////////////

            const  salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            const newUser =  {
                name: name,
                channel: channel,
                email: channel,
                profile: profile,
                password: passwordHash,
                videos: videos

            }

            const response = await UserModel.create(newUser);
            res.status(201).json({response, msg:"Conta criada com sucesso"})

        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req,res) => {
        try {
            const users = await UserModel.find();
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    },

    getOne: async(req,res) => {
        try {
            const id = req.params.id
            const user = await UserModel.findById(id,'-password')

            if(!user){
                res.status(404).json({msg:"user não encontrado"})
                return
            }

            res.json(user)
        } catch (error) {
            console.log(error)
        }
    },

    deleteUser: async(req,res) => {
        try {
            const id = req.params.id
            const user = await UserModel.findById(id)

            if(!user){
                res.status(404).json({msg:"user não encontrado"})
                return
            }

            deletedUser = await UserModel.findByIdAndDelete(id)
            res.status(200).json({deletedUser, msg:"Usuário deletado com sucesso."})


        } catch (error) {
            
        }
    },

    update: async(req,res) => {
        const id = req.params.id
        const user = {
            name: req.body.name,
            channel: req.body.channel,
            profile: req.body.profile,
            videos: req.body.videos
        }

        const updateUser = await UserModel.findByIdAndUpdate(id, user)
        
        if(!updateUser){
            res.status(404).json({msg:"User não encontrado"})
            return
        }

        res.status(200).json({user, msg:"User atualizado com sucesso"})
    },

    login: async(req,res) => {
        const {email,password} = req.body

        if(!email) {
        return res.status(422).json({msg: 'email obrigatório!'})
        }
        if(!password) {
            return res.status(422).json({msg: 'senha obrigatória!'})
        }

        //checar se o user existe
        const user = await User.findOne({ email:email })
        if(!user) {
            return res.status(404).json({msg: 'Usuário não encontrado.'})
        }

        //checar se a senha é igual
        const checkPass = await bcrypt.compare(password, user.password)
        if(!checkPass){
            return res.status(422).json({msg: 'Senha inválida.'})
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign(
             {
             id: user._id
             },
             secret,
            )
            
                res.status(200).json({msg:"Autenticação realizada com sucesso", token})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "erro no server"})
        }
    },

    checkToken: async(req, res, next) =>{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]
    
        if(!token){
            return res.status(401).json({msg: 'Acesso negado'})
        }
    
        try {
            const secret = process.env.SECRET
            jwt.verify(token, secret)
            next()
        } catch (error) {
            res.status(400).json({msg:"Token inválido"})
        }
    }
};

module.exports = userController

