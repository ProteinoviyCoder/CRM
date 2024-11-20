// pages/api/refresh.js
import jwt from "jsonwebtoken";
import { businessesBD } from "../allBusiness/businessBD";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const cookies = Object.fromEntries(
    (req.headers.cookie || "")
      .split(";")
      .map((cookie) => cookie.trim().split("="))
  );
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is missing" });
  }

  try {
    // Проверяем refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const { businessId } = decoded;

    const business = businessesBD.find((b) => b.businessId === businessId);
    if (!business) {
      return res.status(404).json({
        status: 404,
        message: "Business not found",
      });
    }

    // Находим пользователя по username из refresh token
    let user;

    try {
      if (
        business.owner.id.toString() === decoded.id.toString() &&
        business.owner.username === decoded.username
      ) {
        user = business.owner;
      } else {
        user = business.team.find((u) => u.username === decoded.username);
      }
    } catch (error) {
      console.log(error);
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token mismatch" });
    }

    // Генерируем новый access token
    const newAccessToken = jwt.sign(
      { id: user.id, businessId: business.businessId, username: user.username },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20m",
      }
    );

    // Отправка ответа с токенами в куки
    const isProd = process.env.NODE_ENV === "production";

    // Отправляем новый access token в клиент
    res.setHeader(
      "Set-Cookie",
      `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=1200; Domain; ${
        isProd ? "Secure; SameSite=Strict" : ""
      }`
    );

    return res.status(200).json({ message: "Access token refreshed" });
  } catch (error) {
    return res.status(401).json({ ...error, message: "Invalid refresh token" });
  }
}
