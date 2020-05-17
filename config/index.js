require('dotenv').config();

const config = {
  dbBucketPassword: process.env.DB_BUCKET_PASSWORD,
};

module.exports = { config };
