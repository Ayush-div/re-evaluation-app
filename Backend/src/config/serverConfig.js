const dotenv = require('dotenv');
dotenv.config();

// here we are exporting all the env variables that our project uses
module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL
}