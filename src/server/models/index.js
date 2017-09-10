const Sequelize = require('sequelize');

const db = new Sequelize('money', 'postgres', 'J19D86C', {
  dialect: 'postgres',
});

const modelTransaction = require('./transaction')(db, Sequelize);
const modelUser = require('./user')(db, Sequelize);

modelUser.belongsToMany(modelTransaction, { through: 'userTransaction', as: 'transactions' });
modelTransaction.belongsToMany(modelUser, { through: 'userTransaction', as: 'participants' });
modelTransaction.belongsTo(modelUser, { as: 'payer', foreignKey: 'payerId' });

module.exports = {
  db,
  modelTransaction,
  modelUser,
};
