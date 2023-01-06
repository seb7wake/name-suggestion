const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  openai_key: process.env.OPENAI_API_KEY,
};