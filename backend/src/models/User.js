import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: { type: DataTypes.STRING, allowNull: false },
    cpf: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
          msg: 'O CPF deve ser válido no formato XXX.XXX.XXX-XX',
        }
      },
      unique: true
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user'],
      defaultValue: 'user',
      allowNull: false
    }
  });

  // Hook para hash de senha antes de criar ou atualizar o usuário
  Users.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  Users.beforeUpdate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // Adicionando o método isValidPassword ao modelo
  Users.prototype.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return Users;
};
