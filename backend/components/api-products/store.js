const Model = require('../models/Products')
const { unlink } = require('fs-extra');
const path = require('path');

function allProducts() {
    const data = Model.find()
    return data
}

function addProducts(data) {
    data.imagen.path = 'public/assets/uploads/' + data.imagen.filename;
    const newProduct = new Model(data)
    newProduct.save()
}

async function patchProducts(id, name, price, category, description) {
    try {
        const foundProductById = await Model.findById(id)
        if (name) foundProductById.name = name
        if (price) foundProductById.price = price
        if (category) foundProductById.category = category
        if (description) foundProductById.description = description
        
        const updateProduct = await foundProductById.save()
        return updateProduct
    } catch (error) {
        console.log(`Problemas al actualizar la BD: ${error}`)
    }
}

async function deleteProducts(id) {
    try {
        const eliminateProduct = await Model.findByIdAndDelete(id)
        // revisar que existe una imagen (si el path viene undefined es porque no se envio foto en el form)
        const pathImg = eliminateProduct.imagen.path
        // path completo si es que se envio una foto
        const linkToEliminate = path.resolve('./' + eliminateProduct.imagen.path)
        if (!pathImg) return eliminateProduct

        await unlink(linkToEliminate)
        return eliminateProduct
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    allProducts,
    addProducts,
    patchProducts,
    deleteProducts
}