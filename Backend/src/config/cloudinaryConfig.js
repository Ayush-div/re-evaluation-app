const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const generatePublicPdfUrl = (result) => {
    return result.secure_url.replace('/upload/', '/upload/fl_attachment/');
};

module.exports = { cloudinary, generatePublicPdfUrl };