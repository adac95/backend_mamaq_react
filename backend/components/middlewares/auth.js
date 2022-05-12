const RoleModel = require("../models/Roles");
const shoppingCartModel = require("../models/ShoppingCart");
const UserModel = require("../models/Users");

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const roles = await RoleModel.roleModel.find({ _id: { $in: user.roles } });
    // console.log(user);
    // console.log(roles);

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }
    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

const validTokenAndCartId = async(req, res,next) => {
  try{
    const cart = await shoppingCartModel.findOne({userId: req.user.id})
    const cartByCartId = await shoppingCartModel.findById(req.body.cartId)
    if(cart._id.toString() != cartByCartId._id.toString()) {
        res.status(401).json({body:"", error:"sin permisos o token invalido"})
    }else next()
  }catch (error) {console.log(error)
     next()}
}
module.exports = {
  isAdmin,
  validTokenAndCartId
};
