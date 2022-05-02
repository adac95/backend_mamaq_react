const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
    imagen: { 
        filename: {type: String},
        path: {type: String},
        originalname: {type: String},
        mimetype: {type: String},
        size: { type: Number},
        created_at: {type: Date, default: Date.now()}
    }
})

const model = mongoose.model('products', mySchema)

module.exports = model