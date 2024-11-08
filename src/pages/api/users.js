export const users = [
  {
    id: "1",
    username: "user1",
    email: "user1@test.com",
    passwordHash:
      "$2b$10$mKtlPj/EKayTYCAS6jjtVeq3/DIcZS/0kB9zmeDCGJX7xHlnTcY6a",
  },
  {
    id: "2",
    username: "user2",
    email: "user2@test.com",
    passwordHash:
      "$2b$10$krpoS4d5ySuHmNzJjv5IIumAIo/tmA6HhNh0GVLOmF/DYyPKwc8/C",
  },
];

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Проверка доступа по access token в куки
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    try {
      // Проверяем токен
      const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

      // Токен валиден, извлекаем userId
      const user = users.find((u) => u.id === decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Проверка доступа - ищем разрешение в массиве доступов
      if (!user.permissions || !user.permissions.includes("get_users")) {
        return res.status(403).json({
          message: "Forbidden: You do not have access to this resource",
        });
      }

      // Если разрешение есть, возвращаем всех пользователей
      return res.status(200).json({
        message: "User data retrieved successfully",
        users, // Возвращаем список всех пользователей
      });
    } catch (error) {
      // Если токен невалидный или истек, возвращаем ошибку
      return res
        .status(401)
        .json({ ...error, message: "Invalid or expired access token" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
