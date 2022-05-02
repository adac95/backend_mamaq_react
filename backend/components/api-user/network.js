const express = require('express')
const router = express.Router()
const response = require('../utils/response')
const controller = require("./controller")
const authJwt = require('../middlewares/auth')
const passport = require('passport')

router.get('/',
    [authJwt.isAuthenticated, authJwt.isAdmin, passport.authenticate('jwt', { session: false })],
    (req, res) => {
        controller.getAllUsers()
            .then(users => response.success(req, res, users, 200))
            .catch(error => response.error(req, res.json, "Error al buscar usuarios", 500, error))
    })

router.get('/:id',
    [authJwt.isAuthenticated, authJwt.isAdmin, passport.authenticate('jwt', { session: false })],
    (req, res) => {
        controller.getAUser(req.params.id)
            .then(user => response.success(req, res, user, 200))
            .catch(error => response.error(req, res, "Error al buscar usuario", 500, error))
    })

router.post('/',
    [authJwt.isAuthenticated, authJwt.isAdmin, passport.authenticate('jwt', { session: false })],
    (req, res) => {
        const { username, email, password, roles } = req.body;
        controller.addUser(username, email, password, roles)
            .then(newUser => response.success(req, res, newUser, 200))
            .catch(error => response.error(req, res, "Error al crear usuario", 500, error))
    })

router.delete('/:id',
    [authJwt.isAuthenticated, authJwt.isAdmin, passport.authenticate('jwt', { session: false })],
    (req, res) => {
        controller.deleteUser(req.params.id)
            .then(() => response.success(req, res, "Usuario eliminado exitosamente", 200))
            .catch(error => response.error(req, res, "No se pudo eliminar usuario", 500, error))
    })

module.exports = router