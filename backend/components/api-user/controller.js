const store = require('./store');
const UserModel = require('../models/Users');
const Role = require('../models/Roles')

async function getAllUsers() {
    const users = await store.getUsers();
    return users
}

async function getAUser(id) {
    const user = await store.getUser(id);
    return user;
}

async function deleteUser(id) {
    const user = await store.deleteUser(id);
    return user
}

async function addUser(username, email, password, roles) {
    try {
        let message;
        // verificar que vengan todos los datos
        if (!username || !email || !password) {
            const message = "faltan datos"
            console.log(message)
            return message
        }
        // verificar que no exista el usuario
        const user = await UserModel.findOne({username});
        if (user) {
            message = "The user already exists"
            console.log(message);
            return message
        }
        // verificar que no exista el email
        const eemail = await UserModel.findOne({email});
        if (eemail) {
            message = "The email already exists";
            console.log(message);
            return message
        };
        // encontrando roles
        const rolesFound = await Role.roleModel.find({ name: { $in: roles } });
        // console.log(rolesFound);
        // Verificar que el rol exista
        if (roles) {
            for (let i = 0; i < roles.length; i++) {
                if (!Role.ROLES.includes(roles[i])) {
                    message = `Role ${roles[i]} does not exist`;
                    console.log(message);
                    return message
                }
            }
        }
        // creando usuario
        const newUser = new UserModel({
            username,
            email,
            password,
            roles: rolesFound.map((role) => role._id),
        });

        // Guardando nuevo usuario
        const savedUser = await newUser.save()

        return savedUser


    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllUsers,
    getAUser,
    deleteUser,
    addUser,
}