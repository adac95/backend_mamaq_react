const express = require('express')
const router = express.Router()
const response = require('../utils/response')
const controller = require("./controller")

router.get('/',
    // [authJwt.isAuthenticated, authJwt.isAdmin, passport.authenticate('jwt', { session: false })],
    (req, res) => {
        controller.getCarts()
            .then(carts => response.success(req, res, carts, 200))
            .catch(error => response.error(req, res.json, "Error al buscar carritos de compra", 500, error))
    })

router.get('/:id',
    // [authJwt.isAuthenticated, authJwt.isAdmin, passport.authenticate('jwt', { session: false })],
    (req, res) => {
        controller.getOneCart(req.params.id)
            .then(cart => response.success(req, res, cart, 200))
            .catch(error => response.error(req, res, "Error al buscar el carrito de compras por usuario", 500, error))
    })

router.post('/',
    // [authJwt.isAuthenticated, authJwt.isAdmin, passport.authenticate('jwt', { session: false })],
    (req, res) => {
        const { userId, products } = req.body;
        const {productId, productName, cantidad, price, productImagenPath} = products[0]
        controller.addProductToCart({ userId, productId, productName,cantidad, price, productImagenPath })
            .then(newCart => response.success(req, res, newCart, 200))
            .catch(error => response.error(req, res, "Error al crear usuario", 500, error))
    })

router.patch('/',
    // [authJwt.isAuthenticated, authJwt.isAdmin, passport.authenticate('jwt', { session: false })],
    (req, res) => {
        const { cartId, products } = req.body;
        const {products_id} = products[0]
        let cantidad = products[0].cantidad
        cantidad = cantidad.toString()
        controller.patchCart({ cartId, products_id, cantidad })
            .then(newCart => response.success(req, res, newCart, 200))
            .catch(error => response.error(req, res, "Error al editar el carrito", 500, error))
    })

router.delete('/:id',
    // [authJwt.isAuthenticated, authJwt.isAdmin, passport.authenticate('jwt', { session: false })],
    (req, res) => {
        controller.deleteCart(req.params.id)
            .then(() => response.success(req, res, "Usuario eliminado exitosamente", 200))
            .catch(error => response.error(req, res, "No se pudo eliminar usuario", 500, error))
    })

router.delete('/:cartId/:products_id',
    // [authJwt.isAuthenticated, authJwt.isAdmin, passport.authenticate('jwt', { session: false })],
    (req, res) => {
        const {cartId, products_id} = req.params
        controller.deleteOneProductOfCart({cartId, products_id})
            .then(() => response.success(req, res, "Usuario eliminado exitosamente", 200))
            .catch(error => response.error(req, res, "No se pudo eliminar usuario", 500, error))
    })

module.exports = router