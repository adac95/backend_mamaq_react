const store = require("./store");

function getAllproducts() {
  return new Promise((resolve, reject) => {
    resolve(store.allProducts());
    if (error) reject("Error al obtener products GET", error);
  });
}

function addProduct(name, price, category, description, imagen) {
  return new Promise((resolve, reject) => {
    if (!name || !price || !category || !description) {
      console.log("falta completar datos");
      reject("faltan completar datos para crear producto");
      return false;
    }
    if (!imagen) {
      imagen = "";
    }
    let data = { name, price, category, description, imagen };
    const res = store.addProducts(data);
    return resolve(res);
  });
}

function patchProduct(id, name, price, category, description, imagen) {
  return new Promise(async (resolve, reject) => {
    if (name || price || category || description || imagen) {
      const result = store.patchProducts(
        id,
        name,
        price,
        category,
        description,
        imagen
      );
      resolve(result);
    }
    reject("Invalid data to update");
  });
}

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    if (!id) return reject("Invalid ID");
    resolve(store.deleteProducts(id));
  });
}

module.exports = {
  getAllproducts,
  addProduct,
  patchProduct,
  deleteProduct,
};
