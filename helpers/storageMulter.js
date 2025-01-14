const multer = require('multer'); // multer để upload ảnh

// Cấu hình và trả về đối tượng storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now(); // thời gian hiện tại
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

module.exports = storage;
