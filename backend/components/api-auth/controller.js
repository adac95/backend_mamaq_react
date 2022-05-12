const store = require('./store');
const UserModel = require('../models/Users');
const Role = require('../models/Roles')
const config = require('../../config/index')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



async function signUp(username, email, password, confirmPassword, roles) {
    let message;
    try {
        // verificando que vengan todos los datos
        if (!username || !email || !password || !confirmPassword) {
            message = "Faltan llenar campos requeridos"
            console.log(message);
            return message;
        }
        // COMPARAR LAS PASSWRODS
        if(password != confirmPassword) {
            message = "Las contraseñas no coinciden"
            console.log(message);
            return message;
        }
        // verificar que no exista el usuario
        const user = await UserModel.findOne({ username });
        const userMail = await UserModel.findOne({ email });
        if (user || userMail) {
            message = "The user already exists"
            console.log(message);
            return message
        }
        // Verificar que el rol exista
        if (roles) {
            for (let i = 0; i < roles.length; i++) {
                if (!Role.ROLES.includes(roles[i])) {
                    message = `Role ${roles[i]} does not exist`;
                    console.log(message);
                    return message
                } else {// Si llegan roles que existen sacar su ID
                    const foundRoles = await Role.roleModel.find({ name: { $in: roles } });
                    roles = foundRoles.map((role) => role._id);
                }
            }
        } else {
            const role = await Role.roleModel.findOne({ name: "user" });
            roles = role._id;
        }
        // hash de la password
        const hash = await bcrypt.hash(password, 10)
        // Actualizar los nuevos datos para enviar a la BD
        const newUser = {
            username,
            email,
            password: hash,
            roles,
        }
        // Guardando usuario en la BD
        const userRegister = await store.signUp(newUser)
        // crear Token de acceso
        const token = jwt.sign({ id: userRegister._id }, config.secretToken, {
            expiresIn: config.expireTimeCookieToken,
        });
        const newUserNoPassword = {token, id:userRegister._id , username: userRegister.username, email: userRegister.email, roles: [...userRegister.roles]}
        data = {token, ...newUserNoPassword}
        return data
    } catch (error) {
        console.log(error);
        message = "Error desde el servidor al crear usuario"
        return message
    }

}

async function signIn(username, password) {
    let message;
    try {
        // verificando que vengan todos los datos
        if (!username || !password) {
            message = "Faltan llenar campos requeridos"
            console.log(message);
            return message;
        }
        // verificar si existe usuario
        const foundUser = await store.signIn(username);
        if (!foundUser) {
            message = "No se encontro al usuario";
            return message;
        }
        // verificando el password
        // const matchPassword = await UserModel.comparePassword(password)
        const matchPassword = await bcrypt.compare(password, foundUser.password)
        if (!matchPassword) {
            message = "Sin Permisos";
            return message;
        };
        //  Si todo esta bien creamos y devolvemos el token
        const id = foundUser._id;
        const token = jwt.sign({ id, username: foundUser.username }, config.secretToken, {
            expiresIn: config.expireTimeCookieToken,
        });
        const user = {token, id, username: foundUser.username, email: foundUser.email, roles: [...foundUser.roles]}
        return user ;

    } catch (error) {
        console.log(error);
        message = "Error desde el servidor al iniciar sesion"
        return message
    }
}
module.exports = { signUp, signIn }
