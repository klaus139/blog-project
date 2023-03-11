"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// @desc configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});
// @desc Instance of cloudinary storage
exports.storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png", "pdf", "docx"],
    params: {
        folder: "OLEAN_BLOG",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    },
});
