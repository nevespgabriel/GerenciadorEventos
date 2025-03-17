'use strict';

module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    idEvent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events', 
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
      values: ['pending', 'confirmed', 'canceled'], 
      defaultValue: 'pending', 
      allowNull: false
    }
  }, {});

  Registration.associate = function(models) {
    Registration.belongsTo(models.Event, {
      foreignKey: 'idEvent',
      as: 'event'
    });

    Registration.belongsTo(models.User, {
      foreignKey: 'idUser',
      as: 'user'
    });
  };

  return Registration;
};