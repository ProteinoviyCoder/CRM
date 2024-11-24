export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Отправка ответа с токенами в куки
  const isProd = process.env.NODE_ENV === "production";

  res.setHeader("Set-Cookie", [
    `accessToken=${""}; HttpOnly; Path=/; Max-Age=1200; Domain; ${
      isProd ? "Secure; SameSite=Strict" : ""
    }`,
    `refreshToken=${""}; HttpOnly; Path=/; Max-Age=2592000; Domain; ${
      isProd ? "Secure; SameSite=Strict" : ""
    }`,
  ]);

  return res.status(200).json({
    status: 200,
    message: "Cookie is clear",
  });
}
