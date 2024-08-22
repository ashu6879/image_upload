const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save in uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
