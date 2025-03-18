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
      values: ['pending', 'confirmed', 'canceled'], 
      defaultValue: 'pending', 
      allowNull: false
    }
  }, {
    freezeTableName: true, 
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