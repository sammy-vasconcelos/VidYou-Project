const mongoose = require('mongoose')
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

async function main(){
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.pbezfhh.mongodb.net/VidyouDb?retryWrites=true&w=majority`)
        console.log('Conectou ao bd')
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main