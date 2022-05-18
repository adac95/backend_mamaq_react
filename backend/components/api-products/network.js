const express = require("express");
const router = express.Router();
const response = require("../utils/response");
const controller = require("./controller");

// middlewares
const passport = require("passport");
const authJwt = require("../middlewares/auth");

router.get(
  "/",
  (req, res) => {
    controller
      .getAllproducts()
      .then((data) => {
        response.success(req, res, data, 200);
      })
      .catch((err) => {
        response.error(req, res, "error al mostrar productos", err.status, err);
      });
  }
);

router.post(
  "/",
  [passport.authenticate("jwt", { session: false }),authJwt.isAdmin],
  (req, res) => {
    const { name, price, category, description } = req.body;
    controller
      .addProduct(name, price, category, description, req.file)
      .then((data) => {
        response.success(req, res, data, 200);
      })
      .catch((err) => {
        response.error(req, res, "problemas al crear product", 500, err);
      });
  }
);

router.patch(
  "/:id",
  [passport.authenticate("jwt", { session: false }),authJwt.isAdmin],
  (req, res) => {
    const { name, price, category, description } = req.body;
    controller
      .patchProduct(req.params.id, name, price, category, description,req.file)
      .then((data) => {
        response.success(req, res, data, 200);
      })
      .catch((err) => {
        response.error(req, res, "problemas al actualizar producto", 500, err);
      });
  }
);

router.delete(
  "/:id",
  [passport.authenticate("jwt", { session: false }), authJwt.isAdmin],
  (req, res) => {
    controller
      .deleteProduct(req.params.id)
      .then(() => {
        response.success(req, res, "Producto eliminado exitosamente", 200);
      })
      .catch((err) => {
        response.error(req, res, "problemas al eliminar producto", 500, err);
      });
  }
);

module.exports = router;
