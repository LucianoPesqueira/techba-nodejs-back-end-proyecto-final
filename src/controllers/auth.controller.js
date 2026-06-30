import { generateToken } from "../utils/token.generator.js";

const default_user = {
  id: 1,
  name: "User",
  email: "user@email.com",
  password: "strongPass123",
  admin: true,
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Faltan credenciales",
      });
    }

    if (default_user.email !== email || default_user.password !== password) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = generateToken(default_user);

    res.json({
      message: "Login exitoso",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno en la autenticación",
    });
  }
};
