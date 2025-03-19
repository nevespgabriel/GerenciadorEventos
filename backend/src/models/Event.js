"use strict";

export default (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            args: new Date().toString(),
            msg: "A data e hora do evento deve ser posterior à data e hora atual.",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [1],
            msg: "A capacidade deve ser maior que 0.",
          },
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["open", "closed", "completed", "canceled"],
        defaultValue: "open",
        allowNull: false,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  Event.associate = function (models) {
    Event.belongsTo(models.Users, {
      foreignKey: "creatorId",
      as: "creator",
    });
    Event.hasMany(models.Registration, {
      foreignKey: "idEvent",
      as: "registrations",
      onDelete: "CASCADE",
    });
  };
  return Event;
};
