'use strict';

export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args: new Date().toString(), // Data e hora atuais
          msg: 'A data e hora do evento deve ser posterior à data e hora atual.'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'A capacidade deve ser maior que 0.'
        }
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: ['open', 'closed', 'completed', 'canceled'],
      defaultValue: 'open',
      allowNull: false
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
  });

  Event.associate = function(models) {
    // Associa um evento a um usuário (criador)
    Event.belongsTo(models.Users, {
      foreignKey: 'creatorId',
      as: 'creator'
    });

    // Configura a exclusão em cascata para as inscrições relacionadas
    Event.hasMany(models.Registration, {
      foreignKey: 'idEvent',
      as: 'registrations',
      onDelete: 'CASCADE'  // Remove inscrições relacionadas quando o evento é deletado
    });
  };

  return Event;
};