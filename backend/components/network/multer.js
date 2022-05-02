const path = require('path');
const multer  = require('multer')
// uuid para crear id de manera aleatoria para guadar las imagenes en uploads
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../fronted/public/assets/uploads"),
    filename: (req, file, cb, filename) => {
        // console.log(file);
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})

module.exports = { storage }

