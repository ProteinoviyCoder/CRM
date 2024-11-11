// pages/api/auth.js
import jwt from "jsonwebtoken";
import { usersBD } from "../allUsers/usersBD";
import bcrypt from "bcrypt";

// Секретный ключ для подписи токенов
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function generateTokens(id) {
  const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });

  const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Проверка логина
    const user = usersBD.find((user) => user.email === email);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Такого пользователя не существует",
      });
    }

    // Сравнение хеша пароля
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        message: "Неверный логин или пароль",
      });
    }

    // Генерация токенов
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Сохранение токенов в объекте пользователя
    user.refreshToken = refreshToken;

    // Отправка ответа с токенами в куки
    const isProd = process.env.NODE_ENV === "production";

    res.setHeader("Set-Cookie", [
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=1200; Domain; ${
        isProd ? "Secure; SameSite=Strict" : ""
      }`,
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=2592000; Domain; ${
        isProd ? "Secure; SameSite=Strict" : ""
      }`,
    ]);

    return res.status(200).json({
      status: 200,

      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        permissions: user.permissions,
        role: user.role,
      },
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
