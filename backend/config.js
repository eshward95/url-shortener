require("dotenv").config(); // load .env file

const config = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  // secret: process.env.JWT_SECRET,
  // hostname: process.env.HOSTNAME,
  mongo: {
    uri: process.env.MONGOURI,
  },
  // s3: {
  //   accessKeyId: process.env.TEBI_ACCESS_KEY,
  //   secretAccessKey: process.env.TEBI_SECRET_KEY,
  //   bucket: process.env.TEBI_BUCKET,
  // },
  // redis: {
  //   host: process.env.REDIS_HOST,
  // },
};

module.exports = config;
