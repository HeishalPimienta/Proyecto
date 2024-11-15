'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Carga todos los archivos de modelos
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Importa el modelo y lo inicializa con Sequelize
    const model = require(path.join(__dirname, file)); // Importa el modelo
    db[model.name] = model; // Añade el modelo a la base de datos
  });

// Establece las asociaciones (si las hay)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exporta la instancia de sequelize y todos los modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
