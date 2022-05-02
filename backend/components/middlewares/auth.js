const RoleModel = require('../models/Roles')
const UserModel = require('../models/Users')


const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin')
}

const isAdmin = async (req, res, next) => {
    try {

        const user = await UserModel.findById(req.user._id);
        const roles = await RoleModel.roleModel.find({ _id: { $in: user.roles } });
        // console.log(user);
        // console.log(roles);

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                return next()
            }
        }
        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};

module.exports = { isAuthenticated, isAdmin }