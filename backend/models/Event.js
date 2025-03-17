'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATE, 
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['open', 'closed', 'completed', 'canceled'], // Valores possíveis para status
      defaultValue: 'open', // Valor padrão
      allowNull: false
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Referência à tabela 'Users'
        key: 'id' // Chave primária da tabela 'Users'
      }
    }
  }, {});

  // Relacionamento
  Event.associate = function(models) {
    // Evento pertence a um usuário (criador)
    Event.belongsTo(models.User, {
      foreignKey: 'creatorId',
      as: 'creator'
    });
  };

  return Event;
};