import express from "express";
import db from "./models/index.js"; 
import dotenv from 'dotenv';
import userRoute from "./routes/userRoute.js";
import eventRoute from "./routes/eventRoute.js";
import registrationRoute from "./routes/registrationRoute.js";
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors());

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    await db.Users.sync({ alter: true });
    await db.Event.sync({ alter: true });
    await db.Registration.sync({ alter: true });
    
    // Iniciando o servidor
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });

  } catch (error) {
    console.error('Erro ao conectar e sincronizar o banco de dados:', error);
  }
};

startServer(); 

app.use(express.json());

app.use("/user", userRoute);
app.use("/event", eventRoute);
app.use("/registration", registrationRoute);