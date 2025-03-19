'use strict';

export default (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    idEvent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Event', 
        key: 'id' 
      }
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id' 
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: ['confirmed', 'canceled'], 
      defaultValue: 'confirmed',
      allowNull: false
    }
  }, {
    freezeTableName: true, 

    // Adiciona uma restrição de unicidade para idEvent e idUser
    indexes: [
      {
        unique: true, // Define que a combinação deve ser única
        fields: ['idEvent', 'idUser'] // As colunas que fazem parte da restrição
      }
    ]
  });

  Registration.associate = function(models) {
    Registration.belongsTo(models.Event, {
      foreignKey: 'idEvent',
      as: 'event'
    });

    Registration.belongsTo(models.Users, {
      foreignKey: 'idUser',
      as: 'user'
    });
  };

  return Registration;
};