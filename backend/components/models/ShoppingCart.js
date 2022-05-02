const { Schema, model } = require('mongoose');

const shoppingCartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
        },
        productName: {
            type: String
        },
        productImagenPath: {
            type: String
        },
        price: {
            type: Number,
            require: true
        },
        cantidad: {
            type: Number,
            require: true,
            min: [1, "Quantity can not be less then 1."],
        },
    }],
});

const shoppingCartModel = model("ShoppingCart", shoppingCartSchema);
module.exports = shoppingCartModel