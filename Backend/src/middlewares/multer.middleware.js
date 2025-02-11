const multer = require('multer');
const path = require('path');

const storageConfiguration = multer.diskStorage({
    // error first callback are those callback whose first parameter is error object
    destination: (req, file, next) => { 
        next(null, 'uploads/') // error first callbacks -> if we pass anything instead of null then it will throw error
    },
    filename: (req, file, next) => { 
        console.log(file);
        next(null, `${Date.now()}${path.extname(file.originalname)}`) // error first callbacks -> passed null because we donot have any error object
    }
});

const uploader = multer({ // here uploader is a middleware
    storage: storageConfiguration
});

module.exports = uploader;