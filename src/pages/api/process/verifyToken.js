import jwt from "jsonwebtoken";
import { parseCookies } from "./parseCookies";

export const verifyToken = async (cookieProp) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  const cookies = parseCookies(cookieProp || "");
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return { isExistToken: false, message: "Access token is missing" };
  }

  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    return {
      isExistToken: true,
      result: true,
      message: "Valid token",
      decoded,
    };
  } catch (error) {
    return {
      isExistToken: true,
      result: false,
      message: "Invalid or expired access token",
      error: error.message,
    };
  }
};
