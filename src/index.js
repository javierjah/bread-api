import 'dotenv/config';
import 'regenerator-runtime/runtime';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import db from './database/models';
import routes from './routes';

// env config vars
const ENV = process.env.NODE_ENV || 'development';

// CONSTANTS
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || '/api/v1';

// express setup
const app = express();

// express configs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app routes setup
app.use(`${API_VERSION}/breads`, routes.bread);
app.use(`${API_VERSION}/purchases`, routes.purchase);

// swagger route config
app.use(`${API_VERSION}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/healthz', (req, res) => {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  return res.status(200).send('I am happy and healthy\n');
});

// testing database connection
const auth = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await db.sequelize.sync();
    console.log('DB Sync.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

app.listen(PORT, () => {
  console.log(`breads-api listening on port ${PORT}, on ${ENV} env`);
  auth();
});
