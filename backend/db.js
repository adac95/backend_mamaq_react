const mongoose = require('mongoose');
const config = require('./config/index')

// Esto se hace por si hay caracteres especiales y asi se evita que se rompa
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.pnsvs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.Promise = global.Promise

async function connectDB() {
    await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    console.log('Base de datos conectada con exito')
}

module.exports = connectDB;

