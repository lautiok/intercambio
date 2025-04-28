import dotenv from 'dotenv';

dotenv.config();


export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.DB_MONGO_URI,
  hashSalt: process.env.SALT_HASH || 10,
  jwtSecret: process.env.JWT_SECRET || "secret",
  block_time: process.env.BLOCK_TIME || 60000,
  url: process.env.URL || "http://localhost:3000",
  nodemailer: {
    user : process.env.nodemiler_user,
    password : process.env.nodemailer_password,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};