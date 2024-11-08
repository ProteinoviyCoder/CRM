// pages/api/refresh.js
import jwt from "jsonwebtoken";
import { users } from "./users";

const ACCESS_TOKEN_SECRET = "your-access-token-secret";
const REFRESH_TOKEN_SECRET = "your-refresh-token-secret";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is missing" });
    }

    try {
      // Проверяем refresh token
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

      // Находим пользователя по id из refresh token
      const user = users.find((u) => u.id === decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: "Refresh token mismatch" });
      }

      // Генерируем новый access token
      const newAccessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "20m",
      });

      // Отправка ответа с токенами в куки
      const isProd = process.env.NODE_ENV === "production";

      // Отправляем новый access token в клиент
      res.setHeader(
        "Set-Cookie",
        `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=1200; ${
          isProd ? "Secure; SameSite=Strict" : ""
        }`
      );

      return res.status(200).json({ message: "Access token refreshed" });
    } catch (error) {
      return res
        .status(401)
        .json({ ...error, message: "Invalid refresh token" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
