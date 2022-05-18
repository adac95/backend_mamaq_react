const express = require("express");
const router = express.Router();
const response = require("../utils/response");
const controller = require("./controller");
const passport = require("passport");
const authJwt = require("../middlewares/auth");

router.get(
  "/",
  [passport.authenticate("jwt", { session: false })],
  (req, res) => {
    controller
      .getCarts()
      .then((carts) => response.success(req, res, carts, 200))
      .catch((error) =>
        response.error(
          req,
          res.json,
          "Error al buscar carritos de compra",
          500,
          error
        )
      );
  }
);

router.get(
  "/:id",
  [passport.authenticate("jwt", { session: false })],
  (req, res) => {
    controller
      .getOneCart(req.params.id)
      .then((cart) => response.success(req, res, cart, 200))
      .catch((error) =>
        response.error(
          req,
          res,
          "Error al buscar el carrito de compras por usuario",
          500,
          error
        )
      );
  }
);

router.post(
  "/",
  [passport.authenticate("jwt", { session: false })],
  (req, res) => {
    const { userId, products } = req.body;
    const { productId, productName, cantidad, price, productImagenPath } =
      products[0];
    if (userId != req.user.id) {
      return response.error(
        req,
        res,
        "Sin permisos o token invalido",
        401,
        error
      );
    }
    controller
      .addProductToCart({
        userId,
        productId,
        productName,
        cantidad,
        price,
        productImagenPath,
      })
      .then((newCart) => response.success(req, res, newCart, 200))
      .catch((error) =>
        response.error(req, res, "Error al crear usuario", 500, error)
      );
  }
);

router.patch(
  "/",
  [
    passport.authenticate("jwt", { session: false }),
    authJwt.validTokenAndCartId,
  ],
  (req, res) => {
    const { cartId, products } = req.body;
    const userId = req.user.id;
    const { products_id } = products[0];
    let cantidad = products[0].cantidad.toString();
    controller
      .patchCart({ userId, cartId, products_id, cantidad })
      .then((newCart) => response.success(req, res, newCart, 200))
      .catch((error) =>
        response.error(req, res, "Error al editar el carrito", 500, error)
      );
  }
);

router.delete(
  "/:id",
  [passport.authenticate("jwt", { session: false })],
  (req, res) => {
    if (req.user.id != req.params.id)
      response.error(req, res, "Sin permisos o token invalido", 500, error);
    controller
      .deleteCart(req.params.id)
      .then(() =>
        response.success(req, res, "Usuario eliminado exitosamente", 200)
      )
      .catch((error) =>
        response.error(req, res, "No se pudo eliminar usuario", 500, error)
      );
  }
);

router.delete(
  "/:cartId/:products_id",
  [
    passport.authenticate("jwt", { session: false }),
    authJwt.validTokenAndCartId,
  ],
  (req, res) => {
    const { cartId, products_id } = req.params;
    controller
      .deleteOneProductOfCart({ cartId, products_id })
      .then(() =>
        response.success(req, res, "Usuario eliminado exitosamente", 200)
      )
      .catch((error) =>
        response.error(req, res, "No se pudo eliminar usuario", 401, error)
      );
  }
);

module.exports = router;
