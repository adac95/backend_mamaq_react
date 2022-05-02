const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

const userSchema = new Schema({

        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
});

// userSchema.pre('save', async function (next) {
//     const hash = await bcrypt.hash(this.password, 10)
//     this.password = hash
//     next()
// })

// const comparePassword = async function(password) {
//     const compare = await bcrypt.compare(password, this.password)
//     return compare
// }

const UserModel = mongoose.model("user", userSchema); 
module.exports =  UserModel