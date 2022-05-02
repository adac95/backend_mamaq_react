const ShoppingCartModel = require('../models/ShoppingCart')

async function addCart({ userId, productId, price, cantidad, productImagenPath }) {
    const userCart = await ShoppingCartModel.findById(userId)
    userCart.products.push({ productId, price, cantidad, productImagenPath })
    userCart.save()
}

async function getCarts() {
    const users = await ShoppingCartModel.find()
    return users
}

async function getOneOfCart(id) {
    const user = await ShoppingCartModel.find({userId: id});
    return user;
}

async function updateCart({id, dataToUpdate}) {
    const updatedCart = ShoppingCartModel.findByIdAndUpdate(id, dataToUpdate)
    return updatedCart
}
// async function deleteProductOfCart(id) {
//     const productToEliminate = await ShoppingCartModel.findOne({_id: id});
//     console.log(id, productToEliminate)
//     // const index = array.indexOf(productToEliminate);
//     // if (index > -1) {
//     //     pro.splice(index, 1);
//     // }
//     // return productToEliminate

// }
async function deleteCart(id) {
    const user = await ShoppingCartModel.findByIdAndDelete(id);
    return user
}

module.exports = {
    addCart,
    getCarts,
    getOneOfCart,
    updateCart,
    deleteCart,
    // deleteProductOfCart,
}