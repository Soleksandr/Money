// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');

const Sequelize = require('sequelize');

const db = new Sequelize('money', 'postgres', 'J19D86C', {
  dialect: 'postgres',
});

const modelTransaction = require('./transaction')(db, Sequelize);
const modelUser = require('./user')(db, Sequelize);

const modelUserTransaction = db.define('userTransaction', {});
modelUserTransaction.belongsTo(modelTransaction);
modelUserTransaction.belongsTo(modelUser);
modelTransaction.hasMany(modelUserTransaction, { as: 'participantsId' });

module.exports = {
  db,
  modelTransaction,
  modelUserTransaction,
  modelUser,
};

// const basename = path.basename(module.filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(`${__dirname}/../config/config.json`)[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   sequelize = new Sequelize(
//     config.database, config.username, config.password, config,
//   );
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file =>
//     (file.indexOf('.') !== 0) &&
//     (file !== basename) &&
//     (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
