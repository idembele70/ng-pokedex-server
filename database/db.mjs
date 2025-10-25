import mongoose from 'mongoose';

const {
  PROTOCOL,
  HOST,
  MONGO_LOCAL_PORT,
  DB_NAME,
  MONGO_ROOT_USERNAME,
  MONGO_ROOT_PASSWORD,
  MONGO_AUTH_SOURCE,
} = process.env;
const uri = `${PROTOCOL}//${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${HOST}:${MONGO_LOCAL_PORT}/${DB_NAME}?authSource=${MONGO_AUTH_SOURCE}`;

mongoose.connect(uri)
  .then(
    () => {
      console.log('Successfully connected to Database: %s', DB_NAME);
    }).catch(err => {
    console.warn('Error encountered during connection to Database %s', DB_NAME);
    console.error('Db connection error:', err);
  });