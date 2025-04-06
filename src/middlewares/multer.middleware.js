import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // giving destination where the file will be store
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // giving file name
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
