import jwt from "jsonwebtoken";

export const generateToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "1h",
    }
  );

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (error) {
    console.error("Erro ao verificar token:", error.message);
    return null;
  }
};
