const UserModel = require('../models/Users')

async function addUser(username, email, password, roles) {
    const data = {username, email, password, roles};
    const newUser = UserModel(data)

    await newUser.save()
    return newUser
}

async function getUsers() {
    const users = await UserModel.find()
    return users
}

async function getUser(id) {
    const user = await UserModel.findById(id);
    return user;
}

async function deleteUser(id) {
    const user = await UserModel.findByIdAndDelete(id);
    return user
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    deleteUser,
}