const express = require("express");
const router = express.Router();
const response = require("../utils/response");
const controller = require("./controller");
const config = require("../../config/index");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// SIGN-IN

router.post(
  "/sign-in",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    controller
      .signIn(req.body.username, req.body.password)
      .then((userAndToken) => {
        res.json(userAndToken);
      })
      .catch((error) =>
        response.error(req, res, "Error al iniciar sesión", 500, error)
      );
  }
);

// SIGNUP
router.post("/sign-up", (req, res) => {
  const { username, email, password, confirmPassword, roles } = req.body;
  controller
    .signUp(username, email, password, confirmPassword, roles)
    .then((newUserAndToken) => res.json(newUserAndToken))
    .catch((error) =>
      response.error(req, res, "Error al registrarse", 500, error)
    );
});
// SIGNUP
// router.post("/sign-up", (req, res) => {
//   const { username, email, password, confirmPassword, roles } = req.body;
//   controller
//     .signUp(username, email, password, confirmPassword, roles)
//     .then(async (data) => {
//       const { token, userRegister } = data;
//       const { _id, username, email } = userRegister;
//       const user = { id: _id, username, email };
//       if (token) {
//         passport.authenticate("local", {
//           // failureRedirect: "../../login",
//           failureFlash: true,
//         })(req, res, () => {
//           res.status(200).cookie("token", token, {
//             maxAge: config.expireTimeCookieToken,
//             httpOnly: config.nodeEnv === "production" ? true : false,
//             secure: config.nodeEnv === "production" ? true : false
//           });
//           res.send({
//             error: "",
//             body: { user: {...user,token} },
//           });
//           // .redirect("../../");
//         });
//       } else {
//         req.flash("error_msg", data);
//         res.send({
//           error: data,
//           body: "",
//         });
//         // res.redirect("../../login");
//       }
//     })
//     .catch((error) =>
//       response.error(req, res, "Error al registrarse", 500, error)
//     );
// });

// SIGNIN
// router.post("/sign-in", (req, res) => {
//   controller
//     .signIn(req.body.username, req.body.password)
//     .then(async (data) => {
//       const { token, username, id, email } = data;
//       // res.send({
//       //         error: "",
//       //         body: { data },
//       //       });
//       if (token) {
//         passport.authenticate("local", {
//           // failureRedirect: "../../login",
//           failureFlash: true,
//         })(req, res, () => {
//           res.cookie("token", token, {
//             maxAge: config.expireTimeCookieToken,
//               httpOnly: config.nodeEnv === "production" ? true : false,
//               secure: config.nodeEnv === "production" ? true : false
//           });
//           res.send({
//             error: "",
//             body: { user: {...data}},
//           });
//         });
//       }else {
//         res.send({
//           error: data,
//           body: ""
//         })
//       }
//     })
//     .catch((error) => {
//       console.log(error)
//       response.error(req, res, "Error al iniciar sesión", 500, error);
//     });
// });

// LOGOUT
// router.get("/logout", (req, res) => {
  // console.log(req.user)
  // await res.clearCookie("token");
  // res.redirect("/");
// });

module.exports = router;
