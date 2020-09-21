import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './database/routes';
import db from './database/models';

// CONSTANTS
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || 'NO_SECRET_KEY';
const API_VERSION = '/api/v1';

// express setup
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${API_VERSION}/breads`, routes.bread);

// Middleware test
app.use((req, res, next) => {
  req.me = ENV;
  next();
});

const auth = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

app.listen(PORT, () => {
  console.log(`Hello world app listening on port ${PORT}, on ${ENV} env`);
  auth();
});
