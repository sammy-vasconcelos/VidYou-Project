require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const app = express()

app.use(cors())
app.use(express.json())  // faz o express processar json



//Models
const User = require('./src/models/User')



// Rota pública
app.get('/', (req,res) => {
    res.status(200).json({msg: 'Bem vindo a minha API!!'})
})


// Rota Privada (precisa do token do login para acessar)
app.get("/user/:id", checkToken, async(req,res) => {
    const id = req.params.id

    //checar se user existe
    const user = await User.findById(id, '-password')
    if(!user){
        return res.status(404).json({msg: 'user não encontrado'})
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next){
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


//Registro
// app.post('/auth/register', async(req,res) => {
//     const {name, email, password, confirmpassword} = req.body

//     //Validações
//     if(!name) {
//         return res.status(422).json({msg: 'nome obrigatório!'})
//     }
//     if(!email) {
//         return res.status(422).json({msg: 'email obrigatório!'})
//     }
//     if(!password) {
//         return res.status(422).json({msg: 'senha obrigatória!'})
//     }
//     if(password !== confirmpassword) {
//         return res.status(422).json({msg: 'as senhas não conferem'})
//     }
    
//     // Checar se user já existe

//     const userExists = await User.findOne({ email:email })
//     if(userExists) {
//         return res.status(422).json({msg: 'Email já cadastrado'})
//     }


    // //Criar senha
    // const  salt = await bcrypt.genSalt(12)
    // const passwordHash = await bcrypt.hash(password, salt)

    // //Criar user 
    // const user = new User({
    //     name, 
    //     email,
    //     password: passwordHash
    // })

    // try {
    //     await user.save()
    //     res.status(201).json({msg:"Usuario criado com sucesso" })
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({msg: "Erro no server"})
    // }
// })


// // Login User
// app.post("/auth/login", async(req,res) => {
//     const {email, password} = req.body

//     // validações 
//     if(!email) {
//         return res.status(422).json({msg: 'email obrigatório!'})
//     }
//     if(!password) {
//         return res.status(422).json({msg: 'senha obrigatória!'})
//     }

//     //checar se o user existe
//     const user = await User.findOne({ email:email })
//     if(!user) {
//         return res.status(404).json({msg: 'Usuário não encontrado.'})
//     }

//     //checar se a senha é igual
//     const checkPass = await bcrypt.compare(password, user.password)
//     if(!checkPass){
//         return res.status(422).json({msg: 'Senha inválida.'})
//     }

//     try {
//         const secret = process.env.SECRET
//         const token = jwt.sign(
//             {
//             id: user._id
//             },
//             secret,
//          )

//          res.status(200).json({msg:"Autenticação realizada com sucesso", token})

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({msg: "erro no server"})
//     }
// })



// Router
const routes = require('./src/routes/router')
app.use("/api", routes)

// DB connection
const conn = require('./src/database/mongoConn')
conn();
//__________________________________________________

app.listen(3000, () => { console.log('Servidor rodando :)') })


