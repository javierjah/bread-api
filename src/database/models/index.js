import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configJson from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];

const db = {};

let sequelize;
if (config.environment === 'production') {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOption: {
      ssl: true,
      native: true,
    },
    logging: true,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: process.env.DATABASE_URL,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
    logging: false,
  });
}

if (process.env.DATABASE_URL && config.environment === 'production') {
  console.log('process.env.DATABASE_URL SOSOSOOSOSOSI', process.env.DATABASE_URL);
  console.log('config.environment', config.environment);
  sequelize = new Sequelize(process.env.DATABASE_URL);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    // const model = sequelize.import(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
