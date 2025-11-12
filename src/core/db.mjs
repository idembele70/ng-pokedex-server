import mongoose from 'mongoose';
import uri from '../config/db.config.mjs';
import { env } from '../config/env.mjs';

mongoose.connect(uri)
  .then(
    () => {
      console.log('Successfully connected to Database: %s', env.DB_NAME);
    }).catch(err => {
    console.warn('Error encountered during connection to Database %s', env.DB_NAME);
    console.error('Db connection error:', err);
  })