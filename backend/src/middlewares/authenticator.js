import { verifyToken } from "../services/jwt-service.js";
import db from "../models/index.js";
const { Users } = db;

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Pega o token após "Bearer"
    
    if (!token) {
      return res.sendStatus(401); // Se não houver token, retorna 401
    }
    
    // Agora, verifique o token com jwt.verify
    const user = verifyToken(token);
    
    if (user) {
      req.user = user;  // Atribui o usuário decodificado ao request
      next(); // Permite continuar a execução da rota
    } else {
      return res.sendStatus(401); // Se o token não for válido, retorna 401
    }
    
  } catch (error) {
    console.error(error); // Logar o erro para depuração
    res.sendStatus(401); // Caso ocorra qualquer erro, retorna 401
  }
};