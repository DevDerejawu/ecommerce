import multer from "multer";

const storage = multer.memoryStorage();

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp"
];

function fileFilter(req, file, cbFun) {
   if (!file) return cbFun(null, true);
  if (!allowedImageTypes.includes(file.mimetype)) {
    return cbFun(
      new Error("Only jpeg, png, webp, gif, and bmp images are allowed."),
      false
    );
  }
  cbFun(null, true);
}

const upload = multer({
  storage,
  fileFilter
});

const uploadImages = upload.fields([
  { name: "front_image", maxCount: 1 },
  { name: "back_image", maxCount: 1 }
]);

export { uploadImages };
