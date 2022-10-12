const multer = require("multer");
const date = new Date().toISOString().replace(/[-T:\.Z]/g, "");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image/product")
    },
    filename: (req, file, cb) => {
        cb(null, date + "-" + file.originalname); 
    }
})
const upload = multer({
    storage: storage
});

module.exports = upload;