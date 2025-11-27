import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Destination directory for the uploaded file
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using Date.now() and file.originalname
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

// Define route to handle file upload
router.post("/", upload.single("file"), (req, res) => {
  try {
    // Check if file is uploaded successfully
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filename = req.file.filename;
    const filePath = `/images/${filename}`;

    // Send the filename or image path as response
    res.status(200).json({ filename, imagePath: filePath });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "File upload failed" });
  }
});

export default router;
