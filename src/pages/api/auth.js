// pages/api/auth.js
import jwt from "jsonwebtoken";
import { users } from "./users";

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
    const { username, password } = req.body;

    // Проверка логина
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Сравнение хеша пароля
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Генерация токенов
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Сохранение токенов в объекте пользователя
    user.refreshToken = refreshToken;

    // Отправка ответа с токенами в куки
    const isProd = process.env.NODE_ENV === "production";

    res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=1200; ${
        isProd ? "Secure; SameSite=Strict" : ""
      }`
    ); // Устанавливаем accessToken в куки

    res.setHeader(
      "Set-Cookie",
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=2592000; ${
        isProd ? "Secure; SameSite=Strict" : ""
      }`
    ); // Устанавливаем refreshToken в куки

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
