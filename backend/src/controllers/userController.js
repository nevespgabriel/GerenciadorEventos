import { generateToken } from "../services/jwt-service.js";
import db from "../models/index.js";
const { Users } = db


const newUser = async (req, res, role) => {
  try {
    console.log("Até aqui foi");
    const { name, cpf, email, password } = req.body;
    const user = await Users.create({ name, cpf, email, password, role});
    return user;  // Apenas retornamos o usuário sem tentar enviar resposta
  } catch (error) {
    // Garantir que a resposta seja enviada apenas uma vez
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors.map(e => e.message) });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'O CPF ou o e-mail já estão em uso.' });
    }
    // Envia a resposta de erro no caso de outro tipo de erro
    return res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }, 
    });

    if (user && (await user.isValidPassword(password))) {
      const token = generateToken(user);

      return res.json({
        token,
      });
    } else {
      return res.sendStatus(404); 
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const user = await newUser(req, res, "user");  // A resposta de erro já foi enviada se ocorrer um erro aqui

    if (!user) { 
      // Se `newUser` falhar, não continue com a execução
      return; 
    }

    // Envia a resposta de sucesso
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);  // Resposta de erro caso haja exceção no fluxo
  }
};


export const store = async (req, res) => {
  try {
    const user = await newUser(req, res, "admin"); 
    res.status(201).json({ user }); 
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const index = async (req, res) => {
  try {
    const users = await User.findAll(); 
    res.json(users); 
  } catch (error) {
    res.status(500).send(error.message); 
  }
};

export const show = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuário não encontrado'); 
    }
  } catch (error) {
    res.status(500).send(error.message); 
  }
};

export const update = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }, 
    });

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message); 
  }
};

export const destroy = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }, 
    });

    if (deleted) {
      res.status(204).send(); 
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message); 
  }
};