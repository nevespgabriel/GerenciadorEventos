'use strict';

export default (sequelize, DataTypes) => {
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
      values: ['open', 'closed', 'completed', 'canceled'], 
      defaultValue: 'open', 
      allowNull: false
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', 
        key: 'id' 
      }
    }
  }, {
    freezeTableName: true, 
  });

  
  Event.associate = function(models) {
    
    Event.belongsTo(models.User, {
      foreignKey: 'creatorId',
      as: 'creator'
    });
  };

  return Event;
};