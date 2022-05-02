
const { Schema, model } = require('mongoose');

const ROLES = ["user", "admin"];

const roleSchema = new Schema(
    {name: String},
    {versionKey: false}
);

const roleModel = model("Role", roleSchema);
module.exports = {roleModel, ROLES}