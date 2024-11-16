const multer = require("multer");
const path = require("path");

// Define storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists, or multer will throw an error
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${fileExt}`);
  }
});

// Define upload settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 1MB file size limit
  fileFilter: (req, file, cb) => {
    // Define allowed file types
    const fileType = /jpeg|jpg|png|pdf/;
    const mimeType = fileType.test(file.mimetype);
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());

    // Check file type and extension
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only .jpeg, .jpg, .png, and .pdf formats are allowed.'));
  }
})

module.exports = upload;
