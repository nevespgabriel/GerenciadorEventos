import { generateToken } from "../services/jwt-service.js";
import db from "../models/index.js";
const { Users } = db;

const newUser = async (req, res, role) => {
  try {
    const { name, cpf, email, password } = req.body;
    const user = await Users.create({ name, cpf, email, password, role });
    return user;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "O CPF ou o e-mail já estão em uso." });
    }
    return res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    console.log("Está no login");
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email },
    });

    if (user && (await user.isValidPassword(password))) {
      const token = generateToken(user);
      console.log(req.headers.authorization);
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
    const user = await newUser(req, res, "user");
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message); 
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
      res.status(404).send("Usuário não encontrado");
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
      res.status(404).send("Usuário não encontrado");
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
      res.status(404).send("Usuário não encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
