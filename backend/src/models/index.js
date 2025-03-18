// models/index.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import process from 'process';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toFileUrl = (filepath) => `file://${path.resolve(filepath)}`;

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];
const db = {};

let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

const loadModels = async () => {
  const modelFiles = fs
    .readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      );
    });

  await Promise.all(
    modelFiles.map(async (file) => {
      const modelUrl = toFileUrl(path.join(__dirname, file)); 
      const { default: model } = await import(modelUrl);
      const initializedModel = model(sequelize, Sequelize.DataTypes);
      db[initializedModel.name] = initializedModel;
    })
  );

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  // Aqui você pode adicionar explicitamente o modelo User ao sequelize.models
  sequelize.models.Users = db.Users;  // Registro explícito do modelo
  sequelize.models.Event = db.Event;
  sequelize.models.Registration = db.Registration;

  db.sequelize = sequelize;  
  db.Sequelize = Sequelize;
};

await loadModels();  

export default db;


