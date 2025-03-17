const express = require('express');
const app = express();
const db = require('./models');

db.sequelize.sync({ force: false }).then(() => {
  console.log('Tabelas criadas ou sincronizadas com sucesso!');
}).catch(err => {
  console.error('Erro ao sincronizar tabelas: ', err);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});