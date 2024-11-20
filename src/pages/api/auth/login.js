import { businessesBD } from "../allBusiness/businessBD";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Секретный ключ для подписи токенов
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function generateTokens(id, businessId, username) {
  const accessToken = jwt.sign(
    { id, businessId, username },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "20m",
    }
  );

  const refreshToken = jwt.sign(
    { id, businessId, username },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password } = req.body;

  // Проверка логина
  let user = businessesBD
    .flatMap((b) => b.team)
    .find((user) => user.username === username);
  if (!user) {
    try {
      const { owner } = businessesBD.find(
        (owner) => owner.owner.username === username
      );
      user = owner;
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: "Такого пользователя не существует",
      });
    }
  }

  // Сравнение хеша пароля
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({
      status: 401,
      message: "Неверный логин или пароль",
    });
  }

  const business = businessesBD.find((b) => b.businessId === user.businessId);

  let isUserExistInBusiness = business.team.some(
    (worker) => worker.username === user.username
  );
  if (!isUserExistInBusiness) {
    isUserExistInBusiness = business.owner.username === user.username;

    if (!isUserExistInBusiness) {
      return res.status(401).json({
        status: 401,
        message: "Вас нет в этой команде, обратитесь в поддержку",
      });
    }
  }

  // Генерация токенов
  const { accessToken, refreshToken } = generateTokens(
    user.id,
    business.businessId,
    user.username
  );

  if (refreshToken) {
    user.refreshToken = refreshToken;
  }

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

  const userForResponse = { ...user };
  delete userForResponse.passwordHash;
  delete userForResponse.refreshToken;
  delete userForResponse.businessId;

  return res.status(200).json({
    status: 200,
    message: "Login successful",
    userForResponse,
    tasks: business.tasks,
    businessName: business.businessName,
  });
}
